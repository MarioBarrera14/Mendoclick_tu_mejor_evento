"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

interface LocationProps {
  config: {
    venueName: string;
    venueAddress: string;
    mapLink: string;
    eventDate: string;
    eventTime: string;
  };
}

export function Location({ config }: LocationProps) {
  const name = config.venueName || "Nombre del Salón";
  const address = config.venueAddress || "Dirección del evento";
  const link = config.mapLink || "#";
  const time = `${config.eventTime}hs`;

  const [year, month, day] = config.eventDate.split("-");
  const displayDate = `${day} / ${month} / ${year}`;

  return (
    // Agregamos un padding inferior mucho más grande en móvil (pb-32) para que no pise el diseño inferior
    <section className="relative pt-12 pb-32 md:py-28 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        
        {/* CABECERA COMPACTA */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <h2 className="font-script text-4xl md:text-7xl text-[#b4a178] leading-tight">
            La Fiesta
          </h2>
          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="h-[1px] w-6 md:w-8 bg-[#b4a178]/30" />
            <div className="w-1 h-1 rounded-full bg-[#b4a178]/40" />
            <div className="h-[1px] w-6 md:w-8 bg-[#b4a178]/30" />
          </div>
        </motion.div>

        {/* Reducimos el gap en móvil para compactar el texto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 md:divide-x md:divide-gray-100">
          
          {/* BLOQUE: CUÁNDO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center px-4 md:px-8"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center mb-2 shadow-sm">
              <Calendar size={14} className="text-[#b4a178]" />
            </div>
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-2 md:mb-4">
              Cuándo
            </span>
            <p className="text-gray-800 text-lg md:text-2xl font-light tracking-[0.1em] mb-1">
              {displayDate}
            </p>
            <div className="flex items-center gap-1.5 text-gray-500 italic text-xs md:text-sm">
              <Clock size={12} className="opacity-70" />
              <span>{time}</span>
            </div>
          </motion.div>

          {/* BLOQUE: DÓNDE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center px-4 md:px-8"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center mb-2 shadow-sm">
              <MapPin size={14} className="text-[#b4a178]" />
            </div>
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-2 md:mb-4">
              Dónde
            </span>
            <h3 className="text-gray-800 text-base md:text-xl font-medium mb-1 tracking-tight uppercase">
              {name}
            </h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-light max-w-[200px] leading-relaxed italic uppercase tracking-wider">
              {address}
            </p>
          </motion.div>
        </div>

        {/* BOTÓN RESPONSIVO - Ajustado margen y z-index */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-20 flex justify-center relative z-20"
        >
          <motion.a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 w-full max-w-[220px] md:max-w-none md:w-auto md:px-10 py-3 border border-gray-200 rounded-full text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase transition-all bg-white shadow-sm no-underline"
          >
            <MapPin size={14} />
            Ver ubicación
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}