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

import { Great_Vibes, Montserrat, Cormorant_Garamond } from "next/font/google";
import { useMemo } from "react";
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

interface ChampagnePageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function ChampagnePage({ dbConfig, eventId, isDemo = false }: ChampagnePageProps) {
  
  const config = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    // Extraemos el plan. Si no hay dbConfig, asumimos DELUXE para la demo.
    const plan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    if (dbConfig) {
      return {
        ...dbConfig,
        plan, // Guardamos el plan en la config
        eventName: dbConfig.eventName || localConfig.personal.nombre,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.champagne,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.champagne,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.champagne,
        carruselImages: typeof dbConfig.carruselImages === 'string' ? dbConfig.carruselImages : JSON.stringify(dbConfig.carruselImages || localConfig.imagenes.carrusel),
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        dressCode: dbConfig.dressCode || localConfig.dressCode.titulo,
        dressDescription: dbConfig.dressDescription || localConfig.dressCode.descripcion,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
      };
    }

    return {
      plan: "DELUXE",
      eventName: localConfig.personal.nombre,
      heroImage: localConfig.imagenes.hero.champagne,
      eventDate: eventDateDefault,
      eventTime: localConfig.fecha.hora,
      musicUrl: localConfig.imagenes.musicaUrl.champagne,
      videoUrl: localConfig.imagenes.videoUrl.champagne,
      carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
      venueName: localConfig.ubicacion.nombreLugar,
      venueAddress: localConfig.ubicacion.direccion,
      mapLink: localConfig.ubicacion.googleMapsUrl,
      itinerary: localConfig.itinerario,
      dressCode: localConfig.dressCode.titulo,
      dressDescription: localConfig.dressCode.descripcion,
      confirmDate: localConfig.confirmacion.fechaLimite,
      cbu: localConfig.regalo.datosBancarios.cbu,
      alias: localConfig.regalo.datosBancarios.alias,
      bankName: localConfig.regalo.datosBancarios.banco,
      holderName: localConfig.regalo.datosBancarios.titular,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-quince-champagne";
  const isClassic = config.plan === "CLASSIC";

  const PageContent = (
    <>
      {dbConfig && !isDemo && (
        <Navbar eventName={config.eventName} isDemo={isDemo} />
      )}
      
      <Hero config={config} />

      {/* GALERÍA Y VIDEO: Solo Premium/Deluxe */}
      {!isClassic && (
        <FotoCarousel 
          images={config.carruselImages} 
          videoUrl={config.videoUrl}
        />
      )}

      {/* ITINERARIO: Solo Premium/Deluxe */}
      {!isClassic && (
        <Itinerary items={config.itinerary || []} />
      )}

      <Details config={config} />

   {/* RSVP: Ahora recibe plan, nombre del evento y teléfono para WhatsApp */}
      <RSVP config={{
        heroImage: config.heroImage,
        eventDate: config.eventDate,
        confirmDate: config.confirmDate,
        eventName: config.eventName,    // Faltaba para el mensaje de WA
        confirmPhone: config.confirmPhone, // Faltaba el número de destino
        plan: config.plan               // Faltaba para activar la lógica CLASSIC
      }}/>

      <Location config={config} />

      {/* MÚSICA: Solo Premium/Deluxe */}
      {!isClassic && (
        <MusicSuggestion eventId={currentEventId} />
      )}

      <Footer />
    </>
  );

  return (
    <main className={`${serifFont.variable} ${scriptFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      {/* 
        Si es CLASSIC, renderizamos directo. 
        Si es superior, envolvemos en Envelope (Sobre + Música).
      */}
      {isClassic ? (
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