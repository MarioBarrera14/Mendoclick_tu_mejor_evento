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

// Divisor de neón recuperado y optimizado
const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[2px] md:h-[4px] z-[30]">
    <div className="absolute inset-0 bg-purple-500 blur-[4px] md:blur-[8px] opacity-100" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-[20px] md:h-[40px] bg-gradient-to-t from-purple-600/30 to-transparent" />
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

  const formattedDate = useMemo(() => {
    return new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).toUpperCase();
  }, [config.eventDate]);

  const ballVariants: Variants = {
    animate: (delay: number) => ({
      y: [0, 15, 0],
      rotate: [-1, 1, -1],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
    }),
  };

  const starClipPath = "polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0% 38%, 37% 38%)";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-[#020202] py-10 md:py-0 p-4">
      
      {/* BACKGROUND OPTIMIZADO */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-[0.4] contrast-[1.1]">
          <source src="https://res.cloudinary.com/diqipcpuu/video/upload/v1777001514/Video_de_Esferas_de_Espejos_rig1xl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/30 via-transparent to-[#020202]" />

        {/* DISCO BALLS RESPONSIVAS */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <motion.div variants={ballVariants} custom={0} animate="animate" className="absolute -left-10 md:-left-12 top-[5%] w-32 md:w-80 opacity-30 blur-[1px]">
            <Image src="/boll.webp" alt="disco ball" width={320} height={320} priority />
          </motion.div>
          <motion.div variants={ballVariants} custom={2} animate="animate" className="absolute -right-10 md:-right-12 top-[15%] w-28 md:w-72 opacity-20 blur-[1.5px]">
            <Image src="/boll.webp" alt="disco ball flip" width={320} height={320} className="scale-x-[-1]" />
          </motion.div>
        </div>

        {/* Línea de Neón Divisoria */}
        <NeonDivider />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-50 flex flex-col items-center w-full max-w-4xl space-y-6 md:space-y-8">
        
        {/* ESTRELLA RESPONSIVA CON NEÓN */}
        <div className="relative flex-shrink-0 group">
          <div className="absolute inset-0 bg-purple-500 blur-[30px] md:blur-[50px] opacity-40 scale-125 animate-pulse" style={{ clipPath: starClipPath }} />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 p-[2px] md:p-[3px] bg-gradient-to-tr from-purple-400 via-white to-[#33aba1] shadow-[0_0_35px_rgba(168,85,247,0.6)]"
            style={{ clipPath: starClipPath }}
          >
            <div className="w-full h-full bg-zinc-950 overflow-hidden" style={{ clipPath: starClipPath }}>
              <Image src={currentImage} fill className="object-cover brightness-[1.1] contrast-[1.05]" alt="Luz Jazmin" priority />
            </div>
          </motion.div>
          
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-500/30 backdrop-blur-xl border border-purple-400/40 px-3 md:px-4 py-1 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(168,85,247,0.3)]">
             <span className="text-purple-100 text-[9px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.4em]">{formattedDate}</span>
          </div>
        </div>

        {/* TEXTO RESPONSIVO */}
        <div className="text-center px-2">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="relative text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-black italic uppercase leading-tight md:leading-none tracking-[0.02em] md:tracking-[0.05em] text-white">
              <span className="absolute inset-0 text-purple-600 blur-[8px] md:blur-[12px] opacity-70 select-none">{config.eventName}</span>
              <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                {config.eventName}
              </span>
            </h1>
            
            <div className="mt-2 md:mt-6 transform -rotate-2">
              <span className="font-script text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-purple-50 drop-shadow-[0_0_10px_rgba(168,85,247,1)] tracking-wide">
                Mis 15 Años
              </span>
            </div>
          </motion.div>
        </div>

        {/* CONTADOR RESPONSIVO */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-10 mt-4 md:mt-10">
          {[
            { label: "Días", value: timeLeft.dias },
            { label: "Horas", value: timeLeft.horas },
            { label: "Mins", value: timeLeft.min },
            { label: "Segs", value: timeLeft.seg },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center bg-white/5 md:bg-transparent p-2 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none border border-white/5 md:border-none">
              <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black italic text-white tabular-nums tracking-tighter">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[7px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.3em] text-[#33aba1] font-black mt-1 md:mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}