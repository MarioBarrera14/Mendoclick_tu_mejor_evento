"use client";

import { motion } from "framer-motion";
import { Heart, GlassWater, Utensils, Music, Clock, PartyPopper, Star, MapPin } from "lucide-react";

export function Itinerary() {
  const steps = [
    { time: "20:00hs", title: "Ceremonia", icon: <Heart size={18} />, side: "left", mapUrl: "#" },
    { time: "21:00hs", title: "Recepción", icon: <GlassWater size={18} />, side: "right", mapUrl: "#" },
    { time: "22:00hs", title: "Entrada de los novios", icon: <PartyPopper size={18} />, side: "left", mapUrl: "#" },
    { time: "22:30hs", title: "Vals", icon: <Star size={18} />, side: "right", mapUrl: "#" },
    { time: "23:00hs", title: "Cena", icon: <Utensils size={18} />, side: "left", mapUrl: "#" },
    { time: "0:00hs", title: "Baile", icon: <Music size={18} />, side: "right", mapUrl: "#" },
    { time: "4:00hs", title: "Brindis", icon: <GlassWater size={18} />, side: "left", mapUrl: "#" },
  ];

  return (
    <section className="relative bg-[#fafafa] text-black pt-0 pb-16 px-4 overflow-hidden min-h-screen flex flex-col items-center">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      {/* Margen negativo para acercarlo más a los picos del countdown si es necesario */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-6 mt-4 relative z-10"
      >
        <div className="w-12 h-12 rounded-full border-2 border-black/10 flex items-center justify-center mb-3 bg-white shadow-sm">
          <Clock size={24} className="text-black/80" />
        </div>
        <h2 className="text-5xl md:text-6xl font-serif italic tracking-tight text-center text-black leading-tight">
          Itinerario
        </h2>
      </motion.div>

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute left-1/2 -top-10 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-black/20 to-transparent -translate-x-1/2 z-0" />

        <div className="space-y-8 md:space-y-12">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.side === "left" ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center w-full z-10 ${
                item.side === "left" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="hidden md:block w-1/2" />
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                 <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center z-20 shadow-md">
                  {item.icon}
                </div>
              </div>

              <div className={`w-full md:w-1/2 flex ${item.side === "left" ? "justify-end md:pr-10" : "justify-start md:pl-10"}`}>
                <a href={item.mapUrl} className="group relative w-[85%] md:w-full max-w-[240px]">
                  <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-black/30">
                    <span className="block text-[10px] font-bold text-black/40 uppercase mb-2">{item.time}</span>
                    <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                    <div className="flex items-center gap-2 text-black/60 pt-2 border-t border-black/5">
                        <MapPin size={11} strokeWidth={2.5} />
                        <span className="text-[10px] font-bold">COMO LLEGAR</span>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}