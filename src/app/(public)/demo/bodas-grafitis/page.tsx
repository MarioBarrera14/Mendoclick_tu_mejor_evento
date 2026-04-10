import {
  Hero,
  DetailModal,
  Itinerary,
  EventDetails,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
  Witnesses,
} from "@/components/templates/bodas-grafitis";
import { Metadata } from "next";

// Simulación de la respuesta de la base de datos (Hardcoded)
const dbDemo = {
  id: "demo-boda",
  slug: "Mi_boda",
  tipoEvento: "Nos Casamos",
  fecha: new Date("2027-12-19T19:00:00"),
  config: {
    heroImage: "/img_boda/bode_casado.jpg",
    musicaUrl: "/audio/Pitbull x Play N Skillz Party of a Lifetime Lyric Video.mp3", // Si tienes un audio de fondo
    personal: {
      titulo: "¡Nuestra Boda!",
      subtitulo: "¡La fiesta del año!",
    },
    ubicacion: {
      lugar: "Howard Johnson",
      subtitulo: "By Wyndham Cariló",
      direccion: "RP11 km 400, Cariló",
      googleMaps: "https://www.google.com/maps/place/Howard+Johnson+by+Wyndham+Carilo+Convention+Center/@-37.1511601,-56.923903,17z",
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
    cancionesUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeZa1Df3gKTLRivE71qCSI02a9Pa_UTQBnXu22pJMpo51nsOQ/viewform",
    dressCode: "Elegante Sport",
    dressDescription: "El dress code de la fiesta es elegante sport.",
  }
};

export const metadata: Metadata = {
  title: ` ${dbDemo.config.personal.titulo} | MendoClick`,
  description: "Plantilla Night Lights - Demo en vivo",
};

export default function NightLightsDemoPage() {
  // Formateo de fecha para el Countdown
  const eventDate = "2026-12-19";
  const eventTime = "19:00";

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Pasamos los datos hardcodeados a cada componente como si vinieran de DB */}
    {/*  <Envelope musicUrl={dbDemo.config.musicaUrl}>*/}
       <Navbar/>
        <Hero 
         
          heroImage={dbDemo.config.heroImage} 
        />


        {/* Carousel con placeholders si no hay fotos reales todavía */}
     <FotoCarousel 
 
  videoUrl="/movie/Video_Generado_Con_Movimiento_Natural.mp4"
/>
        <EventDetails    />
 
        <RSVP/>
        <DetailModal/>
        <Itinerary 
        />
<Witnesses/>
        {/* Usamos el link de canciones del form directamente */}
        <MusicSuggestion eventId={""}/>    
       
        
        <Footer />
     {/* </Envelope>*/}
    </main>
  );
}