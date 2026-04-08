"use client";

import { motion, AnimatePresence } from "framer-motion";
import { bodaTemplateConfig as localConfig } from "@/data/event-config-bodas";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export function Hero({ eventName, heroImage }: HeroProps) {
  const rawNames = eventName || localConfig.personal.nombre || "Novia & Novio";
  const namesArray = rawNames.split(/[&,]/);
  const firstName = namesArray[0]?.trim() || "Novia";
  const lastName = namesArray[1]?.trim() || "Novio";

  const currentImage = (heroImage && heroImage !== "") 
    ? heroImage 
    : localConfig.imagenes.hero;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#94a994]">
      
      {/* CAPA DE IMAGEN */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentImage} 
            className="relative w-full h-full"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.33, 1, 0.68, 1] }}
          >
            <img
              src={currentImage}
              alt="Portada de Boda"
              className="w-full h-full object-cover"
            />
            
            <div 
              className="absolute inset-0 z-10" 
              style={{ background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.5) 100%)' }} 
            />

            <div 
              className="absolute inset-0 z-20 pointer-events-none" 
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(0,0,0,0.3) 10%, 
                  transparent 89%, 
                  rgba(148, 169, 148, 0.6) 99%, 
                  rgba(148, 169, 148, 1) 100%)`
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENIDO DE TEXTO CENTRALIZADO */}
      <div className="relative z-30 text-center px-6 w-full max-w-5xl mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* LÍNEA SUPERIOR DINÁMICA */}
          <div className="w-[1px] h-16 md:h-24 bg-white/40 mb-6" />

          {/* NOMBRES RESPONSIVE: text-5xl en mobile, 8xl/9xl en desktop */}
          <h1 className="font-script text-5xl md:text-8xl lg:text-9xl text-white leading-tight drop-shadow-2xl flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8">
            <span className="whitespace-nowrap">{firstName}</span>
            <span className="text-2xl md:text-5xl lg:text-6xl inline-block transform translate-y-1 md:translate-y-3 opacity-90">
              ♥
            </span>
            <span className="whitespace-nowrap">{lastName}</span>
          </h1>

          {/* TÍTULO */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[11px] md:text-sm text-white font-light tracking-[0.4em] md:tracking-[0.6em] uppercase mt-8 drop-shadow-md border-y border-white/20 py-2 px-4"
          >
            {localConfig.personal.titulo}
          </motion.h2>
        </motion.div>
      </div>
{/* INDICADOR DE SCROLL: Centrado absoluto garantizado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        // Agregamos flex y items-center al contenedor absoluto
        className="absolute bottom-10 left-0 right-0 mx-auto w-fit z-40 cursor-pointer group flex flex-col items-center"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Texto con espaciado uniforme */}
          <span className="text-[9px] text-white/60 uppercase tracking-[0.5em] font-light group-hover:text-white transition-colors text-center">
            Desliza
          </span>

          {/* Línea animada */}
          <div className="relative w-[1px] h-14 overflow-hidden bg-white/20">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }} 
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent" 
            />
          </div>
        </div>
      </motion.div>
 
    </section>
  );
}