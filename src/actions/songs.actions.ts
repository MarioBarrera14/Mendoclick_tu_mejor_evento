"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitSongSuggestions(eventId: string, guestCode: string, songs: any) {
  try {
    // 1. Validar que el invitado existe y pertenece al evento correcto
    const invitado = await prisma.guest.findUnique({
      where: { codigo: guestCode.toUpperCase().trim() },
      include: { user: true }
    });

    if (!invitado) {
      return { success: false, error: "Código de invitado no válido." };
    }

    // 2. Verificar si ya envió sugerencias (Bloqueo de duplicados)
    const existeSugerencia = await prisma.songSuggestion.findFirst({
      where: { 
        userId: invitado.userId,
        guestName: invitado.nombre
      }
    });

    if (existeSugerencia) {
      return { success: false, error: "Ya recibimos tus sugerencias. ¡Gracias!" };
    }

    // 3. Crear la sugerencia
    await prisma.songSuggestion.create({
      data: {
        tema1: songs.tema1 || null,
        tema2: songs.tema2 || null,
        tema3: songs.tema3 || null,
        guestName: invitado.nombre,
        userId: invitado.userId
      }
    });

    revalidatePath("/admin/sugeridos");
    return { success: true };
  } catch (error) {
    console.error("Error en submitSongSuggestions:", error);
    return { success: false, error: "Error al procesar la solicitud." };
  }
}