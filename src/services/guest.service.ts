import { prisma } from "@/lib/prisma";
import type { Guest, CreateGuestInput, UpdateGuestInput, GuestStatus } from "@/types";

export class GuestService {
  /**
   * Obtiene todos los invitados de un usuario
   */
  static async getGuestsByUserId(userId: string): Promise<Guest[]> {
    try {
      const guests = await prisma.guest.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return guests as unknown as Guest[];
    } catch (error) {
      console.error("Error en GuestService.getGuestsByUserId:", error);
      return [];
    }
  }

  /**
   * Obtiene los invitados por slug del usuario
   */
  static async getGuestsBySlug(slug: string): Promise<Guest[]> {
    try {
      const guests = await prisma.guest.findMany({
        where: { user: { slug } },
        orderBy: { createdAt: "desc" },
      });
      return guests as unknown as Guest[];
    } catch (error) {
      console.error("Error en GuestService.getGuestsBySlug:", error);
      return [];
    }
  }

  /**
   * Obtiene un invitado por su código
   */
  static async getGuestByCode(codigo: string): Promise<Guest | null> {
    try {
      const guest = await prisma.guest.findUnique({
        where: { codigo },
      });
      return guest as unknown as Guest | null;
    } catch (error) {
      console.error("Error en GuestService.getGuestByCode:", error);
      return null;
    }
  }

  /**
   * Crea un nuevo invitado
   */
  static async createGuest(input: CreateGuestInput): Promise<{ success: boolean; guest?: Guest; error?: string }> {
    try {
      // Verificar si el código ya existe
      const existing = await prisma.guest.findUnique({
        where: { codigo: input.codigo },
      });

      if (existing) {
        return { success: false, error: "El código ya está en uso." };
      }

      const guest = await prisma.guest.create({
        data: {
          nombre: input.nombre, // CAMBIADO: Antes era apellido
          cupos: input.cupos || 1,
          codigo: input.codigo,
          dietary: input.dietary,
          userId: input.userId,
        },
      });

      return { success: true, guest: guest as unknown as Guest };
    } catch (error) {
      console.error("Error en GuestService.createGuest:", error);
      return { success: false, error: "Error al crear el invitado." };
    }
  }

  /**
   * Actualiza un invitado
   */
  static async updateGuest(id: string, input: UpdateGuestInput): Promise<{ success: boolean }> {
    try {
      await prisma.guest.update({
        where: { id },
        data: input,
      });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.updateGuest:", error);
      return { success: false };
    }
  }

  /**
   * Actualiza el estado de un invitado por código (Confirmación del Invitado)
   */
static async updateGuestStatus(
    codigo: string,
    status: GuestStatus,
    confirmados: number,
    dietary?: string
  ): Promise<{ success: boolean }> {
    try {
      // Lógica extra: Si manda 0 confirmados, forzamos el estado a CANCELLED
      const finalStatus = confirmados === 0 ? "CANCELLED" : status;

      await prisma.guest.update({
        where: { codigo },
        data: { 
          status: finalStatus, // Usamos el estado final
          dietary,
          confirmados: Number(confirmados) || 0,
          checkIn: true // Marcamos que ya entró
        },
      });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.updateGuestStatus:", error);
      return { success: false };
    }
  }

  /**
   * Elimina un invitado
   */
  static async deleteGuest(id: string): Promise<{ success: boolean }> {
    try {
      await prisma.guest.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.deleteGuest:", error);
      return { success: false };
    }
  }

  /**
   * Cuenta los invitados por estado
   */
  static async countGuestsByStatus(userId: string): Promise<Record<GuestStatus, number>> {
    try {
      const counts = await prisma.guest.groupBy({
        by: ["status"],
        where: { userId },
        _count: { status: true },
      });

      const result: Record<GuestStatus, number> = {
        PENDING: 0,
        CONFIRMED: 0,
        CANCELLED: 0,
      };

      counts.forEach((c) => {
        result[c.status as GuestStatus] = c._count.status;
      });

      return result;
    } catch (error) {
      console.error("Error en GuestService.countGuestsByStatus:", error);
      return { PENDING: 0, CONFIRMED: 0, CANCELLED: 0 };
    }
  }

  /**
   * Cuenta el total de personas reales que confirmaron (Suma de campo confirmados)
   */
  static async countConfirmedCupos(userId: string): Promise<number> {
    try {
      const result = await prisma.guest.aggregate({
        where: { userId, status: "CONFIRMED" },
        _sum: { confirmados: true }, // CAMBIADO: Ahora sumamos la asistencia real
      });
      return result._sum.confirmados || 0;
    } catch (error) {
      console.error("Error en GuestService.countConfirmedCupos:", error);
      return 0;
    }
  }
}