// =====================================================
// INTERFAZ DEL EVENTO - EL "MOLDE" DE TUS DATOS
// =====================================================

export interface EventConfig {
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
  
  // SECCIÓN DE CANCIONES
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

  // COLORES PERSONALIZABLES PARA CADA PLANTILLA
  colores?: {
    primario: string;
    secundario: string;
    acento: string;
    fondo: string;
    texto: string;
  };
}
export const bodaTemplateConfig: EventConfig = {
  personal: {
    nombre: "Fanny & Rei", // El Hero usará el & para poner el corazón ♥
    titulo: "¡NOS CASAMOS!",
    subtitulo: "Nuestra unión, nuestro inicio.",
  },

  fecha: {
    dia: 12,
    mes: 9,
    año: 2026,
    hora: "18:00",
    mensaje: "12 . 09 . 2026",
  },

  imagenes: {
    hero: "/img_boda/bode_casados.jpg",
  },

  ubicacion: {
    nombreLugar: "Salón de Eventos",
    subtituloLugar: "Mendoza, Argentina",
    direccion: "Calle Falsa 123, Chacras de Coria",
    hora: "18:00 HS",
    googleMapsUrl: "https://maps.google.com",
  },

  dressCode: {
    titulo: "DRESS CODE",
    descripcion: "La vestimenta para la ocasión es **Elegante**.",
  },

  regalo: {
    titulo: "REGALO",
    mensaje: "Tu presencia es nuestro mayor regalo. Si deseas colaborar con nuestra luna de miel:",
    datosBancarios: {
      titular: "Fanny y Rei",
      cbu: "0000000000000000000000",
      alias: "boda.fanny.rei",
      banco: "Santander",
    },
  },

  confirmacion: {
    fechaLimite: "12/08/2026",
    mensaje: "Por favor, confirmen su asistencia antes de la fecha límite.",
    formularioUrl: "https://forms.gle/tu-link-aqui",
  },

  canciones: {
    formularioUrl: "https://forms.gle/link-canciones",
  },

  contacto: {
    whatsappNumero: "+542610000000",
    whatsappMensaje: "¡Hola! Consultas sobre la boda de Fanny y Rei.",
  },

  footer: {
    marca: "MendoClick",
    descripcion: "Creamos recuerdos digitales.",
  },

  colores: {
    primario: "#94a994", // Verde salvia (muy tendencia en bodas)
    secundario: "#ffffff",
    acento: "#d4a574",
    fondo: "#f4f4f4",
    texto: "#333333",
  },
};