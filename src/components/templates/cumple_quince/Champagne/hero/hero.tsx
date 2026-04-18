"use client";

import { motion, AnimatePresence } from "framer-motion";
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

export function Hero({ config }: HeroProps) {
  const nombreEvento = config.eventName || "Boda & Especial";
  
  const currentImage = (config.heroImage && config.heroImage !== "") 
    ? config.heroImage 
    : "/img_demo/1.webp";

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date(`${config.eventDate}T${config.eventTime}:00`).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      });
    }
  }, [config.eventDate, config.eventTime]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Lógica para separar nombres y poner el corazón
  const names = nombreEvento.split(/ [&y] /);

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* --- PARTE SUPERIOR (IMAGEN) --- */}
      <div 
        className="relative w-full h-[70vh] md:h-[75vh] bg-[#111] overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentImage} className="relative w-full h-full">
            <Image
              src={currentImage}
              alt={nombreEvento}
              fill
              priority
              className="object-cover opacity-70 md:opacity-80 brightness-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[15%] left-0 w-full z-30 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center text-center text-white"
          >
            <span className="text-white/60 tracking-[0.6em] text-[10px] uppercase mb-4 font-light">
            ¡Mis 15!
            </span>

            <h1 className="font-script text-6xl md:text-8xl lg:text-[8rem] text-white leading-tight drop-shadow-2xl">
              {names[0]} 
              {names[1] && (
                <>
                  <span className="text-2xl md:text-5xl lg:text-6xl inline-block animate-pulse text-white/80 mx-2">♥</span> 
                  {names[1]}
                </>
              )}
            </h1>

            <div className="w-16 h-px bg-[#b5a47a]/40 my-6" />
            
            <span className="text-[10px] md:text-xs tracking-[0.5em] font-light uppercase text-white/70">
              {config.eventDate.split("-").reverse().join(" · ")}
            </span>
          </motion.div>
        </div>
      </div>

      {/* --- PARTE INFERIOR (CONTADOR ESTILO HERO 1) --- */}
{/* --- PARTE INFERIOR (CONTADOR CON CÍRCULOS DORADOS) --- */}
<div className="flex-1 flex flex-col items-center justify-center py-12 bg-white">
  <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-light mb-8">
    Faltan solo
  </p>
  
  <div className="flex gap-4 md:gap-8">
    {[
      { label: "Días", value: timeLeft.dias },
      { label: "Horas", value: timeLeft.horas },
      { label: "Min", value: timeLeft.min },
      { label: "Seg", value: timeLeft.seg },
    ].map((unit, index) => (
      <div key={index} className="flex flex-col items-center">
        {/* Círculo Dorado */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#b5a47a]/40 flex flex-col items-center justify-center mb-2 group hover:border-[#b5a47a] transition-colors duration-500">
          <span className="text-xl md:text-2xl font-light text-gray-800 tracking-tighter">
            {unit.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[7px] md:text-[8px] uppercase tracking-[0.1em] text-[#b5a47a]">
            {unit.label}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
}