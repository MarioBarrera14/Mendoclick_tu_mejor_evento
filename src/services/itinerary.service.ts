import { prisma } from "@/lib/prisma";

export class ItineraryService {
  /**
   * Obtiene los items de un usuario
   */
  static async getByUserId(userId: string) {
    return await prisma.itineraryItem.findMany({
      where: { eventConfig: { userId } },
      orderBy: { order: "asc" },
    });
  }

  /**
   * Crea un item individual
   */
  static async createItem(data: { time: string; title: string; order: number; eventConfigId: string }) {
    try {
      const item = await prisma.itineraryItem.create({ data });
      return { success: true, item };
    } catch (error) {
      return { success: false, error: "Error al crear item" };
    }
  }

  /**
   * Actualiza un item individual
   */
  static async updateItem(id: string, data: { time?: string; title?: string; order?: number }) {
    try {
      await prisma.itineraryItem.update({ where: { id }, data });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  /**
   * Elimina un item
   */
  static async deleteItem(id: string) {
    try {
      await prisma.itineraryItem.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}