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
  
  const config = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    // Determinamos el nivel del plan de forma segura
    const currentPlan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    // Construcción de base segura (Fallback total)
    const base = {
      plan: currentPlan,
      eventName: dbConfig?.eventName || localConfig.personal.nombres,
      eventDate: dbConfig?.eventDate || eventDateDefault,
      eventTime: dbConfig?.eventTime || localConfig.fecha.hora,
      heroImage: dbConfig?.heroImage || localConfig.imagenes.hero.noir,
      musicUrl: dbConfig?.musicUrl || localConfig.imagenes.musicaUrl.noir,
      videoUrl: dbConfig?.videoUrl || localConfig.imagenes.videoUrl.noir,
      carruselImages: typeof dbConfig?.carruselImages === 'string' 
        ? dbConfig.carruselImages 
        : JSON.stringify(dbConfig?.carruselImages || localConfig.imagenes.carrusel),
      venueName: dbConfig?.venueName || localConfig.ubicacion.nombreLugar,
      venueAddress: dbConfig?.venueAddress || localConfig.ubicacion.direccion,
      mapLink: dbConfig?.mapLink || localConfig.ubicacion.googleMapsUrl,
      churchName: dbConfig?.churchName || localConfig.ubicacion.iglesiaNombre,
      churchAddress: dbConfig?.churchAddress || localConfig.ubicacion.iglesiaDireccion,
      churchMapLink: dbConfig?.churchMapLink || localConfig.ubicacion.iglesiaMaps,
      itinerary: dbConfig?.itinerary || localConfig.itinerario,
      witnesses: dbConfig?.witnesses || dbConfig?.testigos || localConfig.testigos,
      dressCode: dbConfig?.dressCode || localConfig.dressCode.titulo,
      dressDescription: dbConfig?.dressDescription || localConfig.dressCode.descripcion,
      confirmDate: dbConfig?.confirmDate || dbConfig?.eventDate || eventDateDefault,
      confirmPhone: dbConfig?.confirmPhone || localConfig.personal.telefono,
      // Datos bancarios
      cbu: dbConfig?.cbu || localConfig.regalo.datosBancarios.cbu,
      alias: dbConfig?.alias || localConfig.regalo.datosBancarios.alias,
      bankName: dbConfig?.bankName || localConfig.regalo.datosBancarios.banco,
      holderName: dbConfig?.holderName || localConfig.regalo.datosBancarios.titular,
    };

    return base;
  }, [dbConfig]);

  const currentEventId = eventId || "demo-global-noir";
  
  // Usamos el config generado de forma segura
  const isPremiumOrDeluxe = config.plan === "PREMIUM" || config.plan === "DELUXE";

  const PageContent = (
    <>
      {dbConfig && (
        <Navbar eventName={config.eventName} isDemo={isDemo} />
      )}

      <HeroSection 
        eventName={config.eventName} 
        eventDate={config.eventDate} 
        heroImage={config.heroImage}
      />
      
      <SeparadorEntrePaginas />

      <PhotoGallerySection 
        config={{
          carruselImages: config.carruselImages,
          videoUrl: config.videoUrl
        }} 
        plan={config.plan}
      />

      <SeparadorEntrePaginas />
      
      {isPremiumOrDeluxe && (
        <>
          <Itinerary items={config.itinerary} />
          <SeparadorEntrePaginas />
        </>
      )}
      
      <LocationsSection config={config} />
      
      <SeparadorEntrePaginas />
      
      {isPremiumOrDeluxe && (
        <>
          <Witnesses items={config.witnesses} />
          <SeparadorEntrePaginas />
        </>
      )}
      
      {isPremiumOrDeluxe && (
        <>
          <MusicSuggestion eventId={currentEventId} />
          <SeparadorEntrePaginas />
        </>
      )}

      <DetailModal config={config} />

      <SeparadorEntrePaginas />
      
      <RSVP config={{
        heroImage: config.heroImage,
        eventDate: config.eventDate,
        confirmDate: config.confirmDate,
        plan: config.plan,
        eventName: config.eventName,
        confirmPhone: config.confirmPhone
      }} />
      
      <SeparadorEntrePaginas />
      
      <Footer />
    </>
  );

  return (
    <main className={`${serifFont.variable} ${scriptFont.variable} font-elegante min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
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