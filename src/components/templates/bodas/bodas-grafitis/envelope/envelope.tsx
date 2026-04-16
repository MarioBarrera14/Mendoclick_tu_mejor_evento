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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1a0a] font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* Fondo de Pared Orgánica / Piedra con Musgo */}
              <motion.div 
                className="absolute inset-0 z-0 bg-[#0a1a0a]" 
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-matter.png')`,
                  backgroundColor: "#0d1f0d"
                }}
              >
                {/* Destellos de color Verde y Amarillo */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-green-600/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full" />
              </motion.div>

              {/* Parte Superior del Sobre (Estilo Urbano Elegante) */}
              <motion.div
                exit={{ y: "-100%", rotateX: 110, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#1a2e1a] origin-top z-40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-yellow-500/20"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              >
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              </motion.div>

              {/* Parte Inferior del Sobre */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-[#0d1a0d] shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
              </motion.div>
              
              {/* Sello / Sticker de Boda (Verde y Oro) */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.5, filter: "blur(15px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-44 w-44 sm:h-56 sm:w-56 items-center justify-center rounded-full bg-gradient-to-tr from-green-800 via-green-600 to-yellow-500 shadow-[0_0_50px_rgba(34,197,94,0.4)] transition-all border-4 border-yellow-400"
                >
                  {/* Drip de Pintura en Oro/Amarillo */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-4 h-12 bg-yellow-500 rounded-full animate-bounce shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-16 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ animationDelay: '0.3s' }} />
                    <div className="w-4 h-9 bg-yellow-600 rounded-full animate-bounce shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ animationDelay: '0.2s' }} />
                  </div>

                  <div className="text-center select-none z-10">
                    <span className="block font-black text-3xl sm:text-4xl italic tracking-tighter text-white uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)]">
                      NUESTRA <br /> BODA
                    </span>
                    <span className="block text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mt-2 text-green-900 bg-yellow-400 px-3 py-1 rounded-sm rotate-1">
                      ABRIR INVITACIÓN
                    </span>
                  </div>
                  
                  {/* Brillo de barniz */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
                </motion.button>
                
                <motion.p className="mt-14 font-black italic text-yellow-500 text-lg sm:text-2xl uppercase tracking-tighter drop-shadow-md">
                  <span className="bg-green-600 text-white px-3 py-1 mr-2 shadow-lg">CLICK</span> 
                  PARA CELEBRAR
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