"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReproductorMusica from "@/components/shared/MusicPlayer"

export default function Envelope({ children, musicUrl }: { children: React.ReactNode, musicUrl: string }) {
  const [passcode, setPasscode] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(false)

  const SECRET_CODE = "LUZ" 

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode.toUpperCase() === SECRET_CODE) {
      setIsAuthorized(true)
      setError(false)
    } else {
      setError(true)
      setPasscode("")
      setTimeout(() => setError(false), 2000)
    }
  }

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

              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f9f9f9] origin-top z-40 shadow-xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  perspective: "1200px"
                }}
              />

              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="group relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-black text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all"
                >
                  <div className="text-center select-none z-10">
                    <span className="block font-serif text-2xl sm:text-3xl font-light tracking-tight">
                      Mis 15
                    </span>
                    <span className="block text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2 opacity-60">
                      Abrir
                    </span>
                  </div>
                  <div className="absolute inset-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
                </motion.button>
                
                <motion.p className="mt-8 font-serif italic text-neutral-500 text-base sm:text-xl tracking-wide animate-pulse">
                  Toca el sello para descubrir la magia
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className={`transition-opacity duration-1000 ${!isOpen ? "h-screen overflow-hidden opacity-0" : "min-h-screen opacity-100"}`}>
        {/* MOVIMOS EL REPRODUCTOR AQUÍ: Solo se renderiza y aparece cuando isOpen es true */}
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