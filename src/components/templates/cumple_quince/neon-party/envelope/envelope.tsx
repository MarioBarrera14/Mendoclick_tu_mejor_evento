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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05000a] font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }} 
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* Fondo Negro Espacial con Grilla Neon */}
              <motion.div 
                className="absolute inset-0 z-0 bg-[#05000a]" 
                style={{
                  backgroundImage: `linear-gradient(to right, #1a0033 1px, transparent 1px), linear-gradient(to bottom, #1a0033 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Solapa Superior Neon (Cierre Magnético) */}
              <motion.div
                exit={{ y: "-100%", rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0014] origin-top z-40 border-b border-purple-500/50 shadow-[0_5px_30px_rgba(147,51,234,0.3)]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              >
                {/* Línea de luz en el borde de la solapa */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[1px]" />
              </motion.div>

              {/* Cuerpo Inferior (Placa de Carbono Neon) */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-[#080010] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </motion.div>
              
              {/* Sello / Reactor Central Neon */}
              <motion.div 
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-40 w-40 sm:h-52 sm:w-52 items-center justify-center rounded-full bg-black shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all border border-purple-500/30"
                >
                  {/* Anillos Neon Animados */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-pink-500/20 animate-[spin_6s_linear_infinite_reverse]" />
                  
                  {/* Resplandor interno (Core) */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-900/40 via-transparent to-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="text-center select-none z-10">
                    <span className="block font-black text-4xl sm:text-5xl tracking-tighter text-white uppercase italic drop-shadow-[0_0_10px_#a855f7]">
                      MIS 15
                    </span>
                    <span className="block text-[10px] sm:text-xs tracking-[0.4em] font-black uppercase mt-3 text-purple-400 group-hover:text-pink-400 transition-colors">
                      INITIALIZE
                    </span>
                  </div>
                  
                  {/* Escaneo de luz pasando por el botón */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </div>
                </motion.button>
                
                {/* Texto Neon con parpadeo */}
                <motion.p className="mt-12 font-black italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-lg sm:text-2xl uppercase tracking-widest text-center">
                  <span className="animate-pulse">SISTEMA LISTO</span>
                  <br />
                  <span className="text-[10px] not-italic tracking-[0.8em] text-white/30">TAP TO START</span>
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
            <div className="relative z-10">
              {children}
            </div>
          </>
        )}
      </main>
    </div>
  )
}