"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function EventDetails() {
  const events = [
    {
      title: "CEREMONIA",
      icon: "/images/img-grafitis/anillos.png",
      image: "/img_boda/iglesia.jpg",
      time: "12 de septiembre de 2026 a las 20:00hs",
      location: '"Parroquia Natividad del Señor", Av. Eugenia Tapia de Cruz 524, Escobar, Bs. As.',
      mapsLink: "https://maps.google.com",
      calendarLink: "#",
    },
    {
      title: "FIESTA",
      icon: "/images/img-grafitis/fiesta.png",
      image: "/img_boda/lugar.jpg",
      time: "12 de septiembre de 2026 a las 21:00hs",
      location: '"Estancia La Soñada del Pilar", Sor Teresa y Cabo de Hornos, Pilar, Bs. As.',
      mapsLink: "https://maps.google.com",
      calendarLink: "#",
    }
  ];

  return (
    <section className="py-12 bg-[#f7e6c4] font-['Permanent_Marker',_cursive]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-white/30 p-4 rounded-3xl backdrop-blur-sm"
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
              <h3 className="text-3xl md:text-4xl text-black mb-3 tracking-wider">
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
                  <p className="text-black text-xs leading-relaxed max-w-[250px] mx-auto">
                    {event.location}
                  </p>
                </div>

                {/* BOTONES ACCIÓN */}
                <div className="flex flex-row justify-center gap-2 pt-2">
                  <a 
                    href={event.calendarLink}
                    className="bg-[#d29b7b] hover:bg-[#c18a6a] text-white text-[10px] py-2 px-4 rounded-full transition-all flex items-center gap-1 shadow-md uppercase"
                  >
                    📅 Agendar
                  </a>
                  <a 
                    href={event.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#d29b7b] hover:bg-[#c18a6a] text-white text-[10px] py-2 px-4 rounded-full transition-all flex items-center gap-1 shadow-md uppercase"
                  >
                    📍 Mapa
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