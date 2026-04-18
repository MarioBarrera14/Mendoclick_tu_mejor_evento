// =====================================================
// CONFIGURACIÓN DEL EVENTO - EDITA AQUÍ TU INFORMACIÓN
// =====================================================

export interface EventConfig {
  // ... (todas las interfaces que ya tienes se mantienen igual)
  personal: { nombre: string; titulo: string; subtitulo: string; };
  fecha: { dia: number; mes: number; año: number; hora: string; mensaje: string; };
  imagenes: { hero: string; decoracion?: string; };
  ubicacion: { nombreLugar: string; subtituloLugar: string; direccion: string; hora: string; googleMapsUrl: string; };
  dressCode: { titulo: string; descripcion: string; };
  regalo: { titulo: string; mensaje: string; datosBancarios: { titular: string; cbu: string; alias: string; banco: string; }; };
  confirmacion: { fechaLimite: string; mensaje: string; formularioUrl: string; };
  
  // 1. AGREGAMOS ESTO A LA INTERFAZ
  canciones: {
    formularioUrl: string;
  };

  contacto: { whatsappNumero: string; whatsappMensaje: string; instagram?: string; };
  footer: { marca: string; descripcion: string; };
  colores?: { primario: string; secundario: string; acento: string; fondo: string; texto: string; };
}

// =====================================================
// DATOS DEL EVENTO - PERSONALIZA TODO AQUÍ
// =====================================================

export const eventConfig: EventConfig = {
  personal: {
    nombre: "Luz Jazmin",
    titulo: "¡MIS XV!",
    subtitulo: "¡La fiesta del año!",
  },

  fecha: {
    dia: 19,
    mes: 12,
    año: 2026,
    hora: "19:00",
    mensaje: "19 DE DICIEMBRE DE 2026",
  },

  imagenes: {
    hero: "/cumple.webp",
  },

  ubicacion: {
    nombreLugar: "Howard Johnson",
    subtituloLugar: "By Wyndham Cariló",
    direccion: "RP11 km 400, Cariló",
    hora: "19:00 HS",
    googleMapsUrl: "https://www.google.com/maps/place/Howard+Johnson+by+Wyndham+Carilo+Convention+Center/@-37.1511601,-56.923903,17z",
  },

  dressCode: {
    titulo: "DRESS CODE",
    descripcion: "El dress code de la fiesta es **elegante sport**.",
  },

  regalo: {
    titulo: "REGALO",
    mensaje: "**¡El mejor regalo es tu presencia!**\nPero si deseas hacerme un regalo, te brindo mis datos bancarios:",
    datosBancarios: {
      titular: "Luz Jazmin",
      cbu: "1254875968554455223366",
      alias: "delfi.mis.xv",
      banco: "Banco Nación",
    },
  },

  confirmacion: {
    fechaLimite: "20/08/2026",
    mensaje: "Te pido que completes este formulario antes del 20/08/2026.",
    formularioUrl: "https://forms.gle/T7F4DHWv2kTZhitW6",
  },

  // 2. AGREGAMOS ESTO A LOS DATOS (Pega aquí la URL de tu formulario de canciones)
  canciones: {
    formularioUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeZa1Df3gKTLRivE71qCSI02a9Pa_UTQBnXu22pJMpo51nsOQ/viewform", 
  },

  contacto: {
    whatsappNumero: "+5492236693694",
    whatsappMensaje: "¡Hola! Estuve viendo la invitación de los XV y quiero más información.",
    instagram: "",
  },

  footer: {
    marca: "MendoClick",
    descripcion: "Invitaciones digitales Web\nTodos los derechos reservados.",
  },

  colores: {
    primario: "#1a1a1a",
    secundario: "#2d2d2d",
    acento: "#d4a574",
    fondo: "#0a0a0a",
    texto: "#ffffff",
  },
};