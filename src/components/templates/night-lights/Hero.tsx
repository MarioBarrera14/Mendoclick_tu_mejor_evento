"use client";

import { motion, AnimatePresence } from "framer-motion";
import { eventConfig as localConfig } from "@/data/event-config";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null; // Esta es la URL que viene de GestionGaleria (fotoPrincipal)
}

export function Hero({ eventName, heroImage }: HeroProps) {
  // Lógica de prioridad: Si heroImage existe y no es string vacío, úsala. Si no, usa la local.
  const displayName = eventName || localConfig.personal.nombre;
  const currentImage = (heroImage && heroImage !== "") ? heroImage : localConfig.imagenes.hero;

  return (
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* CONTENEDOR DE IMAGEN */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {/* Usamos currentImage como key para que AnimatePresence detecte el cambio y haga la transición */}
          <div key={currentImage} className="relative w-full h-full flex items-center justify-center">
            
            {/* 1. FONDO BORROSO AMBIENTAL */}
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              src={currentImage}
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl"
              aria-hidden="true"
            />

            {/* 2. OVERLAY DE DESVANECIMIENTO INFERIOR */}
            <div 
              className="absolute inset-0 z-20 pointer-events-none" 
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(0,0,0,0) 50%, 
                  rgba(0,0,0,0.8) 80%, 
                  rgba(0,0,0,1) 100%)`
              }}
            />
            
            {/* 3. IMAGEN PRINCIPAL CON MÁSCARA */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="relative z-10 w-full h-full flex items-center justify-center"
              style={{
                WebkitMaskImage: `
                  radial-gradient(circle at center, black 30%, transparent 90%),
                  linear-gradient(to bottom, black 70%, transparent 95%)
                `,
                maskImage: `
                  radial-gradient(circle at center, black 30%, transparent 90%),
                  linear-gradient(to bottom, black 70%, transparent 95%)
                `,
                WebkitMaskComposite: 'source-in',
                maskComposite: 'intersect'
              }}
            >
              <img
                src={currentImage}
                alt={displayName}
                className="w-full h-full object-cover md:object-cover opacity-85" 
                style={{ imageRendering: 'auto' }}
              />
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* BLOQUE DE TEXTOS */}
      <div className="relative z-30 text-center px-4 mt-60 md:mt-60 pointer-events-none">
        <motion.h1
          key={displayName}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-script text-6xl md:text-9xl lg:text-[10rem] text-white leading-[1.1] drop-shadow-[0_10px_40px_rgba(0,0,0,1)]"
        >
          {displayName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <div className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent to-white/60" />
          <h2 className="text-[10px] md:text-2xl text-white font-light tracking-[0.4em] md:tracking-[0.6em] uppercase drop-shadow-lg">
            {localConfig.personal.titulo}
          </h2>
          <div className="h-[1px] w-8 md:w-20 bg-gradient-to-l from-transparent to-white/60" />
        </motion.div>
      </div>

      {/* INDICADOR DE SCROLL */}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Desliza</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}