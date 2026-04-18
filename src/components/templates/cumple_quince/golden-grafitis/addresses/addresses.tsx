"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// --- INTERFAZ CONECTADA AL SCHEMA ---
interface EventDetailsProps {
  config: {
    eventDate: string;
    eventTime: string;
    // Salón / Fiesta
    venueName: string;
    venueAddress: string;
    mapLink: string;
    // Iglesia / Ceremonia (Opcionales)
    churchName?: string | null;
    churchAddress?: string | null;
    churchMapLink?: string | null;
  };
}

export function EventDetails({ config }: EventDetailsProps) {
  // Construcción dinámica de los eventos basada en el Schema
  const events = [];

  // 1. Si hay datos de Iglesia, se agrega la Ceremonia
  if (config.churchName && config.churchName.trim() !== "") {
    events.push({
      title: "CEREMONIA",
      icon: "/images/img-grafitis/anillos.webp",
      image: "/img_boda/iglesia.webp", // Placeholder temático
      time: `${config.eventDate.split("-").reverse().join("/")} a las ${config.eventTime}hs`,
      location: `"${config.churchName}", ${config.churchAddress}`,
      mapsLink: config.churchMapLink || "#",
    });
  }

  // 2. Siempre se agrega la Fiesta
  events.push({
    title: "FIESTA",
    icon: "/images/img-grafitis/fiesta.webp",
    image: "/img_boda/lugar.webp", // Placeholder temático
    time: `${config.eventDate.split("-").reverse().join("/")} a las ${config.eventTime}hs`,
    location: `"${config.venueName}", ${config.venueAddress}`,
    mapsLink: config.mapLink || "#",
  });

  return (
    <section className="py-12 bg-[#f7e6c4] font-['Permanent_Marker',_cursive]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`grid grid-cols-1 ${events.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-8 md:gap-4`}>
          
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-white/30 p-4 rounded-3xl backdrop-blur-sm shadow-sm border border-white/20"
            >
              {/* ICONO */}
              <div className="mb-2 relative w-16 h-16 md:w-20 md:h-20">
                <Image 
                  src={event.icon} 
                  alt={event.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* TÍTULO */}
              <h3 className="text-3xl md:text-4xl text-black mb-3 tracking-wider uppercase">
                {event.title}
              </h3>

              {/* IMAGEN DEL LUGAR */}
              <div className="relative w-full aspect-video mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50">
                <Image 
                  src={event.image} 
                  alt={`Imagen de ${event.title}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO DETALLES */}
              <div className="space-y-4 w-full">
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#4B664B] mb-1">
                    DIA Y HORARIO
                  </h4>
                  <p className="text-black text-sm italic leading-tight">
                    {event.time}
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#4B664B] mb-1">
                    LUGAR
                  </h4>
                  <p className="text-black text-xs leading-relaxed max-w-[250px] mx-auto uppercase">
                    {event.location}
                  </p>
                </div>

                {/* BOTONES ACCIÓN */}
                <div className="flex flex-row justify-center gap-2 pt-2">
                  <a 
                    href={event.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#d29b7b] hover:bg-[#c18a6a] text-white text-[10px] py-2 px-6 rounded-full transition-all flex items-center gap-2 shadow-md uppercase font-sans font-bold"
                  >
                    📍 Ver Mapa
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}