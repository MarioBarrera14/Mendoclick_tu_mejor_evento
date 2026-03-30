import {
  Hero,
  Countdown,
  Location,
  Details,
  RSVP,
  Footer,
  FotoCarousel,
  Navbar,
} from "@/components/templates/golden-bday";
import { Metadata } from "next";

// Metadata para la demo
export const metadata: Metadata = {
  title: "Golden B-Day - Demo | MendoClick",
  description: "Plantilla elegante con detalles dorados para ocasiones especiales",
};

export default async function GoldenBdayDemoPage() {
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
