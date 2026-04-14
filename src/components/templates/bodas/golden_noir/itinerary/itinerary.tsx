"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, Sparkles, Utensils, Star, 
  PartyPopper, Gift, MapPin, Heart, Clock, Music
} from "lucide-react";
import React from "react";

// 1. Definimos la interfaz basada en tu modelo ItineraryItem de Prisma
interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description?: string | null;
  icon: string;
  order: number;
}

interface ItineraryProps {
  items: ItineraryItem[];
}

// 2. Mapeo de strings a Iconos de Lucide
const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater size={12} />,
  Star: <Star size={12} />,
  Utensils: <Utensils size={12} />,
  Sparkles: <Sparkles size={12} />,
  PartyPopper: <PartyPopper size={12} />,
  Gift: <Gift size={12} />,
  Heart: <Heart size={12} />,
  Clock: <Clock size={12} />,
  Music: <Music size={12} />,
};

export function Itinerary({ items }: ItineraryProps) {
  // Ordenamos los items por el campo 'order' del schema
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="relative bg-black text-white py-12 md:py-20 px-6 overflow-hidden z-10 font-sans">
      
      {/* Fondo y Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-zinc-900/20 to-black pointer-events-none" />
      
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col items-center mb-10 md:mb-16 relative z-10">
        <span className="text-[8px] tracking-[0.6em] text-[#b5a47a] uppercase font-bold mb-2 opacity-80">
          Timeline
        </span>
        <h2 className="text-2xl md:text-4xl font-serif italic text-white drop-shadow-md">
          Itinerario
        </h2>
        <div className="w-10 h-px bg-[#b5a47a]/40 mt-4" />
      </div>

      {/* --- LÍNEA DE TIEMPO --- */}
      <div className="relative w-full max-w-2xl mx-auto z-10">
        
        {/* Línea Central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#b5a47a]/0 via-[#b5a47a]/50 to-[#b5a47a]/0 -translate-x-1/2" />

        <div className="flex flex-col space-y-12 md:space-y-16"> 
          {sortedItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center w-full ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Espaciador para desktop */}
                <div className="hidden md:block w-1/2" />
                
                {/* PUNTO CENTRAL */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="bg-[#b5a47a] p-[1px] rounded-full shadow-[0_0_15px_rgba(181,164,122,0.3)]">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black text-[#b5a47a] rounded-full border border-[#b5a47a]/20">
                      {iconMap[item.icon] || <Star size={12} />}
                    </div>
                  </div>
                </div>

                {/* CONTENIDO */}
                <div className={`w-full md:w-1/2 flex flex-col ${
                  isEven ? "items-end pr-[20%] md:pr-10" : "items-start pl-[20%] md:pl-10"
                }`}>
                  <div className={`${isEven ? "text-right" : "text-left"}`}>
                    <span className="block text-[9px] md:text-[11px] font-black text-[#b5a47a] uppercase tracking-[0.2em] mb-1">
                      {item.time}
                    </span>
                    <h3 className="text-sm md:text-xl font-serif italic text-white leading-tight drop-shadow-lg">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[10px] md:text-xs text-zinc-500 mt-1 font-light italic">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}