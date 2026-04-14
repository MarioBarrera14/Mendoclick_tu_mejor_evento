"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// --- INTERFAZ CONECTADA AL SCHEMA DE PRISMA ---
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
  // Mapeo dinámico
  const name = config.venueName || "Nombre del Salón";
  const address = config.venueAddress || "Dirección del evento";
  const link = config.mapLink || "#";
  const time = `${config.eventTime}hs`;

  // Formateo de fecha: YYYY-MM-DD -> DD · MM · YYYY
  const displayDate = config.eventDate.split("-").reverse().join(" · ");

  return (
    <section className="relative py-16 md:py-24 overflow-hidden font-sans -mt-20 md:-mt-24">
      
      {/* LA FRANJA INCLINADA - Estética Night Lights */}
      <div 
        className="absolute inset-0 bg-[#d1d1d1] z-10"
        style={{ 
          clipPath: "polygon(0 12%, 100% 0%, 100% 88%, 0% 100%)" 
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl pt-16">
        
        {/* TÍTULO PRINCIPAL */}
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-script text-4xl md:text-5xl text-[#b4a178] mb-10 pt-4"
        >
          Fiesta
        </motion.h2>

        <div className="space-y-12 pb-10">
          
          {/* BLOQUE: DÍA Y HORARIO DINÁMICO */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="border border-gray-800 px-3 py-1 mb-3">
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium">
                Día y Horario
              </span>
            </div>
            <p className="text-gray-800 text-base md:text-xl font-light tracking-wide">
              {displayDate} - {time}
            </p>
          </motion.div>

          {/* BLOQUE: LUGAR DINÁMICO */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="border border-gray-800 px-5 py-1 mb-4">
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium">
                Lugar
              </span>
            </div>
            <h3 className="text-gray-800 text-base md:text-lg font-medium mb-1 leading-tight px-4 uppercase">
              {name}
            </h3>
            <p className="text-gray-500 text-[11px] md:text-[13px] font-light max-w-[250px] mx-auto mb-8 leading-relaxed italic uppercase">
              {address}
            </p>

            {/* BOTÓN MAPA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full px-4">
              <motion.a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex bg-white items-center justify-center gap-2 w-full md:w-auto px-8 py-2 border border-gray-400 rounded-full text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-50 transition-all shadow-sm no-underline"
              >
                <MapPin size={12} />
                ¿Cómo llegar?
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}