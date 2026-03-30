"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    /* Reducimos el min-w en móvil (60px) y aumentamos en md (120px) */
    <div className="flex flex-col items-center min-w-[60px] md:min-w-[120px] relative z-20">
      <motion.span 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        /* Tamaño de fuente ajustable: text-3xl en móvil, text-7xl en desktop */
        className="text-3xl sm:text-4xl md:text-7xl font-black italic text-white tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-[8px] md:text-xs text-purple-200/50 tracking-[0.2em] md:tracking-[0.4em] uppercase mt-1 md:mt-2 font-bold">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ eventDate, eventTime }: CountdownProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finalDate: string = eventDate || "2026-10-11";
  const finalTime: string = eventTime || "21:00";

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
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-24 md:pt-48 md:pb-48 overflow-hidden -mt-1">
      
      {/* --- FONDO --- */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #ddd6fe 0%, #c4b5fd 35%, #9333ea 100%)" }}
      />

      <div 
        className="absolute inset-0 z-11 opacity-[0.1]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '30px 30px md:40px 40px' 
        }} 
      />

      <div className="absolute inset-0 z-12 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.5)]" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="mb-8 md:mb-16 space-y-2 md:space-y-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-900/50 text-[9px] md:text-xs uppercase font-bold tracking-[0.3em]"
          >
            {formattedDate}
          </motion.p>
          <h2 className="text-3xl md:text-7xl font-black italic text-black uppercase tracking-tighter">
            Falta muy poco
          </h2>
        </div>

        {/* CONTENEDOR PRINCIPAL: Ajustado para que no desborde en móvil */}
        <div className="inline-flex justify-center items-center gap-2 md:gap-12 bg-black/90 backdrop-blur-md py-6 px-4 md:py-10 md:px-12 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl max-w-full">
          <CountdownUnit value={timeLeft.days} label="Días" />
          <div className="h-8 w-[1px] bg-white/10" /> {/* Visible también en móvil pero más pequeño */}
          <CountdownUnit value={timeLeft.hours} label="Horas" />
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" /> 
          <CountdownUnit value={timeLeft.minutes} label="Minutos" />
          <div className="h-8 w-[1px] bg-white/10" />
          <CountdownUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
}