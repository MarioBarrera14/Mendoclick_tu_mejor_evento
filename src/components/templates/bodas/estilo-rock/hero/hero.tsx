"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image"; 

interface HeroProps {
  config: {
    eventName: string;   
    eventDate: string;   
    eventTime: string;   
    heroImage?: string | null; 
  }
}

const AnimatedWaveLine = () => (
  <div className="absolute top-[85%] md:top-[90%] -translate-y-[68%] left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
    <motion.div
      /* Contenedor del 200% para la animación infinita */
      className="flex w-[200%] h-[61px] md:h-[101px]"
      /* Animamos de 0% a -50% (un ciclo perfecto de una pantalla) */
      animate={{ x: ["0%", "-50%"] }} 
      transition={{ 
        duration: 18, // Velocidad de flujo (ajusta este número si la quieres más rápida o lenta)
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      {/* Usamos dos bloques idénticos */}
      {[0, 1].map((i) => (
        <div key={i} className="relative w-full h-full flex shrink-0">
          <svg
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            /* TÉCNICA DE SOLAPADO:
              1. Aumentamos ligeramente el ancho al 101%.
              2. Con el -1% de margin-right, el segundo SVG se mete debajo del primero.
              3. Con scale-x-[1.002] forzamos a que el dibujo se estire un micro-píxel más.
              Todo esto combinado elimina el hueco vertical.
            */
            className="h-full w-[101%] -mr-[1%] shrink-0 scale-x-[1.002] translate-y-[2px] [shape-rendering:geometricPrecision]"
          >
            {/* ONDA INFALIBLE: Mismos puntos inicial y final */}
            <path 
              d="M0,60 C125,120 125,0 250,60 C375,120 375,0 500,60 C625,120 625,0 750,60 C875,120 875,0 1000,60 V120 H0 Z" 
              fill="white" 
            />
            <path 
              d="M0,59 C125,120 125,0 250,60 C375,120 375,0 500,60 C625,120 625,0 750,60 C875,120 875,0 1000,60" 
              fill="none" 
              stroke="#33aba1" 
              strokeWidth="12" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </motion.div>
  </div>
);

export function Hero({ config }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finalDate = config.eventDate;
  const finalTime = config.eventTime;
  const currentImage = config.heroImage || "/img_boda/vintage.png";

  const namesArray = config.eventName.split("&");
  const firstName = namesArray[0]?.trim() || "Juli";
  const lastName = namesArray[1]?.trim() || "Mario";

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const target = new Date(`${finalDate}T${finalTime}:00`).getTime();
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [finalDate, finalTime]);

  if (!mounted) return <section className="h-screen bg-white" />;

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-white font-sans z-10 pb-[15vh] md:pb-[20vh] overflow-visible">
      
      {/* FONDO DINÁMICO */}
      <div className="absolute inset-0 z-0 h-[85%] md:h-[90%] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentImage} 
            className="relative w-full h-full"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <Image 
              src={currentImage} 
              alt="Wedding Background"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatedWaveLine />

      {/* VINILO Y CONTADOR */}
      <div className="absolute bottom-0 translate-y-[26%] md:translate-y-[34%] z-20 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative w-[320px] sm:w-[480px] md:w-[800px] aspect-square flex items-center justify-center"
        >
          <Image 
            src="/img-rock/vinil_regresivo-removebg-preview.png"
            alt="Vinilo"
            fill
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />

          <div className="relative z-10 w-[85%] md:w-[60%] flex flex-col items-center">
            <div className="relative bg-[#a02133] w-full py-3 md:py-6 flex justify-around items-center shadow-2xl">
              
              <div className="absolute -left-3 md:-left-12 bottom-[-10px] md:bottom-[-18px] w-6 md:w-20 h-full bg-[#7a1927] -z-10 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%,25%_50%)]"></div>
              <div className="absolute -right-3 md:-right-12 bottom-[-10px] md:bottom-[-18px] w-6 md:w-20 h-full bg-[#7a1927] -z-10 [clip-path:polygon(0%_0%,100%_0%,75%_50%,100%_100%,0%_100%)]"></div>

              {[
                { label: "DÍAS", value: timeLeft.days },
                { label: "HORAS", value: timeLeft.hours },
                { label: "MIN", value: timeLeft.minutes },
                { label: "SEG", value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1 border-r last:border-none border-white/10">
                  <span 
                    className="text-2xl sm:text-4xl md:text-6xl font-black italic leading-none tracking-tighter text-white [text-shadow:2px_2px_0px_#33aba1,4px_4px_0px_#000]"
                  >
                    {item.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[7px] md:text-[10px] uppercase font-bold mt-1 tracking-widest text-white/90">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* TÍTULO PRINCIPAL (Nombres) */}
      <div className="absolute bottom-0 translate-y-[-110px] sm:translate-y-[-140px] md:translate-y-[-200px] z-30 text-center w-full px-2 mb-2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-black italic text-[2.4rem] sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-row items-center justify-center gap-x-2 sm:gap-x-3 rotate-[-8deg] tracking-tighter whitespace-nowrap [text-shadow:4px_4px_0px_#33aba1,8px_8px_0px_#000]"
        >
          <span>{firstName}</span>
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[#a02133] text-2xl sm:text-4xl md:text-5xl mx-1"
          >
            ♥
          </motion.span>
          <span>{lastName}</span>
        </motion.h1>

        <div className="mt-1 sm:mt-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-white uppercase tracking-[0.2em] font-black text-[9px] sm:text-[10px] md:text-xl drop-shadow-lg">
             <span className="h-[1.5px] w-4 sm:w-6 md:w-10 bg-[#33aba1]"></span>
             ¡NOS CASAMOS!
             <span className="h-[1.5px] w-4 sm:w-6 md:w-10 bg-[#33aba1]"></span>
          </div>
          <div className="mt-1 sm:mt-2">
             <div className="bg-[#fdfcf0] border-2 border-black text-black font-black px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-sm text-[9px] sm:text-xs md:text-xl shadow-[3px_3px_0px_#a02133] inline-block tracking-widest -rotate-2">
               {finalDate.split('-').reverse().join(' . ')}
             </div>
          </div>
        </div>
      </div>

    </section>
  );
}