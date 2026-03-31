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

  // --- PALETA DE COLORES ---
  // Fondo: Crema muy suave (#FDFCF5)
  // Solapa Superior (Exterior): Rosa Viejo/Nude (#E0C9B9)
  // Cuerpo Inferior (Interior/Sombra): Un tono más oscuro del Nude (#D1B09C)
  // Sello: Lacre Rojo/Vino Profundo (#8B0000)
  // --------------------------

  return (
    // CAMBIO: Fondo general de la página a un crema muy suave
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FDFCF5]">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* CAMBIO: Fondo detrás del sobre (mismo crema suave) */}
              <motion.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#FDFCF5] z-0" 
              />

              {/* Solapa Superior (Triángulo que baja) */}
              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                // CAMBIO: Color de la solapa a un rosa viejo/nude elegante
                className="absolute top-0 left-0 w-full h-1/2 bg-[#E0C9B9] origin-top z-40 shadow-xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  perspective: "1200px"
                }}
              />

              {/* Cuerpo Inferior (Forma de W) */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                // CAMBIO: Color del cuerpo a un tono nude más oscuro (da profundidad)
                // CAMBIO: Sombra ligeramente más oscura para contrastar con el fondo claro
                className="absolute inset-0 z-30 bg-[#D1B09C] shadow-[0_-10px_25px_rgba(0,0,0,0.1)]"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              
              {/* Contenedor del Sello (Mantiene flex centrado) */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                {/* Botón Sello Circular */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  // CAMBIO: Color del sello a un Rojo Lacre/Vino profundo
                  // CAMBIO: Sombra más dramática y rojiza para efecto de cera
                  className="group relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-[#8B0000] text-white shadow-[0_15px_40px_rgba(139,0,0,0.5)] transition-all"
                >
                  <div className="text-center select-none z-10">
                    <span className="block font-serif text-2xl sm:text-3xl font-light tracking-tight">
                      Mis 15
                    </span>
                    <span className="block text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2 opacity-60">
                      Abrir
                    </span>
                  </div>
                  {/* CAMBIO: Borde interno a blanco con más opacidad para que resalte en el rojo */}
                  <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
                </motion.button>
                
                {/* Texto de instrucción */}
                {/* CAMBIO: Color de texto a un tono marrón/taupe suave que combina con el nude */}
                <motion.p className="mt-8 font-serif italic text-[#8C7A6B] text-base sm:text-xl tracking-wide animate-pulse">
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