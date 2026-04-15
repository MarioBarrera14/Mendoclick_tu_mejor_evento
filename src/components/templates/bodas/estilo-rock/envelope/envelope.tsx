"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ReproductorMusica from "@/components/shared/MusicPlayer";

interface EnvelopeProps {
  children: React.ReactNode;
  musicUrl: string;
}

export default function Envelope({ children, musicUrl }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Referencias para el cálculo de rotación infinita
  const rotationZ = useMotionValue(0);
  const lastAngle = useRef(0);
  const totalRotation = useRef(0);

  // Suavizado premium
  const smoothRotateZ = useSpring(rotationZ, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // 1. Calculamos el ángulo actual en grados (0 a 360)
    let currentAngle = Math.atan2(y, x) * (180 / Math.PI);
    if (currentAngle < 0) currentAngle += 360;

    // 2. Calculamos la diferencia con el último ángulo registrado
    let delta = currentAngle - lastAngle.current;

    // 3. Lógica para detectar el cruce de los 360° a 0° y viceversa
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    // 4. Acumulamos la rotación total para que sea infinita
    totalRotation.current += delta;
    rotationZ.set(totalRotation.current);
    
    lastAngle.current = currentAngle;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-100 font-sans">
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* FONDO DEL SOBRE */}
              <motion.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#ebeae6] z-0" 
              />

              {/* SOLAPA SUPERIOR */}
              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f9f9f9] origin-top z-40 shadow-xl [clip-path:polygon(0_0,100%_0,50%_100%)] [perspective:1200px]"
              />

              {/* CUERPO DEL SOBRE */}
              <motion.div
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute inset-0 z-30 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] [clip-path:polygon(0_0,50%_50%,100%_0,100%_100%,0_100%)]"
              />
              
              {/* CONTENEDOR DEL VINILO */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="z-50 flex flex-col items-center justify-center px-6"
              >
                <div 
                  className="relative group cursor-none sm:cursor-crosshair"
                  onMouseMove={handleMouseMove}
                >
                  {/* VINILO INTERACTIVO */}
                  <motion.div
                    style={{ rotate: smoothRotateZ }}
                    whileHover={{ scale: 1.05 }}
                    className="relative flex h-48 w-48 sm:h-72 sm:w-72 items-center justify-center rounded-full bg-[#0a0a0a] shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden border-[6px] border-neutral-900"
                  >
                    {/* SURCOS REALISTAS */}
                    <div className="absolute inset-0 opacity-50" 
                      style={{
                        background: `repeating-radial-gradient(
                          circle,
                          #222 0px,
                          #000 1.5px,
                          #222 3px
                        )`
                      }} 
                    />

                    {/* REFLEJOS TIPO "X" DE VINILO */}
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_20deg,transparent_40deg,transparent_140deg,white_160deg,transparent_180deg,transparent_200deg,white_220deg,transparent_240deg,transparent_320deg,white_340deg,transparent_360deg)] opacity-10" />

                    {/* ETIQUETA CENTRAL (Label) */}
                    <div className="z-10 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-[#fcfaf2] border-[4px] border-[#c5a02d] shadow-2xl overflow-hidden ring-8 ring-black/20">
                       <div className="flex flex-col items-center justify-center text-center p-2">
                          <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-1">RECORDS</span>
                          <span className="font-serif text-[14px] sm:text-[20px] leading-tight text-neutral-900 italic font-black">Nuestra<br/>Boda</span>
                          <div className="w-8 h-[1.5px] bg-[#c5a02d] my-2" />
                          <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.3em] text-[#c5a02d] font-extrabold">SIDE A</span>
                       </div>
                    </div>

                    {/* AGUJERO CENTRAL */}
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-neutral-300 rounded-full z-20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                  </motion.div>

                  {/* ÁREA DE CLIC PARA ABRIR */}
                  <button 
                    onClick={() => setIsOpen(true)}
                    className="absolute inset-0 z-30 rounded-full"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 flex flex-col items-center gap-3"
                >
                  <p className="font-serif italic text-neutral-500 text-xl sm:text-2xl tracking-wide select-none">
                    Gira el disco libremente
                  </p>
                  <div className="h-[1px] w-32 bg-neutral-300" />
                  <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.5em] text-neutral-400 font-bold animate-pulse">
                    Click para abrir
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CONTENIDO PRINCIPAL */}
      <main className={`transition-opacity duration-1000 ${!isOpen ? "h-screen overflow-hidden opacity-0" : "min-h-screen opacity-100"}`}>
        {isOpen && (
          <>
            <ReproductorMusica url={musicUrl} autoPlay={true} />
            {children}
          </>
        )}
      </main>
    </div>
  );
}