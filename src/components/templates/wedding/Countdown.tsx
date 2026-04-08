"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  eventDate?: string | null;
  eventTime?: string | null;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 flex-1 min-w-[70px] max-w-[100px]">
      {/* Tamaño reducido: w-16 en móvil, w-24 en desktop */}
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white/50 backdrop-blur-md border border-[#4B664B]/10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm">
        <span className="text-2xl md:text-5xl font-serif text-[#4B664B]">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[8px] md:text-xs text-[#4B664B]/70 tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold">
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

  const wavePath = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

  if (!mounted) return null;

  return (
    <section 
      className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/footers.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#94a994]/50 z-0" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Tarjeta achicada: max-w-2xl y padding reducido en móvil */}
        <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-6 py-10 md:p-12 shadow-xl border border-white/40 text-center">
          
          <div className="mb-8 md:mb-12 space-y-2">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#4B664B] tracking-[0.3em] text-[10px] md:text-xs uppercase font-black"
            >
              {formattedDate}
            </motion.p>
            <h2 className="font-serif italic text-3xl md:text-5xl text-[#4B664B] leading-tight px-2">
              ¡La fiesta del año!
            </h2>
            <div className="pt-4">
              <p className="text-[#4B664B]/40 text-[10px] md:text-[13px] tracking-[0.4em] uppercase font-bold">Faltan..</p>
            </div>
          </div>

          {/* Grid responsive para los contadores */}
          <div className="flex flex-row justify-center items-center gap-2 md:gap-6 max-w-md mx-auto">
            <CountdownUnit value={timeLeft.days} label="Días" />
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <CountdownUnit value={timeLeft.seconds} label="Seg" />
          </div>
        </div>
      </div>

      {/* --- OLAS INFERIORES ADAPTADAS --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[200%] h-[50px] md:h-[100px]"
          style={{ rotate: 180 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          <path d={wavePath} fill="#ffffff" fillOpacity="0.25" />
          <path d={wavePath} x="1200" fill="#ffffff" fillOpacity="0.25" />
        </motion.svg>

        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 left-0 block w-[200%] h-[40px] md:h-[80px]"
          style={{ rotate: 180 }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={wavePath} fill="#F9FAF7" />
          <path d={wavePath} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>
    </section>
  );
}