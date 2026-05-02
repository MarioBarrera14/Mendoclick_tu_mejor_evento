"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  GlassWater, Sparkles, Utensils, Star, 
  PartyPopper, Gift, Heart, Clock, Music, Camera
} from "lucide-react";
import React from "react";
import SeparadorEntrePaginas from "../line/separadordepaaginas";

interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description?: string | null;
  icon: string;
  order: number;
}

const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater size={16} />,
  Star: <Star size={16} />,
  Utensils: <Utensils size={16} />,
  Sparkles: <Sparkles size={16} />,
  PartyPopper: <PartyPopper size={16} />,
  Gift: <Gift size={16} />,
  Heart: <Heart size={16} />,
  Clock: <Clock size={16} />,
  Music: <Music size={16} />,
  Camera: <Camera size={16} />,
};

export default function Itinerary({ items }: { items: ItineraryItem[] }) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  if (!items || items.length === 0) return null;

  return (
    <>
      <section className="relative bg-white text-black overflow-hidden flex flex-col justify-center font-sans py-6 md:py-24">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#b43c3c_0.5px,transparent_0.5px)] bg-[size:10px_10px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
          
          {/* Encabezado muy compacto */}
          <div className="text-center mb-6 md:mb-16">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              className="relative w-10 h-10 md:w-16 md:h-16 mx-auto mb-1 md:mb-4"
            >
              <Image src="/img-rock/reloj.webp" alt="Reloj Retro" fill className="object-contain" />
            </motion.div>
            <h2 className="text-3xl md:text-7xl font-black italic tracking-tighter text-[#b43c3c] drop-shadow-[2px_2px_0px_#33aba1] uppercase leading-none">
              Cronograma
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-6 bg-[#33aba1]" />
              <p className="text-[#33aba1] font-black text-[9px] md:text-xs tracking-[0.2em] uppercase">The Show Schedule</p>
              <div className="h-[1px] w-6 bg-[#33aba1]" />
            </div>
          </div>

          {/* Línea de Tiempo Compacta */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] md:w-[6px] bg-[#8b6b4d] -translate-x-1/2 rounded-full border-black/10" />

            <div className="space-y-1 md:space-y-0 relative">
              {sortedItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center w-full md:mb-10 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-row`}
                  >
                    {/* Contenido Card */}
                    <div className={`w-full md:w-1/2 flex ${isLeft ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10"} justify-start pl-10 md:pl-0 z-10`}>
                      <div className={`
                        bg-white border-2 md:border-4 border-black 
                        p-2 md:p-5 w-full md:max-w-[300px] 
                        shadow-[3px_3px_0px_#33aba1] md:shadow-[8px_8px_0px_#33aba1]
                        ${isLeft ? "md:-rotate-1" : "md:rotate-1"}
                        relative transition-transform hover:rotate-0
                      `}>
                        {/* Círculo de enganche */}
                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black rounded-full md:hidden" />
                        
                        <span className={`block text-[#b43c3c] font-black text-xs md:text-lg leading-none ${isLeft ? "md:text-right" : "md:text-left"} tabular-nums italic underline decoration-[#33aba1] decoration-1 underline-offset-2`}>
                          {item.time} hs
                        </span>
                        <h4 className={`text-black font-black text-base md:text-2xl leading-tight ${isLeft ? "md:text-right" : "md:text-left"} uppercase tracking-tighter`}>
                          {item.title}
                        </h4>
                        {item.description && (
                           <p className={`text-[10px] md:text-sm text-gray-600 font-bold mt-0.5 leading-tight ${isLeft ? "md:text-right" : "md:text-left"} italic border-t border-dashed border-gray-200 pt-0.5`}>
                              {item.description}
                           </p>
                        )}
                      </div>
                    </div>

                    {/* Burbuja de Icono más pequeña en mobile */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-black border-2 md:border-4 border-[#33aba1] z-20 text-[#fdfcf0]">
                      {React.isValidElement(iconMap[item.icon]) 
                        ? React.cloneElement(iconMap[item.icon] as React.ReactElement, { size: 14 }) 
                        : <Star size={14} />
                      }
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <SeparadorEntrePaginas />
    </>
  );
}