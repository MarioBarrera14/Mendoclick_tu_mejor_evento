"use client";

import {
  Hero,
  Itinerary,
  EventDetails,
  RSVP,
  Footer,
  Envelope,
  FotoCarouselRetro,
  MusicSuggestion,
  Navbar,
  SeccionTestigos,
  WeddingDetailsSection,
} from "@/components/templates/bodas/estilo-rock";

// Importamos la data de BODA (nombres: "Juli & Mario")
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

export default function RetroVinylDemoPage() {
  // 1. Preparamos los datos de fecha (YYYY-MM-DD)
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#fdfcf0] overflow-x-hidden font-serif">
      {/* 1. MÚSICA: Ruta directa de rock */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.rock}>
        
        {/* Navbar: Usamos 'nombres' del BodaConfig */}
        <Navbar eventName={localConfig.personal.nombres} isDemo={true} />

        {/* HERO: Ahora agrupado en el objeto 'config' para que el Hero lo procese correctamente */}
        <Hero
          config={{
            heroImage: localConfig.imagenes.hero.rock,
            eventName: localConfig.personal.nombres,
            eventDate: fechaString,
            eventTime: localConfig.fecha.hora,
          }}
        />

        {/* 2. VIDEO Y GALERÍA: Carrusel y video directos */}
        <FotoCarouselRetro
          images={JSON.stringify(localConfig.imagenes.carrusel)}
          videoUrl={localConfig.imagenes.videoUrl.rock}
        />

        {/* Detalles del evento (Salón e Iglesia) */}
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


        {/* Itinerario dinámico */}
        <Itinerary items={localConfig.itinerario} /> 

        {/* Testigos */}
        <SeccionTestigos items={localConfig.testigos} />

   

        {/* Sección de Regalo y Dress Code */}
        <WeddingDetailsSection config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

    

        <MusicSuggestion eventId="demo-boda-rock-global" />

 
        
        {/* RSVP: Sincronizado con la imagen rock y fechas globales */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.rock,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }}  />
        
        <Footer />
      </Envelope>
    </main>
  );
}