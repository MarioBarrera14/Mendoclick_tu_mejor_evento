import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * 1. OBTENER INVITADOS (GET)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const code = searchParams.get("code");

    // A. LÓGICA DE VALIDACIÓN PÚBLICA
    if (code) {
      const invitado = await prisma.guest.findUnique({
        where: { codigo: code.toUpperCase().trim() },
        select: {
          id: true,
          nombre: true,
          cupos: true,
          status: true,
          dietary: true,
          message: true, // <--- AGREGADO PARA QUE EL FRONT LO VEA
          confirmados: true
        }
      });

      if (!invitado) {
        return NextResponse.json({ error: "Código no válido" }, { status: 404 });
      }
      return NextResponse.json(invitado);
    }

    // B. LÓGICA DE ADMIN
    const session = await getServerSession(authOptions);
    const targetSlug = slug || session?.user?.slug;

    if (!targetSlug) {
      return NextResponse.json({ error: "No se identificó el evento" }, { status: 400 });
    }

    const invitados = await prisma.guest.findMany({
      where: { user: { slug: targetSlug } },
      orderBy: { updatedAt: 'desc' } // Ordenamos por actualización para el Live Feed
    });
    
    return NextResponse.json(invitados);
  } catch (error) {
    console.error("Error en GET Guests:", error);
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}

/**
 * 2. CREAR INVITADO (POST)
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { nombre, cupos, codigo } = await req.json();

    const usuarioDb = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!usuarioDb) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    const codigoEnUso = await prisma.guest.findUnique({ where: { codigo: codigo.toUpperCase().trim() } });
    if (codigoEnUso) return NextResponse.json({ error: "El código ya está siendo usado" }, { status: 400 });

    const nuevoInvitado = await prisma.guest.create({
      data: { 
        nombre: nombre.trim(), 
        cupos: Number(cupos), 
        codigo: codigo.toUpperCase().trim(),
        status: "PENDING",
        userId: usuarioDb.id
      },
    });
    
    return NextResponse.json(nuevoInvitado, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}

/**
 * 3. ACTUALIZAR ASISTENCIA (PATCH)
 */
export async function PATCH(req: Request) {
  try {
    const { code, status, dietary, name, confirmados, message } = await req.json();

    if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

    const invitado = await prisma.guest.findUnique({ where: { codigo: code.toUpperCase().trim() } });
    if (!invitado) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    const nombreFinal = name && name.toLowerCase().trim() !== invitado.nombre.toLowerCase().trim()
        ? `${invitado.nombre} (${name.trim()})`
        : invitado.nombre;

    const actualizado = await prisma.guest.update({
      where: { codigo: code.toUpperCase().trim() },
      data: {
        status: status, 
        dietary: dietary || "", 
        nombre: nombreFinal, 
        message: message || "", // <--- GUARDAMOS EL MENSAJE
        confirmados: status === "CONFIRMED" ? (Number(confirmados) || 1) : 0 
      }
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al confirmar" }, { status: 500 });
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

    if (!invitadoABorrar || invitadoABorrar.userId !== usuarioDb?.id) return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

    await prisma.guest.delete({ where: { id: id! } });
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}