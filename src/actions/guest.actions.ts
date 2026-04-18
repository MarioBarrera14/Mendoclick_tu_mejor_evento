"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GuestService, UserService } from "@/services";
import { revalidatePath } from "next/cache";
import type { CreateGuestInput, UpdateGuestInput, GuestStatus } from "@/types";

export async function getGuests() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];
    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return [];
    return await GuestService.getGuestsByUserId(usuario.id);
  } catch (error) {
    return [];
  }
}

export async function createGuest(data: Omit<CreateGuestInput, "userId">) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };
    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return { success: false, error: "Usuario no encontrado" };

    const result = await GuestService.createGuest({ ...data, userId: usuario.id });
    if (result.success) revalidatePath("/admin/invitados");
    return result;
  } catch (error) {
    return { success: false, error: "Error al crear invitado" };
  }
}

export async function updateGuest(id: string, data: UpdateGuestInput) {
  try {
    const result = await GuestService.updateGuest(id, data);
    if (result.success) revalidatePath("/admin/invitados");
    return result;
  } catch (error) {
    return { success: false, error: "Error al actualizar invitado" };
  }
}

/**
 * CONFIRMACIÓN DEL INVITADO
 * Corregido: ahora envía 'confirmados' al Service
 */
export async function confirmGuest(codigo: string, status: GuestStatus, confirmados: number, dietary?: string) {
  try {
    // El orden debe ser exacto al Service: codigo, status, confirmados, dietary
    const result = await GuestService.updateGuestStatus(
      codigo, 
      status, 
      Number(confirmados) || 0, 
      dietary || ""
    );

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

export async function deleteGuest(id: string) {
  try {
    const result = await GuestService.deleteGuest(id);
    if (result.success) revalidatePath("/admin/invitados");
    return result;
  } catch (error) {
    return { success: false, error: "Error al eliminar invitado" };
  }
}

export async function getGuestStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return null;

    const counts = await GuestService.countGuestsByStatus(usuario.id);
    const confirmedCupos = await GuestService.countConfirmedCupos(usuario.id);

    return { ...counts, totalConfirmedCupos: confirmedCupos };
  } catch (error) {
    return null;
  }
}