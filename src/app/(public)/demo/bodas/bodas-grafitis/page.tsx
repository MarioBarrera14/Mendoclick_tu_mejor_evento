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

import { Permanent_Marker, Montserrat } from "next/font/google";
import { useMemo, useEffect, useState } from "react";
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";
import { config } from "process";

const graffitiFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

interface GraffitiPageProps {
  dbConfig?: any;
  eventId?: string;
  isDemo?: boolean;
}

export default function GraffitiDemoPage({ dbConfig, eventId, isDemo = false }: GraffitiPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeConfig = useMemo(() => {
    const eventDateDefault = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;
    
    const currentPlan = dbConfig?.planLevel || dbConfig?.plan || (dbConfig ? "CLASSIC" : "DELUXE");

    const getSafeSrc = (src: any, fallback: string) => (src && src.trim() !== "" ? src : fallback);

    const baseData = dbConfig ? {
      ...dbConfig,
      plan: currentPlan,
      eventName: dbConfig.eventName || localConfig.personal.nombres,
      eventDate: dbConfig.eventDate || eventDateDefault,
      eventTime: dbConfig.eventTime || localConfig.fecha.hora,
      heroImage: getSafeSrc(dbConfig.heroImage, localConfig.imagenes.hero.graffiti),
      musicUrl: dbConfig.musicUrl || localConfig.imagenes.musicaUrl.graffiti,
      videoUrl: dbConfig.videoUrl || localConfig.imagenes.videoUrl.graffiti,
      carruselImages: dbConfig.carruselImages || JSON.stringify(localConfig.imagenes.carrusel),
      itinerary: (dbConfig.itinerary && dbConfig.itinerary.length > 0) ? dbConfig.itinerary : localConfig.itinerario,
      witnesses: (dbConfig.witnesses && dbConfig.witnesses.length > 0) ? dbConfig.witnesses : localConfig.testigos,
      confirmDate: dbConfig.confirmDate || dbConfig.eventDate || eventDateDefault,
      venueName: dbConfig.venueName || localConfig.ubicacion.nombreLugar,
      venueAddress: dbConfig.venueAddress || localConfig.ubicacion.direccion,
      mapLink: dbConfig.mapLink || localConfig.ubicacion.googleMapsUrl,
      confirmPhone: dbConfig.confirmPhone || "549261000000", 
    } : {
      plan: "DELUXE", 
      eventName: localConfig.personal.nombres,
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
      witnesses: localConfig.testigos,
      confirmDate: localConfig.confirmacion.fechaLimite,
      confirmPhone: "549261000000",
    };

    return baseData;
  }, [dbConfig]);

  if (!mounted) return null;

  const currentEventId = eventId || "demo-boda-graffiti";
  const plan = safeConfig.plan;

  const PageContent = (
    <>
     {dbConfig && !isDemo && (
        <Navbar 
          eventName={safeConfig.eventName} 
          plan={plan} 
          isDemo={isDemo} 
        />
      )}
      
      <Hero
        heroImage={safeConfig.heroImage}
        eventName={safeConfig.eventName}
        eventDate={safeConfig.eventDate}
      />

      {plan !== "CLASSIC" && (
        <FotoCarousel 
          images={safeConfig.carruselImages} 
          videoUrl={safeConfig.videoUrl} 
          plan={plan} 
        />
      )}

      <EventDetails config={safeConfig} />
      
      <RSVP config={safeConfig} />

      {plan !== "CLASSIC" && (
        <>
          <Witnesses 
            items={safeConfig.witnesses || []} 
            plan={plan} 
          />
          <Itinerary 
            items={safeConfig.itinerary || []} 
            plan={plan} 
          />
          <MusicSuggestion eventId={currentEventId} plan={plan} />
        </>
      )}

      <DetailModal config={safeConfig} />
      <Footer />
    </>
  );

  return (
    <main className={`${graffitiFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a]`}>
      {plan === "CLASSIC" ? (
        <div className="animate-in fade-in duration-1000">
          {PageContent}
        </div>
      ) : (
        <Envelope musicUrl={safeConfig.musicUrl}>
          {PageContent}
        </Envelope>
      )}
    </main>
  );
}