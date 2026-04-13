"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Obtiene el itinerario completo del usuario autenticado
 */
export async function getItinerary() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        eventConfig: {
          include: {
            itinerary: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    return user?.eventConfig?.itinerary || [];
  } catch (error) {
    console.error("Error en getItinerary:", error);
    return [];
  }
}

/**
 * Crea un nuevo punto en el itinerario (Límite máximo: 8)
 */
export async function createItineraryItem(data: { time: string; title: string }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { eventConfig: true },
    });

    if (!user?.eventConfig) {
      return { success: false, error: "Configuración de evento no encontrada" };
    }

    // VALIDACIÓN CRÍTICA: Límite de 8 elementos
    const count = await prisma.itineraryItem.count({
      where: { eventConfigId: user.eventConfig.id },
    });

    if (count >= 8) {
      return { success: false, error: "Límite de 8 elementos alcanzado" };
    }

    // CREACIÓN
    const newItem = await prisma.itineraryItem.create({
      data: {
        time: data.time,
        title: data.title,
        order: count, // El orden es el conteo actual
        eventConfigId: user.eventConfig.id,
      },
    });

    // Revalidamos las rutas para que el cambio impacte en la invitación
    revalidatePath("/admin/itinerario");
    if (user.slug) {
      revalidatePath(`/invit/${user.slug}`);
      revalidatePath(`/inv/${user.slug}`);
    }

    return { success: true, item: newItem };
  } catch (error) {
    console.error("Error en createItineraryItem:", error);
    return { success: false, error: "Error al crear el punto del itinerario" };
  }
}

/**
 * Elimina un punto del itinerario por ID
 */
export async function deleteItineraryItem(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    // Buscamos el item para saber a qué usuario pertenece (Seguridad)
    const item = await prisma.itineraryItem.findUnique({
      where: { id },
      include: { eventConfig: { include: { user: true } } }
    });

    if (!item || item.eventConfig.user.email !== session.user.email) {
      return { success: false, error: "No tienes permiso para eliminar este item" };
    }

    await prisma.itineraryItem.delete({
      where: { id },
    });

    // Reordenar los elementos restantes para que no queden saltos en 'order'
    const remainingItems = await prisma.itineraryItem.findMany({
      where: { eventConfigId: item.eventConfigId },
      orderBy: { order: "asc" },
    });

    // Actualización masiva de órdenes en una transacción
    await prisma.$transaction(
      remainingItems.map((item, index) =>
        prisma.itineraryItem.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/itinerario");
    if (item.eventConfig.user.slug) {
      revalidatePath(`/invit/${item.eventConfig.user.slug}`);
      revalidatePath(`/inv/${item.eventConfig.user.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error en deleteItineraryItem:", error);
    return { success: false, error: "Error al eliminar el punto del itinerario" };
  }
}