"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getLogisticaConfig() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    // IMPORTANTE: Incluimos el modelo User para saber qué templateId tiene
    return await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      include: {
        user: {
          select: {
            templateId: true,
            slug: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Error al obtener logística:", error);
    return null;
  }
}

export async function updateLogisticaConfig(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) return { success: false, error: "Usuario no encontrado" };

    const logisticaData = {
      eventName: data.eventName,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      mapLink: data.mapLink,
      churchName: data.churchName,
      churchAddress: data.churchAddress,
      churchMapLink: data.churchMapLink,
      churchDate: data.churchDate,
      churchTime: data.churchTime,
    };

    await prisma.eventConfig.upsert({
      where: { userId: dbUser.id },
      update: logisticaData,
      create: { 
        ...logisticaData,
        user: { connect: { id: dbUser.id } }
      },
    });
    
    revalidatePath("/admin/logistica");
    if (dbUser.slug) {
      revalidatePath(`/invit/${dbUser.slug}`);
      revalidatePath(`/inv/${dbUser.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error detallado al guardar logística:", error);
    return { success: false };
  }
}