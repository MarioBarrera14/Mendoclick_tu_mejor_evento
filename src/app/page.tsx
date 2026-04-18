"use client";

import React from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/home/navbar/navbar';
import { Hero } from '@/components/home/hero/hero';
import { Collection } from '@/components/home/collection/collection';
import { TechSection } from '@/components/home/tech-section/tech-section';
import { Footer } from '@/components/home/footer/footer';
// 1. Importa el botón (ajusta la ruta según donde lo guardaste)
import { WhatsAppButton } from '@/components/home/whatsapp/whatsapp'; 

export default function LuxuryLanding() {
  return (
    <div className="min-h-screen bg-[#f4f4f2] text-zinc-800 selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      <Head>
        <title>MENDOCLICK | Invitaciones Digitales</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <Navbar />
      
      <main>
        <Hero />
        <Collection />
        <TechSection />
      </main>

      <Footer />

      {/* 2. Ponlo aquí, al final de todo */}
      <WhatsAppButton />
    </div>
  );
}