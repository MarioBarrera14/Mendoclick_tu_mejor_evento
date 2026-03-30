// ===========================================
// TIPOS DE EVENTO Y CONFIGURACIÓN
// ===========================================

export interface EventConfigData {
  id: string;
  userId: string;

  // Diseño y Multimedia
  heroImage: string | null;
  videoUrl: string | null;
  musicUrl: string | null;
  carruselImages: string | null;

  // Datos Principales
  eventName: string;
  eventDate: string;
  eventTime: string;

  // Ubicación
  venueName: string;
  venueAddress: string;
  mapLink: string;

  // Detalles y Regalos
  dressCode: string;
  dressDescription: string;
  cbu: string;
  alias: string;
  bankName: string;
  holderName: string;

  updatedAt: Date;
}

export interface UpdateEventDetailsInput {
  heroImage?: string;
  videoUrl?: string;
  musicUrl?: string;
  carruselImages?: string;
}

export interface UpdateEventConfigInput {
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  mapLink?: string;
  dressCode?: string;
  dressDescription?: string;
  cbu?: string;
  alias?: string;
  bankName?: string;
  holderName?: string;
}

// Configuración local para demos (event-config.ts legacy)
export interface LocalEventConfig {
  personal: {
    nombre: string;
    titulo: string;
    subtitulo: string;
  };
  fecha: {
    dia: number;
    mes: number;
    año: number;
    hora: string;
    mensaje: string;
  };
  imagenes: {
    hero: string;
    decoracion?: string;
  };
  ubicacion: {
    nombreLugar: string;
    subtituloLugar: string;
    direccion: string;
    hora: string;
    googleMapsUrl: string;
  };
  dressCode: {
    titulo: string;
    descripcion: string;
  };
  regalo: {
    titulo: string;
    mensaje: string;
    datosBancarios: {
      titular: string;
      cbu: string;
      alias: string;
      banco: string;
    };
  };
  confirmacion: {
    fechaLimite: string;
    mensaje: string;
    formularioUrl: string;
  };
  canciones: {
    formularioUrl: string;
  };
  contacto: {
    whatsappNumero: string;
    whatsappMensaje: string;
    instagram?: string;
  };
  footer: {
    marca: string;
    descripcion: string;
  };
  colores?: {
    primario: string;
    secundario: string;
    acento: string;
    fondo: string;
    texto: string;
  };
}
