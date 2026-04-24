"use client";

import {
  Hero,
  Location,
  Details,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
  Itinerary,
} from "@/components/templates/cumple_quince/Champagne";

// 1. IMPORTACIÓN DE FUENTES (Asegúrate de que coincidan con tailwind.config)
import { Playfair_Display, Great_Vibes, Montserrat, Cormorant_Garamond } from "next/font/google";

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant", // Esta es la de Luz Jazmín
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface ChampagnePageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function ChampagnePage({ dbConfig, eventId, isDemo = true }: ChampagnePageProps) {
  
  const config = dbConfig || {
    eventName: localConfig.personal.nombre,
    heroImage: localConfig.imagenes.hero.champagne,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.champagne,
    videoUrl: localConfig.imagenes.videoUrl.champagne,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    itinerary: localConfig.itinerario,
    dressCode: localConfig.dressCode.titulo,
    dressDescription: localConfig.dressCode.descripcion,
    cbu: localConfig.regalo.datosBancarios.cbu,
    alias: localConfig.regalo.datosBancarios.alias,
    bankName: localConfig.regalo.datosBancarios.banco,
    holderName: localConfig.regalo.datosBancarios.titular,
    confirmDate: localConfig.confirmacion.fechaLimite
  };

  const currentEventId = eventId || "demo-quince-champagne";

  return (
    /* APLICACIÓN DE VARIABLES DE FUENTE */
    <main className={`${serifFont.variable} ${scriptFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      
      <Envelope musicUrl={config.musicUrl}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />
        
        <Hero config={{
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          heroImage: config.heroImage
        }} />

        <FotoCarousel 
          images={typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages)} 
          videoUrl={config.videoUrl}
        />

        <Itinerary items={config.itinerary || []} />

        <Details config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <RSVP config={{
          heroImage: config.heroImage,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }}/>

        <Location config={{
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink,
          eventDate: config.eventDate,
          eventTime: config.eventTime
        }} />

        <MusicSuggestion eventId={currentEventId} />

        <Footer />
      </Envelope>
    </main>
  );
}