import {
  HeroSection,
  CountdownSection,
  Itinerary,
  Details,
  Footer,
  RSVP,
  PhotoGallerySection,
  MusicSuggestion,
  Navbar,
  Witnesses,
} from "@/components/templates/bodas-elite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Flor y Santi - ¡Nos Casamos! | MendoClick`,
  description: "Invitación digital premium - Plantilla bodas-elite",
};

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf0] overflow-x-hidden">
    <Navbar/>
      {/* El HeroSection ahora tendrá el diseño de la foto con las cursivas elegantes */}
      <HeroSection />

      {/* El Countdown suele ir inmediatamente después para generar expectativa */}
      <CountdownSection />

      {/* Detalles del evento: Fecha, hora y lugar */}
      <Itinerary />
<Witnesses/>
      {/* Galería de fotos para emocionar a los invitados */}
      <PhotoGallerySection />

<MusicSuggestion eventId={""}/>
      {/* Información práctica: Cómo ir y cómo vestirse */}

      <Details />

      {/* Regalos y Confirmación (RSVP) suelen ir al final */}
      <RSVP />

      <Footer />
    </main>
  );
}