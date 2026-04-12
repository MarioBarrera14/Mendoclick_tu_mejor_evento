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
} from "@/components/templates/Champagne";

// Importamos la data de Quince que ya viene limpia
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

export default function NightLightsDemoPage() {
  // Sincronizamos la fecha para el contador (YYYY-MM-DD)
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. SOBRE Y MÚSICA: Acceso directo a musicaUrl.champagne */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.champagne}>
        
        {/* Navbar: Nombre singular */}
        <Navbar eventName={localConfig.personal.nombre} isDemo={true} />
        
        {/* Hero: Imagen directa de champagne */}
        <Hero config={{
          eventName: localConfig.personal.nombre,
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          heroImage: localConfig.imagenes.hero.champagne
        }} />

        {/* Galería: Carrusel directo y video directo */}
        <FotoCarousel 
          images={JSON.stringify(localConfig.imagenes.carrusel)} 
          videoUrl={localConfig.imagenes.videoUrl.champagne}
        />

        {/* Itinerario */}
        <Itinerary items={localConfig.itinerario} />

        {/* Detalles: Dresscode y Regalo */}
        <Details config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

        {/* RSVP: Con la imagen de fondo de champagne */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.champagne,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }}/>

        {/* Ubicación */}
        <Location config={{
          venueName: localConfig.ubicacion.nombreLugar,
          venueAddress: localConfig.ubicacion.direccion,
          mapLink: localConfig.ubicacion.googleMapsUrl,
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora
        }} />

        <MusicSuggestion eventId="demo-quince-champagne" />

        <Footer />
      </Envelope>
    </main>
  );
}