"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

// Componente de líneas de velocidad sutiles
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px)`,
        backgroundSize: '8px 100%',
      }}
    />
  </div>
);

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[50px] sm:min-w-[80px] md:min-w-[100px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center"
      >
        <span className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#b5a47a] tracking-tighter leading-none relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="text-[7px] md:text-xs text-white/60 tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 font-light relative z-10">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex h-10 md:h-20 items-center opacity-20 relative z-10">
      <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#b5a47a] to-transparent" />
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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [finalDate, finalTime]);

  if (!mounted) return null;

  return (
    <section id="countdown" className="relative bg-transparent pt-24 pb-44 md:pt-40 md:pb-64 overflow-hidden z-0">
      
      {/* FONDO UNIFICADO */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"        />

      {/* OVERLAY DE LEGIBILIDAD */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      <div className="container mx-auto px-4 relative z-30 text-center">
        <div className="mb-12 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#b5a47a] tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold mb-2 drop-shadow-sm">
              {formattedDate}
            </p>
            <h3 className="font-serif italic text-4xl md:text-6xl text-white drop-shadow-md">
              ¡La fiesta del año!
            </h3>
            <div className="flex justify-center pt-8">
              <div className="w-12 h-[1px] bg-[#b5a47a]/30" />
            </div>
          </motion.div>
        </div>

        {/* CONTENEDOR TIPO MODAL CON SOMBRA NEGRA PROFUNDA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-center bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.9)] border border-white/5"
        >
          <div className="flex justify-center items-center gap-x-2 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
            <CountdownUnit value={timeLeft.days} label="Días" />
            <Separator />
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <Separator />
            <CountdownUnit value={timeLeft.minutes} label="Minutos" />
            <Separator />
            <CountdownUnit value={timeLeft.seconds} label="Segundos" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 uppercase tracking-[0.8em] text-[9px] md:text-[11px] text-[#b5a47a] font-bold drop-shadow-sm"
        >
          Mendoza • Argentina
        </motion.div>
      </div>
    </section>
  );
}