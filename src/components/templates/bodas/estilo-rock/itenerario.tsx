"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  GlassWater, Sparkles, Utensils, Star, 
  PartyPopper, Gift, Heart, Clock, Music, Camera
} from "lucide-react";
import React from "react";
import SeparadorEntrePaginas from "./separadordepaaginas";
interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description?: string | null;
  icon: string;
  order: number;
}

const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater size={14} />,
  Star: <Star size={14} />,
  Utensils: <Utensils size={14} />,
  Sparkles: <Sparkles size={14} />,
  PartyPopper: <PartyPopper size={14} />,
  Gift: <Gift size={14} />,
  Heart: <Heart size={14} />,
  Clock: <Clock size={14} />,
  Music: <Music size={14} />,
  Camera: <Camera size={14} />,
};

export default function Itinerary({ items }: { items: ItineraryItem[] }) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  if (!items || items.length === 0) return null;

  return (
    <>
    <section className="relative bg-[#121212] text-white overflow-hidden flex flex-col justify-center font-sans py-6 md:py-10">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle,#78f7f7_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* Encabezado: Reducido en márgenes */}
        <div className="text-center mb-6">
          <div className="relative w-10 h-10 md:w-12 md:h-12 mx-auto mb-2">
            <Image src="/img-rock/reloj.png" alt="Reloj Retro" fill className="object-contain" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-[#b43c3c] [text-shadow:3px_3px_0px_#f4e9d8] uppercase leading-none">
            Cronograma
          </h2>
          <p className="text-[#33aba1] font-bold text-[10px] tracking-[0.3em] uppercase mt-1">The Night Schedule</p>
        </div>

        {/* Línea de Tiempo Compacta */}
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[4px] bg-[#8b6b4d] -translate-x-1/2 rounded-full opacity-50" />

          {/* Reducción clave: de space-y-12 a space-y-3 */}
          <div className="space-y-3 md:space-y-0 relative">
            {sortedItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center w-full md:h-20 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  <div className={`w-full md:w-1/2 flex ${isLeft ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10"} justify-start pl-14 md:pl-0 z-10`}>
                    <div className={`
                      bg-white border-[3px] border-dashed border-[#33aba1] 
                      rounded-[1.2rem] py-2 px-4 min-w-[190px] md:max-w-[280px] shadow-[5px_5px_0px_rgba(0,0,0,0.2)]
                      ${isLeft ? "md:-rotate-1" : "md:rotate-1"}
                      relative group hover:scale-105 transition-transform
                    `}>
                      {/* Puntero Desktop */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent hidden md:block ${isLeft ? "left-full border-l-[10px] border-l-[#33aba1]" : "right-full border-r-[10px] border-r-[#33aba1]"}`} />
                      
                      {/* Puntero Mobile */}
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[10px] border-r-[#33aba1] md:hidden" />

                      <span className={`block text-[#cc6677] font-black text-[10px] leading-none mb-0.5 ${isLeft ? "md:text-right" : "md:text-left"} tabular-nums`}>
                        {item.time}hs
                      </span>
                      <h4 className={`text-[#33aba1] font-black text-sm md:text-base leading-tight ${isLeft ? "md:text-right" : "md:text-left"} uppercase tracking-tighter`}>
                        {item.title}
                      </h4>
                      {item.description && (
                         <p className={`text-[9px] text-gray-500 font-bold mt-1 leading-none ${isLeft ? "md:text-right" : "md:text-left"} italic font-serif`}>
                            {item.description}
                         </p>
                      )}
                    </div>
                  </div>

                  {/* Icono Reducido */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#f4e9d8] border-[3px] border-[#33aba1] z-20 text-[#b43c3c]">
                    {iconMap[item.icon] || <Star size={14} />}
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