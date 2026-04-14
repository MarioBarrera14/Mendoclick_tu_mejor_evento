"use client";

import {
  Hero,
  Location,
  Details,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
  Itinerary,
} from "@/components/templates/cumple_quince/Champagne";

// Importamos la data hardcodeada de Quince
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface ChampagnePageProps {
  dbConfig?: any;    // Datos de Prisma
  eventId?: string;  // ID del evento para la música
  isDemo?: boolean;  // Si es true, usa datos locales (Demo)
}

export default function ChampagnePage({ dbConfig, eventId, isDemo = true }: ChampagnePageProps) {
  
  // 1. Mapeo de datos: Detectamos si es Cliente o Demo
  // Nota: Para 15 años usamos localConfig.personal.nombre (singular)
  const config = dbConfig || {
    eventName: localConfig.personal.nombre,
    heroImage: localConfig.imagenes.hero.champagne,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.champagne,
    videoUrl: localConfig.imagenes.videoUrl.champagne,
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

  const currentEventId = eventId || "demo-quince-champagne";

  return (
    <main className="min-h-screen bg-white">
      <Envelope musicUrl={config.musicUrl || localConfig.imagenes.musicaUrl.champagne}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />
        
        <Hero config={{
          eventName: config.eventName,
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          heroImage: config.heroImage || localConfig.imagenes.hero.champagne
        }} />

        <FotoCarousel 
          images={typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages)} 
          videoUrl={config.videoUrl || localConfig.imagenes.videoUrl.champagne}
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

        <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.champagne,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }}/>

        <Location config={{
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink,
          eventDate: config.eventDate,
          eventTime: config.eventTime
        }} />

        <MusicSuggestion eventId={currentEventId} />

        <Footer />
      </Envelope>
    </main>
  );
}