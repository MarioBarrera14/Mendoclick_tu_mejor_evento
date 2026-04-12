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
} from "@/components/templates/neon-party";

import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

export default function NeonPartyDemoPage() {
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 1. MÚSICA: Ahora apunta a .neon */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.neon}>
        
        <Navbar eventName={localConfig.personal.nombre} isDemo={true} />
        
        {/* HERO: Ahora apunta a .neon */}
        <Hero config={{
          eventName: localConfig.personal.nombre,
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          heroImage: localConfig.imagenes.hero.neon 
        }} />
        
        {/* GALERÍA: Video ahora apunta a .neon */}
        <FotoCarousel 
          images={JSON.stringify(localConfig.imagenes.carrusel)} 
          videoUrl={localConfig.imagenes.videoUrl.neon}
        />

        <Itinerary items={localConfig.itinerario} />

        <Details config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

        <Location config={{
          venueName: localConfig.ubicacion.nombreLugar,
          venueAddress: localConfig.ubicacion.direccion,
          mapLink: localConfig.ubicacion.googleMapsUrl,
        }} />

        <MusicSuggestion eventId="demo-quince-neon"/>    
        
        {/* RSVP: Sincronizado con .neon */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.neon,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }} />
        
        <Footer />
      </Envelope>
    </main>
  );
}