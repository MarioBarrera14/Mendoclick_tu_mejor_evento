"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const textShadowClass: string = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]";
  const clipPathClass: string = "[clip-path:polygon(0_0,100%_0,100%_92%,0%_100%)]"; 

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#f9f9f9] z-10">
      
      {/* --- FONDO --- */}
      <div className={`absolute inset-0 z-0 ${clipPathClass} scale-[1.01] origin-top`}>
        <Image 
          // Mantenemos w_1200 para que en PC se vea nítida
          src="https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_1200/v1776742920/bode_casado_atoxsc.jpg" 
          fill
          priority
          fetchPriority="high"
          // 'sizes' es la clave: el navegador elige la mejor versión según el dispositivo
          sizes="(max-width: 768px) 800px, 1200px"
          className="object-cover" 
          alt="Invitaciones Digitales MendoClick Mendoza" 
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20 backdrop-blur-[0.5px]" />
      </div>

      <div className="container mx-auto z-20 px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-1 md:gap-12 relative h-full">
        
        {/* --- SMARTPHONE --- */}
        <div className="flex-1 flex justify-center relative order-1 lg:order-2 scale-[0.48] xs:scale-[0.55] sm:scale-75 lg:scale-90 -mb-10 lg:mb-0">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-[#33aba1]/30 blur-3xl rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-[230px] md:w-[280px] aspect-[9/18.5] border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-100 shadow-2xl z-20 overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-b-2xl z-40" />
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide touch-pan-y">
              <Image 
                src="https://res.cloudinary.com/diqipcpuu/image/upload/v1777242233/champagnecumple_uqdlfs.webp" 
                width={280}
                height={900}
                className="w-full h-auto"
                alt="Demo Invitación Digital" 
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* --- TEXTO Y BOTONES --- */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full max-w-xl relative z-30 -mt-8 md:mt-0">
          <h1 className={`text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] uppercase italic tracking-tighter mb-2 text-white ${textShadowClass}`}>
            INVITACIONES<br/>
            <span className="text-[#33aba1] drop-shadow-[0_2px_8px_rgba(51,171,161,0.5)]">DIGITALES</span>
          </h1>
          
          <div className="h-1 w-12 bg-[#33aba1] mb-3 mx-auto lg:mx-0 shadow-md" />

          <p className={`max-w-xs mx-auto lg:mx-0 text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] leading-tight mb-6 font-bold ${textShadowClass}`}>
            Tené hoy tu invitación <br className="hidden sm:block" />
            <span className="text-[#33aba1] italic">interactiva y original</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 relative z-50">
            <a 
              href="#modelos" 
              onClick={(e) => scrollToSection(e, 'modelos')}
              aria-label="Ver catálogo de diseños de invitaciones"
              className="w-[65%] sm:w-auto px-6 py-3 bg-[#33aba1] text-white text-[9px] font-black tracking-[0.2em] rounded-full active:scale-95 transition-transform uppercase shadow-lg flex justify-center items-center"
            >
              Ver Diseños
            </a>
            <a 
              href="#experiencia" 
              onClick={(e) => scrollToSection(e, 'experiencia')}
              aria-label="Cómo funcionan nuestras invitaciones digitales"
              className="w-[65%] sm:w-auto px-6 py-3 border-2 border-white/40 bg-black/10 backdrop-blur-md text-white text-[9px] font-black tracking-[0.2em] rounded-full active:scale-95 transition-transform uppercase flex justify-center items-center"
            >
              Cómo funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};