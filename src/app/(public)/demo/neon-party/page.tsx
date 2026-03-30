import {
  Hero,
  Countdown,
  Location,
  Details,
  RSVP,
  Footer,
  FotoCarousel,
  Navbar,
} from "@/components/templates/neon-party";
import { Metadata } from "next";

// Metadata para la demo
export const metadata: Metadata = {
  title: "Neon Party - Demo | MendoClick",
  description: "Plantilla vibrante con colores neon y efectos brillantes",
};

export default async function NeonPartyDemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <Hero />
      
      <Countdown />
      
      <FotoCarousel />
      
      <Location />
      
      <Details />
      
      <RSVP />
      
      <Footer />
    </main>
  );
}
