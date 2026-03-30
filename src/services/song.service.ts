import { prisma } from "@/lib/prisma";
import type { SongSuggestion, CreateSongSuggestionInput } from "@/types";

export class SongService {
  /**
   * Obtiene todas las sugerencias de canciones de un usuario
   */
  static async getSuggestionsByUserId(userId: string): Promise<SongSuggestion[]> {
    try {
      const suggestions = await prisma.songSuggestion.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return suggestions as SongSuggestion[];
    } catch (error) {
      console.error("Error en SongService.getSuggestionsByUserId:", error);
      return [];
    }
  }

  /**
   * Obtiene las sugerencias por slug del usuario
   */
  static async getSuggestionsBySlug(slug: string): Promise<SongSuggestion[]> {
    try {
      const suggestions = await prisma.songSuggestion.findMany({
        where: { user: { slug } },
        orderBy: { createdAt: "desc" },
      });
      return suggestions as SongSuggestion[];
    } catch (error) {
      console.error("Error en SongService.getSuggestionsBySlug:", error);
      return [];
    }
  }

  /**
   * Crea una nueva sugerencia de canciones
   */
  static async createSuggestion(
    input: CreateSongSuggestionInput
  ): Promise<{ success: boolean; suggestion?: SongSuggestion; error?: string }> {
    try {
      const suggestion = await prisma.songSuggestion.create({
        data: {
          tema1: input.tema1,
          tema2: input.tema2,
          tema3: input.tema3,
          guestName: input.guestName,
          userId: input.userId,
        },
      });

      return { success: true, suggestion: suggestion as SongSuggestion };
    } catch (error) {
      console.error("Error en SongService.createSuggestion:", error);
      return { success: false, error: "Error al guardar la sugerencia." };
    }
  }

  /**
   * Elimina una sugerencia
   */
  static async deleteSuggestion(id: string): Promise<{ success: boolean }> {
    try {
      await prisma.songSuggestion.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      console.error("Error en SongService.deleteSuggestion:", error);
      return { success: false };
    }
  }

  /**
   * Cuenta el total de sugerencias de un usuario
   */
  static async countSuggestions(userId: string): Promise<number> {
    try {
      return await prisma.songSuggestion.count({
        where: { userId },
      });
    } catch (error) {
      console.error("Error en SongService.countSuggestions:", error);
      return 0;
    }
  }
}
