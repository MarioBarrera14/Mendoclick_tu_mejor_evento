import { prisma } from "@/lib/prisma";

export class WitnessService {
  /**
   * Obtiene los testigos a través de la configuración del evento del usuario
   */
  static async getByUserId(userId: string) {
    try {
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
        include: { witnesses: true },
      });
      return config?.witnesses || [];
    } catch (error) {
      console.error("Error en WitnessService.getByUserId:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos los testigos (Borra los anteriores y crea los nuevos)
   * Corregido para usar eventConfigId según tu Schema
   */
  static async syncWitnesses(userId: string, witnesses: any[]) {
    try {
      // 1. Primero necesitamos el ID de la configuración del evento
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
      });

      if (!config) {
        return { success: false, error: "No se encontró configuración de evento" };
      }

      const eventConfigId = config.id;

      // 2. Filtramos para no guardar filas vacías
      const cleanWitnesses = witnesses.filter(
        (w) => w.nombre && w.nombre.trim() !== ""
      );

      // 3. Ejecutamos la transacción
      await prisma.$transaction([
        // Borramos los testigos actuales de esa configuración
        prisma.witness.deleteMany({
          where: { eventConfigId },
        }),
        // Creamos los nuevos
        prisma.witness.createMany({
          data: cleanWitnesses.map((w) => ({
            nombre: w.nombre,
            rol: w.rol,
            imageUrl: w.imageUrl || "",
            eventConfigId: eventConfigId,
          })),
        }),
      ]);

      return { success: true };
    } catch (error) {
      console.error("Error en WitnessService.syncWitnesses:", error);
      return { success: false, error: "Error al sincronizar testigos" };
    }
  }
}