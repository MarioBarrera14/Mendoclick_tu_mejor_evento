"use client";

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
} from "@/components/templates/cumple_quince/golden-grafitis";

// 1. IMPORTACIÓN DE FUENTES URBANAS
import { Permanent_Marker, Montserrat } from "next/font/google";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface GoldenBdayPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GoldenBdayPage({ dbConfig, eventId, isDemo = true }: GoldenBdayPageProps) {
  
  const config = dbConfig || {
    eventName: localConfig.personal.nombre,
    heroImage: localConfig.imagenes.hero.graffiti,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.graffiti,
    videoUrl: localConfig.imagenes.videoUrl.graffiti,
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

  const currentEventId = eventId || "demo-quince-graffiti";

  return (
    /* 2. INYECCIÓN DE VARIABLES CSS EN EL MAIN */
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      <Envelope musicUrl={config.musicUrl || localConfig.imagenes.musicaUrl.graffiti}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />

        <Hero config={{
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          heroImage: config.heroImage || localConfig.imagenes.hero.graffiti
        }} />

        <FotoCarousel 
          images={typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages)}
          videoUrl={config.videoUrl || localConfig.imagenes.videoUrl.graffiti}
        />
               <EventDetails config={{
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink
        }} />
   <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.graffiti,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />
 

        <DetailModal config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <Itinerary items={config.itinerary || []} />

        <MusicSuggestion eventId={currentEventId} />

     
        
        <Footer />
      </Envelope>
    </main>
  );
}