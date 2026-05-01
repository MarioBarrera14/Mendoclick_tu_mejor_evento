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
  
  const config = useMemo(() => {
    // 1. Fecha por defecto formateada
    const eventDateDefault = `${globalBodaConfig.fecha.año}-${String(globalBodaConfig.fecha.mes).padStart(2, '0')}-${String(globalBodaConfig.fecha.dia).padStart(2, '0')}`;
    
    // 2. Determinación de Plan (Prioriza dbConfig, si es demo asume DELUXE)
    const currentPlan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    if (dbConfig) {
      const eventDate = dbConfig.eventDate || eventDateDefault;
      
      return {
        ...dbConfig,
        plan: currentPlan,
        eventName: dbConfig.eventName || globalBodaConfig.personal.nombres,
        eventDate: eventDate,
        eventTime: dbConfig.eventTime || globalBodaConfig.fecha.hora,
        heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.rock,
        musicUrl: dbConfig.musicUrl || globalBodaConfig.imagenes.musicaUrl.rock,
        videoUrl: dbConfig.videoUrl || globalBodaConfig.imagenes.videoUrl.rock,
        
        // --- FALLBACKS DE CONTENIDO ---
        carruselImages: (dbConfig.carruselImages && dbConfig.carruselImages.length > 0) 
          ? dbConfig.carruselImages 
          : globalBodaConfig.imagenes.carrusel,
          
        itinerary: (dbConfig.itinerary && dbConfig.itinerary.length > 0) 
          ? dbConfig.itinerary 
          : globalBodaConfig.itinerario,
          
        witnesses: (dbConfig.witnesses && dbConfig.witnesses.length > 0) 
          ? dbConfig.witnesses 
          : globalBodaConfig.testigos,

        // --- UBICACIONES (CEREMONIA Y SALÓN) ---
        // Se asegura de traer ambos datos hardcodeados si no vienen de la DB
        venueName: dbConfig.venueName || globalBodaConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || globalBodaConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || globalBodaConfig.ubicacion.googleMapsUrl,
        
        churchName: dbConfig.churchName || globalBodaConfig.ubicacion.iglesiaNombre,
        churchAddress: dbConfig.churchAddress || globalBodaConfig.ubicacion.iglesiaDireccion,
        churchMapLink: dbConfig.churchMapLink || globalBodaConfig.ubicacion.iglesiaMaps,
          
        confirmDate: dbConfig.confirmDate || eventDate,
        confirmPhone: dbConfig.confirmPhone || globalBodaConfig.personal.telefono,
      };
    }

    // Estado DEMO puro (Usa todo lo hardcodeado)
    return {
      plan: "DELUXE",
      eventName: globalBodaConfig.personal.nombres,
      eventDate: eventDateDefault,
      eventTime: globalBodaConfig.fecha.hora,
      musicUrl: globalBodaConfig.imagenes.musicaUrl.rock,
      heroImage: globalBodaConfig.imagenes.hero.rock,
      videoUrl: globalBodaConfig.imagenes.videoUrl.rock,
      carruselImages: globalBodaConfig.imagenes.carrusel || [],
      itinerary: globalBodaConfig.itinerario,
      witnesses: globalBodaConfig.testigos,
      // Ubicaciones completas
      venueName: globalBodaConfig.ubicacion.nombreLugar,
      venueAddress: globalBodaConfig.ubicacion.direccion,
      mapLink: globalBodaConfig.ubicacion.googleMapsUrl,
      churchName: globalBodaConfig.ubicacion.iglesiaNombre,
      churchAddress: globalBodaConfig.ubicacion.iglesiaDireccion,
      churchMapLink: globalBodaConfig.ubicacion.iglesiaMaps,
      confirmDate: globalBodaConfig.confirmacion.fechaLimite,
      confirmPhone: globalBodaConfig.personal.telefono,
    };
  }, [dbConfig]);

  const plan = config.plan;
  const isPremiumOrDeluxe = plan === "PREMIUM" || plan === "DELUXE";

  const PageContent = (
    <>
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
  plan={plan} // <--- TE FALTA ESTA LÍNEA
/>
      

      {isPremiumOrDeluxe && (
        <Itinerary items={config.itinerary} />
      )}

      {isPremiumOrDeluxe && config.witnesses && config.witnesses.length > 0 && (
        <SeccionTestigos items={config.witnesses} />
      )}

      <WeddingDetailsSection config={config} />
      {/* Aquí EventDetails ya recibe el config con iglesia y salón */}
      <EventDetails config={config} />
      {isPremiumOrDeluxe && (
        <MusicSuggestion eventId={eventId || "demo-boda"} />
      )}

      <RSVP config={{
        heroImage: config.heroImage,
        eventDate: config.eventDate,
        confirmDate: config.confirmDate,
        plan: config.plan,
        eventName: config.eventName,
        confirmPhone: config.confirmPhone
      }} />

      <Footer />
    </>
  );

  return (
    <main className={`min-h-screen overflow-x-hidden font-sans ${!dbConfig ? 'bg-[#fdfcf0]' : 'bg-[#111]'}`}>
      {!isPremiumOrDeluxe ? (
        <div className="animate-in fade-in duration-1000">
          {PageContent}
        </div>
      ) : (
        <Envelope musicUrl={config.musicUrl}>
          {PageContent}
        </Envelope>
      )}
    </main>
  );
}