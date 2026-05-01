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

import { useMemo } from "react";
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface NeonPartyPageProps {
  dbConfig?: any;    // Datos de Prisma
  eventId?: string;  // ID del evento para música
  isDemo?: boolean;  // Switch Demo/Real
}

export default function NeonPartyPage({ dbConfig, eventId, isDemo = false }: NeonPartyPageProps) {
  
  const config = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    // Determinamos el plan: Prioridad DB, si es demo (sin dbConfig) es DELUXE
    const plan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    if (dbConfig) {
      return {
        ...dbConfig,
        plan, 
        eventName: dbConfig.eventName || localConfig.personal.nombre,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.neon,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.neon,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.neon,
        carruselImages: typeof dbConfig.carruselImages === 'string' ? dbConfig.carruselImages : JSON.stringify(dbConfig.carruselImages || localConfig.imagenes.carrusel),
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        dressCode: dbConfig.dressCode || localConfig.dressCode.titulo,
        dressDescription: dbConfig.dressDescription || localConfig.dressCode.descripcion,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
        confirmPhone: dbConfig.confirmPhone || "549261000000",
      };
    }

    return {
      plan: "DELUXE",
      eventName: localConfig.personal.nombre,
      heroImage: localConfig.imagenes.hero.neon,
      eventDate: eventDateDefault,
      eventTime: localConfig.fecha.hora,
      musicUrl: localConfig.imagenes.musicaUrl.neon,
      videoUrl: localConfig.imagenes.videoUrl.neon,
      carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
      venueName: localConfig.ubicacion.nombreLugar,
      venueAddress: localConfig.ubicacion.direccion,
      mapLink: localConfig.ubicacion.googleMapsUrl,
      itinerary: localConfig.itinerario,
      dressCode: localConfig.dressCode.titulo,
      dressDescription: localConfig.dressCode.descripcion,
      confirmDate: localConfig.confirmacion.fechaLimite,
      confirmPhone: "549261000000",
      cbu: localConfig.regalo.datosBancarios.cbu,
      alias: localConfig.regalo.datosBancarios.alias,
      bankName: localConfig.regalo.datosBancarios.banco,
      holderName: localConfig.regalo.datosBancarios.titular,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-quince-neon";
  const isClassic = config.plan === "CLASSIC";

  const PageContent = (
    <>
      {/* Navbar: Solo visible en producción real */}
      {dbConfig && !isDemo && (
        <Navbar eventName={config.eventName} isDemo={isDemo}/>
      )}
      
      <Hero config={config} />
      
      {/* FOTOCAROUSEL: Visible en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <FotoCarousel 
          images={config.carruselImages} 
          videoUrl={config.videoUrl}
         
        />
      )}

      {/* ITINERARIO: Visible en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <Itinerary items={config.itinerary || []} />
      )}

      <Details config={config} />

      <Location config={config} />

      {/* MÚSICA: Visible en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <MusicSuggestion eventId={currentEventId}/>    
      )}
      
      {/* RSVP: Configurado para WhatsApp (Classic) o Validación (Premium/Deluxe) */}
      <RSVP config={{
        heroImage: config.heroImage,
        eventDate: config.eventDate,
        confirmDate: config.confirmDate,
        eventName: config.eventName,
        confirmPhone: config.confirmPhone,
        plan: config.plan
      }} />
      
      <Footer />
    </>
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* El sobre (Envelope) se omite solo en CLASSIC real (no demo) */}
      {isClassic && !isDemo ? (
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