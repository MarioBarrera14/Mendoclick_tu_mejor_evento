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

import { Permanent_Marker, Montserrat } from "next/font/google";
import { useMemo } from "react";
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

interface GoldenBdayPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GoldenBdayPage({ dbConfig, eventId, isDemo = false }: GoldenBdayPageProps) {
  
  // Blindaje total de datos con useMemo
  const config = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    if (dbConfig) {
      return {
        ...dbConfig,
        eventName: dbConfig.eventName || localConfig.personal.nombre,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.graffiti,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.graffiti,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.graffiti,
        carruselImages: typeof dbConfig.carruselImages === 'string' ? dbConfig.carruselImages : JSON.stringify(dbConfig.carruselImages || localConfig.imagenes.carrusel),
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        dressCode: dbConfig.dressCode || localConfig.dressCode.titulo,
        dressDescription: dbConfig.dressDescription || localConfig.dressCode.descripcion,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
      };
    }

    // Configuración para estado DEMO (dbConfig es null)
    return {
      eventName: localConfig.personal.nombre,
      heroImage: localConfig.imagenes.hero.graffiti,
      eventDate: eventDateDefault,
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
      confirmDate: localConfig.confirmacion.fechaLimite,
      cbu: localConfig.regalo.datosBancarios.cbu,
      alias: localConfig.regalo.datosBancarios.alias,
      bankName: localConfig.regalo.datosBancarios.banco,
      holderName: localConfig.regalo.datosBancarios.titular,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-quince-graffiti";

  return (
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      <Envelope musicUrl={config.musicUrl}>
        
        {/* REGLA DEFINITIVA: Navbar solo si NO es demo (dbConfig presente) */}
        {dbConfig && (
          <Navbar eventName={config.eventName} isDemo={isDemo} />
        )}

        <Hero config={config} />

        <FotoCarousel 
          images={config.carruselImages}
          videoUrl={config.videoUrl}
        />

        <EventDetails config={config} />

        {/* RSVP Protegido contra undefined */}
        <RSVP config={{
          heroImage: config.heroImage,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate
        }} />

        <DetailModal config={config} />

        <Itinerary items={config.itinerary || []} />

        <MusicSuggestion eventId={currentEventId} />

        <Footer />
      </Envelope>
    </main>
  );
}