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
} from "@/components/templates/bodas/estilo-rock"; // Importa desde el index de la carpeta estilo-rock

import { globalBodaConfig } from "@/data/event-config-bodas";

interface RetroVinylViewProps {
  dbConfig?: any;    // Datos de Prisma (opcional)
  eventId?: string;  // ID del evento para MusicSuggestion
  isDemo?: boolean;
}

export default function RetroVinylView({ dbConfig, eventId, isDemo = false }: RetroVinylViewProps) {
  
  // Lógica de "Fallback": Si dbConfig existe (cliente), lo usamos. 
  // Si no, usamos globalBodaConfig (demo).
  const config = dbConfig || {
    eventName: globalBodaConfig.personal.nombres,
    eventDate: `${globalBodaConfig.fecha.año}-${String(globalBodaConfig.fecha.mes).padStart(2, '0')}-${String(globalBodaConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: globalBodaConfig.fecha.hora,
    musicUrl: globalBodaConfig.imagenes.musicaUrl.rock,
    heroImage: globalBodaConfig.imagenes.hero.rock,
    videoUrl: globalBodaConfig.imagenes.videoUrl.rock,
    carruselImages: JSON.stringify(globalBodaConfig.imagenes.carrusel),
    itinerary: globalBodaConfig.itinerario,
    witnesses: globalBodaConfig.testigos,
    dressCode: globalBodaConfig.dressCode.titulo,
    dressDescription: globalBodaConfig.dressCode.descripcion,
    cbu: globalBodaConfig.regalo.datosBancarios.cbu,
    alias: globalBodaConfig.regalo.datosBancarios.alias,
    bankName: globalBodaConfig.regalo.datosBancarios.banco,
    holderName: globalBodaConfig.regalo.datosBancarios.titular,
    confirmDate: globalBodaConfig.confirmacion.fechaLimite
  };

  const currentEventId = eventId || "demo-boda-rock-global";

  return (
    <main className={`min-h-screen overflow-x-hidden font-serif ${isDemo ? 'bg-[#fdfcf0]' : 'bg-[#111]'}`}>
      <Envelope musicUrl={config.musicUrl || globalBodaConfig.imagenes.musicaUrl.rock}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />

        <Hero config={{
          heroImage: config.heroImage || globalBodaConfig.imagenes.hero.rock,
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
        }} />

        <FotoCarouselRetro
          images={config.carruselImages}
          videoUrl={config.videoUrl || globalBodaConfig.imagenes.videoUrl.rock}
        />

        <EventDetails config={config} />

        <Itinerary items={config.itinerary || []} />

        {(config.witnesses || config.testigos) && (
          <SeccionTestigos items={config.witnesses || config.testigos} />
        )}

        <WeddingDetailsSection config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <MusicSuggestion eventId={currentEventId} />

        <RSVP config={{
          heroImage: config.heroImage || globalBodaConfig.imagenes.hero.rock,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />

        <Footer />
      </Envelope>
    </main>
  );
}