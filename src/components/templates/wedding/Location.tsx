"use client";

import { motion } from "framer-motion";
import { 
  GlassWater, Utensils, Music, Stars, 
  MapPin, Church, Building2 
} from "lucide-react";
import Image from "next/image";

interface ItineraryItem {
  time: string;
  title: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  mapUrl?: string;
}

export function Itinerary() {
  const steps: ItineraryItem[] = [
    { 
      time: "11:00 HS", 
      title: "Civil", 
      location: "Registro Civil Central",
      description: "Acompañanos en el momento de la firma legal.", 
      icon: <Building2 size={20} />,
      mapUrl: "https://maps.google.com" 
    },
    { 
      time: "18:00 HS", 
      title: "La Ceremonia", 
      location: "Parroquia Corazón de María",
      description: "Momento de dar el sí y recibir la bendición.", 
      icon: <Church size={20} />,
      mapUrl: "https://maps.google.com"
    },
    { 
      time: "19:30 HS", 
      title: "Recepción & Cóctel", 
      location: "Salón Los Olivos - Jardín",
      description: "Brindis de bienvenida y bocadillos al aire libre.", 
      icon: <GlassWater size={20} />,
      mapUrl: "https://maps.google.com"
    },
    { 
      time: "21:30 HS", 
      title: "Cena de Gala", 
      location: "Salón Los Olivos - Principal",
      description: "Disfrutaremos de un menú especial y sorpresas.", 
      icon: <Utensils size={20} />,
    },
    { 
      time: "00:00 HS", 
      title: "¡A Bailar!", 
      location: "Pista Central",
      description: "Apertura de pista y cotillón.", 
      icon: <Music size={20} />,
    },
  ];

  return (
    <section className="relative py-24 bg-[#F9FAF7] overflow-hidden">
      
      {/* --- CUADRO DECORATIVO (gdj-frame) --- */}
      {/* Se posiciona de forma absoluta cubriendo casi toda la sección */}
      <div className="absolute inset-4 md:inset-10 border-none pointer-events-none z-0 opacity-40">
        <div 
          className="w-full h-full"
          style={{ 
            backgroundImage: "url('/gdj-frame-5130657.svg')", 
            backgroundSize: '100% 100%', 
            backgroundRepeat: 'no-repeat' 
          }}
        />
      </div>

      {/* --- HOJAS DECORATIVAS A LOS COSTADOS --- */}
      {/* Imagen Elegance 1b (Izquierda) */}
      <div className="absolute top-20 -left-16 w-48 h-80 md:w-64 md:h-[500px] opacity-30 pointer-events-none z-10">
        <Image 
          src="/elegance-1b.png" 
          alt="Hoja decorativa izquierda" 
          fill 
          className="object-contain"
        />
      </div>

      {/* Imagen Elegance 1a (Derecha) */}
      <div className="absolute bottom-20 -right-16 w-48 h-80 md:w-64 md:h-[500px] opacity-30 pointer-events-none z-10">
        <Image 
          src="/elegance-1a.png" 
          alt="Hoja decorativa derecha" 
          fill 
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        
        {/* ENCABEZADO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#4B664B]/60 uppercase font-bold mb-2 block">
            Timeline
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-[#4B664B] tracking-tight">
            Itinerario
          </h2>
        </motion.div>

        {/* LÍNEA DE TIEMPO */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#4B664B]/10 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-6">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between md:justify-normal ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-[45%]" />

                {/* Nodo Central */}
                <div className="relative z-30 flex-shrink-0 w-12 h-12 rounded-full bg-white border border-[#4B664B]/20 shadow-md flex items-center justify-center text-[#4B664B] md:mx-auto">
                  {item.icon}
                </div>

                {/* Tarjeta */}
                <div className={`w-[calc(100%-60px)] md:w-[45%] ${
                  index % 2 !== 0 ? "md:text-right md:pr-6" : "md:text-left md:pl-6"
                }`}>
                  <div className="bg-white/60 backdrop-blur-sm border border-white p-5 md:p-6 rounded-[1.5rem] shadow-sm">
                    <span className="text-[#94A994] font-bold text-[10px] tracking-widest uppercase block mb-1">
                      {item.time}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif italic text-[#4B664B] mb-1">
                      {item.title}
                    </h3>
                    
                    <div className={`flex items-center gap-1.5 mb-2 text-[#4B664B]/70 font-medium text-[11px] ${
                      index % 2 !== 0 ? "md:justify-end" : "md:justify-start"
                    }`}>
                      <MapPin size={10} className="text-[#94A994]" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-[#4B664B]/60 font-light text-[13px] leading-snug mb-3">
                      {item.description}
                    </p>

                    {item.mapUrl && (
                      <a 
                        href={item.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-[9px] tracking-widest uppercase font-bold text-[#4B664B] gap-2"
                      >
                        <span>Mapa</span>
                        <div className="w-4 h-[1px] bg-[#4B664B]/30 group-hover:w-8 transition-all" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}