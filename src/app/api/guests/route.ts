import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const slug = searchParams.get("slug");

    if (code) {
      const invitado = await prisma.guest.findUnique({
        where: { codigo: code.toUpperCase().trim() },
        select: { id: true, nombre: true, cupos: true, status: true, dietary: true, message: true, confirmados: true, codigo: true }
      });
      if (!invitado) return NextResponse.json({ error: "Código no válido" }, { status: 404 });
      return NextResponse.json(invitado);
    }

    const session = await getServerSession(authOptions);
    const targetSlug = slug || session?.user?.slug;
    if (!targetSlug) return NextResponse.json({ error: "No identificado" }, { status: 400 });

    const invitados = await prisma.guest.findMany({
      where: { user: { slug: targetSlug } },
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(invitados);
  } catch (error) {
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const code = body.code || body.codigo; // Acepta ambos para evitar error 400
    const { status, dietary, name, confirmados, message } = body;

    if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

    const invitado = await prisma.guest.findUnique({ where: { codigo: code.toUpperCase().trim() } });
    if (!invitado) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    // Convertimos dietary a string si viene como array para que Prisma no explote
    const dietaryString = Array.isArray(dietary) ? dietary.join(", ") : (dietary || "");

    const actualizado = await prisma.guest.update({
      where: { id: invitado.id },
      data: {
        status: status || invitado.status,
        dietary: dietaryString,
        message: message || invitado.message || "",
        confirmados: status === "CONFIRMED" ? (Number(confirmados) || 0) : 0
      }
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

// ... Mantener POST y DELETE igual ...

/**
 * 4. ELIMINAR (DELETE)
 */
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!session || !session.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const usuarioDb = await prisma.user.findUnique({ where: { email: session.user.email } });
    const invitadoABorrar = await prisma.guest.findUnique({ where: { id: id || "" } });

    if (!invitadoABorrar || invitadoABorrar.userId !== usuarioDb?.id) return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

    await prisma.guest.delete({ where: { id: id! } });
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}