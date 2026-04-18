import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId, witnesses } = await req.json();
    
    if (!userId || !witnesses) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // 1. Buscamos la configuración del evento del usuario
    const config = await prisma.eventConfig.findUnique({
      where: { userId }
    });

    if (!config) {
      return NextResponse.json({ error: "No se encontró configuración para este usuario" }, { status: 404 });
    }

    // 2. Ejecutamos la actualización de testigos en una transacción
    const cleanWitnesses = witnesses.filter((w: any) => w.nombre && w.nombre.trim() !== "");

    await prisma.$transaction([
      prisma.witness.deleteMany({ 
        where: { eventConfigId: config.id } 
      }),
      prisma.witness.createMany({
        data: cleanWitnesses.map((w: any) => ({
          nombre: w.nombre,
          rol: w.rol,
          imageUrl: w.imageUrl || "",
          eventConfigId: config.id
        }))
      })
    ]);

    // 3. Revalidamos las rutas
    revalidatePath("/admin/testigos"); 
    revalidatePath("/admin/dashboard");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en API Witnesses:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}