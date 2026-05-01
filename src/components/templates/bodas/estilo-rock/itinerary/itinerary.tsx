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
  GlassWater: <GlassWater size={18} />,
  Star: <Star size={18} />,
  Utensils: <Utensils size={18} />,
  Sparkles: <Sparkles size={18} />,
  PartyPopper: <PartyPopper size={18} />,
  Gift: <Gift size={18} />,
  Heart: <Heart size={18} />,
  Clock: <Clock size={18} />,
  Music: <Music size={18} />,
  Camera: <Camera size={18} />,
};

export default function Itinerary({ items }: { items: ItineraryItem[] }) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  if (!items || items.length === 0) return null;

  return (
    <>
      <section className="relative bg-white text-black overflow-hidden flex flex-col justify-center font-sans py-12 md:py-24">
        {/* Patrón de fondo sutil (puntos retro) */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#b43c3c_0.5px,transparent_0.5px)] bg-[size:15px_15px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          
          {/* Encabezado */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              className="relative w-16 h-16 mx-auto mb-4"
            >
              <Image src="/img-rock/reloj.webp" alt="Reloj Retro" fill className="object-contain" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#b43c3c] drop-shadow-[3px_3px_0px_#33aba1] uppercase leading-none">
              Cronograma
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-[2px] w-10 bg-[#33aba1]" />
              <p className="text-[#33aba1] font-black text-xs tracking-[0.3em] uppercase">The Show Schedule</p>
              <div className="h-[2px] w-10 bg-[#33aba1]" />
            </div>
          </div>

          {/* Línea de Tiempo */}
          <div className="relative">
            {/* Línea central estilo "cuero/madera" */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[6px] bg-[#8b6b4d] -translate-x-1/2 rounded-full border-2 border-black/10" />

            <div className="space-y-10 md:space-y-0 relative">
              {sortedItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex items-center w-full md:mb-12 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-row`}
                  >
                    {/* Contenido Card (Estilo Ticket) */}
                    <div className={`w-full md:w-1/2 flex ${isLeft ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"} justify-start pl-16 md:pl-0 z-10`}>
                      <div className={`
                        bg-white border-4 border-black 
                        p-5 min-w-[220px] md:max-w-[320px] 
                        shadow-[8px_8px_0px_#33aba1]
                        ${isLeft ? "md:-rotate-1" : "md:rotate-1"}
                        relative group transition-transform hover:rotate-0
                      `}>
                        {/* Círculos laterales tipo "perforación de ticket" */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#fdfcf0] border-4 border-black rounded-full md:hidden" />
                        
                        <span className={`block text-[#b43c3c] font-black text-lg leading-none mb-1 ${isLeft ? "md:text-right" : "md:text-left"} tabular-nums italic underline decoration-[#33aba1] decoration-2 underline-offset-4`}>
                          {item.time} hs
                        </span>
                        <h4 className={`text-black font-black text-xl md:text-2xl leading-tight ${isLeft ? "md:text-right" : "md:text-left"} uppercase tracking-tighter`}>
                          {item.title}
                        </h4>
                        {item.description && (
                           <p className={`text-sm text-gray-600 font-bold mt-2 leading-tight ${isLeft ? "md:text-right" : "md:text-left"} italic border-t-2 border-dashed border-gray-200 pt-2`}>
                              {item.description}
                           </p>
                        )}
                      </div>
                    </div>

                    {/* Burbuja de Icono (Estilo Pin de Vinilo) */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-black border-4 border-[#33aba1] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] z-20 text-[#fdfcf0]">
                      {iconMap[item.icon] || <Star size={18} />}
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