"use client";

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
} from "@/components/templates/golden_noir";

// Importamos la data de BODA (nombres: "Juli & Mario")
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

export default function WeddingPage() {
  // Formateo de fecha para componentes que lo requieran (AAAA-MM-DD)
  const fechaString = `${localConfig.fecha.año}-${String(localConfig.fecha.mes).padStart(2, '0')}-${String(localConfig.fecha.dia).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* 1. MÚSICA: Ruta directa de noir */}
      <Envelope musicUrl={localConfig.imagenes.musicaUrl.noir}>
        
        {/* Navbar: Usamos 'nombres' del BodaConfig */}
        <Navbar eventName={localConfig.personal.nombres} isDemo={true} />

        {/* Hero: Imagen noir y nombres sincronizados */}
        <HeroSection 
          eventName={localConfig.personal.nombres} 
          eventDate={fechaString} 
          heroImage={localConfig.imagenes.hero.noir}
        />
        
        <SeparadorEntrePaginas />

        {/* 2. VIDEO Y GALERÍA: Carrusel y video directos */}
        <PhotoGallerySection config={{
          carruselImages: JSON.stringify(localConfig.imagenes.carrusel),
          videoUrl: localConfig.imagenes.videoUrl.noir
        }} />

        <SeparadorEntrePaginas />
        
        {/* Itinerario dinámico global */}
        <Itinerary items={localConfig.itinerario} />
        
        <SeparadorEntrePaginas />
        
        {/* Seccion de Ubicaciones (Salón e Iglesia) */}
        <LocationsSection config={{
          eventDate: fechaString,
          eventTime: localConfig.fecha.hora,
          venueName: localConfig.ubicacion.nombreLugar,
          venueAddress: localConfig.ubicacion.direccion,
          mapLink: localConfig.ubicacion.googleMapsUrl,
          churchName: localConfig.ubicacion.iglesiaNombre,
          churchAddress: localConfig.ubicacion.iglesiaDireccion,
          churchMapLink: localConfig.ubicacion.iglesiaMaps
        }} />
        
        <SeparadorEntrePaginas />
        
        {/* Testigos globales */}
        <Witnesses items={localConfig.testigos} />
        
        <SeparadorEntrePaginas />
        
        <MusicSuggestion eventId="demo-global-noir" />

        <SeparadorEntrePaginas />

        {/* Modal de Detalles (Dress Code y CBU) */}
        <DetailModal config={{
          dressCode: localConfig.dressCode.titulo,
          dressDescription: localConfig.dressCode.descripcion,
          cbu: localConfig.regalo.datosBancarios.cbu,
          alias: localConfig.regalo.datosBancarios.alias,
          bankName: localConfig.regalo.datosBancarios.banco,
          holderName: localConfig.regalo.datosBancarios.titular
        }} />

        <SeparadorEntrePaginas />
        
        {/* RSVP: Sincronizado con la imagen noir y fechas globales */}
        <RSVP config={{
          heroImage: localConfig.imagenes.hero.noir,
          eventDate: fechaString,
          confirmDate: localConfig.confirmacion.fechaLimite
        }} />
        
        <SeparadorEntrePaginas />
        
        <Footer />
      </Envelope>
    </main>
  );
}