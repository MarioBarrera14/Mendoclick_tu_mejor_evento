"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, 
  Sparkles, 
  Utensils, 
  Star, 
  PartyPopper,
  Gift
} from "lucide-react";

const events = [
  { time: "21:00hs", title: "Recepción", icon: <GlassWater size={20} />, side: "right" },
  { time: "22:30hs", title: "Entrada de la Quinceañera", icon: <Star size={20} />, side: "left" },
  { time: "23:00hs", title: "Brindis", icon: <GlassWater size={20} />, side: "right" },
  { time: "23:30hs", title: "Cena", icon: <Utensils size={20} />, side: "left" },
  { time: "01:00hs", title: "Vals", icon: <Sparkles size={20} />, side: "right" },
  { time: "01:30hs", title: "Apertura de Pista", icon: <PartyPopper size={20} />, side: "left" },
  { time: "03:30hs", title: "Candy Bar", icon: <Star size={20} />, side: "right" },
  { time: "05:00hs", title: "Souvenirs y Fin de Fiesta", icon: <Gift size={20} />, side: "left" },
];

export function Itinerary() {
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
          {/* LÍNEA CENTRAL VERTICAL */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-200" />

          <div className="space-y-12">
            {events.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between w-full ${
                  item.side === "right" ? "flex-row-reverse" : ""
                }`}
              >
                {/* BLOQUE DE TEXTO */}
                <div className="w-[42%] flex flex-col items-center">
                  <div className={`flex flex-col ${item.side === "left" ? "items-end text-right pr-4" : "items-start text-left pl-4"} w-full`}>
                    <span className="text-[10px] md:text-xs text-gray-400 font-light tracking-widest uppercase">
                      {item.time}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-tight mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* CÍRCULO CON ÍCONO (Centro) */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed border-gray-400 bg-white flex items-center justify-center text-gray-800 shadow-sm">
                    {item.icon}
                  </div>

                  {/* FLECHA (Triangulito) CORREGIDA */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${
                    item.side === "left" ? "right-full mr-2" : "left-full ml-2"
                  }`}>
                    <div className={`w-0 h-0 border-y-[5px] border-y-transparent ${
                      // Si el texto está a la izquierda (side left), la flecha apunta a la izquierda
                      // Si el texto está a la derecha (side right), la flecha apunta a la derecha
                      item.side === "left" ? "border-r-[7px] border-r-gray-800" : "border-l-[7px] border-l-gray-800"
                    }`} />
                  </div>
                </div>

                {/* ESPACIO VACÍO PARA EL LADO OPUESTO */}
                <div className="w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}