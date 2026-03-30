"use client";

import { motion, AnimatePresence, Variants } from "framer-motion"; // Importamos Variants
import { eventConfig as localConfig } from "@/data/event-config";
import { Sparkles } from "lucide-react";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export function Hero({ eventName, heroImage }: HeroProps) {
  const displayName = eventName || localConfig.personal.nombre;
  const currentImage = heroImage || localConfig.imagenes.hero;

  // DEFINICIÓN DE VARIANTES CON TIPO EXPLÍCITO PARA EVITAR ERRORES
  const balloonVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: (delay: number) => ({
      y: [-20, 20, -20],
      opacity: 1,
      transition: {
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 1, delay: delay },
      },
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen flex justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/fon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CAPAS DE DEGRADADO */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(153, 45, 45, 0) 50%, rgba(217, 119, 6, 0.43) 100%)" }} />
      <div className="absolute bottom-0 left-0 w-full h-40 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, rgb(116, 73, 17) 0%, rgba(69, 39, 0, 0) 100%)" }} />

      <div className="relative z-10 w-full max-w-[950px] min-h-screen flex flex-col items-center justify-between py-10 pt-24 md:pt-30">

        {/* TEXTO SUPERIOR */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center relative z-20">
          <p className="tracking-[0.3em] text-[10px] text-amber-900 uppercase">You are invited to</p>
          <h2 className="text-amber-900 text-6xl md:text-7xl font-serif">Birthday</h2>
          <h1 className="text-7xl md:text-[110px] font-script -mt-4 text-amber-900">Party</h1>
        </motion.div>

        {/* CENTRO (FOTO Y GLOBOS) */}
        <div className="relative flex items-center justify-center w-full">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full border-[8px] border-amber-400 p-3 bg-white z-30 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img key={currentImage} src={currentImage} className="w-full h-full object-cover" />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* GLOBOS - SIN ERRORES DE TS */}
          <motion.img variants={balloonVariants} custom={0} initial="initial" animate="animate" src="/Globos.png" className="absolute left-0 top-20 w-80 z-10" />
          <motion.img variants={balloonVariants} custom={2} initial="initial" animate="animate" src="/Globos.png" className="absolute right-0 bottom-40 w-80 scale-x-[-1] z-10" />
          <motion.img variants={balloonVariants} custom={1} initial="initial" animate="animate" src="/glo1.png" className="absolute -left-48 -top-48 w-[320px] z-10" />
          <motion.img variants={balloonVariants} custom={2} initial="initial" animate="animate" src="/glo1.png" className="absolute -right-48 -bottom-48 w-[320px] scale-x-[-1] z-10" />
        </div>

        {/* DISPLAY NAME - DISEÑO MEJORADO */}
        <div className="text-center pb-12 relative z-30 px-4 w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative border-y border-amber-400/30 py-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-[40px] shadow-[0_20px_50px_rgba(116,73,17,0.1)]"
          >
            <Sparkles className="absolute top-4 left-6 text-amber-600/40 animate-pulse" size={24} />
            <Sparkles className="absolute bottom-4 right-6 text-amber-600/40 animate-bounce" size={20} />

            <span className="text-[10px] tracking-[0.6em] text-amber-900/60 uppercase font-black mb-2">
              The Queen of the Night
            </span>
            
            <h3 className="text-6xl md:text-9xl font-serif italic text-amber-950 tracking-tighter leading-none drop-shadow-xl">
              {displayName}
            </h3>

            <div className="flex items-center gap-4 mt-6">
              <div className="h-[1px] w-8 md:w-16 bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-amber-600 rotate-45" />
              <div className="h-[1px] w-8 md:w-16 bg-amber-400" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}