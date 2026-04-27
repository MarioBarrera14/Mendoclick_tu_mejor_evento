"use client";

import { Playfair_Display, Great_Vibes } from "next/font/google";
import { useMemo } from "react";
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

const serifFont = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-elegante', 
});

const scriptFont = Great_Vibes({ 
  subsets: ["latin"], 
  weight: "400",
  variable: '--font-script', 
});

import {
  HeroSection,
  Itinerary,
  DetailModal,
  Footer,
  RSVP,
  PhotoGallerySection,
  MusicSuggestion,
  Navbar,
  LocationsSection,
  Witnesses,
  Envelope,
  SeparadorEntrePaginas,
} from "@/components/templates/bodas/golden_noir";

interface GoldenNoirPageProps {
  dbConfig?: any;    
  eventId?: string;  
  isDemo?: boolean;  
}

export default function GoldenNoirPage({ dbConfig, eventId, isDemo = false }: GoldenNoirPageProps) {
  
  // Lógica de Fallback Robusta para evitar errores de undefined
  const config = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    if (dbConfig) {
      return {
        ...dbConfig,
        eventName: dbConfig.eventName || localConfig.personal.nombres,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.noir,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.noir,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.noir,
        carruselImages: typeof dbConfig.carruselImages === 'string' ? dbConfig.carruselImages : JSON.stringify(dbConfig.carruselImages || localConfig.imagenes.carrusel),
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
        churchName: dbConfig.churchName || localConfig.ubicacion.iglesiaNombre,
        churchAddress: dbConfig.churchAddress || localConfig.ubicacion.iglesiaDireccion,
        churchMapLink: dbConfig.churchMapLink || localConfig.ubicacion.iglesiaMaps,
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        witnesses: dbConfig.witnesses || dbConfig.testigos || localConfig.testigos,
        dressCode: dbConfig.dressCode || localConfig.dressCode.titulo,
        dressDescription: dbConfig.dressDescription || localConfig.dressCode.descripcion,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
      };
    }

    // Configuración para estado DEMO (dbConfig es null)
    return {
      eventName: localConfig.personal.nombres,
      heroImage: localConfig.imagenes.hero.noir,
      eventDate: eventDateDefault,
      eventTime: localConfig.fecha.hora,
      musicUrl: localConfig.imagenes.musicaUrl.noir,
      videoUrl: localConfig.imagenes.videoUrl.noir,
      carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
      venueName: localConfig.ubicacion.nombreLugar,
      venueAddress: localConfig.ubicacion.direccion,
      mapLink: localConfig.ubicacion.googleMapsUrl,
      churchName: localConfig.ubicacion.iglesiaNombre,
      churchAddress: localConfig.ubicacion.iglesiaDireccion,
      churchMapLink: localConfig.ubicacion.iglesiaMaps,
      itinerary: localConfig.itinerario,
      witnesses: localConfig.testigos,
      dressCode: localConfig.dressCode.titulo,
      dressDescription: localConfig.dressCode.descripcion,
      confirmDate: localConfig.confirmacion.fechaLimite,
      cbu: localConfig.regalo.datosBancarios.cbu,
      alias: localConfig.regalo.datosBancarios.alias,
      bankName: localConfig.regalo.datosBancarios.banco,
      holderName: localConfig.regalo.datosBancarios.titular,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-global-noir";

  return (
    <main className={`${serifFont.variable} ${scriptFont.variable} font-elegante min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      <Envelope musicUrl={config.musicUrl}>
        
        {/* REGLA DE ORO: Solo Navbar si hay configuración de base de datos */}
        {dbConfig && (
          <Navbar eventName={config.eventName} isDemo={isDemo} />
        )}

        <HeroSection 
          eventName={config.eventName} 
          eventDate={config.eventDate} 
          heroImage={config.heroImage}
        />
        
        <SeparadorEntrePaginas />

        <PhotoGallerySection config={{
          carruselImages: config.carruselImages,
          videoUrl: config.videoUrl
        }} />

        <SeparadorEntrePaginas />
        
        <Itinerary items={config.itinerary || []} />
        
        <SeparadorEntrePaginas />
        
        <LocationsSection config={config} />
        
        <SeparadorEntrePaginas />
        
        <Witnesses items={config.witnesses || []} />
        
        <SeparadorEntrePaginas />
        
        <MusicSuggestion eventId={currentEventId} />

        <SeparadorEntrePaginas />

        <DetailModal config={config} />

        <SeparadorEntrePaginas />
        
        <RSVP config={{
          heroImage: config.heroImage,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate
        }} />
        
        <SeparadorEntrePaginas />
        
        <Footer />
      </Envelope>
    </main>
  );
}