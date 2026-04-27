"use client";

import {
  Hero,
  Itinerary,
  EventDetails,
  RSVP,
  Footer,
  Envelope,
  FotoCarouselRetro,
  MusicSuggestion,
  Navbar,
  SeccionTestigos,
  WeddingDetailsSection,
} from "@/components/templates/bodas/estilo-rock"; 

import { globalBodaConfig } from "@/data/event-config-bodas";
import { useMemo } from "react";

interface RetroVinylViewProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function RetroVinylView({ dbConfig, eventId, isDemo = false }: RetroVinylViewProps) {
  
  // Lógica de Fallback Unificada
  const config = useMemo(() => {
    // Si existe dbConfig (Cliente real), combinamos sus datos con los fallbacks
    if (dbConfig) {
      const eventDate = dbConfig.eventDate || `${globalBodaConfig.fecha.año}-${String(globalBodaConfig.fecha.mes).padStart(2, '0')}-${String(globalBodaConfig.fecha.dia).padStart(2, '0')}`;
      
      return {
        ...dbConfig,
        eventName: dbConfig.eventName || globalBodaConfig.personal.nombres,
        eventDate: eventDate,
        eventTime: dbConfig.eventTime || globalBodaConfig.fecha.hora,
        heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.rock,
        musicUrl: dbConfig.musicUrl || globalBodaConfig.imagenes.musicaUrl.rock,
        videoUrl: dbConfig.videoUrl || globalBodaConfig.imagenes.videoUrl.rock,
        carruselImages: dbConfig.carruselImages || [],
        itinerary: dbConfig.itinerary || [],
        witnesses: dbConfig.witnesses || [],
        confirmDate: dbConfig.confirmDate || eventDate, // Evita error en RSVP
      };
    }

    // Si NO existe dbConfig (Demo pura /app/demo/...), usamos TODO lo global
    return {
      eventName: globalBodaConfig.personal.nombres,
      eventDate: `${globalBodaConfig.fecha.año}-${String(globalBodaConfig.fecha.mes).padStart(2, '0')}-${String(globalBodaConfig.fecha.dia).padStart(2, '0')}`,
      eventTime: globalBodaConfig.fecha.hora,
      musicUrl: globalBodaConfig.imagenes.musicaUrl.rock,
      heroImage: globalBodaConfig.imagenes.hero.rock,
      videoUrl: globalBodaConfig.imagenes.videoUrl.rock,
      carruselImages: globalBodaConfig.imagenes.carrusel || [],
      itinerary: globalBodaConfig.itinerario,
      witnesses: globalBodaConfig.testigos,
      confirmDate: globalBodaConfig.confirmacion.fechaLimite
    };
  }, [dbConfig]);

  return (
    <main className={`min-h-screen overflow-x-hidden font-sans ${!dbConfig ? 'bg-[#fdfcf0]' : 'bg-[#111]'}`}>
      <Envelope musicUrl={config.musicUrl}>
        
        {/* Solo mostramos Navbar si hay dbConfig (cliente real) */}
        {dbConfig && (
          <Navbar eventName={config.eventName} isDemo={isDemo} />
        )}

        <Hero config={{
          heroImage: config.heroImage,
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
        }} />

        <FotoCarouselRetro
          images={config.carruselImages}
          videoUrl={config.videoUrl}
        />

        <EventDetails config={config} />
        <Itinerary items={config.itinerary} />

        {config.witnesses && config.witnesses.length > 0 && (
          <SeccionTestigos items={config.witnesses} />
        )}

        <WeddingDetailsSection config={config} />
        
        <MusicSuggestion eventId={eventId || "demo-boda"} />

        {/* Fix RSVP: Ahora config siempre tiene heroImage, eventDate y confirmDate */}
        <RSVP config={{
          heroImage: config.heroImage,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate
        }} />

        <Footer />
      </Envelope>
    </main>
  );
}