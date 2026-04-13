"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getWitnesses() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const config = await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      include: { witnesses: true }
    });
    return config?.witnesses || [];
  } catch (error) {
    return [];
  }
}

// Acción para sincronizar/guardar
export async function updateWitnesses(witnesses: any[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false };

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { eventConfig: true }
    });

    if (!usuario?.eventConfig) return { success: false };

    const cleanWitnesses = witnesses.filter(w => w.nombre.trim() !== "");

    await prisma.$transaction([
      prisma.witness.deleteMany({ where: { eventConfigId: usuario.eventConfig.id } }),
      prisma.witness.createMany({
        data: cleanWitnesses.map(w => ({
          nombre: w.nombre,
          rol: w.rol,
          imageUrl: w.imageUrl || "",
          eventConfigId: usuario.eventConfig.id
        }))
      })
    ]);

    revalidatePath("/admin/testigos");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// ACCIÓN DE ELIMINACIÓN REAL (Igual a Itinerario/Galería)
export async function deleteWitnessAction(id: string) {
  try {
    await prisma.witness.delete({ where: { id } });
    revalidatePath("/admin/testigos");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}