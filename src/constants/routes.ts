// ===========================================
// RUTAS DE LA APLICACIÓN
// ===========================================

export const ROUTES = {
  // Públicas
  HOME: "/",
  INVITATION: (slug: string) => `/invit/${slug}`,

  // Demos
  DEMO: {
    NIGHT_LIGHTS: "/demo/night-lights",
    NEON_PARTY: "/demo/neon-party",
    GOLDEN_BDAY: "/demo/golden-bday",
  },

  // Autenticación
  AUTH: {
    LOGIN: "/users/loginManager",
    REGISTER: "/users/registerManager",
    LOGOUT: "/api/auth/signout",
  },

  // Dashboard del Cliente
  ADMIN: {
    HOME: "/admin",
    INVITADOS: "/admin/invitados",
    GALERIA: "/admin/galeria",
    DETALLES: "/admin/details",
    SUGERIDOS: "/admin/sugeridos",
    CONTADOR: "/admin/count",
  },

  // Panel del Manager
  MANAGER: {
    DASHBOARD: "/manager/dashboard",
    CLIENTES: "/manager/clientes",
    NUEVO: "/manager/nuevo",
  },

  // API
  API: {
    AUTH: "/api/auth",
    GUESTS: "/api/guests",
    EVENTS: "/api/events",
    GALLERY: "/api/gallery",
    SONGS: "/api/songs",
    UPLOAD: "/api/upload",
  },
} as const;

// Rutas protegidas por rol
export const PROTECTED_ROUTES = {
  ADMIN: ["/admin"],
  USER: ["/manager"],
} as const;

// Rutas públicas (no requieren auth)
export const PUBLIC_ROUTES = ["/", "/invit", "/demo", "/users/loginManager", "/users/registerManager"] as const;
