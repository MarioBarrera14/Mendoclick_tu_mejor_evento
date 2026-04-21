import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, eventId } = body;

    const invitado = await prisma.guest.findFirst({
      where: {
        codigo: code.toUpperCase().trim(),
        userId: eventId,
      },
    });

    if (!invitado) {
      return NextResponse.json({ error: "Código no válido" }, { status: 404 });
    }

    // --- BLOQUEO DE SEGURIDAD ---
    // Si el invitado no confirmó asistencia previamente por la web
    if (invitado.status !== "CONFIRMED") {
      return NextResponse.json({ 
        error: "No has confirmado tu asistencia previamente. Por favor, consultá con el recepcionista." 
      }, { status: 403 }); // 403 es Prohibido
    }

    // 2. Si está confirmado, marcamos el ingreso al salón
    const actualizado = await prisma.guest.update({
      where: { id: invitado.id },
      data: { asistio: true } 
    });

    return NextResponse.json({
      name: actualizado.nombre,
      mesa: actualizado.mesa || "A Designar",
    });

  } catch (error) {
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}