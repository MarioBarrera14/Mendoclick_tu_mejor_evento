"use client";

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

// Importamos la data hardcodeada para cuando funcione como Demo
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface GoldenNoirPageProps {
  dbConfig?: any;    // Datos de la base de datos (Prisma)
  eventId?: string;  // ID del evento para la música
  isDemo?: boolean;  // Si es true, usa datos locales; si es false, usa dbConfig
}

export default function GoldenNoirPage({ dbConfig, eventId, isDemo = true }: GoldenNoirPageProps) {
  
  // 1. Unificamos la fuente de datos
  const config = dbConfig || {
    eventName: localConfig.personal.nombres,
    heroImage: localConfig.imagenes.hero.noir,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.noir,
    videoUrl: localConfig.imagenes.videoUrl.noir,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    // Ubicaciones
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    churchName: localConfig.ubicacion.iglesiaNombre,
    churchAddress: localConfig.ubicacion.iglesiaDireccion,
    churchMapLink: localConfig.ubicacion.iglesiaMaps,
    // Listas
    itinerary: localConfig.itinerario,
    witnesses: localConfig.testigos,
    // Regalos y Dress Code
    dressCode: localConfig.dressCode.titulo,
    dressDescription: localConfig.dressCode.descripcion,
    cbu: localConfig.regalo.datosBancarios.cbu,
    alias: localConfig.regalo.datosBancarios.alias,
    bankName: localConfig.regalo.datosBancarios.banco,
    holderName: localConfig.regalo.datosBancarios.titular,
    confirmDate: localConfig.confirmacion.fechaLimite
  };

  const currentEventId = eventId || "demo-global-noir";

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Envelope musicUrl={config.musicUrl || localConfig.imagenes.musicaUrl.noir}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />

        <HeroSection 
          eventName={config.eventName} 
          eventDate={config.eventDate} 
          heroImage={config.heroImage || localConfig.imagenes.hero.noir}
        />
        
        <SeparadorEntrePaginas />

        <PhotoGallerySection config={{
          carruselImages: typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages),
          videoUrl: config.videoUrl || localConfig.imagenes.videoUrl.noir
        }} />

        <SeparadorEntrePaginas />
        
        <Itinerary items={config.itinerary || []} />
        
        <SeparadorEntrePaginas />
        
        <LocationsSection config={{
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink,
          churchName: config.churchName,
          churchAddress: config.churchAddress,
          churchMapLink: config.churchMapLink
        }} />
        
        <SeparadorEntrePaginas />
        
        <Witnesses items={config.witnesses || config.testigos || []} />
        
        <SeparadorEntrePaginas />
        
        <MusicSuggestion eventId={currentEventId} />

        <SeparadorEntrePaginas />

        <DetailModal config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <SeparadorEntrePaginas />
        
        <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.noir,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />
        
        <SeparadorEntrePaginas />
        
        <Footer />
      </Envelope>
    </main>
  );
}