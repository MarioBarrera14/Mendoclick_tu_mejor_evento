"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

// 1. Definimos qué datos va a recibir de la base de datos
interface LocationProps {
  venueName?: string | null;
  venueAddress?: string | null;
  mapLink?: string | null;
}

export function Location({ venueName, venueAddress, mapLink }: LocationProps) {
  
  // Si por alguna razón no hay datos en la DB, usamos estos por defecto
  const name = venueName || " Howard Johnson";
  const address = venueAddress || "RP11 km 400, Cariló, Provincia de Buenos Aires";
  const link = mapLink || "https://maps.google.com";

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] text-rose-300 uppercase font-bold mb-4 block italic">Ubicación</span>
            <h2 className="text-5xl md:text-6xl font-serif italic text-neutral-900 mb-6">La Celebración</h2>
            <div className="w-24 h-[1px] bg-neutral-200 mx-auto" />
          </div>

          <div className="bg-neutral-50 rounded-[3rem] p-8 md:p-16 border border-neutral-100 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-8 text-rose-300">
              <MapPin size={32} strokeWidth={1.5} />
            </div>

            {/* AQUÍ SE MUESTRAN TUS DATOS DE LA BASE DE DATOS */}
            <h3 className="text-3xl md:text-4xl font-serif italic text-neutral-800 mb-4">
              {name}
            </h3>
            
            <p className="text-neutral-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              {address}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href={link}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Navigation size={16} className="group-hover:animate-pulse" />
                Cómo llegar
                <ExternalLink size={14} className="opacity-50" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decoración suave */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-50 rounded-full blur-3xl -z-10" />
    </section>
  );
}