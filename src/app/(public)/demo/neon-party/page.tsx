import {
  Hero,
  Itinerary,
  Location,
  Details,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
} from "@/components/templates/neon-party";
import { Metadata } from "next";

// Simulación de la respuesta de la base de datos
const dbDemo = {
  id: "demo-15",
  slug: "luz-jazmin-xv",
  nombre: "Luz Jazmin",
  tipoEvento: "XV Años",
  fecha: new Date("2026-12-19T19:00:00"),
  config: {
    heroImage: "/cumple.jpg", 
    
    // ============================================================
    // CORRECCIÓN DE RUTA DE VIDEO AQUÍ
    // Tu archivo está en: public\movie\esfe1.mp4
    // La ruta para Next.js es: "/movie/esfe1.mp4"
    // ============================================================
    heroVideo: "/movie/Video_de_Esferas_de_Espejos.mp4", 
    
    musicaUrl: "/audio/Pitbull x Play N Skillz Party of a Lifetime Lyric Video.mp3",
    personal: {
      titulo: "¡MIS XV!",
      subtitulo: "¡La fiesta del año!",
    },
    ubicacion: {
      lugar: "Howard Johnson",
      subtitulo: "By Wyndham Cariló",
      direccion: "RP11 km 400, Cariló",
      googleMaps: "https://goo.gl/maps/tu-link-real-a-howard-johnson", // Link real opcional
      hora: "19:00 HS"
    },
    regalo: {
      titular: "Luz Jazmin",
      cbu: "1254875968554455223366",
      alias: "luz.jaz.xv",
      banco: "Mercado Pago"
    },
    confirmacion: {
      fechaLimite: "20/08/2026",
      formUrl: "https://forms.gle/T7F4DHWv2kTZhitW6"
    },
    // Corrección del link de canciones para que no sea un placeholder
    cancionesUrl: "https://forms.gle/tu-form-de-canciones", 
     dressCode: "Elegante Sport",
    dressDescription: "El dress code de la fiesta es elegante sport.",
  }
};

export const metadata: Metadata = {
  title: `Neon Party - ${dbDemo.nombre} | MendoClick`,
  description: "Plantilla vibrante con colores neon y efectos brillantes",
};

export default async function NeonPartyDemoPage() {
  // Extraemos fecha y hora para el Countdown
  const eventDate = "2026-12-19";
  const eventTime = "19:00";

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* El sobre maneja la música y el inicio de la experiencia */}
      <Envelope musicUrl={dbDemo.config.musicaUrl}>
        
        <Navbar eventName={dbDemo.nombre} isDemo={true} />
        
        {/* HERO: Ahora con el video de fondo y la foto en estrella */}
        <Hero 
          eventName={dbDemo.nombre} 
          heroImage={dbDemo.config.heroImage} 
          heroVideo={dbDemo.config.heroVideo} 
        />
        
     

        {/* Carousel de fotos con el video adicional */}
        <FotoCarousel 
          images={JSON.stringify([
            "/img_demo/8.webp", 
            "/img_demo/5.webp", 
            "/img_demo/6.webp", 
            "/img_demo/7.webp"
          ])} 
          // Asegúrate que este video también exista en public\movie\
          videoUrl="/movie/Video_Generado_Con_Movimiento_Natural.mp4"
        />
<Itinerary/>
        <Details 
          dressCode={dbDemo.config.dressCode}
          dressDescription={dbDemo.config.dressDescription}
          alias={dbDemo.config.regalo.alias}
          cbu={dbDemo.config.regalo.cbu}
          bankName={dbDemo.config.regalo.banco}
          holderName={dbDemo.config.regalo.titular}
        />

        <Location 
          venueName={dbDemo.config.ubicacion.lugar}
          venueAddress={dbDemo.config.ubicacion.direccion}
          mapLink={dbDemo.config.ubicacion.googleMaps}
        />

        {/* Sugerencia de música */}
        <MusicSuggestion eventId={dbDemo.slug}/>    
        
        <RSVP />
        
        <Footer />
      </Envelope>
    </main>
  );
}