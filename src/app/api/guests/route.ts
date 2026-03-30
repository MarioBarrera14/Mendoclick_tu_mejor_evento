import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 1. OBTENER INVITADOS
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const session = await getServerSession(authOptions);

    const targetSlug = slug || session?.user?.slug;

    if (!targetSlug) {
      return NextResponse.json({ error: "No se identificó el evento" }, { status: 400 });
    }

    const invitados = await prisma.guest.findMany({
      where: {
        user: { slug: targetSlug }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(invitados);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener invitados" }, { status: 500 });
  }
}

// 2. CREAR INVITADO (Blindado contra userId undefined)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificamos que haya sesión y que tengamos el email
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { apellido, cupos, codigo } = await req.json();

    // BUSQUEDA MANUAL DEL USUARIO: Esto soluciona el error del userId undefined
    const usuarioDb = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!usuarioDb) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Validar si el apellido ya existe para ESTE usuario
    const familiaExiste = await prisma.guest.findFirst({
      where: { 
        userId: usuarioDb.id,
        apellido: { equals: apellido, mode: 'insensitive' } 
      }
    });

    if (familiaExiste) {
      return NextResponse.json({ error: "Esta familia ya está registrada" }, { status: 400 });
    }

    const nuevoInvitado = await prisma.guest.create({
      data: { 
        apellido, 
        cupos: Number(cupos), 
        codigo,
        status: "PENDING",
        userId: usuarioDb.id // Usamos el ID real de la base de datos
      },
    });
    
    return NextResponse.json(nuevoInvitado, { status: 201 });
  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json({ error: "Error al crear invitado" }, { status: 500 });
  }
}

// 3. ACTUALIZAR ASISTENCIA (PATCH)
export async function PATCH(req: Request) {
  try {
    const { code, status, dietary, name } = await req.json();

    const invitado = await prisma.guest.findUnique({
      where: { codigo: code }
    });

    if (!invitado) {
      return NextResponse.json({ error: "Código no válido" }, { status: 404 });
    }

    const nombreFinal = 
      invitado.apellido.toLowerCase().trim() === name.toLowerCase().trim()
        ? invitado.apellido
        : `${invitado.apellido} (${name})`;

    const actualizado = await prisma.guest.update({
      where: { codigo: code },
      data: {
        status: status, 
        dietary: dietary, 
        apellido: nombreFinal, 
      }
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar asistencia" }, { status: 500 });
  }
}

// 4. ELIMINAR
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    await prisma.guest.delete({ where: { id } });
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}