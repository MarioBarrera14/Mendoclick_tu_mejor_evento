"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// 1. Definimos las props que vienen del padre
interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
      <span className="text-5xl md:text-7xl font-serif text-white tracking-tighter">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] md:text-xs text-white/50 tracking-[0.3em] uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ eventDate, eventTime }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Valores finales (DB o Fallback)
  const finalDate = eventDate || "2026-12-19";
  const finalTime = eventTime || "21:00";

  // 2. Formateamos la fecha para el texto (se calcula una sola vez)
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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [finalDate, finalTime]);

  if (!mounted) return null;

  return (
    <section className="relative bg-black pt-16 pb-32 md:pb-48 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <div className="mb-14 space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white tracking-[0.4em] text-[10px] md:text-xs uppercase font-light"
          >
            {formattedDate}
          </motion.p>
          <p className="font-serif italic text-xl md:text-2xl text-white opacity-80">
            ¡La fiesta del año!
          </p>
          <div className="pt-8">
            <p className="text-white/40 text-[9px] tracking-[0.5em] uppercase">Faltan..</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-10">
          <CountdownUnit value={timeLeft.days} label="Días" />
          <CountdownUnit value={timeLeft.hours} label="Horas" />
          <CountdownUnit value={timeLeft.minutes} label="Minutos" />
          <CountdownUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[120px]"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}