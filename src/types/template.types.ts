// ===========================================
// TIPOS DE TEMPLATES DE INVITACIÓN
// ===========================================

export type TemplateId = "NIGHT_LIGHTS" | "NEON_PARTY" | "GOLDEN_BDAY";

export interface TemplateDefinition {
  id: TemplateId;
  legacyId: string; // "DEMO1", "DEMO2", etc.
  name: string;
  description: string;
  previewImage: string;
  category: TemplateCategory;
  colors: TemplateColors;
}

export type TemplateCategory = "xv" | "cumpleanos" | "boda" | "bautismo" | "otro";

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Props comunes para componentes de templates
export interface TemplateHeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export interface TemplateCountdownProps {
  eventDate: string;
  eventTime: string;
}

export interface TemplateLocationProps {
  venueName: string;
  venueAddress: string;
  mapLink: string;
}

export interface TemplateDetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  alias?: string | null;
  cbu?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

export interface TemplateGalleryProps {
  images?: string | null;
  videoUrl?: string | null;
}

export interface TemplateRSVPProps {
  eventId?: string;
}

export interface TemplateMusicSuggestionProps {
  eventId: string;
}
