"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReproductorMusica from "@/components/shared/MusicPlayer"

export default function Envelope({ children, musicUrl }: { children: React.ReactNode, musicUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-100">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <motion.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#ebeae6] z-0" 
              />

              {/* Solapa Superior: Usando clase arbitraria para el clip-path */}
              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f9f9f9] origin-top z-40 shadow-xl [clip-path:polygon(0_0,100%_0,50%_100%)] [perspective:1200px]"
              />

              {/* Cuerpo del Sobre: Usando clase arbitraria para el clip-path */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] [clip-path:polygon(0_0,50%_50%,100%_0,100%_100%,0_100%)]"
              />
              
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                {/* SELLO DORADO: Gradiente y sombras con Tailwind */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full text-white transition-all overflow-hidden
                             bg-[radial-gradient(circle,#c5b593_0%,#b4a178_100%)] 
                             shadow-[0_15px_35px_rgba(180,161,120,0.4)]"
                >
                  <div className="text-center select-none z-10">
                    <span className="block font-script text-3xl sm:text-5xl font-light tracking-tight text-white drop-shadow-sm">
                      Mis 15
                    </span>
                    <span className="block text-[9px] sm:text-[11px] tracking-[0.4em] uppercase mt-2 text-white/90 font-bold">
                      Abrir
                    </span>
                  </div>

                  <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
                
                <motion.p className="mt-8 font-script italic text-[#b4a178] text-xl sm:text-2xl tracking-wide animate-pulse">
                  Toca el sello para descubrir la magia
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className={`transition-opacity duration-1000 ${!isOpen ? "h-screen overflow-hidden opacity-0" : "min-h-screen opacity-100"}`}>
        {isOpen && (
          <>
            <ReproductorMusica url={musicUrl} autoPlay={true} />
            {children}
          </>
        )}
      </main>
    </div>
  )
}