"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const serifFont = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "700"] 
});

const scriptFont = Great_Vibes({ 
  subsets: ["latin"], 
  weight: ["400"] 
});

interface HeroSectionProps {
  heroImage?: string | null;
  eventName?: string | null;
  eventDate?: string | null;
}

// --- TIMER COMPONENT ---
function CountdownTimer({ targetDateStr }: { targetDateStr: string }) {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const timeUnits = [
    { label: "Días", value: timeLeft.días },
    { label: "Hs", value: timeLeft.horas },
    { label: "Min", value: timeLeft.min },
    { label: "Seg", value: timeLeft.seg },
  ];

  return (
    <div className={`flex gap-4 md:gap-6 mt-4 ${serifFont.className}`}>
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-bold tracking-tighter text-white">
            {unit.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-white/50 mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- MAIN HERO SECTION ---
export function HeroSection({ heroImage, eventName, eventDate }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [yPos, setYPos] = useState(0);

  // FUNCIÓN DE REPARACIÓN: Corrige "LUZ JAZMIN" -> "Luz Jazmin"
  const formatName = (text: string) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const cleanEventName = formatName(eventName?.trim() || "Nuestra Boda");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useMotionValueEvent(opacityTransform, "change", (latest) => setOpacity(latest));
  useMotionValueEvent(yTransform, "change", (latest) => setYPos(latest));

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full flex items-end justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: yPos }} className="relative w-full h-full">
          <Image
            src={heroImage || "/img_boda/bode_casado.webp"}
            alt={cleanEventName}
            fill
            priority
            className="object-cover opacity-60 md:opacity-80 brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-20 w-full max-w-7xl px-6 pb-20 md:pb-24 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <div className="flex flex-col items-center md:items-start w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-white/60 tracking-[0.6em] text-[10px] uppercase mb-4 font-light ${serifFont.className}`}
          >
            Nuestra Boda
          </motion.span>
          
          <div className="relative w-full overflow-visible">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`${scriptFont.className} text-white drop-shadow-2xl py-4 normal-case
                ${cleanEventName.length > 15 
                  ? "text-5xl md:text-7xl lg:text-[7rem] leading-[1.4]" 
                  : "text-6xl md:text-8xl lg:text-[9rem] leading-[1.2]"}
              `}
              style={{ textTransform: 'none' }}
            >
              {cleanEventName}
            </motion.h1>
          </div>

          <div className="w-16 h-px bg-[#b5a47a]/40 my-6" />

          <div className="flex flex-col items-center md:items-start">
            <p className={`text-[9px] tracking-[0.4em] uppercase text-white/40 font-light ${serifFont.className}`}>
              Faltan solo
            </p>
            <CountdownTimer targetDateStr={eventDate || "2026-12-31T00:00:00"} />
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <button onClick={scrollToContent} className="group flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-5 h-5 text-white stroke-[1px]" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}