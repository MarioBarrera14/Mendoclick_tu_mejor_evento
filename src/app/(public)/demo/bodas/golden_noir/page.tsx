"use client";

// 1. Importamos las fuentes y configuramos las variables CSS
import { Playfair_Display, Great_Vibes } from "next/font/google";

const serifFont = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-elegante', 
});

const scriptFont = Great_Vibes({ 
  subsets: ["latin"], 
  weight: "400",
  variable: '--font-script', 
});

import {
  HeroSection,
  Itinerary,
  DetailModal,
  Footer,
  RSVP,
  PhotoGallerySection,
  MusicSuggestion,
  Navbar,
  LocationsSection,
  Witnesses,
  Envelope,
  SeparadorEntrePaginas,
} from "@/components/templates/bodas/golden_noir";

// Importamos la data hardcodeada para cuando funcione como Demo
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface GoldenNoirPageProps {
  dbConfig?: any;    // Datos de la base de datos (Prisma)
  eventId?: string;  // ID del evento para la música
  isDemo?: boolean;  // Si es true, usa datos locales; si es false, usa dbConfig
}

export default function GoldenNoirPage({ dbConfig, eventId, isDemo = true }: GoldenNoirPageProps) {
  
  // Unificamos la fuente de datos
  const config = dbConfig || {
    eventName: localConfig.personal.nombres,
    heroImage: localConfig.imagenes.hero.noir,
    eventDate: `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`,
    eventTime: localConfig.fecha.hora,
    musicUrl: localConfig.imagenes.musicaUrl.noir,
    videoUrl: localConfig.imagenes.videoUrl.noir,
    carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
    venueName: localConfig.ubicacion.nombreLugar,
    venueAddress: localConfig.ubicacion.direccion,
    mapLink: localConfig.ubicacion.googleMapsUrl,
    churchName: localConfig.ubicacion.iglesiaNombre,
    churchAddress: localConfig.ubicacion.iglesiaDireccion,
    churchMapLink: localConfig.ubicacion.iglesiaMaps,
    itinerary: localConfig.itinerario,
    witnesses: localConfig.testigos,
    dressCode: localConfig.dressCode.titulo,
    dressDescription: localConfig.dressCode.descripcion,
    cbu: localConfig.regalo.datosBancarios.cbu,
    alias: localConfig.regalo.datosBancarios.alias,
    bankName: localConfig.regalo.datosBancarios.banco,
    holderName: localConfig.regalo.datosBancarios.titular,
    confirmDate: localConfig.confirmacion.fechaLimite
  };

  const currentEventId = eventId || "demo-global-noir";

  return (
    /**
     * REPARACIÓN CRÍTICA: 
     * Inyectamos las variables CSS en el main. 
     * Sin esto, los componentes hijos no encuentran 'font-elegante' ni 'font-script'.
     */
    <main className={`${serifFont.variable} ${scriptFont.variable} font-elegante min-h-screen bg-[#0a0a0a] overflow-x-hidden`}>
      <Envelope musicUrl={config.musicUrl || localConfig.imagenes.musicaUrl.noir}>
        
        <Navbar eventName={config.eventName} isDemo={isDemo} />

        <HeroSection 
          eventName={config.eventName} 
          eventDate={config.eventDate} 
          heroImage={config.heroImage || localConfig.imagenes.hero.noir}
        />
        
        <SeparadorEntrePaginas />

        <PhotoGallerySection config={{
          carruselImages: typeof config.carruselImages === 'string' ? config.carruselImages : JSON.stringify(config.carruselImages),
          videoUrl: config.videoUrl || localConfig.imagenes.videoUrl.noir
        }} />

        <SeparadorEntrePaginas />
        
        <Itinerary items={config.itinerary || []} />
        
        <SeparadorEntrePaginas />
        
        {/* Aquí es donde fallaba antes: ahora recibirá las variables del padre */}
        <LocationsSection config={{
          eventDate: config.eventDate,
          eventTime: config.eventTime,
          venueName: config.venueName,
          venueAddress: config.venueAddress,
          mapLink: config.mapLink,
          churchName: config.churchName,
          churchAddress: config.churchAddress,
          churchMapLink: config.churchMapLink
        }} />
        
        <SeparadorEntrePaginas />
        
        <Witnesses items={config.witnesses || config.testigos || []} />
        
        <SeparadorEntrePaginas />
        
        <MusicSuggestion eventId={currentEventId} />

        <SeparadorEntrePaginas />

        <DetailModal config={{
          dressCode: config.dressCode,
          dressDescription: config.dressDescription,
          cbu: config.cbu,
          alias: config.alias,
          bankName: config.bankName,
          holderName: config.holderName
        }} />

        <SeparadorEntrePaginas />
        
        <RSVP config={{
          heroImage: config.heroImage || localConfig.imagenes.hero.noir,
          eventDate: config.eventDate,
          confirmDate: config.confirmDate || config.eventDate
        }} />
        
        <SeparadorEntrePaginas />
        
        <Footer />
      </Envelope>
    </main>
  );
}