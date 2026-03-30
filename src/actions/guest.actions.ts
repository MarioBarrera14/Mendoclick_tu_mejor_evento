"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GuestService, UserService } from "@/services";
import { revalidatePath } from "next/cache";
import type { CreateGuestInput, UpdateGuestInput, GuestStatus } from "@/types";

// ===========================================
// ACCIONES DE INVITADOS
// ===========================================

/**
 * Obtiene los invitados del usuario actual
 */
export async function getGuests() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return [];

    return await GuestService.getGuestsByUserId(usuario.id);
  } catch (error) {
    console.error("Error en getGuests:", error);
    return [];
  }
}

/**
 * Crea un nuevo invitado
 */
export async function createGuest(data: Omit<CreateGuestInput, "userId">) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const result = await GuestService.createGuest({
      ...data,
      userId: usuario.id,
    });

    if (result.success) {
      revalidatePath("/admin/invitados");
    }

    return result;
  } catch (error) {
    console.error("Error en createGuest:", error);
    return { success: false, error: "Error al crear invitado" };
  }
}

/**
 * Actualiza un invitado
 */
export async function updateGuest(id: string, data: UpdateGuestInput) {
  try {
    const result = await GuestService.updateGuest(id, data);

    if (result.success) {
      revalidatePath("/admin/invitados");
    }

    return result;
  } catch (error) {
    console.error("Error en updateGuest:", error);
    return { success: false, error: "Error al actualizar invitado" };
  }
}

/**
 * Confirma asistencia de un invitado
 */
export async function confirmGuest(codigo: string, status: GuestStatus, dietary?: string) {
  try {
    const result = await GuestService.updateGuestStatus(codigo, status, dietary);

    if (result.success) {
      revalidatePath("/admin/invitados");
      revalidatePath("/admin");
    }

    return result;
  } catch (error) {
    console.error("Error en confirmGuest:", error);
    return { success: false, error: "Error al confirmar asistencia" };
  }
}

/**
 * Elimina un invitado
 */
export async function deleteGuest(id: string) {
  try {
    const result = await GuestService.deleteGuest(id);

    if (result.success) {
      revalidatePath("/admin/invitados");
    }

    return result;
  } catch (error) {
    console.error("Error en deleteGuest:", error);
    return { success: false, error: "Error al eliminar invitado" };
  }
}

/**
 * Obtiene el conteo de invitados por estado
 */
export async function getGuestStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return null;

    const counts = await GuestService.countGuestsByStatus(usuario.id);
    const confirmedCupos = await GuestService.countConfirmedCupos(usuario.id);

    return {
      ...counts,
      totalConfirmedCupos: confirmedCupos,
    };
  } catch (error) {
    console.error("Error en getGuestStats:", error);
    return null;
  }
}
