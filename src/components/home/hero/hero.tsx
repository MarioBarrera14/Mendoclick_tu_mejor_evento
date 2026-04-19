"use client";
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const yHero = useTransform(scrollY, [0, 400], [0, -20]);

  const textShadowClass = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]";
  const clipPathClass = "[clip-path:polygon(0_0,100%_0,100%_95%,0%_100%)]";

  // --- FUNCIÓN DE SCROLL PROFESIONAL ---
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Evita que el # aparezca en la URL
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#f9f9f9]">
      
      {/* --- FONDO --- */}
      <div 
        className={`absolute inset-0 z-0 bg-zinc-900 ${clipPathClass} scale-[1.01] origin-top`}
      >
        <Image 
          src="/img_boda/bode_casado.webp" 
          fill
          priority
          className="object-cover" 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20 backdrop-blur-[0.5px]" />
      </div>

      <motion.div 
        style={{ opacity: opacityHero, y: yHero }} 
        className="container mx-auto z-10 px-6 pt-10 md:pt-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 md:gap-12"
      >
        {/* --- SMARTPHONE --- */}
        <div className="flex-1 flex justify-center relative order-1 lg:order-2 scale-[0.55] xs:scale-[0.65] sm:scale-75 lg:scale-90 -mt-10 lg:mt-0">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-[#33aba1]/30 blur-3xl rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[230px] md:w-[280px] aspect-[9/18.5] border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] z-20 overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-b-2xl z-40" />
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
              <Image 
                src="/img_demo/Samsun.webp" 
                width={280}
                height={900}
                className="w-full h-auto"
                alt="Preview" 
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* --- TEXTO COMPACTO --- */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] uppercase italic tracking-tighter mb-2 text-white ${textShadowClass}`}>
              INVITACIONES<br/>
              <span className="text-[#33aba1] drop-shadow-[0_2px_8px_rgba(51,171,161,0.5)]">DIGITALES</span>
            </h1>
            
            <div className="h-1 w-12 bg-[#33aba1] mb-4 mx-auto lg:mx-0 shadow-md" />

            <p className={`max-w-xs mx-auto lg:mx-0 text-white text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.2em] leading-tight mb-5 font-bold ${textShadowClass}`}>
              Tené hoy tu invitación <br className="hidden sm:block" />
              <span className="text-[#33aba1] italic">interactiva y original</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5">
              <a 
                href="#modelos" 
                onClick={(e) => scrollToSection(e, 'modelos')}
                className="w-[70%] sm:w-auto px-6 py-2.5 bg-[#33aba1] text-white text-[9px] font-black tracking-[0.2em] rounded-full hover:bg-white hover:text-[#33aba1] transition-all uppercase shadow-lg active:scale-95 cursor-pointer"
              >
                Ver Diseños
              </a>
              <a 
                href="#experiencia" 
                onClick={(e) => scrollToSection(e, 'experiencia')}
                className="w-[70%] sm:w-auto px-6 py-2.5 border border-white/50 bg-white/5 backdrop-blur-md text-white text-[9px] font-black tracking-[0.2em] rounded-full hover:bg-white/20 transition-all uppercase cursor-pointer"
              >
                Cómo funciona
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};