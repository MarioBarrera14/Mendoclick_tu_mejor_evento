"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  GlassWater, 
  Utensils, 
  Music, 
  Clock, 
  PartyPopper, 
  Star, 
  MapPin, 
  Users 
} from "lucide-react";
import React from "react";

// Componente de líneas de velocidad con Tailwind puro
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]"
    />
  </div>
);

interface ItineraryStep {
  time: string;
  title: string;
  icon: React.ReactNode;
  side: "left" | "right";
}

export function Itinerary() {
  const steps: ItineraryStep[] = [
    { time: "20:00hs", title: "Ceremonia", icon: <Heart size={14} />, side: "left" },
    { time: "21:00hs", title: "Recepción", icon: <Users size={14} />, side: "right" },
    { time: "22:00hs", title: "Entrada", icon: <PartyPopper size={14} />, side: "left" },
    { time: "22:30hs", title: "Vals", icon: <Star size={14} />, side: "right" },
    { time: "23:00hs", title: "Cena", icon: <Utensils size={14} />, side: "left" },
    { time: "0:00hs", title: "Baile", icon: <Music size={14} />, side: "right" },
    { time: "4:00hs", title: "Brindis", icon: <GlassWater size={14} />, side: "left" },
  ];

  return (
    <section className="relative bg-transparent text-white py-16 md:py-24 px-6 overflow-hidden z-10 font-sans">
      
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"
      />

      {/* OVERLAY DE LEGIBILIDAD */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />
      
      <SpeedLinesBackground />

      {/* --- ENCABEZADO --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-12 md:mb-16 relative z-10"
      >
        <div className="w-10 h-10 rounded-full border border-[#b5a47a]/30 flex items-center justify-center mb-3 bg-black/50 backdrop-blur-sm shadow-xl">
          <Clock size={20} className="text-[#b5a47a]" />
        </div>
        <span className="text-[9px] tracking-[0.5em] text-[#b5a47a] uppercase font-bold drop-shadow-sm">
          Timeline
        </span>
        <h2 className="text-3xl md:text-5xl font-serif italic text-center text-white tracking-tighter drop-shadow-md">
          Itinerario
        </h2>
      </motion.div>

      {/* --- LÍNEA DE TIEMPO --- */}
      <div className="relative w-full max-w-4xl mx-auto z-10">
        
        {/* Línea Central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#b5a47a]/20 -translate-x-1/2" />

        <div className="flex flex-col space-y-12 md:space-y-14"> 
          {steps.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center w-full flex-row ${
                item.side === "left" ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Espaciador para desktop */}
              <div className="hidden md:block w-1/2" />
              
              {/* ICONO ENMARCADO REDONDO */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="bg-[#fcfaf2] p-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.8)] border border-white/5 aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] rounded-full" />
                  <div className="w-9 h-9 md:w-11 md:h-11 border-[2.5px] border-[#b5a47a] flex items-center justify-center bg-[#0c0c0c] text-[#b5a47a] rounded-full shadow-inner">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* TEXTO ALTERNADO */}
              <div className={`w-full md:w-1/2 flex flex-col items-center ${
                item.side === "left" ? "md:items-end md:pr-12" : "md:items-start md:pl-12"
              }`}>
                <div className={`text-center max-w-[140px] sm:max-w-none ${item.side === "left" ? "md:text-right" : "md:text-left"} ${index % 2 === 0 ? "mr-auto pr-8 md:pr-0 md:mr-0" : "ml-auto pl-8 md:pl-0 md:ml-0"} md:mx-0`}>
                  <span className="block text-[10px] font-bold text-[#b5a47a] uppercase tracking-widest drop-shadow-sm">
                    {item.time}
                  </span>
                  <h3 className="text-base md:text-2xl font-serif italic text-white drop-shadow-md leading-tight">
                    {item.title}
                  </h3>
                  <button className="flex items-center justify-center md:justify-start gap-1.5 text-[8px] font-bold tracking-widest text-[#b5a47a]/60 uppercase mt-1 hover:text-[#b5a47a] transition-all drop-shadow-sm mx-auto md:mx-0">
                    <MapPin size={10} />
                    Ubicación
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}