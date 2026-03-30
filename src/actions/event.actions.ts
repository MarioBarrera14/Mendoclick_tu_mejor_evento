"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EventService, UserService } from "@/services";
import { revalidatePath } from "next/cache";
import type { UpdateEventDetailsInput, UpdateEventConfigInput } from "@/types";

// ===========================================
// ACCIONES DE EVENTOS
// ===========================================

/**
 * Obtiene la configuración del evento del usuario actual
 */
export async function getEventConfig() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    return await EventService.getConfigByUserEmail(session.user.email);
  } catch (error) {
    console.error("Error en getEventConfig:", error);
    return null;
  }
}

/**
 * Actualiza los detalles multimedia del evento
 */
export async function updateEventDetails(data: UpdateEventDetailsInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const result = await EventService.updateEventDetails(usuario.id, data);

    if (result.success) {
      revalidatePath("/admin/galeria");
      if (usuario.slug) {
        revalidatePath(`/invit/${usuario.slug}`);
      }
    }

    return result;
  } catch (error) {
    console.error("Error en updateEventDetails:", error);
    return { success: false, error: "Error al actualizar" };
  }
}

/**
 * Actualiza la configuración general del evento
 */
export async function updateEventConfig(data: UpdateEventConfigInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const result = await EventService.updateEventConfig(usuario.id, data);

    if (result.success) {
      revalidatePath("/admin/details");
      if (usuario.slug) {
        revalidatePath(`/invit/${usuario.slug}`);
      }
    }

    return result;
  } catch (error) {
    console.error("Error en updateEventConfig:", error);
    return { success: false, error: "Error al actualizar" };
  }
}
