import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 1. OBTENER INVITADOS (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const session = await getServerSession(authOptions);

    // Si no viene slug por URL, intentamos usar el del usuario logueado (Dashboard)
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
    console.error("Error en GET Guests:", error);
    return NextResponse.json({ error: "Error al obtener invitados" }, { status: 500 });
  }
}

// 2. CREAR INVITADO (POST) - Blindado y con validación de código único
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { apellido, cupos, codigo } = await req.json();

    // Obtenemos el ID del usuario real desde la DB
    const usuarioDb = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!usuarioDb) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // A. VALIDAR CÓDIGO ÚNICO (Global)
    // Prisma fallaría con un 500 si no validamos el @unique antes
    const codigoEnUso = await prisma.guest.findUnique({
      where: { codigo: codigo }
    });

    if (codigoEnUso) {
      return NextResponse.json({ error: "El código ya está siendo usado por otra familia" }, { status: 400 });
    }

    // B. VALIDAR DUPLICADO EN EL MISMO EVENTO
    const familiaExiste = await prisma.guest.findFirst({
      where: { 
        userId: usuarioDb.id,
        apellido: { equals: apellido, mode: 'insensitive' } 
      }
    });

    if (familiaExiste) {
      return NextResponse.json({ error: "Esta familia ya está en tu lista" }, { status: 400 });
    }

    const nuevoInvitado = await prisma.guest.create({
      data: { 
        apellido, 
        cupos: Number(cupos), 
        codigo,
        status: "PENDING",
        userId: usuarioDb.id
      },
    });
    
    return NextResponse.json(nuevoInvitado, { status: 201 });
  } catch (error) {
    console.error("Error en POST Guest:", error);
    return NextResponse.json({ error: "Error al crear invitado" }, { status: 500 });
  }
}

// 3. ACTUALIZAR ASISTENCIA (PATCH) - Usado por los invitados
export async function PATCH(req: Request) {
  try {
    const { code, status, dietary, name } = await req.json();

    const invitado = await prisma.guest.findUnique({
      where: { codigo: code }
    });

    if (!invitado) {
      return NextResponse.json({ error: "Código no válido" }, { status: 404 });
    }

    // Lógica para no pisar el apellido original si el invitado escribe algo distinto
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
    console.error("Error en PATCH Guest:", error);
    return NextResponse.json({ error: "Error al confirmar asistencia" }, { status: 500 });
  }
}

// 4. ELIMINAR (DELETE) - Protegido contra borrados ajenos
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    // BUSCAMOS EL USUARIO
    const usuarioDb = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    // VALIDACIÓN DE SEGURIDAD: 
    // Verificamos que el invitado a borrar pertenezca realmente al usuario logueado
    const invitadoABorrar = await prisma.guest.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!invitadoABorrar || invitadoABorrar.userId !== usuarioDb?.id) {
      return NextResponse.json({ error: "No tienes permiso para eliminar este invitado" }, { status: 403 });
    }

    await prisma.guest.delete({ where: { id } });
    
    return NextResponse.json({ message: "Invitado eliminado" });
  } catch (error) {
    console.error("Error en DELETE Guest:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}