"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// 1. Interface ajustada a tu Prisma Schema
interface WitnessItem {
  id: string;
  nombre: string;
  rol: string;
  imageUrl?: string | null;
}

interface WitnessesProps {
  items: WitnessItem[];
}

const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]"
    />
  </div>
);

export function Witnesses({ items }: WitnessesProps) {
  // Si no hay testigos, no renderizamos la sección para mantener la limpieza visual
  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      
      {/* Fondo y Overlay */}
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

        {/* GRILLA DE TESTIGOS DINÁMICA */}
        <div className={`grid grid-cols-2 ${items.length > 3 ? 'lg:grid-cols-4' : 'lg:flex lg:justify-center'} gap-10 md:gap-14 max-w-5xl mx-auto`}>
          {items.map((witness, index) => (
            <motion.div
              key={witness.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`flex flex-col items-center group relative ${items.length <= 3 ? 'lg:min-w-[250px]' : ''}`}
            >
              <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle,rgba(181,164,122,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl z-0 pointer-events-none" />

              {/* ESTRUCTURA DE MARCO REDONDO */}
              <div className="relative z-10 bg-[#fcfaf2] p-2 md:p-3 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)] mb-6 aspect-square flex items-center justify-center">
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
                <div className="absolute inset-4 md:inset-5 border border-black/80 rounded-full z-10 pointer-events-none" />
                
                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] z-20 transition-all duration-700 aspect-square">
                  <Image 
                    src={witness.imageUrl || "/img_boda/placeholder-user.jpg"} // Imagen por defecto si no hay en DB
                    alt={witness.nombre} 
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] z-30 rounded-full pointer-events-none" />
                </div>
              </div>

              {/* TEXTO DINÁMICO */}
              <div className="text-center px-2 relative z-10">
                <h3 className="text-lg md:text-xl font-serif italic text-white mb-1 tracking-tight leading-snug drop-shadow-md">
                  {witness.nombre}
                </h3>
                <div className="w-6 h-px bg-[#b5a47a]/30 mx-auto mb-1.5 shadow-sm" />
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold text-[#b5a47a] leading-tight opacity-80 group-hover:opacity-100 transition-all font-sans">
                  {witness.rol}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}