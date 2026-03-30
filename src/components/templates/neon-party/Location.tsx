"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Zap } from "lucide-react";

interface LocationProps {
  venueName?: string | null;
  venueAddress?: string | null;
  mapLink?: string | null;
}

export function Location({ venueName, venueAddress, mapLink }: LocationProps) {
  const name = venueName || "Howard Johnson";
  const address = venueAddress || "RP11 km 400, Cariló, Provincia de Buenos Aires";
  const link = mapLink || "https://maps.google.com";

  return (
    <section className="relative py-32 bg-[#0c001a] overflow-hidden">
      
      {/* --- FONDO CON GRID NEÓN (Consistencia Visual) --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#9333ea 1px, transparent 1px), linear-gradient(90deg, #9333ea 1px, transparent 1px)`,
            backgroundSize: '45px 45px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* HEADER DE SECCIÓN */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-purple-500">
               <Zap size={20} fill="currentColor" className="animate-pulse" />
               <span className="text-[11px] tracking-[0.6em] uppercase font-black italic">
                 Ubicación
               </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic text-white mb-6 tracking-tighter uppercase leading-none">
              La <span className="text-purple-600">Fiesta</span>
            </h2>
            <div className="w-24 h-[3px] bg-purple-600 mx-auto shadow-[0_0_15px_#9333ea]" />
          </div>

          {/* TARJETA CRYSTAL DARK BRUTALISTA */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-10 md:p-20 border border-purple-500/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] text-center relative overflow-hidden group">
            {/* Efecto de luz interna al hacer hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-purple-600/20 transition-all duration-700" />

            {/* Icono de Pin Neón */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-black border-2 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)] mb-10 text-white group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <MapPin size={45} strokeWidth={1.5} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-5xl md:text-7xl font-black italic text-white mb-6 uppercase tracking-tighter">
                {name}
              </h3>
              <p className="text-purple-200/50 text-xl md:text-2xl mb-12 max-w-md mx-auto leading-relaxed italic font-medium">
                {address}
              </p>

              <div className="flex flex-col items-center justify-center gap-8">
                {/* Botón Call to Action */}
                <motion.a 
                  href={link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-5 px-14 py-7 bg-purple-600 text-white rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-[0_20px_40px_-10px_rgba(147,51,234,0.6)] hover:bg-purple-500 italic"
                >
                  <Navigation size={22} className="group-hover:rotate-12 transition-transform" />
                  Abrir Mapa
                  <ExternalLink size={16} className="opacity-40" />
                </motion.a>
                
                <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.5em] italic">
                  // ¡Te esperamos puntualmente!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>


    </section>
  );
}