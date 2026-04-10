"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Heart, 
  Utensils, 
  Music, 
  Wine, 
  Users, 
  Star
} from "lucide-react";

interface ItineraryItem {
  time: string;
  title: string;
  icon: React.ReactNode;
}

export function Itinerary() {
  const steps: ItineraryItem[] = [
    { time: "20:00hs", title: "Ceremonia", icon: <Heart size={28} strokeWidth={1.5} /> },
    { time: "21:00hs", title: "Recepción", icon: <Wine size={28} strokeWidth={1.5} /> },
    { time: "22:00hs", title: "Entrada de los novios", icon: <Users size={28} strokeWidth={1.5} /> },
    { time: "22:30hs", title: "Vals", icon: <Star size={28} strokeWidth={1.5} /> },
    { time: "23:00hs", title: "Cena", icon: <Utensils size={28} strokeWidth={1.5} /> },
    { time: "0:00hs", title: "Baile", icon: <Music size={28} strokeWidth={1.5} /> },
    { time: "4:00hs", title: "Brindis", icon: <Wine size={28} strokeWidth={1.5} /> },
  ];

  return (
    <section className="relative py-16 bg-[#F2E8D9] overflow-hidden font-sans">
      {/* SEPARADOR SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>

      {/* TÍTULO */}
      <div className="flex flex-col items-center mb-16 px-4">
        <div className="relative w-14 h-14 mb-2">
          <div className="absolute inset-0 bg-[#d29b7b] rounded-full blur-md opacity-40 scale-125" />
          <Image 
            src="/images/img-grafitis/reloj.png" 
            alt="Reloj" 
            fill 
            className="object-contain relative z-10" 
          />
        </div>
        <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-black uppercase tracking-tighter text-center">
          Itinerario
        </h2>
      </div>

      <div className="container mx-auto px-4 relative max-w-4xl">
        
        {/* LÍNEA VERTICAL CENTRAL */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-black -translate-x-1/2 z-0" />

        <div className="relative z-10">
          {steps.map((item, index) => (
            <div key={index} className="relative mb-12 md:mb-16 flex items-center md:justify-center">
              
              {/* NODO (Icono) */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="relative z-20 w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center bg-[#d29b7b] rounded-full border border-black/5 shadow-md text-white ml-2 md:ml-0"
              >
                {item.icon}
              </motion.div>

              {/* BURBUJA DE TEXTO */}
              <motion.div 
                initial={{ opacity: 0, x: (index % 2 === 0 ? -40 : 40) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`
                  relative ml-6 md:ml-0 md:absolute 
                  w-[calc(100%-80px)] md:w-[240px] 
                  bg-white border border-black py-3 px-4 rounded-[1.2rem] shadow-sm flex flex-col items-center
                  ${index % 2 === 0 
                    ? "md:right-[calc(50%+45px)]" 
                    : "md:left-[calc(50%+45px)]"
                  }
                `}
              >
                <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">
                  {item.time}
                </span>
                <h3 className="text-sm md:text-base font-bold text-[#d29b7b] text-center leading-tight">
                  {item.title}
                </h3>
                
                {/* Triangulito (Puntero de la burbuja) */}
                <div className={`
                  absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-b border-l border-black rotate-[45deg]
                  -left-[7px]
                  ${index % 2 === 0 
                    ? "md:-right-[7px] md:left-auto md:border-l-0 md:border-r md:rotate-[-45deg]" 
                    : "md:-left-[7px] md:border-l md:border-b md:rotate-[45deg]"
                  }
                `} />
              </motion.div>

            </div>
          ))}
        </div>
      </div>

      {/* SEPARADOR INFERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div className="w-full h-[60px] md:h-[160px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}