"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Acción para que los invitados envíen sugerencias de canciones
 */
export async function submitSongSuggestions(
  eventId: string, // ID de la tabla EventConfig (cl...)
  guestCode: string, 
  songs: { tema1?: string; tema2?: string; tema3?: string }
) {
  try {
    // 1. Normalizamos el código para evitar errores de mayúsculas/minúsculas
    const normalizedCode = guestCode.trim().toUpperCase();

    // 2. Buscamos la configuración del evento para obtener el dueño (userId)
    const config = await prisma.eventConfig.findUnique({
      where: { id: eventId },
      select: { userId: true }
    });

    if (!config) {
      return { success: false, error: "El evento no existe." };
    }

    // 3. Validamos que el invitado pertenezca a este evento específico
    const guest = await prisma.guest.findFirst({
      where: { 
        codigo: normalizedCode,
        userId: config.userId 
      }
    });

    if (!guest) {
      return { success: false, error: "Código de invitado no válido para este evento." };
    }

    // 4. Guardamos las canciones vinculadas al User
    await prisma.songSuggestion.create({
      data: {
        userId: config.userId,
        guestName: guest.apellido, // Usamos el apellido del invitado validado
        tema1: songs.tema1 || "",
        tema2: songs.tema2 || "",
        tema3: songs.tema3 || "",
      },
    });

    // 5. Revalidamos las rutas del panel de control para que veas los cambios al instante
    revalidatePath("/admin/sugeridos"); 
    revalidatePath("/admin/playlist");
    
    return { success: true };
  } catch (error) {
    console.error("Error en submitSongSuggestions:", error);
    return { success: false, error: "Error de servidor al procesar la playlist." };
  }
}