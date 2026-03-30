// ===========================================
// TIPOS DE USUARIO
// ===========================================

export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  role: UserRole;
  slug: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  email: string;
  nombre: string;
  role: UserRole;
  slug: string;
}

export interface RegisterUserInput {
  nombre: string;
  email: string;
  password: string;
  masterCode: string;
}

export interface RegisterClientInput {
  email: string;
  password: string;
  slug: string;
  templateId: string;
  masterCode: string;
}

export interface UpdateClientInput {
  nombre: string;
  email: string;
  slug: string;
  templateId: string;
}

export interface UserWithEventConfig extends User {
  eventConfig: EventConfigData | null;
}

// Importamos EventConfigData para la relación
import type { EventConfigData } from "./event.types";
