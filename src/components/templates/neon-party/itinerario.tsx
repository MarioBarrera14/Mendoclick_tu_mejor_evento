"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, 
  Sparkles, 
  Utensils, 
  Star, 
  PartyPopper,
  Gift,
  Zap
} from "lucide-react";

const events = [
  { time: "21:00hs", title: "Recepción", icon: <GlassWater size={16} />, side: "right" },
  { time: "22:30hs", title: "Entrada", icon: <Star size={16} />, side: "left" },
  { time: "23:00hs", title: "Brindis", icon: <GlassWater size={16} />, side: "right" },
  { time: "23:30hs", title: "Cena", icon: <Utensils size={16} />, side: "left" },
  { time: "01:00hs", title: "Vals", icon: <Sparkles size={16} />, side: "right" },
  { time: "01:30hs", title: "Baile", icon: <PartyPopper size={16} />, side: "left" },
  { time: "03:30hs", title: "Candy Bar", icon: <Star size={16} />, side: "right" },
  { time: "05:00hs", title: "Souvenirs", icon: <Gift size={16} />, side: "left" },
];

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    {/* Resplandor difuso (Glow) */}
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    {/* Línea central brillante */}
    <div className="absolute inset-0 bg-white opacity-90" />
    {/* Luz ambiental hacia arriba */}
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function Itinerary() {
  return (
    <section className="relative py-16 bg-[#0c001a] overflow-hidden font-sans">
      
      {/* Fondo de Grilla muy sutil */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-lg">
        
        {/* Cabecera compacta */}
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
          {/* LÍNEA CENTRAL NEON MÁS FINA */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.3)]" />

          <div className="space-y-10">
            {events.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between w-full ${
                  item.side === "right" ? "flex-row-reverse" : ""
                }`}
              >
                {/* BLOQUE DE TEXTO REDUCIDO */}
                <div className="w-[40%]">
                  <div className={`flex flex-col ${item.side === "left" ? "items-end text-right" : "items-start text-left"}`}>
                    <span className="text-[9px] text-purple-400 font-black tracking-widest uppercase">
                      {item.time}
                    </span>
                    <h4 className="text-[11px] md:text-xs font-black text-white uppercase italic tracking-tight mt-0.5 leading-none">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* CÍRCULO CON ÍCONO MINI NEON */}
                <div className="relative z-10 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(147,51,234,1)" }}
                    className="w-10 h-10 rounded-full border border-purple-500 bg-[#1a0033] flex items-center justify-center text-white shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-all"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Triangulito indicador pequeño */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${
                    item.side === "left" ? "right-full mr-2" : "left-full ml-2"
                  }`}>
                    <div className={`w-0 h-0 border-y-[4px] border-y-transparent ${
                      item.side === "left" ? "border-r-[6px] border-r-purple-500" : "border-l-[6px] border-l-purple-500"
                    }`} />
                  </div>
                </div>

                {/* ESPACIO VACÍO */}
                <div className="w-[40%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
          <NeonDivider />

    </section>
  );
}