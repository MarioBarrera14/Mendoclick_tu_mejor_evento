"use client";

import {
  Hero,
  Itinerary,
  Location,
  Details,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
} from "@/components/templates/cumple_quince/neon-party";

// Importamos la data hardcodeada para la Demo
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface NeonPartyPageProps {
  dbConfig?: any;    // Datos de Prisma
  eventId?: string;  // ID del evento para música
  isDemo?: boolean;  // Switch Demo/Real
}

export default function NeonPartyPage({ dbConfig, eventId, isDemo = true }: NeonPartyPageProps) {
  
  // 1. Fuente de datos unificada
  const config = dbConfig || {
    eventName: localConfig.personal.nombre,
    heroImage: localConfig.imagenes.hero.neon,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.neon,
    videoUrl: localConfig.imagenes.videoUrl.neon,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    // Ubicación
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    // Listas e Itinerario
    itinerary: localConfig.itinerario,
    // Detalles (Dresscode / Regalo)
    dressCode: localConfig.dressCode.titulo,
    dressDescription: localConfig.dressCode.descripcion,
    cbu: localConfig.regalo.datosBancarios.cbu,
    alias: localConfig.regalo.datosBancarios.alias,
    bankName: localConfig.regalo.datosBancarios.banco,
    holderName: localConfig.regalo.datosBancarios.titular,
    confirmDate: localConfig.confirmacion.fechaLimite
  };

  const currentEventId = eventId || "demo-quince-neon";

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Envelope musicUrl={config.musicUrl || localConfig.imagenes.musicaUrl.neon}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />
        
        <Hero config={{
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          heroImage: config.heroImage || localConfig.imagenes.hero.neon 
        }} />
        
        <FotoCarousel 
          images={typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages)} 
          videoUrl={config.videoUrl || localConfig.imagenes.videoUrl.neon}
        />

        <Itinerary items={config.itinerary || []} />

        <Details config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <Location config={{
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink,
        }} />

        <MusicSuggestion eventId={currentEventId}/>    
        
        <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.neon,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />
        
        <Footer />
      </Envelope>
    </main>
  );
}