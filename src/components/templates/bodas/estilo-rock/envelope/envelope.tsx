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
  
  const rotationZ = useMotionValue(0);
  const lastAngle = useRef(0);
  const totalRotation = useRef(0);
  const smoothRotateZ = useSpring(rotationZ, { stiffness: 150, damping: 20 });

  // Función genérica para calcular el ángulo (sirve para Mouse y Touch)
  const calculateAngle = (clientX: number, clientY: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    
    let currentAngle = Math.atan2(y, x) * (180 / Math.PI);
    if (currentAngle < 0) currentAngle += 360;
    return currentAngle;
  };

  const handleRotate = (clientX: number, clientY: number, target: HTMLDivElement) => {
    const currentAngle = calculateAngle(clientX, clientY, target);
    let delta = currentAngle - lastAngle.current;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    totalRotation.current += delta;
    rotationZ.set(totalRotation.current);
    lastAngle.current = currentAngle;
  };

  // EVENTO DE MOUSE (PC)
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleRotate(e.clientX, e.clientY, e.currentTarget);
  };

  // EVENTO TÁCTIL (CELULAR)
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Importante: evita que la pantalla se mueva (scroll) mientras girás el disco
    if (e.cancelable) e.preventDefault(); 
    
    const touch = e.touches[0];
    handleRotate(touch.clientX, touch.clientY, e.currentTarget);
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
              <motion.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#ebeae6] z-0" 
              />

              <motion.div
                exit={{ y: "-100%", rotateX: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f9f9f9] origin-top z-40 shadow-xl [clip-path:polygon(0_0,100%_0,50%_100%)]"
              />

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
                <div 
                  className="relative group touch-none" // touch-none es vital para celular
                  onMouseMove={onMouseMove}
                  onTouchMove={onTouchMove}
                >
                  <motion.div
                    style={{ rotate: smoothRotateZ }}
                    whileHover={{ scale: 1.05 }}
                    className="relative flex h-48 w-48 sm:h-72 sm:w-72 items-center justify-center rounded-full bg-[#0a0a0a] shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden border-[6px] border-neutral-900"
                  >
                    <div className="absolute inset-0 opacity-50" 
                      style={{
                        background: `repeating-radial-gradient(circle, #222 0px, #000 1.5px, #222 3px)`
                      }} 
                    />
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_20deg,transparent_40deg,transparent_140deg,white_160deg,transparent_180deg,transparent_200deg,white_220deg,transparent_240deg,transparent_320deg,white_340deg,transparent_360deg)] opacity-10" />

                    <div className="z-10 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-[#fcfaf2] border-[4px] border-[#c5a02d] shadow-2xl overflow-hidden ring-8 ring-black/20">
                        <div className="flex flex-col items-center justify-center text-center p-2">
                          <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-1">RECORDS</span>
                          <span className="font-serif text-[14px] sm:text-[20px] leading-tight text-neutral-900 italic font-black">Nuestra<br/>Boda</span>
                          <div className="w-8 h-[1.5px] bg-[#c5a02d] my-2" />
                          <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.3em] text-[#c5a02d] font-extrabold">SIDE A</span>
                        </div>
                    </div>
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-neutral-300 rounded-full z-20" />
                  </motion.div>

                  <button 
                    onClick={() => setIsOpen(true)}
                    className="absolute inset-0 z-30 rounded-full"
                  />
                </div>
                
                <motion.div className="mt-12 flex flex-col items-center gap-3">
                  <p className="font-serif italic text-neutral-500 text-xl sm:text-2xl tracking-wide select-none text-center">
                    Gira el disco con tu dedo
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