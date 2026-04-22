"use client";

import React from 'react';
import dynamic from 'next/dynamic'; // Importamos para carga diferida
import { Navbar } from '@/components/home/navbar/navbar';
import { Hero } from '@/components/home/hero/hero';
import { WhatsAppButton } from '@/components/home/whatsapp/whatsapp'; 
import Maintenance from '@/components/Maintenance';
// 1. Cargamos dinámicamente lo que está "below the fold" (fuera de la vista inicial)
// Esto reduce drásticamente el Total Blocking Time (TBT) y mejora el rendimiento.
const Collection = dynamic(() => import('@/components/home/collection/collection').then(mod => mod.Collection));
const TechSection = dynamic(() => import('@/components/home/tech-section/tech-section').then(mod => mod.TechSection));
const Footer = dynamic(() => import('@/components/home/footer/footer').then(mod => mod.Footer));

export default function LuxuryLanding() {
    // poner en false cuando ya no este en construcción
  const enMantenimiento = true; 

  if (enMantenimiento) {
    return <Maintenance />;
  return (
    // min-h-svh ayuda a evitar saltos de layout en móviles
    <div className="min-h-svh bg-[#f4f4f2] text-zinc-800 selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      
      <Navbar />
      
      <main>
        {/* El Hero se queda estático porque es nuestro LCP */}
        <Hero />
        
        {/* Estos componentes se cargarán solo cuando el navegador esté libre */}
        <Collection />
        <TechSection />
      </main>

      <Footer />

      {/* Botón de WhatsApp al final */}
      <WhatsAppButton />
    </div>
  );
}
