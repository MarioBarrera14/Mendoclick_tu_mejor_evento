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
  // --- REPARACIÓN DE TEXTO ---
  // Esta función convierte "LUZ JAZMIN" a "Luz Jazmin" para que la fuente no se deforme
  const formatName = (text: string) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const nombreEvento = formatName(config.eventName?.trim() || "Mis 15 Años");
  
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

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden font-sans">
      <div 
        className="relative w-full h-[70vh] md:h-[75vh] bg-[#111] overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 0% 100%)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentImage} className="relative w-full h-full">
            <Image
              src={currentImage}
              alt={nombreEvento}
              fill
              priority
              className="object-cover opacity-70 md:opacity-80 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[18%] left-0 w-full z-30 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center text-center text-white"
          >
            <span className="text-white/80 tracking-[0.6em] text-[10px] md:text-[12px] uppercase mb-4 font-light">
              ¡Mis 15 años!
            </span>

            {/* CONTENEDOR REPARADO */}
            <div className="relative w-full overflow-visible px-2">
              <h1 
                className={`
                  font-script text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] text-center normal-case
                  ${nombreEvento.length > 12 
                    ? "text-5xl md:text-7xl lg:text-[7rem] leading-[1.4]" 
                    : "text-6xl md:text-8xl lg:text-[9rem] leading-[1.2]"}
                `}
                style={{ wordBreak: 'keep-all', textTransform: 'none' }}
              >
                {nombreEvento}
              </h1>
            </div>

            <div className="w-16 h-[1px] bg-[#b5a47a] my-8 opacity-60" />
            
            <span className="text-[11px] md:text-sm tracking-[0.5em] font-medium uppercase text-white/90">
              {config.eventDate.split("-").reverse().join(" . ") }
            </span>
          </motion.div>
        </div>
      </div>

      {/* --- CONTADOR --- */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 bg-white">
        <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-bold mb-8">
          Faltan solo
        </p>
        
        <div className="flex gap-4 md:gap-10">
          {[
            { label: "Días", value: timeLeft.dias },
            { label: "Horas", value: timeLeft.horas },
            { label: "Min", value: timeLeft.min },
            { label: "Seg", value: timeLeft.seg },
          ].map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-[#b5a47a]/30 flex flex-col items-center justify-center mb-2 shadow-sm">
                <span className="text-xl md:text-3xl font-light text-zinc-800 tracking-tighter">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[9px] uppercase tracking-[0.1em] text-[#b5a47a] font-bold">
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