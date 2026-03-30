"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[75px] md:min-w-[120px] relative z-20">
      <motion.span 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-serif text-amber-50 tracking-tighter drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] md:text-xs text-amber-200/50 tracking-[0.4em] uppercase mt-2 font-bold">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ eventDate, eventTime }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finalDate = eventDate || "2026-12-19";
  const finalTime = eventTime || "21:00";

  const formattedDate = useMemo(() => {
    const dateParts = finalDate.split("-");
    const dateForText = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateForText.toLocaleDateString('es-ES', options).toUpperCase();
  }, [finalDate]);

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

  if (!mounted) return null;

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-48 overflow-visible bg-[#1e0f00]">
      
      {/* FONDO DE GRADIENTE CINEMATOGRÁFICO */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(116, 73, 17, 1) 0%, rgba(30, 15, 0, 1) 100%)"
        }}
      />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="mb-16 space-y-4">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-amber-200/60 text-[10px] md:text-xs uppercase font-semibold"
          >
            {formattedDate}
          </motion.p>
          <h2 className="font-serif italic text-4xl md:text-7xl text-amber-50 drop-shadow-2xl">
            ¡La fiesta del año!
          </h2>
          <div className="pt-8 flex flex-col items-center gap-2">
            <div className="h-8 w-[1px] bg-gradient-to-b from-amber-500/50 to-transparent" />
            <p className="text-amber-400/40 text-[9px] tracking-[0.6em] uppercase font-black">Cuenta Regresiva</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-12 bg-white/5 backdrop-blur-sm py-10 px-6 md:px-12 rounded-3xl border border-white/10 shadow-2xl">
          <CountdownUnit value={timeLeft.days} label="Días" />
          <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
          <CountdownUnit value={timeLeft.hours} label="Horas" />
          <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
          <CountdownUnit value={timeLeft.minutes} label="Minutos" />
          <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
          <CountdownUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>

      {/* --- SEPARADOR DE ONDAS SVG --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50 transform translate-y-[98%]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[80px] md:h-[150px]"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#1e0f00" // <--- Aquí está el truco: color exacto del fondo de la galería
          ></path>
        </svg>
      </div>
    </section>
  );
}