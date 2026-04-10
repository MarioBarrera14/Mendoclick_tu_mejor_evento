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
} from "@/components/templates/golden-bday";
import { Metadata } from "next";

// Simulación de la respuesta de la base de datos (Hardcoded)
const dbDemo = {
  id: "demo-15",
  slug: "luz-jazmin-xv",
  nombre: "Luz Jazmin",
  tipoEvento: "XV Años",
  fecha: new Date("2026-12-19T19:00:00"),
  config: {
    heroImage: "/cumple.jpg",
    musicaUrl: "/audio/Pitbull x Play N Skillz Party of a Lifetime Lyric Video.mp3", // Si tienes un audio de fondo
    personal: {
      titulo: "¡MIS XV!",
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

// Metadata para la demo
export const metadata: Metadata = {
  title: "Golden B-Day - Demo | MendoClick",
  description: "Plantilla elegante con detalles dorados para ocasiones especiales",
};

export default async function GoldenBdayDemoPage() {
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
