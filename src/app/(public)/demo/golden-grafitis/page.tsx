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
  Witnesses, // Importado correctamente
} from "@/components/templates/golden-grafitis";

// Importamos la data de Quince limpia
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

export default function GoldenBdayDemoPage() {
  // Sincronizamos la fecha para el contador (YYYY-MM-DD)
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 1. MÚSICA: Ruta directa de graffiti */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.graffiti}>
        
        <Navbar eventName={localConfig.personal.nombre} isDemo={true} />

        {/* Hero: Imagen directa de graffiti */}
        <Hero config={{
          eventName: localConfig.personal.nombre,
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          heroImage: localConfig.imagenes.hero.graffiti
        }} />

        {/* 2. VIDEO Y GALERÍA: Carrusel y video directos */}
        <FotoCarousel 
          images={JSON.stringify(localConfig.imagenes.carrusel)}
          videoUrl={localConfig.imagenes.videoUrl.graffiti}
        />

        {/* Detalles del salón */}
        <EventDetails config={{
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          venueName: localConfig.ubicacion.nombreLugar,
          venueAddress: localConfig.ubicacion.direccion,
          mapLink: localConfig.ubicacion.googleMapsUrl
        }} />

        {/* Modales de Dress Code y CBU */}
        <DetailModal config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

        {/* Itinerario dinámico */}
        <Itinerary items={localConfig.itinerario} />

        <MusicSuggestion eventId="demo-quince-graffiti" />

        {/* RSVP: Sincronizado con la imagen de graffiti */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.graffiti,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }} />
        
        <Footer />
      </Envelope>
    </main>
  );
}