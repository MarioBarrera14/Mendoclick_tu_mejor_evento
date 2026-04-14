"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Church, Wine, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

// 1. Interfaz conectada a tu Schema de Prisma
interface LocationsSectionProps {
  config: {
    eventDate: string;
    eventTime: string;
    // Salón
    venueName: string;
    venueAddress: string;
    mapLink: string;
    // Iglesia (Opcionales)
    churchName?: string | null;
    churchAddress?: string | null;
    churchMapLink?: string | null;
  };
}

interface LocationData {
  icon: React.ReactNode;
  title: string;
  image: string;
  date: string;
  time: string;
  placeName: string;
  address: string;
  googleMapsUrl: string;
}

const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]" />
  </div>
);

function LocationCard({ location, onOpen }: { location: LocationData; onOpen: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onOpen}
      className="relative flex flex-col items-center group cursor-pointer"
    >
      <div className="relative bg-[#fcfaf2] p-2 md:p-3 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-[0_35px_65px_-12px_rgba(0,0,0,0.9)] mb-6 aspect-square flex items-center justify-center z-10">
        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
        <div className="absolute inset-4 md:inset-5 border border-black/80 rounded-full z-10 pointer-events-none" />
        <div className="relative w-32 h-32 md:w-44 md:h-44 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] z-20 transition-all duration-700 aspect-square">
          <Image 
            src={location.image} 
            alt={location.placeName} 
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] z-30 rounded-full pointer-events-none" />
        </div>
      </div>

      <div className="text-center px-2 relative z-10">
        <div className="mb-2 text-[#b5a47a] flex justify-center drop-shadow-md transition-transform duration-500 group-hover:scale-110">
          {location.icon}
        </div>
        <h3 className="text-lg md:text-xl font-serif italic text-white mb-1 tracking-tight uppercase drop-shadow-md">
          {location.title}
        </h3>
        <div className="w-8 h-px bg-[#b5a47a]/40 mx-auto mb-2" />
        <p className="text-[#b5a47a] text-[9px] uppercase font-bold tracking-[0.2em] opacity-80">
          Ver ubicación
        </p>
      </div>
    </motion.div>
  );
}

export function LocationsSection({ config }: LocationsSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  // 2. Construimos el array dinámicamente basado en los datos existentes
  const locations: LocationData[] = [];

  // Siempre agregamos la Celebración (Salón)
  locations.push({
    icon: <Wine size={24} strokeWidth={1} />,
    title: "Celebración",
    image: "/img_boda/lugar.jpg", 
    date: config.eventDate,
    time: config.eventTime,
    placeName: config.venueName,
    address: config.venueAddress,
    googleMapsUrl: config.mapLink
  });

  // Si existe el nombre de la iglesia, agregamos la Ceremonia
  if (config.churchName && config.churchName.trim() !== "") {
    locations.unshift({ // unshift para que aparezca primero
      icon: <Church size={24} strokeWidth={1} />,
      title: "Ceremonia",
      image: "/img_boda/iglesia.jpg", 
      date: config.eventDate,
      time: config.eventTime, // Podrías añadir un campo churchTime en el schema si varían
      placeName: config.churchName,
      address: config.churchAddress || "",
      googleMapsUrl: config.churchMapLink || ""
    });
  }

  return (
    <section className="relative py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`grid grid-cols-1 ${locations.length > 1 ? 'md:grid-cols-2' : 'max-w-md'} gap-12 lg:gap-20 items-center justify-center mx-auto`}>
          {locations.map((loc, index) => (
            <LocationCard key={index} location={loc} onOpen={() => setSelectedLocation(loc)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedLocation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedLocation(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedLocation(null)} className="absolute top-6 right-6 z-50 p-2 text-gray-400 hover:text-black">
                <X size={24} />
              </button>

              <div className="p-10 flex flex-col items-center text-center">
                <div className="text-[#b5a47a] mb-4">{selectedLocation.icon}</div>
                <h2 className="text-3xl font-serif italic text-gray-900 uppercase tracking-widest mb-2">
                  {selectedLocation.title}
                </h2>
                <div className="w-12 h-px bg-[#b5a47a]/30 mx-auto mb-8" />
                
                <div className="space-y-8 w-full text-gray-600">
                  <div className="border-y border-gray-100 py-6">
                    <p className="text-[#b5a47a] text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Cuándo</p>
                    <p className="text-xl italic font-serif text-gray-800">{selectedLocation.date}</p>
                    <p className="text-lg font-light">{selectedLocation.time}</p>
                  </div>

                  <div>
                    <p className="text-[#b5a47a] text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Dónde</p>
                    <p className="text-xl text-gray-800 font-serif italic mb-2">{selectedLocation.placeName}</p>
                    <p className="text-sm font-light text-gray-400 px-6">{selectedLocation.address}</p>
                  </div>

                  <div className="pt-4">
                    <a 
                      href={selectedLocation.googleMapsUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-black text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 transition-all shadow-lg"
                    >
                      <MapPin size={14} /> Cómo llegar
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}