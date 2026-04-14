// ===========================================
// TIPOS DE INVITADOS
// ===========================================

export type GuestStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Guest {
  id: string;
  nombre: string;    // Actualizado para coincidir con el Schema
  cupos: number;
  confirmados: number; // Agregado según el nuevo Schema
  codigo: string;
  status: GuestStatus;
  dietary: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGuestInput {
  nombre: string;    // Actualizado
  cupos?: number;
  codigo: string;
  dietary?: string;
  userId: string;
}

export interface UpdateGuestInput {
  nombre?: string;   // Actualizado
  cupos?: number;
  confirmados?: number; // Agregado para permitir actualización de asistencia real
  status?: GuestStatus;
  dietary?: string;
}

export interface GuestConfirmation {
  codigo: string;
  status: GuestStatus;
  confirmados: number; // Agregado para la confirmación del invitado
  dietary?: string;
}

// Sugerencias de canciones
export interface SongSuggestion {
  id: string;
  tema1: string | null;
  tema2: string | null;
  tema3: string | null;
  guestName: string | null;
  userId: string;
  createdAt: Date;
}

export interface CreateSongSuggestionInput {
  tema1?: string;
  tema2?: string;
  tema3?: string;
  guestName?: string;
  userId: string;
}