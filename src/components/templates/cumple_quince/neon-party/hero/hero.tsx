"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface HeroProps {
  config: {
    eventName: string;
    eventDate: string;
    eventTime: string;
    heroImage?: string | null;
  };
}

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function Hero({ config }: HeroProps) {
  // 1. RESTAURACIÓN DEL VIDEO DE FONDO
  const videoFondo = "/movie/Video_de_Esferas_de_Espejos.mp4"; 
  
  const currentImage = config.heroImage || "/Demo1.webp";
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  const calculateTimeLeft = useCallback(() => {
    // Configuración dinámica del contador basado en las props
    const targetDate = new Date(`${config.eventDate}T${config.eventTime}:00`).getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }
  }, [config.eventDate, config.eventTime]);

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const formattedDate = new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  const ballVariants: Variants = {
    animate: (delay: number) => ({
      y: [0, 15, 0],
      rotate: [-2, 2, -2],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
    }),
  };

  const starClipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#0a0a0a] py-12">
      
      {/* CAPA DE VIDEO */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.40] contrast-[1.1]"
        >
          <source src={videoFondo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/10 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        
        <div className="absolute inset-0 z-20 pointer-events-none">
          <motion.div variants={ballVariants} custom={0} animate="animate" className="absolute -left-10 top-[15%] w-48 md:w-80 opacity-40 blur-[1px]">
            <Image src="/boll.webp" alt="disco ball" width={400} height={400} />
          </motion.div>
          <motion.div variants={ballVariants} custom={1} animate="animate" className="absolute -right-10 top-[25%] w-40 md:w-72 opacity-30 blur-[2px]">
            <Image src="/boll.webp" alt="disco ball" width={400} height={400} className="scale-x-[-1]" />
          </motion.div>
        </div>

        <NeonDivider />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="relative z-50 flex flex-col items-center text-center px-4 w-full flex-grow justify-center mt-[-2vh]">
        
        {/* Estrella - TAMAÑO AGRANDADO AQUÍ */}
        <div className="relative w-[220px] md:w-[320px] aspect-square mb-8">
          <div className="absolute inset-0 bg-purple-500 blur-[40px] opacity-60 scale-110" style={{ clipPath: starClipPath }} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full p-[3px] bg-gradient-to-b from-purple-200 to-purple-500" 
            style={{ clipPath: starClipPath }}
          >
            <div className="w-full h-full overflow-hidden bg-[#1a1a1a]" style={{ clipPath: starClipPath }}>
              <Image src={currentImage} fill className="object-cover" alt="Hero" priority />
            </div>
          </motion.div>
        </div>

        {/* Cintillo de Fecha */}
        <div className="mb-4 px-4 py-1 border border-white/20 backdrop-blur-md -rotate-1 bg-white/5">
          <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
            {formattedDate}
          </span>
        </div>

        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl font-black italic uppercase leading-none tracking-tighter text-white"
            style={{
              textShadow: "0 0 5px #fff, 2px 2px 0px #a855f7, 0 0 20px rgba(168, 85, 247, 0.4)",
            }}
          >
            {config.eventName}
          </h1>
          <div className="mt-4 transform -rotate-2">
            <span className="font-script text-4xl sm:text-6xl md:text-7xl text-purple-200 drop-shadow-[0_0_15px_rgba(168, 85, 247, 0.9)]">
              Mis 15 Años
            </span>
          </div>
        </motion.div>
      </div>

      {/* CONTADOR CONFIGURADO */}
      <div className="relative z-50 w-full flex flex-col items-center pb-8">
        <div className="flex gap-4 md:gap-10 text-white border-t border-white/10 pt-8 px-6 md:px-12">
          {[
            { label: "Días", value: timeLeft.dias },
            { label: "Horas", value: timeLeft.horas },
            { label: "Minutos", value: timeLeft.min },
            { label: "Segundos", value: timeLeft.seg },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center min-w-[60px] md:min-w-[100px]">
              <span className="text-3xl md:text-6xl font-bold italic tabular-nums leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-purple-300 font-bold mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}