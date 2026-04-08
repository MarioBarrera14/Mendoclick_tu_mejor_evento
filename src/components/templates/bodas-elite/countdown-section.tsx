"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[70px] sm:min-w-[100px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center"
      >
        <span className="text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none relative z-10">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="text-[7px] md:text-xs text-white/40 tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 font-light relative z-10">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex h-10 md:h-20 items-center opacity-20 relative z-10">
      <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
    </div>
  );
}

export function CountdownSection({ eventDate, eventTime }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finalDate = eventDate || "2026-12-28";
  const finalTime = eventTime || "18:00";

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
    <section id="countdown" className="relative bg-black pt-24 pb-44 md:pt-40 md:pb-64 overflow-visible z-20">
      <div className="container mx-auto px-4 relative z-30 text-center">
        <div className="mb-12 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/60 tracking-[0.5em] text-[10px] md:text-xs uppercase font-light mb-2">
              {formattedDate}
            </p>
            <h3 className="font-serif italic text-4xl md:text-6xl text-white drop-shadow-md">
              ¡La fiesta del año!
            </h3>
            <div className="flex justify-center pt-8">
              <div className="w-12 h-[1px] bg-white/20" />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-x-1 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
          <CountdownUnit value={timeLeft.days} label="Días" />
          <Separator />
          <CountdownUnit value={timeLeft.hours} label="Horas" />
          <Separator />
          <CountdownUnit value={timeLeft.minutes} label="Minutos" />
          <Separator />
          <CountdownUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 uppercase tracking-[0.8em] text-[9px] md:text-[11px] text-white font-bold"
        >
          Mendoza • Argentina
        </motion.div>
      </div>

      {/* DIVISOR CORREGIDO: Se eliminaron los comandos que cerraban el rectángulo abajo */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none" 
          className="relative block w-[calc(100%+2px)] h-[60px] md:h-[100px]"
        >
          <path 
            d="M0,60 L50,45 L100,55 L150,40 L200,55 L250,35 L300,55 L350,40 L400,50 L450,35 L500,50 L550,35 L600,55 L650,40 L700,55 L750,45 L800,55 L850,40 L900,50 L950,35 L1000,45 L1050,35 L1100,50 L1150,40 L1200,60 V60 H0 Z" 
            fill="#fafafa"
          ></path>
        </svg>
      </div>
    </section>
  );
}