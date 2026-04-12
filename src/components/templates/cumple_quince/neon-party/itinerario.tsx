"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, Sparkles, Utensils, Star, 
  PartyPopper, Gift, Zap, Clock, Music, Camera 
} from "lucide-react";
import React from "react";

// --- INTERFAZ CONECTADA AL SCHEMA ---
interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  icon: string;
  order: number;
}

interface ItineraryProps {
  items: ItineraryItem[];
}

// Mapa de iconos para transformar el string de la DB en el componente Lucide
const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater size={18} strokeWidth={1.5} />,
  Star: <Star size={18} strokeWidth={1.5} />,
  Utensils: <Utensils size={18} strokeWidth={1.5} />,
  Sparkles: <Sparkles size={18} strokeWidth={1.5} />,
  PartyPopper: <PartyPopper size={18} strokeWidth={1.5} />,
  Gift: <Gift size={18} strokeWidth={1.5} />,
  Clock: <Clock size={18} strokeWidth={1.5} />,
  Music: <Music size={18} strokeWidth={1.5} />,
  Camera: <Camera size={18} strokeWidth={1.5} />,
};

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function Itinerary({ items }: ItineraryProps) {
  // Ordenar los eventos cronológicamente según el campo 'order'
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-16 bg-[#0c001a] overflow-hidden font-sans">
      
      {/* Fondo de Grilla Neón sutil */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-lg">
        
        {/* Cabecera de Sección */}
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-purple-500 mb-1">
                <Zap size={14} fill="currentColor" className="animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Timeline</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                The <span className="text-purple-600 drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]">Plan</span>
            </h2>
        </div>

        <div className="relative">
          {/* LÍNEA CENTRAL NEON */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.3)]" />

          <div className="space-y-10">
            {sortedItems.map((item, index) => {
              const isRight = index % 2 === 0;
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between w-full ${
                    isRight ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* BLOQUE DE TEXTO */}
                  <div className="w-[40%]">
                    <div className={`flex flex-col ${!isRight ? "items-end text-right" : "items-start text-left"}`}>
                      <span className="text-[9px] text-purple-400 font-black tracking-widest uppercase">
                        {item.time}hs
                      </span>
                      <h4 className="text-[11px] md:text-xs font-black text-white uppercase italic tracking-tight mt-0.5 leading-none">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* CÍRCULO CON ÍCONO NEON */}
                  <div className="relative z-10 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(147,51,234,1)" }}
                      className="w-10 h-10 rounded-full border border-purple-500 bg-[#1a0033] flex items-center justify-center text-white shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-all"
                    >
                      {iconMap[item.icon] || <Clock size={18} />}
                    </motion.div>

                    {/* Triangulito indicador */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${
                      !isRight ? "right-full mr-2" : "left-full ml-2"
                    }`}>
                      <div className={`w-0 h-0 border-y-[4px] border-y-transparent ${
                        !isRight ? "border-r-[6px] border-r-purple-500" : "border-l-[6px] border-l-purple-500"
                      }`} />
                    </div>
                  </div>

                  {/* ESPACIO PARA BALANCEAR GRID */}
                  <div className="w-[40%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <NeonDivider />
    </section>
  );
}