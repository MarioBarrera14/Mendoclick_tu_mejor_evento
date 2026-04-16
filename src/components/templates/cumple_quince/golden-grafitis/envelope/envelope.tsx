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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0c001a] font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.2, rotate: 5 }} 
            transition={{ duration: 0.8, ease: "backIn" }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* Fondo de Pared con Graffiti / Tagging */}
              <motion.div 
                className="absolute inset-0 z-0 bg-[#0c001a]" 
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/brick-wall.png')`,
                }}
              >
                {/* Luces de Neón de fondo */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/30 blur-[120px] rounded-full" />
              </motion.div>

              {/* Parte Superior del Sobre (Estilo Metal/Urbano) */}
              <motion.div
                exit={{ y: "-100%", rotateX: 110, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#1a1a1a] origin-top z-40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-b border-purple-500/20"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              >
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              </motion.div>

              {/* Parte Inferior del Sobre */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-[#111] shadow-[0_-15px_50px_rgba(0,0,0,0.9)]"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
              </motion.div>
              
              {/* Sello / Sticker Graffiti (Fucsia y Cian) */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.5, rotate: -20, filter: "blur(15px)" }}
                transition={{ duration: 0.5 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-44 w-44 sm:h-56 sm:w-56 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-400 shadow-[0_0_60px_rgba(219,39,119,0.5)] transition-all border-4 border-white"
                >
                  {/* Drip de Pintura Chorreada en Rosa Neon */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className="w-3.5 h-12 bg-pink-500 rounded-full animate-bounce shadow-[0_0_15px_rgba(236,72,153,0.6)]" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3.5 h-20 bg-pink-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(236,72,153,0.6)]" style={{ animationDelay: '0.3s' }} />
                    <div className="w-3.5 h-10 bg-pink-600 rounded-full animate-bounce shadow-[0_0_15px_rgba(236,72,153,0.6)]" style={{ animationDelay: '0.2s' }} />
                  </div>

                  <div className="text-center select-none z-10 px-4">
                    <span className="block font-black text-4xl sm:text-5xl italic tracking-tighter text-white uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.6)] leading-none">
                      MIS <br /> 15
                    </span>
                    <span className="block text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mt-3 text-white bg-black px-3 py-1.5 rounded-sm -rotate-2 group-hover:rotate-2 transition-transform">
                      EXPLORAR
                    </span>
                  </div>
                  
                  {/* Reflejo de luz tipo Sticker */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                </motion.button>
                
                <motion.p className="mt-16 font-black italic text-pink-500 text-xl sm:text-3xl uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  <span className="bg-purple-600 text-white px-4 py-1 mr-2 shadow-xl border-l-4 border-white">CLICK</span> 
                  THE VIBE
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