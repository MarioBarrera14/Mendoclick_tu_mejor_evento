"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
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
  const currentImage = config.heroImage || "/Demo1.webp";
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date(`${config.eventDate}T${config.eventTime}:00`).getTime();
    const now = Date.now();
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

  // Formateo de fecha memoizado para evitar recalcular en cada segundo del contador
  const formattedDate = useMemo(() => {
    return new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).toUpperCase();
  }, [config.eventDate]);

  const ballVariants: Variants = {
    animate: (delay: number) => ({
      y: [0, 12, 0],
      rotate: [-1, 1, -1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
    }),
  };

  const starClipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#050505] py-12">
      
      {/* CAPA DE VIDEO OPTIMIZADA */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-[1.15]"
        >
          <source src="/movie/Video_de_Esferas_de_Espejos.WebM" type="video/webm" />
        </video>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/20 via-transparent to-[#050505]" />
        
        {/* DISCO BALLS CON OPTIMIZACIÓN DE IMAGEN */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <motion.div variants={ballVariants} custom={0} animate="animate" className="absolute -left-12 top-[10%] w-40 md:w-80 opacity-40 blur-[0.5px]">
            <Image src="/boll.webp" alt="disco ball" width={320} height={320} priority />
          </motion.div>
          <motion.div variants={ballVariants} custom={1.5} animate="animate" className="absolute -right-12 top-[20%] w-32 md:w-72 opacity-30 blur-[1px]">
            <Image src="/boll.webp" alt="disco ball flip" width={320} height={320} className="scale-x-[-1]" />
          </motion.div>
        </div>

        <NeonDivider />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="relative z-50 flex flex-col items-center text-center px-4 w-full flex-grow justify-center -mt-10">
        
        {/* Contenedor de Estrella con Aspect Ratio para evitar CLS */}
        <div className="relative w-[240px] md:w-[340px] aspect-square mb-8">
          <div className="absolute inset-0 bg-purple-600/40 blur-[50px] scale-110" style={{ clipPath: starClipPath }} />
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full p-[2px] bg-gradient-to-tr from-purple-300 via-purple-100 to-purple-400" 
            style={{ clipPath: starClipPath }}
          >
            <div className="w-full h-full overflow-hidden bg-zinc-900" style={{ clipPath: starClipPath }}>
              <Image 
                src={currentImage} 
                fill 
                sizes="(max-width: 768px) 240px, 340px"
                className="object-cover hover:scale-105 transition-transform duration-700" 
                alt="Retrato principal" 
                priority 
              />
            </div>
          </motion.div>
        </div>

        {/* Fecha */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-4 px-5 py-1.5 border border-white/10 backdrop-blur-xl -rotate-1 bg-white/5 rounded-sm"
        >
          <span className="text-white text-[10px] md:text-xs font-black tracking-[0.5em] uppercase">
            {formattedDate}
          </span>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <h1 
            className="text-7xl sm:text-8xl md:text-[10rem] font-black italic uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.3), 3px 3px 0px #7c3aed",
            }}
          >
            {config.eventName}
          </h1>
          <div className="mt-4 -rotate-3">
            <span className="font-script text-5xl sm:text-6xl md:text-8xl text-purple-100 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              Mis 15 Años
            </span>
          </div>
        </motion.div>
      </div>

      {/* CONTADOR OPTIMIZADO */}
      <div className="relative z-50 w-full flex flex-col items-center pb-12">
        <div className="grid grid-cols-4 gap-4 md:gap-12 text-white border-t border-white/5 pt-10 px-4">
          {[
            { label: "Días", value: timeLeft.dias },
            { label: "Horas", value: timeLeft.horas },
            { label: "Mins", value: timeLeft.min },
            { label: "Segs", value: timeLeft.seg },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-7xl font-black italic tabular-nums leading-none tracking-tighter">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-purple-400 font-black mt-3">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}