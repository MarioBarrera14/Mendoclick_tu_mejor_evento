"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getEventConfig() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    return await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
    });
  } catch (error) {
    console.error("Error al obtener configuración:", error);
    return null;
  }
}

export async function updateEventDetails(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) return { success: false, error: "Usuario no encontrado" };

    // Limpiamos campos automáticos para que Prisma no se queje
    const { id, userId, updatedAt, createdAt, user, ...validData } = formData;

    await prisma.eventConfig.upsert({
      where: { userId: dbUser.id },
      update: validData,
      create: { 
        ...validData,
        user: { connect: { id: dbUser.id } } 
      },
    });

    // Limpiamos la caché de la invitación del cliente y la raíz
    revalidatePath(`/invitacion/${dbUser.slug}`);
    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("Error en Prisma:", error);
    return { success: false, error: "Error al guardar en la base de datos" };
  }
}