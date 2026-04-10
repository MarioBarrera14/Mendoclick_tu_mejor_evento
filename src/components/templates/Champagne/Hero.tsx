"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { eventConfig as localConfig } from "@/data/event-config";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export function Hero({ eventName, heroImage }: HeroProps) {
  const displayName = eventName || localConfig.personal.nombre;
  const currentImage = (heroImage && heroImage !== "") ? heroImage : localConfig.imagenes.hero;

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-12T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      
      {/* SECCIÓN SUPERIOR: IMAGEN CON CLIP-PATH */}
      <div 
        className="relative w-full h-[70vh] md:h-[80vh] bg-[#111] overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0% 100%)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentImage} className="relative w-full h-full">
            <img
              src={currentImage}
              alt={displayName}
              className="w-full h-full object-cover grayscale-[20%] brightness-[0.8]"
            />
            {/* Overlay degradado inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* TEXTOS AL PIE DE LA FOTO (Ajustados y más pequeños) */}
        <div className="absolute bottom-[15%] md:bottom-[18%] left-0 w-full z-30 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center text-white"
          >
            {/* Fecha: Muy pequeña y minimalista */}
            <span className="text-[10px] md:text-xs tracking-[0.4em] font-light uppercase mb-1">
              12 · 09 · 2026
            </span>

            {/* Nombre: Elegante pero no gigante */}
            <h1 className="font-script text-5xl md:text-8xl leading-none drop-shadow-md">
              {displayName}
            </h1>

            {/* Mis 15 Años: Subrayado sutil con líneas */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-[0.5px] w-6 bg-white/50" />
              <span className="text-[8px] md:text-[10px] tracking-[0.5em] uppercase font-extralight">
                Mis 15 Años
              </span>
              <div className="h-[0.5px] w-6 bg-white/50" />
            </div>
          </motion.div>
        </div>
      </div>


      {/* SECCIÓN INFERIOR: CONTADOR AL PIE (Más compacto) */}
      <div className="flex-1 flex flex-col items-center justify-end pb-12 md:pb-16 bg-white">
        <span className="font-serif italic text-base md:text-lg text-gray-700 mb-4 lowercase tracking-tight">falta</span>
        
        <div className="flex gap-3 md:gap-6">
          {[
            { label: "DÍAS", value: timeLeft.dias },
            { label: "HORAS", value: timeLeft.horas },
            { label: "MIN", value: timeLeft.min },
            { label: "SEG", value: timeLeft.seg },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5">
              {/* Círculos dorados más pequeños */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.2px] border-[#b4a178] flex items-center justify-center bg-white">
                <span className="text-sm md:text-lg font-bold text-gray-900 tracking-tighter">
                  {item.value}
                </span>
              </div>
              <span className="text-[7px] md:text-[9px] tracking-widest text-gray-400 font-semibold uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Flecha indicadora pequeña */}
        <div className="mt-8 text-[#b4a178]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}