"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Witness {
  name: string;
  role: string;
  image: string;
}

// Componente de líneas de velocidad sutiles para coherencia visual
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

export function Witnesses() {
  const witnesses: Witness[] = [
    { name: "Juan Fernandez", role: "Hermano del Novio", image: "/img_boda/testigo1.jpg" },
    { name: "Marcela García", role: "Mejor Amiga de la Novia", image: "/img_boda/testigo2.jpg" },
    { name: "Andrea Blanco", role: "Mejor Amiga de la Pareja", image: "/img_boda/testigo3.jpg" },
    { name: "Pablo Martinez", role: "Mejor Amigo del Novio", image: "/img_boda/testigo4.jpg" },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      
      {/* FONDO UNIFICADO: Imagen de Rosas Negras Nítida */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"
      />
      
      {/* OVERLAY: Degradado oscurecido (via-black/40) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO ESTILO GALERÍA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <span className="text-[9px] tracking-[0.6em] text-[#b5a47a] uppercase font-bold mb-3 drop-shadow-sm">
            Special People
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tighter drop-shadow-lg leading-tight">
            Los Testigos
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b5a47a]/40 to-transparent mt-4" />
        </motion.div>

        {/* GRILLA DE TESTIGOS ENMARCADOS REDONDOS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 max-w-5xl mx-auto">
          {witnesses.map((witness, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center group relative"
            >
              {/* Resplandor radial en hover */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-radial from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl z-0 pointer-events-none" />

              {/* ESTRUCTURA DE MARCO REDONDO TIPO ARTE */}
              <div className="relative z-10 bg-[#fcfaf2] p-2 md:p-3 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)] mb-6 aspect-square flex items-center justify-center">
                
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
                <div className="absolute inset-4 md:inset-5 border border-black/80 rounded-full z-10 pointer-events-none" />
                
                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] z-20 transition-all duration-700 aspect-square">
                  <Image 
                    src={witness.image} 
                    alt={witness.name} 
                    width={160}
                    height={160}
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 rounded-full aspect-square" 
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] z-30 rounded-full pointer-events-none" />
                </div>
              </div>

              {/* TEXTO ESTILIZADO CON SOMBRAS */}
              <div className="text-center px-2 relative z-10">
                <h3 className="text-lg md:text-xl font-serif italic text-white mb-1 tracking-tight leading-snug drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500">
                  {witness.name}
                </h3>
                <div className="w-6 h-px bg-[#b5a47a]/30 mx-auto mb-1.5 shadow-sm" />
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold text-[#b5a47a] leading-tight opacity-80 group-hover:opacity-100 transition-all drop-shadow-sm">
                  {witness.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}