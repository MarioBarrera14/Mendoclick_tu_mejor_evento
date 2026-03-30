import { prisma } from "@/lib/prisma";
import type { EventConfigData, UpdateEventDetailsInput, UpdateEventConfigInput } from "@/types";

export class EventService {
  /**
   * Obtiene la configuración del evento por email del usuario
   */
  static async getConfigByUserEmail(email: string): Promise<EventConfigData | null> {
    try {
      const config = await prisma.eventConfig.findFirst({
        where: { user: { email } },
      });
      return config as EventConfigData | null;
    } catch (error) {
      console.error("Error en EventService.getConfigByUserEmail:", error);
      return null;
    }
  }

  /**
   * Obtiene la configuración del evento por slug
   */
  static async getConfigBySlug(slug: string): Promise<EventConfigData | null> {
    try {
      const config = await prisma.eventConfig.findFirst({
        where: { user: { slug } },
      });
      return config as EventConfigData | null;
    } catch (error) {
      console.error("Error en EventService.getConfigBySlug:", error);
      return null;
    }
  }

  /**
   * Obtiene la configuración del evento por userId
   */
  static async getConfigByUserId(userId: string): Promise<EventConfigData | null> {
    try {
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
      });
      return config as EventConfigData | null;
    } catch (error) {
      console.error("Error en EventService.getConfigByUserId:", error);
      return null;
    }
  }

  /**
   * Actualiza los detalles multimedia del evento
   */
  static async updateEventDetails(
    userId: string,
    input: UpdateEventDetailsInput
  ): Promise<{ success: boolean }> {
    try {
      await prisma.eventConfig.upsert({
        where: { userId },
        update: {
          heroImage: input.heroImage,
          videoUrl: input.videoUrl,
          musicUrl: input.musicUrl,
          carruselImages: input.carruselImages,
        },
        create: {
          userId,
          heroImage: input.heroImage || "",
          videoUrl: input.videoUrl || "",
          musicUrl: input.musicUrl || "",
          carruselImages: input.carruselImages || "[]",
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Error en EventService.updateEventDetails:", error);
      return { success: false };
    }
  }

  /**
   * Actualiza la configuración general del evento
   */
  static async updateEventConfig(
    userId: string,
    input: UpdateEventConfigInput
  ): Promise<{ success: boolean }> {
    try {
      await prisma.eventConfig.update({
        where: { userId },
        data: input,
      });

      return { success: true };
    } catch (error) {
      console.error("Error en EventService.updateEventConfig:", error);
      return { success: false };
    }
  }

  /**
   * Obtiene el usuario con su configuración de evento
   */
  static async getUserWithConfig(slug: string) {
    try {
      return await prisma.user.findUnique({
        where: { slug },
        include: { eventConfig: true },
      });
    } catch (error) {
      console.error("Error en EventService.getUserWithConfig:", error);
      return null;
    }
  }
}
