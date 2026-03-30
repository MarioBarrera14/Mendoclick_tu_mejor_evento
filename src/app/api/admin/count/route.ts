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
      where: { user: { email: session.user.email } }
    });
  } catch (error) {
    console.error("Error al obtener config:", error);
    return null;
  }
}

export async function updateEventConfig(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) return { success: false, error: "Usuario no encontrado" };

    // Limpiamos el objeto data por si vienen campos extraños del formulario
    // que no están en el modelo EventConfig
    const { id, userId, updatedAt, user, ...validData } = data;

    await prisma.eventConfig.upsert({
      where: { 
        userId: dbUser.id 
      },
      update: validData,
      create: { 
        ...validData,
        // En Prisma, para conectar la relación obligatoria en el create
        // usamos el objeto relacional 'user', no el campo escalar 'userId' directamente
        user: { 
          connect: { id: dbUser.id } 
        }
      },
    });
    
    // Revalidamos la ruta del cliente y la raíz
    revalidatePath(`/invitacion/${dbUser.slug}`);
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error detallado al guardar:", error);
    return { success: false };
  }
}