"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReproductorMusica from "@/components/shared/MusicPlayer"

export default function Envelope({ children, musicUrl }: { children: React.ReactNode, musicUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fdfbf7] font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* Fondo del Sobre */}
              <motion.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#f4f1ea] z-0" 
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                }}
              />

              {/* Solapa Superior */}
              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f9f7f2] origin-top z-40 shadow-xl [clip-path:polygon(0_0,100%_0,50%_100%)] [perspective:1200px]"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                }}
              />

              {/* Cuerpo del Sobre */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-white shadow-[0_-10px_25px_rgba(0,0,0,0.03)] [clip-path:polygon(0_0,50%_50%,100%_0,100%_100%,0_100%)]"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                }}
              />
              
              {/* SELLO Y TEXTO CENTRADOS */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6 w-full"
              >
                {/* SELLO CHAMPAGNE */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full text-white transition-all overflow-hidden
                             bg-[radial-gradient(circle,#dcd0b9_0%,#b4a178_100%)] 
                             shadow-[0_15px_40px_rgba(180,161,120,0.35)] border border-white/30"
                >
                  {/* Contenedor de texto centrado dentro del botón */}
                  <div className="flex flex-col items-center justify-center text-center select-none z-10 w-full">
                    <span className="block font-script text-4xl sm:text-5xl font-light tracking-tight text-white drop-shadow-md leading-none">
                      Mis 15
                    </span>
                    <span className="block text-[10px] sm:text-[12px] tracking-[0.4em] uppercase mt-4 text-white/90 font-bold leading-none">
                      Abrir
                    </span>
                  </div>

                  <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
                
                {/* TEXTO DE INSTRUCCIÓN CENTRADO */}
                <motion.p className="mt-10 font-script italic text-[#b4a178] text-2xl sm:text-3xl tracking-wide animate-pulse text-center w-full">
                  Toca el sello para descubrir la magia
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className={`transition-opacity duration-1000 ${!isOpen ? "h-screen overflow-hidden opacity-0" : "min-h-screen opacity-100"}`}>
        {isOpen && (
          <div className="relative z-10">
            <ReproductorMusica url={musicUrl} autoPlay={true} />
            {children}
          </div>
        )}
      </main>
    </div>
  )
}