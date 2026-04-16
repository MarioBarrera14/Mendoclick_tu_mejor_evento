"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReproductorMusica from "@/components/shared/MusicPlayer";

interface EnvelopeProps {
  children: React.ReactNode;
  musicUrl: string;
}

export default function Envelope({ children, musicUrl }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* FONDO INTERIOR */}
              <div className="absolute inset-0 bg-black z-0" />

              {/* SOLAPA SUPERIOR */}
              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#1a1a1a] origin-top z-40 shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                }}
              />

              {/* CUERPO DEL SOBRE */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-[#111111] shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-linen.png')`,
                }}
              />
              
              {/* SELLO DORADO */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-36 w-36 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] via-[#f5e1a4] to-[#C49B2F] text-black shadow-[0_15px_50px_rgba(0,0,0,0.8)] border-2 border-[#8C6F1F]/20"
                >
                  <div className="text-center select-none z-10">
                    <span className="block font-serif text-2xl sm:text-3xl font-bold italic tracking-tight text-[#42340b]">
                      Mis 15
                    </span>
                    <span className="block text-[10px] sm:text-xs tracking-[0.4em] uppercase mt-2 font-black text-[#42340b]/60">
                      Abrir
                    </span>
                  </div>
                  
                  {/* Brillo dinámico */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Anillo de detalle */}
                  <div className="absolute inset-3 rounded-full border border-[#8C6F1F]/30" />
                </motion.button>
                
                <motion.p className="mt-10 font-serif italic text-[#D4AF37] text-base sm:text-xl tracking-wide animate-pulse drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  Toca el sello para descubrir la magia
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CONTENIDO PRINCIPAL */}
      <main className={`transition-opacity duration-1000 ${!isOpen ? "h-screen overflow-hidden opacity-0" : "min-h-screen opacity-100"}`}>
        {isOpen && (
          <div className="bg-black">
            <ReproductorMusica url={musicUrl} autoPlay={true} />
            <div className="relative z-10">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}