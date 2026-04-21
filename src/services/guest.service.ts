import { prisma } from "@/lib/prisma";
import type { Guest, CreateGuestInput, UpdateGuestInput, GuestStatus } from "@/types";

export class GuestService {
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

  static async createGuest(input: CreateGuestInput & { mesa?: string }): Promise<{ success: boolean; guest?: Guest; error?: string }> {
    try {
      const existing = await prisma.guest.findUnique({
        where: { codigo: input.codigo },
      });

      if (existing) {
        return { success: false, error: "El código ya está en uso." };
      }

      const guest = await prisma.guest.create({
        data: {
          nombre: input.nombre,
          cupos: input.cupos || 1,
          codigo: input.codigo,
          dietary: input.dietary,
          userId: input.userId,
          mesa: input.mesa || "A Designar", // AGREGADO
        },
      });

      return { success: true, guest: guest as unknown as Guest };
    } catch (error) {
      console.error("Error en GuestService.createGuest:", error);
      return { success: false, error: "Error al crear el invitado." };
    }
  }

  static async updateGuest(id: string, input: UpdateGuestInput): Promise<{ success: boolean }> {
    try {
      await prisma.guest.update({
        where: { id },
        data: input, // El objeto input ya debería traer 'mesa' desde el front
      });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.updateGuest:", error);
      return { success: false };
    }
  }

  static async updateGuestStatus(
    codigo: string,
    status: GuestStatus,
    confirmados: number,
    dietary?: string
  ): Promise<{ success: boolean }> {
    try {
      const finalStatus = confirmados === 0 ? "CANCELLED" : status;

      await prisma.guest.update({
        where: { codigo },
        data: { 
          status: finalStatus,
          dietary,
          confirmados: Number(confirmados) || 0,
          // Aquí podrías agregar checkIn: true si usas ese campo
        },
      });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.updateGuestStatus:", error);
      return { success: false };
    }
  }

  static async deleteGuest(id: string): Promise<{ success: boolean }> {
    try {
      await prisma.guest.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      console.error("Error en GuestService.deleteGuest:", error);
      return { success: false };
    }
  }

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

  static async countConfirmedCupos(userId: string): Promise<number> {
    try {
      const result = await prisma.guest.aggregate({
        where: { userId, status: "CONFIRMED" },
        _sum: { confirmados: true },
      });
      return result._sum.confirmados || 0;
    } catch (error) {
      console.error("Error en GuestService.countConfirmedCupos:", error);
      return 0;
    }
  }
}