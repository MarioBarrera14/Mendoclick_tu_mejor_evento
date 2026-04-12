"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, Sparkles, Utensils, Star, 
  PartyPopper, Gift, Clock, Music, Camera, Heart
} from "lucide-react";
import React from "react";

// --- INTERFAZ CONECTADA AL SCHEMA DE PRISMA ---
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

// Diccionario de iconos para transformar el String de la DB en el componente Lucide
const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater size={20} strokeWidth={1.2} />,
  Star: <Star size={20} strokeWidth={1.2} />,
  Utensils: <Utensils size={20} strokeWidth={1.2} />,
  Sparkles: <Sparkles size={20} strokeWidth={1.2} />,
  PartyPopper: <PartyPopper size={20} strokeWidth={1.2} />,
  Gift: <Gift size={20} strokeWidth={1.2} />,
  Heart: <Heart size={20} strokeWidth={1.2} />,
  Clock: <Clock size={20} strokeWidth={1.2} />,
  Music: <Music size={20} strokeWidth={1.2} />,
  Camera: <Camera size={20} strokeWidth={1.2} />,
};

export function Itinerary({ items }: ItineraryProps) {
  // Ordenamos los ítems por el campo 'order' de la base de datos
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-2xl">
        
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-script text-4xl md:text-5xl text-[#b4a178] text-center mb-16"
        >
          Itinerario
        </motion.h2>

        <div className="relative">
          {/* LÍNEA CENTRAL VERTICAL MINIMALISTA */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-200" />

          <div className="space-y-12">
            {sortedItems.map((item, index) => {
              const isRight = index % 2 !== 0; // Alterna lados
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between w-full ${
                    isRight ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* BLOQUE DE TEXTO DINÁMICO */}
                  <div className="w-[42%] flex flex-col items-center">
                    <div className={`flex flex-col ${!isRight ? "items-end text-right pr-4" : "items-start text-left pl-4"} w-full`}>
                      <span className="text-[10px] md:text-xs text-gray-400 font-light tracking-widest uppercase">
                        {item.time}hs
                      </span>
                      <h4 className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-tight mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* CÍRCULO CON ÍCONO (Centro) */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed border-gray-400 bg-white flex items-center justify-center text-gray-800 shadow-sm transition-transform hover:scale-110">
                      {iconMap[item.icon] || <Clock size={20} strokeWidth={1.2} />}
                    </div>

                    {/* FLECHA (Triangulito indicador) */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${
                      !isRight ? "right-full mr-2" : "left-full ml-2"
                    }`}>
                      <div className={`w-0 h-0 border-y-[5px] border-y-transparent ${
                        !isRight ? "border-r-[7px] border-r-gray-800" : "border-l-[7px] border-l-gray-800"
                      }`} />
                    </div>
                  </div>

                  {/* ESPACIO VACÍO PARA EL LADO OPUESTO */}
                  <div className="w-[42%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}