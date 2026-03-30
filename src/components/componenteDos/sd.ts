"use client";

import { motion } from "framer-motion";
import { eventConfig as localConfig } from "@/data/event-config";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export function Hero({ eventName, heroImage }: HeroProps) {
  const displayName = eventName || localConfig.personal.nombre;
  
  const config = {
    colores: {
      magenta: "#4408cf",
      neonGreen: "#BFFF00",
      black: "#000000",
    },
  };

  const currentImage = heroImage || "/img/ChicaLuces.png"; 

  const nameLetters = displayName.split("");

  return (
    <section className="relative w-full min-h-screen flex justify-center overflow-hidden bg-neutral-950">
      
      {/* --- FONDO CON TEXTURA --- */}
      <div className="absolute inset-0 opacity-10 pointer-events-none grayscale contrast-150"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')",
          backgroundColor: config.colores.black 
        }} 
      />

      {/* Bloque superior magenta rasgado */}
      <div 
        className="absolute top-0 left-0 w-full h-[60%] z-0"
        style={{ 
          backgroundColor: config.colores.magenta,
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 80% 90%, 50% 80%, 20% 95%, 0 85%)" 
        }}
      />

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 right-10 text-white/10 font-black text-9xl select-none">
        15
      </div>
      <div className="absolute top-10 left-10 text-xl z-10 font-black tracking-widest opacity-70" style={{ color: config.colores.neonGreen }}>
        X<br/>X<br/>X
      </div>

      <div className="relative z-10 w-full max-w-[1000px] min-h-screen flex flex-col items-center justify-between py-12 md:py-20">
        
        {/* --- TÍTULO TIPO RECORTES --- */}
        <div className="text-center mt-10">
          <p className="bg-white text-black px-4 py-1 font-mono text-xs mb-4 inline-block rotate-1 shadow-md">
            ESTÁS INVITADO A LOS XV DE:
          </p>
          
          <div className="flex flex-wrap justify-center gap-1 md:gap-3">
            {nameLetters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? 5 : -5) }}
                transition={{ delay: i * 0.1 }}
                className={`
                  inline-block px-3 py-1 md:px-6 md:py-3 text-4xl md:text-7xl font-bold uppercase shadow-xl
                  ${i % 2 === 0 ? 'bg-white text-black' : 'bg-neutral-900 text-white'}
                  ${i % 3 === 0 ? 'font-serif' : 'font-sans'}
                `}
                style={{
                  clipPath: `polygon(${2+Math.random()*5}% ${2+Math.random()*5}%, ${90+Math.random()*5}% ${Math.random()*5}%, ${92+Math.random()*5}% ${90+Math.random()*5}%, ${Math.random()*5}% ${92+Math.random()*10}%)`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* --- FOTO CENTRAL CON CINTA (TAPE) --- */}
        <div className="relative flex items-center justify-center w-full my-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-[85%] md:w-[600px] aspect-[4/5] z-20"
          >
            {/* LA CINTA (TAPE): Efecto de cinta adhesiva semitransparente */}
            <div 
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-12 z-40 rotate-[-2deg] opacity-80"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
                borderLeft: "1px solid rgba(255,255,255,0.3)",
                borderRight: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                clipPath: "polygon(2% 0%, 98% 2%, 100% 95%, 0% 100%)" // Bordes ligeramente irregulares
              }}
            />

            {/* Marco blanco angular */}
            <div 
              className="absolute inset-0 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              style={{ clipPath: "polygon(10% 0, 100% 15%, 90% 100%, 0% 85%)" }} 
            />
            
            {/* Contenedor de la foto */}
            <div 
              className="absolute inset-2 overflow-hidden bg-neutral-100"
              style={{ clipPath: "polygon(10% 0, 100% 15%, 90% 100%, 0% 85%)" }} 
            >
              <img
                src={currentImage}
                className="w-full h-full object-cover"
                alt={`Mis XV ${displayName}`}
              />
            </div>
            
            {/* Recorte "Party Time" */}
            <div 
              className="absolute -bottom-8 -right-8 bg-[#BFFF00] text-black font-black px-8 py-3 -rotate-12 shadow-2xl z-30 text-lg"
              style={{ clipPath: "polygon(5% 15%, 95% 0, 100% 85%, 15% 100%)" }}
            >
              ¡PARTY TIME!
            </div>
          </motion.div>
        </div>

        {/* --- INFO DEL EVENTO --- */}
        <div className="w-full flex flex-col items-center space-y-8 pt-10">
          <div className="relative rotate-[-1deg]">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 opacity-50" />
            <div 
              className="relative bg-white text-black px-8 py-4 flex items-center gap-6 border-2 border-black"
              style={{ clipPath: "polygon(1% 2%, 99% 1%, 98% 98%, 2% 96%)" }}
            >
              <div className="text-center">
                <span className="block text-xs font-bold border-b border-black">NOV</span>
                <span className="text-5xl font-serif font-black">16</span>
              </div>
              <div className="w-[2px] h-12 bg-black" />
              <div className="font-mono text-sm leading-tight">
                SÁBADO<br />
                10:00 PM<br />
                {localConfig.personal.ubicacion}
              </div>
            </div>
          </div>

          <div className="bg-black text-[#BFFF00] px-4 py-2 text-[11px] tracking-[0.5em] font-bold uppercase rounded-sm shadow-md">
             {displayName}
          </div>
        </div>

      </div>

      {/* Papel rasgado inferior */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-neutral-900" 
        style={{ clipPath: "polygon(0 40%, 15% 10%, 30% 50%, 50% 0, 75% 45%, 90% 5%, 100% 30%, 100% 100%, 0 100%)" }}
      />
    </section>
  );
}