"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const [opacity, setOpacity] = useState(1);
  const [yPos, setYPos] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transformaciones
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Escuchamos los cambios para actualizar los estados de React
  // Esto evita el conflicto de tipos en el prop animate
  useMotionValueEvent(opacityTransform, "change", (latest) => {
    setOpacity(latest);
  });

  useMotionValueEvent(yTransform, "change", (latest) => {
    setYPos(latest);
  });

  const scrollToContent = () => {
    const element = document.getElementById("countdown");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* --- CAPA DE IMAGEN --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ y: yPos }}
          transition={{ type: "spring", bounce: 0, duration: 0 }}
          className="relative w-full h-full"
        >
          <Image
            src="/img_boda/bode_casado.jpg"
            alt="Fondo Boda"
            fill
            priority
            className="object-cover opacity-60 md:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </motion.div>
        <div className="absolute inset-0 z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      </div>

      {/* --- CONTENEDOR CENTRAL --- */}
      <motion.div
        animate={{ opacity: opacity }}
        transition={{ duration: 0 }}
        className="relative z-20 text-center px-6 flex flex-col items-center justify-center gap-8 md:gap-12 w-full mt-20"
      >
        <div className="w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="block text-white/60 tracking-[0.6em] text-[10px] md:text-xs uppercase mb-4 font-light font-sans"
          >
            Nuestra Boda
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-5xl md:text-8xl lg:text-[9rem] text-white leading-tight drop-shadow-2xl flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 px-4"
          >
            <span className="whitespace-nowrap">Flor</span>
            <span className="text-2xl md:text-5xl lg:text-6xl inline-block transform translate-y-1 md:translate-y-3 opacity-90 text-white/80 animate-pulse">
              ♥
            </span>
            <span className="whitespace-nowrap">Santi</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-white"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.5em] uppercase mb-2 font-sans">
            ¡Nos Casamos!
          </h2>
          <div className="w-10 h-[1px] bg-white/20 mx-auto mb-4" />
          <p className="text-[10px] sm:text-xs italic font-light tracking-[0.2em] opacity-60 font-sans">
            y queremos compartirlo con vos
          </p>
        </motion.div>
      </motion.div>

      {/* --- BOTÓN INFERIOR --- */}
      <motion.div 
        animate={{ opacity: opacity }}
        transition={{ duration: 0 }}
        className="absolute bottom-12 z-30 flex flex-col items-center gap-4"
      >
        <button 
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 active:scale-95 touch-none bg-transparent border-none outline-none appearance-none"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity font-light text-white font-sans">
            Avanzar
          </span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 stroke-[1px] opacity-40 group-hover:opacity-100 transition-opacity text-white" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}