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

// 1. IMPORTAMOS LA FUENTE DE GOOGLE
import { Permanent_Marker, Montserrat } from "next/font/google";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti", // Variable para el CSS
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface GraffitiPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GraffitiDemoPage({ dbConfig, eventId, isDemo = true }: GraffitiPageProps) {
  
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

  const safeConfig = {
    ...rawConfig,
    heroImage: (rawConfig.heroImage && rawConfig.heroImage !== "") ? rawConfig.heroImage : localConfig.imagenes.hero.graffiti,
    musicUrl: (rawConfig.musicUrl && rawConfig.musicUrl !== "") ? rawConfig.musicUrl : localConfig.imagenes.musicaUrl.graffiti,
    videoUrl: (rawConfig.videoUrl && rawConfig.videoUrl !== "") ? rawConfig.videoUrl : localConfig.imagenes.videoUrl.graffiti,
  };

  const currentEventId = eventId || "demo-boda-graffiti";

  return (
    /* APLICAMOS LA CLASE DE LA FUENTE AQUÍ */
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a]`}>
      <Envelope musicUrl={safeConfig.musicUrl}>
        
        <Navbar eventName={safeConfig.eventName} isDemo={isDemo}/>

        <Hero
          heroImage={safeConfig.heroImage}
          eventName={safeConfig.eventName}
          eventDate={safeConfig.eventDate}
        />

        {/* El resto de componentes... */}
        <FotoCarousel images={safeConfig.carruselImages} videoUrl={safeConfig.videoUrl} />
        <EventDetails config={safeConfig} />
        <RSVP config={safeConfig} />
        <DetailModal config={safeConfig} />
        <Itinerary items={safeConfig.itinerary || []} />
        <Witnesses items={safeConfig.witnesses || safeConfig.testigos || []} />
        <MusicSuggestion eventId={currentEventId} />
        <Footer />
      </Envelope>
    </main>
  );
}