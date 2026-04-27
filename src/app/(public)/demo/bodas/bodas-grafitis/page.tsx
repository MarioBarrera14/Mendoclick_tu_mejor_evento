"use client";

import {
  DetailModal,
  Envelope,
  EventDetails,
  Footer,
  FotoCarousel,
  Hero,
  Itinerary,
  MusicSuggestion,
  Navbar,
  RSVP,
  Witnesses,
} from "@/components/templates/bodas/bodas-grafitis";

import { Permanent_Marker, Montserrat } from "next/font/google";
import { useMemo } from "react";
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

interface GraffitiPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GraffitiDemoPage({ dbConfig, eventId, isDemo = false }: GraffitiPageProps) {
  
  // Lógica de Fallback Robusta (Blindaje de datos)
  const safeConfig = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    if (dbConfig) {
      return {
        ...dbConfig,
        eventName: dbConfig.eventName || localConfig.personal.nombres,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.graffiti,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.graffiti,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.graffiti,
        carruselImages: dbConfig.carruselImages || JSON.stringify(localConfig.imagenes.carrusel),
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        witnesses: dbConfig.witnesses || dbConfig.testigos || localConfig.testigos,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
        // Datos de ubicación para DetailModal / EventDetails
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
      };
    }

    // Estado DEMO (Cuando dbConfig es null)
    return {
      eventName: localConfig.personal.nombres,
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
      witnesses: localConfig.testigos,
      confirmDate: localConfig.confirmacion.fechaLimite,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-boda-graffiti";

  return (
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a]`}>
      <Envelope musicUrl={safeConfig.musicUrl}>
        
        {/* SOLUCIÓN NAVBAR: Solo aparece si existe dbConfig (Cliente real) */}
        {dbConfig && (
          <Navbar eventName={safeConfig.eventName} isDemo={isDemo}/>
        )}

        <Hero
          heroImage={safeConfig.heroImage}
          eventName={safeConfig.eventName}
          eventDate={safeConfig.eventDate}
        />

        <FotoCarousel 
          images={safeConfig.carruselImages} 
          videoUrl={safeConfig.videoUrl} 
        />

        <EventDetails config={safeConfig} />

        {/* RSVP Blindado: Ya no tirará error porque safeConfig siempre tiene confirmDate */}
        <RSVP config={safeConfig} />

        <DetailModal config={safeConfig} />

        <Itinerary items={safeConfig.itinerary || []} />

        <Witnesses items={safeConfig.witnesses || []} />

        <MusicSuggestion eventId={currentEventId} />

        <Footer />
      </Envelope>
    </main>
  );
}