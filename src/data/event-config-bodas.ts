// =====================================================
// INTERFACES SEPARADAS
// =====================================================

// Lo que comparten todas las fiestas
interface BaseConfig {
  fecha: { dia: number; mes: number; año: number; hora: string; mensaje: string; };
  ubicacion: {
    nombreLugar: string;
    subtituloLugar: string;
    direccion: string;
    hora: string;
    googleMapsUrl: string;
    iglesiaNombre?: string;
    iglesiaDireccion?: string;
    iglesiaMaps?: string;
  };
  itinerario: { id: string; time: string; title: string; icon: string; order: number; }[];
  dressCode: { titulo: string; descripcion: string; };
  regalo: {
    titulo: string;
    mensaje: string;
    datosBancarios: { titular: string; cbu: string; alias: string; banco: string; };
  };
  confirmacion: { fechaLimite: string; mensaje: string; formularioUrl: string; };
  canciones: { formularioUrl: string; };
  contacto: { whatsappNumero: string; whatsappMensaje: string; instagram?: string; };
  footer: { marca: string; descripcion: string; };
}

// Interfaz específica para Bodas (Novios)
export interface BodaConfig extends BaseConfig {
  personal: { nombres: string; titulo: string; subtitulo: string; };
  imagenes: {
    hero: { rock: string; graffiti: string; noir: string; };
    videoUrl: { rock: string; graffiti: string; noir: string; };
    musicaUrl: { rock: string; graffiti: string; noir: string; };
    carrusel: string[];
  };
  testigos: { id: string; nombre: string; rol: string; imageUrl: string; }[];
}

// Interfaz específica para 15 Años (Cumpleañera)
export interface QuinceConfig extends BaseConfig {
  personal: { nombre: string; titulo: string; subtitulo: string; };
  imagenes: {
    hero: { champagne: string; neon: string; graffiti: string; };
    videoUrl: { champagne: string; neon: string; graffiti: string; };
    musicaUrl: { champagne: string; neon: string; graffiti: string; };
    carrusel: string[];
  };
}

// =====================================================
// 1. DATA PARA BODAS (Novios)
// =====================================================
export const globalBodaConfig: BodaConfig = {
  personal: {
    nombres: "Juli & Mario",
    titulo: "¡NOS CASAMOS!",
    subtitulo: "Nuestra unión, nuestro inicio.",
  },
  fecha: { dia: 12, mes: 12, año: 2026, hora: "18:00", mensaje: "12 . 09 . 2026" },
  imagenes: {
    hero: {
      rock: "/img_boda/vintage.webp",
      graffiti: "/img_boda/grafiteros.webp",
      noir: "https://res.cloudinary.com/diqipcpuu/image/upload/v1776742920/bode_casado_atoxsc.jpg",
    },
    // URLs de Cloudinary para evitar el error 404 local
    videoUrl: { 
      rock: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777143428/Video_De_Pareja_Reci%C3%A9n_Casados_laidu1.mp4", 
      graffiti: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777143428/Video_De_Pareja_Reci%C3%A9n_Casados_laidu1.mp4", 
      noir: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777143428/Video_De_Pareja_Reci%C3%A9n_Casados_laidu1.mp4" 
    },
    musicaUrl: { rock: "/audio/queenrock.mp3", graffiti: "/audio/edsheran.mp3", noir: "/audio/samsmith.mp3" },
    carrusel: ["/img_boda/gallery-1.webp", "/img_boda/gallery-2.webp", "/img_boda/gallery-3.webp", "/img_boda/gallery-4.webp", "/img_boda/gallery-5.webp", "/img_boda/gallery-6.webp"]
  },
  ubicacion: {
    nombreLugar: "Salón de Eventos",
    subtituloLugar: "Mendoza, Argentina",
    direccion: "Calle Falsa 123, Chacras de Coria",
    hora: "18:00 HS",
    googleMapsUrl: "https://goo.gl/maps/ejemplo1",
    iglesiaNombre: "Parroquia Nuestra Señora",
    iglesiaDireccion: "Av. San Martín 456",
    iglesiaMaps: "https://goo.gl/maps/ejemplo2"
  },
  itinerario: [
    { id: "1", time: "21:00hs", title: "Recepción", icon: "GlassWater", order: 1 },
    { id: "2", time: "22:30hs", title: "Entrada", icon: "Star", order: 2 },
    { id: "3", time: "23:00hs", title: "Brindis", icon: "GlassWater", order: 3 },
    { id: "4", time: "23:30hs", title: "Cena", icon: "Utensils", order: 4 },
    { id: "5", time: "01:00hs", title: "Vals", icon: "Sparkles", order: 5 },
    { id: "6", time: "01:30hs", title: "Fiesta", icon: "PartyPopper", order: 6 },
    { id: "7", time: "03:30hs", title: "Candy Bar", icon: "Star", order: 7 },
    { id: "8", time: "05:00hs", title: "Souvenirs", icon: "Gift", order: 8 },
  ],
  testigos: [
    { id: "t1", nombre: "Mateo", rol: "Testigo Novio", imageUrl: "/img_boda/testigo1.webp" },
    { id: "t2", nombre: "Lucía", rol: "Testigo Novio", imageUrl: "/img_boda/testigo2.webp" },
    { id: "t3", nombre: "Elena", rol: "Testigo Novia", imageUrl: "/img_boda/testigo3.webp" },
    { id: "t4", nombre: "Marcos", rol: "Testigo Novia", imageUrl: "/img_boda/testigo4.webp" },
  ],
  dressCode: { titulo: "DRESS CODE", descripcion: "La vestimenta es **Elegante**." },
  regalo: {
    titulo: "REGALO",
    mensaje: "Tu presencia es nuestro mayor regalo.",
    datosBancarios: { titular: "Fanny y Rei", cbu: "0000000000000000000000", alias: "boda.fanny.rei", banco: "Santander" },
  },
  confirmacion: { fechaLimite: "12/08/2026", mensaje: "Confirmar antes del evento.", formularioUrl: "#" },
  canciones: { formularioUrl: "#" },
  contacto: { whatsappNumero: "+542610000000", whatsappMensaje: "Consultas Boda." },
  footer: { marca: "MendoClick", descripcion: "Recuerdos digitales." },
};

// =====================================================
// 2. DATA PARA 15 AÑOS (Cumpleañera)
// =====================================================
export const globalQuinceConfig: QuinceConfig = {
  personal: {
    nombre: "Luz Jazmín",
    titulo: "¡MIS XV!",
    subtitulo: "La noche que siempre soñé.",
  },
  fecha: { dia: 19, mes: 12, año: 2026, hora: "21:00", mensaje: "19 . 12 . 2026" },
  imagenes: {
    hero: {
      champagne: "/img_demo/8.webp",
      neon: "/img_demo/16.webp",
      graffiti: "/img_demo/14.webp",
    },
    // URLs de Cloudinary
    videoUrl: {
      champagne: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777142695/Video_Generado_Con_Movimiento_Natural_rix9ub.mp4", 
      neon: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777142695/Video_Generado_Con_Movimiento_Natural_rix9ub.mp4",
      graffiti: "https://res.cloudinary.com/diqipcpuu/video/upload/v1777142695/Video_Generado_Con_Movimiento_Natural_rix9ub.mp4",
    },
    musicaUrl: {
      champagne: "/audio/taylor.mp3",
      neon: "/audio/Pitbull x Play N Skillz Party of a Lifetime Lyric Video.mp3",
      graffiti: "/audio/edsheran.mp3",
    },
    carrusel: ["/img_demo/1.webp", "/img_demo/2.webp", "/img_demo/3.webp", "/img_demo/4.webp", "/img_demo/5.webp", "/img_demo/6.webp"]
  },
  ubicacion: {
    nombreLugar: "Howard Johnson",
    subtituloLugar: "Cariló, Argentina",
    direccion: "RP11 km 400",
    hora: "21:00 HS",
    googleMapsUrl: "https://goo.gl/maps/ejemplo15",
  },
  itinerario: [
    { id: "1", time: "21:00hs", title: "Recepción", icon: "GlassWater", order: 1 },
    { id: "2", time: "22:30hs", title: "Entrada", icon: "Star", order: 2 },
    { id: "3", time: "23:00hs", title: "Brindis", icon: "GlassWater", order: 3 },
    { id: "4", time: "23:30hs", title: "Cena", icon: "Utensils", order: 4 },
    { id: "5", time: "01:00hs", title: "Vals", icon: "Sparkles", order: 5 },
    { id: "6", time: "01:30hs", title: "Fiesta", icon: "PartyPopper", order: 6 },
    { id: "7", time: "03:30hs", title: "Candy Bar", icon: "Star", order: 7 },
    { id: "8", time: "05:00hs", title: "Souvenirs", icon: "Gift", order: 8 },
  ],
  dressCode: { titulo: "DRESS CODE", descripcion: "Elegante Sport." },
  regalo: {
    titulo: "REGALO",
    mensaje: "Mi mejor regalo es tu presencia.",
    datosBancarios: { titular: "Luz Jazmin", cbu: "1254875968554455223366", alias: "luz.jaz.xv", banco: "Mercado Pago" },
  },
  confirmacion: { fechaLimite: "10/11/2026", mensaje: "Confirmar asistencia.", formularioUrl: "#" },
  canciones: { formularioUrl: "#" },
  contacto: { whatsappNumero: "+542610000000", whatsappMensaje: "Consultas XV Luz." },
  footer: { marca: "MendoClick", descripcion: "Momentos inolvidables." },
};