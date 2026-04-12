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
  Witnesses,
} from "@/components/templates/bodas-grafitis";

// Importamos la data de BODA (la que tiene 'nombres' en plural)
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

export default function GraffitiDemoPage() {
  // Formateo de fecha (AAAA-MM-DD)
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 1. MÚSICA: Ahora la ruta es directa dentro de musicaUrl */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.graffiti}>
        
        {/* Usamos 'nombres' que es la propiedad de BodaConfig */}
        <Navbar eventName={localConfig.personal.nombres} isDemo={true}/>

        {/* HERO: Ajustado a las nuevas rutas directas */}
        <Hero
          heroImage={localConfig.imagenes.hero.graffiti}
          eventName={localConfig.personal.nombres}
          eventDate={fechaString}
        />

        {/* 2. VIDEO Y FOTOS: Acceso directo a carrusel y videoUrl */}
        <FotoCarousel
          images={JSON.stringify(localConfig.imagenes.carrusel)} 
          videoUrl={localConfig.imagenes.videoUrl.graffiti} 
        />

        {/* Detalles del evento */}
        <EventDetails config={{
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          venueName: localConfig.ubicacion.nombreLugar,
          venueAddress: localConfig.ubicacion.direccion,
          mapLink: localConfig.ubicacion.googleMapsUrl,
          churchName: localConfig.ubicacion.iglesiaNombre,
          churchAddress: localConfig.ubicacion.iglesiaDireccion,
          churchMapLink: localConfig.ubicacion.iglesiaMaps
        }} />

        {/* RSVP: Sincronizado con la imagen de boda graffiti */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.graffiti,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }} />
        
        {/* Modal con datos bancarios y Dress Code */}
        <DetailModal config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

        {/* Listado de itinerario */}
        <Itinerary items={localConfig.itinerario} />

        {/* Listado de testigos */}
        <Witnesses items={localConfig.testigos} />

        <MusicSuggestion eventId="demo-boda-graffiti" />
        
        <Footer />
      </Envelope>
    </main>
  );
}