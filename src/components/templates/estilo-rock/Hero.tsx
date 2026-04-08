"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image"; 
import { bodaTemplateConfig as localConfig } from "@/data/event-config-bodas";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
  eventDate?: string | null;
  eventTime?: string | null;
}

const AnimatedWaveLine = () => (
  <div className="absolute top-[85%] md:top-[90%] -translate-y-[60%] left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
    <motion.svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="relative block w-[300%] h-[61px] md:h-[101px] translate-y-[2px] scale-x-[1.02]"
      style={{ shapeRendering: "geometricPrecision" }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,10 1350,60 V120 H0 Z" fill="white" />
      <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,10 1350,60" fill="none" stroke="#33aba1" strokeWidth="12" />
    </motion.svg>
  </div>
);

export function Hero({ eventName, heroImage, eventDate, eventTime }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finalDate = eventDate || "2026-12-19";
  const finalTime = eventTime || "21:00";
  const currentImage = heroImage || localConfig.imagenes.hero;

  const rawNames = eventName || localConfig.personal.nombre || "Fanny & Rei";
  const namesArray = rawNames.split(/[&,]/);
  const firstName = namesArray[0]?.trim() || "Fanny";
  const lastName = namesArray[1]?.trim() || "Rei";

  const retro3DStyle = { textShadow: `2px 2px 0px #33aba1, 4px 4px 0px #000` };
  const retro3DStyleLarge = { textShadow: `4px 4px 0px #33aba1, 8px 8px 0px #000` };

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
    /* CAMBIO CLAVE: Cambié h-screen por min-h-screen y agregué pb-[15vh] (en mobile) y pb-[20vh] (en desktop).
       Esto crea un "colchón" invisible de espacio al final de la sección que protege al vinilo 
       del solapamiento de la sección siguiente, respetando todo tu diseño absolute.
    */
    <section className="relative min-h-screen flex flex-col items-center bg-white font-sans z-10 pb-[15vh] md:pb-[20vh] overflow-visible">
      
      {/* FONDO OPTIMIZADO CON NEXT/IMAGE */}
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
              alt="Boda Background"
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
              
              <div className="absolute -left-3 md:-left-12 bottom-[-10px] md:bottom-[-18px] w-6 md:w-20 h-full bg-[#7a1927] -z-10 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%,_25%_50%)]"></div>
              <div className="absolute -right-3 md:-right-12 bottom-[-10px] md:bottom-[-18px] w-6 md:w-20 h-full bg-[#7a1927] -z-10 [clip-path:polygon(0%_0%,_100%_0%,_75%_50%,_100%_100%,_0%_100%)]"></div>

              {[
                { label: "DÍAS", value: timeLeft.days },
                { label: "HORAS", value: timeLeft.hours },
                { label: "MIN", value: timeLeft.minutes },
                { label: "SEG", value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1 border-r last:border-none border-white/10">
                  <span 
                    className="text-2xl sm:text-4xl md:text-6xl font-black italic leading-none tracking-tighter text-white"
                    style={retro3DStyle}
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

      <div className="absolute bottom-0 translate-y-[-110px] sm:translate-y-[-140px] md:translate-y-[-200px] z-30 text-center w-full px-2 mb-2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-black italic text-[2.4rem] sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-row items-center justify-center gap-x-2 sm:gap-x-3 rotate-[-8deg] tracking-tighter whitespace-nowrap"
          style={retro3DStyleLarge}
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