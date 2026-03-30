"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitSongSuggestions(eventId: string, guestCode: string, songs: any) {
  try {
    // 1. Buscamos al invitado por su código para obtener su apellido/nombre
    const guest = await prisma.guest.findUnique({
      where: { codigo: guestCode }
    });

    if (!guest) {
      return { success: false, error: "Código de invitado no válido" };
    }

    // 2. Buscamos la configuración del evento para obtener el userId
    const config = await prisma.eventConfig.findUnique({
      where: { id: eventId },
      select: { userId: true }
    });

    if (!config) return { success: false, error: "Evento no encontrado" };

    // 3. Creamos la sugerencia con el nombre del invitado
    await prisma.songSuggestion.create({
      data: {
        userId: config.userId,
        guestName: guest.apellido, // <--- GUARDAMOS QUIÉN FUE
        tema1: songs.tema1,
        tema2: songs.tema2,
        tema3: songs.tema3,
      },
    });

    revalidatePath("/admin/sugeridos");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error de servidor" };
  }
}