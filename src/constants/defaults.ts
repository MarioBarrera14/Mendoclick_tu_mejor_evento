// ===========================================
// VALORES POR DEFECTO
// ===========================================

// Configuración por defecto para nuevos eventos
export const DEFAULT_EVENT_CONFIG = {
  eventName: "Mi Gran Evento",
  eventDate: "2026-12-19",
  eventTime: "21:00",
  venueName: "Nombre del Salón",
  venueAddress: "Dirección a confirmar",
  mapLink: "",
  dressCode: "Elegante Sport",
  dressDescription: "Tu presencia es lo más importante",
  cbu: "",
  alias: "",
  bankName: "",
  holderName: "",
  heroImage: "",
  videoUrl: "",
  musicUrl: "",
  carruselImages: "[]",
} as const;

// Configuración del sistema
export const SYSTEM_CONFIG = {
  MASTER_CODE: "MENDO_2026_PRO",
  DEFAULT_TEMPLATE_ID: "DEMO1",
  MAX_GUESTS_PER_EVENT: 500,
  MAX_CAROUSEL_IMAGES: 10,
  MAX_FILE_SIZE_MB: 5,
} as const;

// Mensajes de estado
export const GUEST_STATUS_LABELS = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
} as const;

// Categorías de templates
export const TEMPLATE_CATEGORIES = {
  xv: "XV Años",
  cumpleanos: "Cumpleaños",
  boda: "Boda",
  bautismo: "Bautismo",
  otro: "Otro",
} as const;

// Configuración de Cloudinary
export const CLOUDINARY_CONFIG = {
  FOLDER: "mendoclick",
  ALLOWED_FORMATS: ["jpg", "jpeg", "png", "webp", "gif"],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;
