// ===========================================
// DEFINICIÓN DE TEMPLATES DISPONIBLES
// ===========================================

import type { TemplateDefinition } from "@/types";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "NIGHT_LIGHTS",
    legacyId: "DEMO1",
    name: "Night Lights",
    description: "Diseño elegante y sofisticado con tonos oscuros e iluminación ambiental",
    previewImage: "/Demo1.webp",
    category: "xv",
    colors: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      accent: "#d4a574",
      background: "#0a0a0a",
      text: "#ffffff",
    },
  },
  {
    id: "NEON_PARTY",
    legacyId: "DEMO2",
    name: "Neon Party",
    description: "Estilo vibrante y moderno con colores neón y efectos brillantes",
    previewImage: "/Demos2.webp",
    category: "cumpleanos",
    colors: {
      primary: "#ff00ff",
      secondary: "#00ffff",
      accent: "#ffff00",
      background: "#0a0a0a",
      text: "#ffffff",
    },
  },
  {
    id: "GOLDEN_BDAY",
    legacyId: "DEMO3",
    name: "Golden B-Day",
    description: "Elegancia dorada con detalles premium para ocasiones especiales",
    previewImage: "/Demo3.webp",
    category: "cumpleanos",
    colors: {
      primary: "#d4af37",
      secondary: "#ffd700",
      accent: "#b8860b",
      background: "#1a1a1a",
      text: "#ffffff",
    },
  },
];

// Mapeo de legacy IDs a nuevos IDs
export const TEMPLATE_LEGACY_MAP: Record<string, string> = {
  DEMO1: "NIGHT_LIGHTS",
  DEMO2: "NEON_PARTY",
  DEMO3: "GOLDEN_BDAY",
};

// Helper para obtener template por ID
export function getTemplateById(id: string): TemplateDefinition | undefined {
  const normalizedId = TEMPLATE_LEGACY_MAP[id] || id;
  return TEMPLATES.find((t) => t.id === normalizedId || t.legacyId === id);
}

// Helper para obtener template por legacy ID
export function getTemplateByLegacyId(legacyId: string): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.legacyId === legacyId);
}
