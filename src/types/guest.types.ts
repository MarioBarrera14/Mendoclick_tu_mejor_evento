// ===========================================
// TIPOS DE INVITADOS
// ===========================================

export type GuestStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Guest {
  id: string;
  apellido: string;
  cupos: number;
  codigo: string;
  status: GuestStatus;
  dietary: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGuestInput {
  apellido: string;
  cupos?: number;
  codigo: string;
  dietary?: string;
  userId: string;
}

export interface UpdateGuestInput {
  apellido?: string;
  cupos?: number;
  status?: GuestStatus;
  dietary?: string;
}

export interface GuestConfirmation {
  codigo: string;
  status: GuestStatus;
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
