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
    
    // 1. Normalización estricta del plan (Evita errores de minúsculas)
    const rawPlan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");
    const currentPlan = rawPlan.toUpperCase();

    // 2. Función de validación: Si el dato de la DB está vacío, usa el localConfig
    const getSafeData = (dbValue: any, fallback: any) => {
      if (dbValue === undefined || dbValue === null) return fallback;
      if (typeof dbValue === 'string' && dbValue.trim() === "") return fallback;
      if (Array.isArray(dbValue) && dbValue.length === 0) return fallback;
      return dbValue;
    };

    // 3. Procesamiento específico para el carrusel (JSON)
    let carruselFinal;
    const dbCarrusel = dbConfig?.carruselImages;
    
    // Si la DB tiene "", "[]", null o [], cargamos las fotos hardcodeadas de la demo
    if (!dbCarrusel || dbCarrusel === "" || dbCarrusel === "[]" || (Array.isArray(dbCarrusel) && dbCarrusel.length === 0)) {
      carruselFinal = JSON.stringify(localConfig.imagenes.carrusel);
    } else {
      carruselFinal = typeof dbCarrusel === 'string' ? dbCarrusel : JSON.stringify(dbCarrusel);
    }

    const base = {
      plan: currentPlan,
      eventName: getSafeData(dbConfig?.eventName, localConfig.personal.nombres),
      eventDate: getSafeData(dbConfig?.eventDate, eventDateDefault),
      eventTime: getSafeData(dbConfig?.eventTime, localConfig.fecha.hora),
      heroImage: getSafeData(dbConfig?.heroImage, localConfig.imagenes.hero.noir),
      musicUrl: getSafeData(dbConfig?.musicUrl, localConfig.imagenes.musicaUrl.noir),
      videoUrl: getSafeData(dbConfig?.videoUrl, localConfig.imagenes.videoUrl.noir),
      carruselImages: carruselFinal,
      venueName: getSafeData(dbConfig?.venueName, localConfig.ubicacion.nombreLugar),
      venueAddress: getSafeData(dbConfig?.venueAddress, localConfig.ubicacion.direccion),
      mapLink: getSafeData(dbConfig?.mapLink, localConfig.ubicacion.googleMapsUrl),
      churchName: getSafeData(dbConfig?.churchName, localConfig.ubicacion.iglesiaNombre),
      churchAddress: getSafeData(dbConfig?.churchAddress, localConfig.ubicacion.iglesiaDireccion),
      churchMapLink: getSafeData(dbConfig?.churchMapLink, localConfig.ubicacion.iglesiaMaps),
      itinerary: getSafeData(dbConfig?.itinerary, localConfig.itinerario),
      witnesses: getSafeData(dbConfig?.witnesses || dbConfig?.testigos, localConfig.testigos),
      dressCode: getSafeData(dbConfig?.dressCode, localConfig.dressCode.titulo),
      dressDescription: getSafeData(dbConfig?.dressDescription, localConfig.dressCode.descripcion),
      confirmDate: getSafeData(dbConfig?.confirmDate, dbConfig?.eventDate || eventDateDefault),
      confirmPhone: getSafeData(dbConfig?.confirmPhone, localConfig.personal.telefono),
      // Datos bancarios
      cbu: getSafeData(dbConfig?.cbu, localConfig.regalo.datosBancarios.cbu),
      alias: getSafeData(dbConfig?.alias, localConfig.regalo.datosBancarios.alias),
      bankName: getSafeData(dbConfig?.bankName, localConfig.regalo.datosBancarios.banco),
      holderName: getSafeData(dbConfig?.holderName, localConfig.regalo.datosBancarios.titular),
    };

    return base;
  }, [dbConfig]);

  const currentEventId = eventId || "demo-global-noir";
  
  // Verificamos el plan para mostrar u ocultar secciones
  const isPremiumOrDeluxe = config.plan === "PREMIUM" || config.plan === "DELUXE";

  const PageContent = (
    <>
      {/* El Navbar solo aparece si hay una configuración de base de datos activa */}
      {dbConfig && (
        <Navbar eventName={config.eventName} isDemo={isDemo} />
      )}

      <HeroSection 
        eventName={config.eventName} 
        eventDate={config.eventDate} 
        heroImage={config.heroImage}
      />
      
      <SeparadorEntrePaginas />

      {/* La Galería ahora siempre recibirá fotos (DB o Hardcodeadas) */}
      <PhotoGallerySection 
        config={{
          carruselImages: config.carruselImages,
          videoUrl: config.videoUrl
        }} 
        plan={config.plan}
      />

      <SeparadorEntrePaginas />
      
      {/* Secciones bloqueadas para plan Classic */}
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
      {/* El Envelope (Sobre con música) solo se activa si el plan lo permite */}
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