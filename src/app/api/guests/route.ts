import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * 1. OBTENER (GET)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const slug = searchParams.get("slug");

    if (code) {
      const invitado = await prisma.guest.findUnique({
        where: { codigo: code.toUpperCase().trim() },
        select: { 
          id: true, nombre: true, cupos: true, status: true, 
          dietary: true, message: true, confirmados: true, 
          codigo: true, mesa: true, asistio: true 
        }
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
 * 2. CREAR (POST)
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nombre, cupos, codigo, dietary, mesa } = body;

    if (!nombre || !codigo) {
      return NextResponse.json({ error: "Nombre y código son requeridos" }, { status: 400 });
    }

    const usuario = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!usuario) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    const existente = await prisma.guest.findUnique({ where: { codigo: codigo.toUpperCase().trim() } });
    if (existente) return NextResponse.json({ error: "El código ya está en uso" }, { status: 400 });

    const nuevoInvitado = await prisma.guest.create({
      data: {
        nombre,
        cupos: Number(cupos) || 1,
        codigo: codigo.toUpperCase().trim(),
        dietary: dietary || "",
        mesa: mesa || "A Designar",
        asistio: false, 
        userId: usuario.id
      }
    });

    return NextResponse.json(nuevoInvitado);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear invitado" }, { status: 500 });
  }
}

/**
 * 3. ACTUALIZAR (PATCH) - SOPORTA ID Y CÓDIGO
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, dietary, confirmados, message, mesa, asistio } = body;
    const code = body.code || body.codigo;

    let invitado;
    if (id) {
      invitado = await prisma.guest.findUnique({ where: { id } });
    } else if (code) {
      invitado = await prisma.guest.findUnique({ where: { codigo: code.toUpperCase().trim() } });
    }

    if (!invitado) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    // --- LÓGICA BLINDADA ---
    // Solo cambiamos los confirmados si el body trae el campo (evitamos el 0 accidental)
    const tieneConfirmados = body.hasOwnProperty('confirmados');
    const finalConfirmados = tieneConfirmados ? Number(confirmados) : invitado.confirmados;

    // Solo pasamos a CANCELLED si el usuario mandó explícitamente 0 confirmados.
    // Si no mandó nada (como el proceso de la mesa), mantenemos el status que ya tenía.
    let finalStatus = invitado.status;
    if (tieneConfirmados && Number(confirmados) === 0) {
      finalStatus = "CANCELLED";
    } else if (status) {
      finalStatus = status;
    }

    const actualizado = await prisma.guest.update({
      where: { id: invitado.id },
      data: {
        status: finalStatus,
        confirmados: finalConfirmados,
        dietary: dietary !== undefined ? dietary : invitado.dietary,
        message: message !== undefined ? message : invitado.message,
        mesa: mesa !== undefined ? mesa : invitado.mesa,
        asistio: asistio !== undefined ? asistio : invitado.asistio
      }
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error("Error en PATCH:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

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

    if (!invitadoABorrar || invitadoABorrar.userId !== usuarioDb?.id) {
      return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
    }

    await prisma.guest.delete({ where: { id: id! } });
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}