"use server";

import { UserService } from "@/services";
import { revalidatePath } from "next/cache";
import type { RegisterUserInput, RegisterClientInput, UpdateClientInput } from "@/types";

// ===========================================
// ACCIONES DE AUTENTICACIÓN Y USUARIOS
// ===========================================

/**
 * Registra un nuevo administrador
 */
export async function registerUser(data: RegisterUserInput) {
  const result = await UserService.registerAdmin(data);
  return result;
}

/**
 * Registra un nuevo cliente
 */
export async function registerClient(data: RegisterClientInput) {
  const result = await UserService.registerClient(data);

  if (result.success) {
    revalidatePath("/manager/clientes");
  }

  return result;
}

/**
 * Obtiene todos los clientes
 */
export async function getClients() {
  return await UserService.getClients();
}

/**
 * Actualiza un cliente
 */
export async function updateClientAction(id: string, data: UpdateClientInput) {
  const result = await UserService.updateClient(id, data);

  if (result.success) {
    revalidatePath("/manager/clientes");
  }

  return result;
}

/**
 * Elimina un cliente
 */
export async function deleteClientAction(id: string) {
  const result = await UserService.deleteClient(id);

  if (result.success) {
    revalidatePath("/manager/clientes");
  }

  return result;
}
