"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 1. OBTENER TODO EL ITINERARIO DEL USUARIO ACTUAL
export async function getItinerary() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const config = await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      include: {
        itinerary: {
          orderBy: { order: 'asc' } // Siempre ordenados por el campo 'order'
        }
      }
    });

    return config?.itinerary || [];
  } catch (error) {
    console.error("Error al obtener itinerario:", error);
    return [];
  }
}

// 2. GUARDAR / SINCRONIZAR TODO EL ITINERARIO
// Esta función es la más eficiente: borra los anteriores y guarda los nuevos
// para evitar conflictos de IDs y mantener el orden exacto del front.
export async function updateItinerary(items: any[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { eventConfig: true }
    });

    if (!dbUser || !dbUser.eventConfig) {
      return { success: false, error: "Configuración de evento no encontrada" };
    }

    const configId = dbUser.eventConfig.id;

    // Usamos una transacción para asegurar que no nos quedemos sin datos si algo falla
    await prisma.$transaction([
      // A. Borramos los hitos actuales del itinerario de este evento
      prisma.itineraryItem.deleteMany({
        where: { eventConfigId: configId }
      }),
      // B. Creamos los nuevos hitos recibidos del frontend
      prisma.itineraryItem.createMany({
        data: items.map((item, index) => ({
          eventConfigId: configId,
          time: item.time,
          title: item.title,
          icon: item.icon || "Clock", // Icono por defecto
          order: index, // Usamos el índice del array para mantener el orden del front
        }))
      })
    ]);

    // Revalidación para que los cambios se vean en la invitación
    revalidatePath(`/invitacion/${dbUser.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error("Error al sincronizar itinerario:", error);
    return { success: false };
  }
}