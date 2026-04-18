"use client";
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const yHero = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-12 md:pt-0">
      
      {/* --- CONTENEDOR DE IMAGEN CON CORTE DIAGONAL --- */}
      <div 
        className="absolute inset-0 z-0 bg-zinc-200 [clip-path:polygon(0_0,100%_0,100%_94%,0%_100%)] md:[clip-path:polygon(0_0,100%_0,100%_85%,0%_100%)]"
      >
        <Image 
          src="/img_boda/bode_casado.webp" 
          fill
          priority
          className="object-cover" 
          alt="Background Aesthetic" 
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      <motion.div 
        style={{ opacity: opacityHero, y: yHero }} 
        className="container mx-auto z-10 px-6 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12"
      >
        {/* --- TEXTO IZQUIERDA --- */}
        <div className="flex-1 text-center lg:text-left mt-2 md:mt-0 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] md:leading-[0.8] uppercase italic tracking-tighter mb-4 text-white drop-shadow-2xl">
              INVITACIONES<br/>
              <span className="text-white">DIGITALES</span>
            </h1>
            
            <div className="h-1.5 w-16 md:w-20 bg-red-600 mb-6 mx-auto lg:mx-0" />

            <p className="max-w-xs mx-auto lg:mx-0 text-white text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed mb-8 md:mb-10 font-bold drop-shadow-md">
              Tené hoy tu invitación <br />
              <span className="italic">interactiva y original</span> <br />
              para tu evento
            </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#modelos" 
                className="w-full sm:w-auto px-10 py-4 border border-white/30 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.3em] rounded-full hover:bg-white hover:text-zinc-900 transition-all duration-500 uppercase text-center"
              >
                Ver Diseños
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- SMARTPHONE --- */}
        <div className="flex-1 flex justify-center relative order-1 lg:order-2 scale-[0.85] sm:scale-90 lg:scale-100">
          <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 blur-3xl rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }} 
            className="relative w-[220px] sm:w-[260px] md:w-[300px] aspect-[9/18.5] border-[6px] md:border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] z-20 overflow-hidden"
          >
            {/* Notch del Teléfono */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 md:h-5 bg-zinc-900 rounded-b-2xl z-40" />
            
            {/* --- CONTENEDOR SCROLLABLE --- */}
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
              <div className="relative w-full h-auto">
                <Image 
                  src="/img_demo/Samsun.webp" 
                  width={300}
                  height={1000}
                  className="w-full h-auto"
                  alt="Preview Invitación" 
                  priority
                />
              </div>
            </div>
            
            {/* Botón flotante interno */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] bg-white/95 backdrop-blur-sm py-2.5 rounded-xl shadow-lg border border-black/5 text-center z-30 pointer-events-none">
                <p className="text-[7px] md:text-[8px] font-black text-red-600 tracking-[0.2em] uppercase italic">Ver Detalles</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};