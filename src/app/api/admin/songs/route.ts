"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitSongSuggestions(
  eventId: string, // Este es el ID de EventConfig que pasas desde el componente
  guestCode: string, 
  songs: { tema1?: string; tema2?: string; tema3?: string }
) {
  try {
    // 1. Buscamos la configuración del evento para obtener el userId (dueño de la fiesta)
    const config = await prisma.eventConfig.findUnique({
      where: { id: eventId },
      select: { userId: true }
    });

    if (!config) return { success: false, error: "Evento no encontrado" };

    // 2. Buscamos al invitado por su código Y validamos que pertenezca al mismo User
    const guest = await prisma.guest.findFirst({
      where: { 
        codigo: guestCode,
        userId: config.userId // <--- CRÍTICO: El invitado debe ser de este cliente
      }
    });

    if (!guest) {
      return { success: false, error: "Código no válido para este evento" };
    }

    // 3. Creamos la sugerencia vinculada al cliente (User)
    await prisma.songSuggestion.create({
      data: {
        userId: config.userId,
        guestName: guest.apellido, // O guest.nombre si lo tienes
        tema1: songs.tema1 || "",
        tema2: songs.tema2 || "",
        tema3: songs.tema3 || "",
      },
    });

    // Revalidamos la ruta donde el cliente (User) ve sus sugerencias
    revalidatePath("/dashboard/songs"); 
    
    return { success: true };
  } catch (error) {
    console.error("Error en submitSongSuggestions:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}