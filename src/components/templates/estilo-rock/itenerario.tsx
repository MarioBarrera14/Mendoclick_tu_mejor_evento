"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Utensils, 
  Music, 
  Wine, 
  Users, 
  Star
} from "lucide-react";

interface Event {
  time: string;
  title: string;
  icon: React.ReactNode;
}

const events: Event[] = [
  { time: "20:00hs", title: "Ceremonia", icon: <Heart size={16} /> },
  { time: "21:00hs", title: "Recepción", icon: <Star size={16} /> },
  { time: "22:00hs", title: "Entrada de los novios", icon: <Users size={16} /> },
  { time: "22:30hs", title: "Vals", icon: <Music size={16} /> },
  { time: "23:00hs", title: "Cena", icon: <Utensils size={16} /> },
  { time: "0:00hs", title: "Baile", icon: <Music size={16} /> },
  { time: "4:00hs", title: "Brindis", icon: <Wine size={16} /> },
];

export default function ItinerarioRetroFinal() {
  return (
    <section className="relative min-h-screen bg-[#121212] text-white overflow-hidden flex flex-col justify-center font-sans py-10 md:py-10">
      {/* Fondo de puntos */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #78f7f7 1px, transparent 1px)', 
          backgroundSize: '22px 22px' 
        }} 
      />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12">
          <img 
            src="/img-rock/reloj.png" 
            alt="Reloj" 
            className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-1 object-contain"
          />
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-[#b43c3c] drop-shadow-[3px_3px_0px_#f4e9d8] md:drop-shadow-[4px_4px_0px_#f4e9d8] uppercase leading-none">
            Itinerario
          </h2>
        </div>

        {/* Línea de Tiempo */}
        <div className="relative">
          {/* Poste central */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] bg-[#8b6b4d] -translate-x-1/2" />

          <div className="space-y-6 md:space-y-0 relative">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center w-full md:h-24 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Contenedor del Globo: md:w-1/2 para que llegue justo al centro */}
                  <div className={`w-full md:w-1/2 flex ${isLeft ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"} justify-start pl-12 md:pl-0 z-10`}>
                    <div className={`
                      bg-white border-[2.5px] border-dashed border-[#33aba1] 
                      rounded-[1.3rem] py-2 px-5 min-w-[180px] md:w-auto shadow-xl
                      ${isLeft ? "md:-rotate-2" : "md:rotate-4"}
                      relative
                    `}>
                      {/* Triangulito Desktop */}
                      <div className={`
                        absolute top-1/2 -translate-y-1/2 w-0 h-0 
                        border-t-[8px] border-t-transparent 
                        border-b-[8px] border-b-transparent
                        hidden md:block
                        ${isLeft ? 
                          "left-full border-l-[12px] border-l-[#33aba1] ml-[-2px]" : 
                          "right-full border-r-[12px] border-r-[#33aba1] mr-[-2px]"
                        }
                      `} />
                      
                      {/* Triangulito Mobile */}
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-[#33aba1] mr-[-2px] md:hidden" />

                      <span className={`block text-[#cc6677] font-bold text-[10px] md:text-[11px] leading-none mb-0.5 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
                        {event.time}
                      </span>
                      <h4 className={`text-[#33aba1] font-black text-sm md:text-lg leading-tight ${isLeft ? "md:text-right" : "md:text-left"} text-left uppercase`}>
                        {event.title}
                      </h4>
                    </div>
                  </div>

                  {/* Círculo Central */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#33aba1] border-2 border-[#121212] z-20 text-white shadow-md">
                    {event.icon}
                  </div>

                  {/* Espaciador Desktop (Lado vacío) */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}