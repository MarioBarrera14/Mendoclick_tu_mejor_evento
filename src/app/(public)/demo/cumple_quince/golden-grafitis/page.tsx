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

import { Permanent_Marker, Montserrat } from "next/font/google";
import { useMemo } from "react";
// Importamos la configuración local
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

interface GoldenBdayPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GoldenBdayPage({ dbConfig, eventId, isDemo = false }: GoldenBdayPageProps) {
  
  const config = useMemo(() => {
    // Sincronizamos el formato de fecha
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    // Determinación del plan
    const plan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    if (dbConfig) {
      return {
        ...dbConfig,
        plan, 
        // Reparación de mapeo: nos aseguramos de que heroImage use la ruta correcta para Graffiti
        eventName: dbConfig.eventName || localConfig.personal.nombre,
        eventDate: dbConfig.eventDate || eventDateDefault,
        eventTime: dbConfig.eventTime || localConfig.fecha.hora,
        heroImage: dbConfig.heroImage || localConfig.imagenes.hero.graffiti,
        musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.graffiti,
        videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.graffiti,
        carruselImages: typeof dbConfig.carruselImages === 'string' ? dbConfig.carruselImages : JSON.stringify(dbConfig.carruselImages || localConfig.imagenes.carrusel),
        venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
        venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
        mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
        itinerary: dbConfig.itinerary || localConfig.itinerario,
        dressCode: dbConfig.dressCode || localConfig.dressCode.titulo,
        dressDescription: dbConfig.dressDescription || localConfig.dressCode.descripcion,
        confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
        confirmPhone: dbConfig.confirmPhone || localConfig.contacto.whatsappNumero,
      };
    }

    // Configuración para DEMO: Forzamos las rutas hardcodeadas del localConfig
    return {
      plan: "DELUXE",
      eventName: localConfig.personal.nombre,
      heroImage: localConfig.imagenes.hero.graffiti,
      eventDate: eventDateDefault,
      eventTime: localConfig.fecha.hora,
      musicUrl: localConfig.imagenes.musicaUrl.graffiti,
      videoUrl: localConfig.imagenes.videoUrl.graffiti,
      carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
      venueName: localConfig.ubicacion.nombreLugar,
      venueAddress: localConfig.ubicacion.direccion,
      mapLink: localConfig.ubicacion.googleMapsUrl,
      itinerary: localConfig.itinerario,
      dressCode: localConfig.dressCode.titulo,
      dressDescription: localConfig.dressCode.descripcion,
      confirmDate: localConfig.confirmacion.fechaLimite,
      confirmPhone: localConfig.contacto.whatsappNumero,
      cbu: localConfig.regalo.datosBancarios.cbu,
      alias: localConfig.regalo.datosBancarios.alias,
      bankName: localConfig.regalo.datosBancarios.banco,
      holderName: localConfig.regalo.datosBancarios.titular,
    };
  }, [dbConfig]);

  const currentEventId = eventId || "demo-quince-graffiti";
  const isClassic = config.plan === "CLASSIC";

  const PageContent = (
    <>
      {/* Navbar: Se oculta en demos y recibe plan */}
      {dbConfig && !isDemo && (
        <Navbar eventName={config.eventName} isDemo={isDemo} plan={config.plan} />
      )}

      {/* Hero recibe la config con heroImage ya reparada */}
      <Hero config={config} />

      {/* FOTOCAROUSEL: Visible en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <FotoCarousel 
          images={config.carruselImages}
          videoUrl={config.videoUrl}
    
        />
      )}

      <EventDetails config={config} />

      {/* RSVP: Blindamos las props para que las imágenes internas se carguen */}
      <RSVP config={{
        heroImage: config.heroImage,
        eventDate: config.eventDate,
        confirmDate: config.confirmDate,
        eventName: config.eventName,
        confirmPhone: config.confirmPhone,
        plan: config.plan
      }} />

      <DetailModal config={config} />

      {/* ITINERARIO: Se muestra en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <Itinerary items={config.itinerary || []} />
      )}

      {/* MÚSICA: Se muestra en Demo o si NO es Classic */}
      {(isDemo || !isClassic) && (
        <MusicSuggestion eventId={currentEventId} />
      )}

      <Footer />
    </>
  );

  return (
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      {/* Lógica del Envelope reparada para Demos */}
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