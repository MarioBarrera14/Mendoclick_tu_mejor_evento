import {
  Hero,
  Countdown,
  Location,
  Details,
  RSVP,
  Footer,
  Envelope,
  FotoCarousel,
  MusicSuggestion,
  Navbar,
} from "@/components/templates/night-lights";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Metadata para la demo
export const metadata: Metadata = {
  title: "Night Lights - Demo | MendoClick",
  description: "Plantilla elegante con tonos oscuros e iluminación ambiental",
};

export default async function NightLightsDemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Envelope musicUrl="">
        <Navbar eventName="Night Lights Demo" />
        
        <Hero 
          eventName="Night Lights" 
          heroImage="/cumple.jpg" 
        />

        <Countdown 
          eventDate="2026-12-19" 
          eventTime="21:00" 
        />

        <FotoCarousel 
          images="[]" 
          videoUrl=""
        />

        <Details 
          dressCode="Elegante Sport"
          dressDescription="Tu presencia es lo mas importante"
          alias="demo.alias"
          cbu="0000000000000000000000"
          bankName="Banco Demo"
          holderName="Nombre Demo"
        />

        <Location 
          venueName="Salon Demo"
          venueAddress="Direccion a confirmar"
          mapLink=""
        />

        <MusicSuggestion eventId="demo" />    
        <RSVP />
        
        <Footer />
      </Envelope>
    </main>
  );
}
