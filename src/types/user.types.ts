// ===========================================
// TIPOS DE USUARIO ACTUALIZADOS - MENDOCLICK
// ===========================================

export type UserRole = "ADMIN" | "USER";
// Definimos los planes exactamente como están en el ENUM de Prisma
export type PlanLevel = "CLASSIC" | "PREMIUM" | "DELUXE";

export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  role: UserRole;
  planLevel: PlanLevel; // <--- Agregado
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
  planLevel: PlanLevel; // <--- Agregado para que useSession() no de error
  slug: string;
  templateId: string;   // <--- Agregado para saber qué diseño usa
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
  phone: string;        // <--- Agregado para el WhatsApp del Plan Classic
  templateId: string;
  planLevel: string;    // <--- Agregado para capturar la opción del Manager
  masterCode: string;
}

export interface UpdateClientInput {
  nombre: string;
  email: string;
  slug: string;
  templateId: string;
  planLevel?: PlanLevel; // <--- Opcional por si necesitas hacer upgrade después
}

export interface UserWithEventConfig extends User {
  eventConfig: EventConfigData | null;
}

import type { EventConfigData } from "./event.types";