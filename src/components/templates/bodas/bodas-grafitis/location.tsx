"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface EventDetailsProps {
  config: {
    eventDate: string;
    eventTime: string;
    venueName: string;
    venueAddress: string;
    mapLink: string;
    churchName?: string | null;
    churchAddress?: string | null;
    churchMapLink?: string | null;
  };
}

export function EventDetails({ config }: EventDetailsProps) {
  const eventItems = [
    {
      show: !!config.churchName,
      title: "CEREMONIA",
      icon: "/images/img-grafitis/anillos.png",
      image: "/img_boda/iglesia.jpg", 
      time: `${config.eventDate} a las ${config.eventTime}hs`,
      location: `"${config.churchName}", ${config.churchAddress}`,
      mapsLink: config.churchMapLink || "#",
    },
    {
      show: true,
      title: "FIESTA",
      icon: "/images/img-grafitis/fiesta.png",
      image: "/img_boda/lugar.jpg",
      time: `${config.eventDate} a las ${config.eventTime}hs`,
      location: `"${config.venueName}", ${config.venueAddress}`,
      mapsLink: config.mapLink,
    }
  ].filter(item => item.show);

  return (
    <section className="py-12 bg-[#f7e6c4] font-['Permanent_Marker',_cursive]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`grid grid-cols-1 ${eventItems.length > 1 ? 'md:grid-cols-2' : 'md:max-w-md mx-auto'} gap-8 md:gap-4`}>
          
          {eventItems.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              // h-full asegura que todas midan lo mismo
              className="flex flex-col items-center text-center bg-white/30 p-6 rounded-3xl backdrop-blur-sm h-full border border-white/20 shadow-xl"
            >
              <div className="mb-2 relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image src={event.icon} alt={event.title} fill className="object-contain" />
              </div>

              <h3 className="text-3xl md:text-4xl text-black mb-3 tracking-wider flex-shrink-0">
                {event.title}
              </h3>

              <div className="relative w-full aspect-video mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50 flex-shrink-0">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>

              {/* El div de info tiene flex-grow para empujar los botones al final */}
              <div className="flex flex-col flex-grow w-full justify-between">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#4B664B] mb-1">
                      DIA Y HORARIO
                    </h4>
                    <p className="text-black text-sm italic leading-tight uppercase">
                      {event.time}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#4B664B] mb-1">
                      LUGAR
                    </h4>
                    {/* line-clamp-2 limita a 2 líneas y pone "..." si excede */}
                    <p className="text-black text-xs leading-relaxed max-w-[250px] mx-auto uppercase line-clamp-2 overflow-hidden text-ellipsis" title={event.location}>
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Los botones siempre quedarán abajo gracias al flex-grow anterior */}
                <div className="flex flex-row justify-center gap-2 pt-6 flex-shrink-0">
                  <a 
                    href={event.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#d29b7b] hover:bg-[#c18a6a] text-white text-[11px] py-2.5 px-6 rounded-full transition-all flex items-center gap-2 shadow-md uppercase font-sans font-black"
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