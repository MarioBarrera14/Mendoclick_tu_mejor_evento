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

// Importamos la data hardcodeada de Quince
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface GoldenBdayPageProps {
  dbConfig?: any;    // Datos de Prisma
  eventId?: string;  // ID del evento para la música
  isDemo?: boolean;  // Si es true, usa datos locales; si es false, usa dbConfig
}

export default function GoldenBdayPage({ dbConfig, eventId, isDemo = true }: GoldenBdayPageProps) {
  
  // 1. Unificamos la fuente de datos (Fallback a localConfig)
  const config = dbConfig || {
    eventName: localConfig.personal.nombre,
    heroImage: localConfig.imagenes.hero.graffiti,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.graffiti,
    videoUrl: localConfig.imagenes.videoUrl.graffiti,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    // Ubicación
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    // Listas
    itinerary: localConfig.itinerario,
    // Detalles
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
    <main className="min-h-screen bg-[#0a0a0a]">
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

        <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.graffiti,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />
        
        <Footer />
      </Envelope>
    </main>
  );
}