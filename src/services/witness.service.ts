import { prisma } from "@/lib/prisma";

export class WitnessService {
  /**
   * Obtiene los testigos de un usuario
   */
  static async getByUserId(userId: string) {
    return await prisma.witness.findMany({
      where: { userId },
    });
  }

  /**
   * Sincroniza todos los testigos (Update o Create)
   */
  static async syncWitnesses(userId: string, witnesses: any[]) {
    try {
      // Usamos una transacción para procesar los 4 al mismo tiempo
      const operations = witnesses.map((w) =>
        prisma.witness.upsert({
          where: {
            // Necesitas un índice único compuesto en tu schema: [userId, rol]
            userId_rol: { userId, rol: w.rol },
          },
          update: {
            nombre: w.nombre,
            imageUrl: w.imageUrl,
          },
          create: {
            nombre: w.nombre,
            rol: w.rol,
            imageUrl: w.imageUrl,
            userId: userId,
          },
        })
      );

      await prisma.$transaction(operations);
      return { success: true };
    } catch (error) {
      console.error("Error en WitnessService:", error);
      return { success: false, error: "Error al sincronizar testigos" };
    }
  }
}