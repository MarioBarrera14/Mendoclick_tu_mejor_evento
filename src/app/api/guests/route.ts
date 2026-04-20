import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * 1. OBTENER (GET) - Ya lo tenías bien
 */
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

/**
 * 2. CREAR (POST) - ¡AQUÍ ESTABA EL ERROR!
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nombre, cupos, codigo, dietary } = body;

    if (!nombre || !codigo) {
      return NextResponse.json({ error: "Nombre y código son requeridos" }, { status: 400 });
    }

    // Buscamos al usuario dueño de la sesión
    const usuario = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!usuario) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    // Verificamos si el código ya existe (para evitar errores de duplicado)
    const existente = await prisma.guest.findUnique({ where: { codigo: codigo.toUpperCase().trim() } });
    if (existente) return NextResponse.json({ error: "El código ya está en uso" }, { status: 400 });

    const nuevoInvitado = await prisma.guest.create({
      data: {
        nombre,
        cupos: Number(cupos) || 1,
        codigo: codigo.toUpperCase().trim(),
        dietary: dietary || "",
        userId: usuario.id
      }
    });

    return NextResponse.json(nuevoInvitado);
  } catch (error) {
    console.error("Error en POST guests:", error);
    return NextResponse.json({ error: "Error al crear invitado" }, { status: 500 });
  }
}

/**
 * 3. ACTUALIZAR (PATCH) - Ya lo tenías bien
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const code = body.code || body.codigo;
    const { status, dietary, confirmados, message } = body;

    if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

    const invitado = await prisma.guest.findUnique({ where: { codigo: code.toUpperCase().trim() } });
    if (!invitado) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    // LÓGICA REPARADA: Si confirmados es undefined, mantenemos lo que ya tiene el invitado
    const finalConfirmados = confirmados !== undefined ? Number(confirmados) : invitado.confirmados;
    
    // Si mandamos 0 confirmados explícitamente, cancelamos. Si no, mantenemos status o lo cambiamos.
    const finalStatus = finalConfirmados === 0 ? "CANCELLED" : (status || invitado.status);

    const actualizado = await prisma.guest.update({
      where: { id: invitado.id },
      data: {
        status: finalStatus,
        dietary: dietary !== undefined ? dietary : invitado.dietary,
        message: message !== undefined ? message : invitado.message, // Permite mandar "" (vacío)
        confirmados: finalConfirmados
      }
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

/**
 * 4. ELIMINAR (DELETE) - Ya lo tenías bien
 */
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!session || !session.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const usuarioDb = await prisma.user.findUnique({ where: { email: session.user.email } });
    const invitadoABorrar = await prisma.guest.findUnique({ where: { id: id || "" } });

    if (!invitadoABorrar || invitadoABorrar.userId !== usuarioDb?.id) {
      return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
    }

    await prisma.guest.delete({ where: { id: id! } });
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}