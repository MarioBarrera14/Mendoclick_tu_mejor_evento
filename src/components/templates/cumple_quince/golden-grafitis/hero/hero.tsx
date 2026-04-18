"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  // Si quieres el nombre completo, usa config.eventName. 
  // Si quieres solo el primero (como estilo grafiti), usa firstName.
  const firstName = config.eventName ? config.eventName.split(" ")[0] : "Invitada";
  
  const currentImage = (config.heroImage && config.heroImage !== "") 
    ? config.heroImage 
    : "/images/img-grafitis/hero-placeholder.webp"; 

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date(`${config.eventDate}T${config.eventTime}:00`).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ dias: 0, horas: 0, min: 0, seg: 0 });
      } else {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [config.eventDate, config.eventTime]);

  const formattedDate = config.eventDate.split("-").reverse().join(" . ");

  return (
    <section className="relative h-screen flex flex-col items-center justify-end overflow-hidden bg-[#38b2ac] font-['Permanent_Marker',_cursive]">
      
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentImage} 
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={currentImage}
              alt={config.eventName}
              fill
              className="object-cover object-center brightness-[0.85]"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-0 left-0 w-full z-40 pointer-events-none">
        <div className="w-full h-[100px] md:h-[180px] bg-[#649a8d] opacity-90 [mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [-webkit-mask-size:100%_100%]" />
      </div>

      <div className="relative z-30 flex flex-col items-center text-center px-4 w-full pb-24 md:pb-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-12 h-12 md:w-16 md:h-16 mb-2"
        >
          <Image 
            src="/images/img-grafitis/graffiti-corazon.webp" 
            alt="Corazón"
            fill
            className="object-contain drop-shadow-xl"
          />
        </motion.div>

        <div className="flex flex-col items-center mb-6">
          <p className="text-white text-sm md:text-lg tracking-[0.3em] drop-shadow-lg font-sans font-bold leading-none">
            {formattedDate}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] drop-shadow-2xl uppercase tracking-tighter whitespace-nowrap">
            {/* AQUÍ: Muestra config.eventName para ver el cambio real */}
            {config.eventName}
          </h1>

          <h2 className="text-white text-lg md:text-2xl tracking-wide drop-shadow-lg opacity-95 leading-none mt-1">
            ¡Mis 15!
          </h2>
        </div>

        <div className="text-center">
          <p className="text-white text-[10px] md:text-xs mb-1 font-sans tracking-[0.4em] font-black uppercase opacity-90">Faltan</p>
          <div className="flex gap-4 md:gap-10 items-end justify-center text-white">
            {[
              { val: timeLeft.dias, lab: "Días" },
              { val: timeLeft.horas, lab: "Horas" },
              { val: timeLeft.min, lab: "Mins" },
              { val: timeLeft.seg, lab: "Segs" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center min-w-[45px] md:min-w-[60px]">
                <span className="text-2xl md:text-5xl leading-none">
                    {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[9px] font-sans mt-1 tracking-widest font-bold opacity-80 uppercase">{item.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <div className="w-full h-[120px] md:h-[200px] bg-[#649a8d] opacity-90 [mask-image:url(/images/img-grafitis/graffiti-separador-1a.webp)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-1a.webp)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}