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

import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface GraffitiPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GraffitiDemoPage({ dbConfig, eventId, isDemo = true }: GraffitiPageProps) {
  
  // 1. Elegimos la fuente de datos
  const rawConfig = dbConfig || {
    eventName: localConfig.personal.nombres,
    heroImage: localConfig.imagenes.hero.graffiti,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.graffiti,
    videoUrl: localConfig.imagenes.videoUrl.graffiti,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    churchName: localConfig.ubicacion.iglesiaNombre,
    churchAddress: localConfig.ubicacion.iglesiaDireccion,
    churchMapLink: localConfig.ubicacion.iglesiaMaps,
    itinerary: localConfig.itinerario,
    testigos: localConfig.testigos,
    dressCode: localConfig.dressCode.titulo,
    dressDescription: localConfig.dressCode.descripcion,
    cbu: localConfig.regalo.datosBancarios.cbu,
    alias: localConfig.regalo.datosBancarios.alias,
    bankName: localConfig.regalo.datosBancarios.banco,
    holderName: localConfig.regalo.datosBancarios.titular,
    confirmDate: localConfig.confirmacion.fechaLimite
  };

  // 2. SANITIZACIÓN: Si el campo es "" (string vacío), forzamos el uso del localConfig
  // Esto evita que src="" llegue a los componentes Image o img
  const safeConfig = {
    ...rawConfig,
    heroImage: (rawConfig.heroImage && rawConfig.heroImage !== "") ? rawConfig.heroImage : localConfig.imagenes.hero.graffiti,
    musicUrl: (rawConfig.musicUrl && rawConfig.musicUrl !== "") ? rawConfig.musicUrl : localConfig.imagenes.musicaUrl.graffiti,
    videoUrl: (rawConfig.videoUrl && rawConfig.videoUrl !== "") ? rawConfig.videoUrl : localConfig.imagenes.videoUrl.graffiti,
    // Podés agregar más campos si es necesario
  };

  const currentEventId = eventId || "demo-boda-graffiti";

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Usamos safeConfig en lugar de rawConfig */}
      <Envelope musicUrl={safeConfig.musicUrl}>
        
        <Navbar eventName={safeConfig.eventName} isDemo={isDemo}/>

        <Hero
          heroImage={safeConfig.heroImage}
          eventName={safeConfig.eventName}
          eventDate={safeConfig.eventDate}
        />

        <FotoCarousel
          images={typeof safeConfig.carruselImages === 'string' ? safeConfig.carruselImages : JSON.stringify(safeConfig.carruselImages)} 
          videoUrl={safeConfig.videoUrl} 
        />

        <EventDetails config={{
          eventDate: safeConfig.eventDate,
          eventTime: safeConfig.eventTime,
          venueName: safeConfig.venueName,
          venueAddress: safeConfig.venueAddress,
          mapLink: safeConfig.mapLink,
          churchName: safeConfig.churchName,
          churchAddress: safeConfig.churchAddress,
          churchMapLink: safeConfig.churchMapLink
        }} />

        <RSVP config={{
          heroImage: safeConfig.heroImage, // Aquí estaba el error del RSVP
          eventDate: safeConfig.eventDate,
          confirmDate: safeConfig.confirmDate || safeConfig.eventDate
        }} />
        
        <DetailModal config={{
          dressCode: safeConfig.dressCode,
          dressDescription: safeConfig.dressDescription,
          cbu: safeConfig.cbu,
          alias: safeConfig.alias,
          bankName: safeConfig.bankName,
          holderName: safeConfig.holderName
        }} />

        <Itinerary items={safeConfig.itinerary || []} />

        <Witnesses items={safeConfig.witnesses || safeConfig.testigos || []} />

        <MusicSuggestion eventId={currentEventId} />
        
        <Footer />
      </Envelope>
    </main>
  );
}