"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react"; 
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface ItineraryProps {
  items?: {
    time: string;
    title: string;
    icon: string; 
  }[];
  plan?: string; 
}

export function Itinerary({ items, plan }: ItineraryProps) {
  // 1. Si el plan es explícitamente CLASSIC, no mostramos nada.
  // Pero si el plan es undefined (o no viene), permitimos que se vea para el modelo/demo.
  if (plan === "CLASSIC") return null;

  // 2. Si no vienen items por props, usamos los del archivo localConfig para que el cliente vea el modelo
  const displayItems = items && items.length > 0 ? items : localConfig.itinerario;

  // Si después de eso sigue sin haber nada, entonces sí ocultamos
  if (!displayItems || displayItems.length === 0) return null;

  const IconComponent = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.Star;
    return <Icon size={20} strokeWidth={1.5} />;
  };

  return (
    <section className="relative py-8 md:py-12 bg-[#F2E8D9] overflow-hidden font-sans">
      {/* SEPARADOR SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="w-full h-[40px] md:h-[100px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [-webkit-mask-size:100%_100%]" />
      </div>

      {/* TÍTULO */}
      <div className="flex flex-col items-center mb-8 px-4 mt-10 md:mt-16">
        <div className="relative w-10 h-10 mb-1">
          <div className="absolute inset-0 bg-[#d29b7b] rounded-full blur-md opacity-40 scale-125" />
          <Image 
            src="/images/img-grafitis/reloj.webp" 
            alt="Reloj" 
            fill 
            className="object-contain relative z-10" 
          />
        </div>
        <h2 className="font-['Permanent_Marker',_cursive] text-3xl md:text-4xl text-black uppercase tracking-tighter text-center">
          Itinerario
        </h2>
      </div>

      <div className="container mx-auto px-4 relative max-w-3xl">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-black -translate-x-1/2 z-0" />

        <div className="relative z-10">
          {displayItems.map((item, index) => (
            <div key={index} className="relative mb-6 md:mb-8 flex items-center md:justify-center">
              
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="relative z-20 w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center bg-[#d29b7b] rounded-full border border-black shadow-sm text-white ml-3 md:ml-0"
              >
                {IconComponent(item.icon)}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: (index % 2 === 0 ? -30 : 30) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`
                  relative ml-6 md:ml-0 md:absolute 
                  w-[calc(100%-80px)] md:w-[200px] 
                  bg-white border border-black py-2 px-3 rounded-[1rem] shadow-sm flex flex-col items-center
                  ${index % 2 === 0 
                    ? "md:right-[calc(50%+35px)]" 
                    : "md:left-[calc(50%+35px)]"
                  }
                `}
              >
                <span className="text-[9px] text-gray-500 font-bold uppercase leading-none mb-1">
                  {item.time}
                </span>
                <h3 className="text-xs md:text-sm font-bold text-[#d29b7b] text-center leading-none uppercase">
                  {item.title}
                </h3>
                
                <div className={`
                  absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-b border-l border-black rotate-[45deg]
                  -left-[6px]
                  ${index % 2 === 0 
                    ? "md:-right-[6px] md:left-auto md:border-l-0 md:border-r md:rotate-[-45deg]" 
                    : "md:-left-[6px] md:border-l md:border-b md:rotate-[45deg]"
                  }
                `} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* SEPARADOR INFERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none">
        <div className="w-full h-[40px] md:h-[100px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}