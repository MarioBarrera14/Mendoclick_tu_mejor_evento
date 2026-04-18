"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Zap } from "lucide-react";

// --- INTERFAZ CONECTADA AL SCHEMA ---
interface LocationProps {
  config: {
    venueName: string;
    venueAddress: string;
    mapLink: string;
  };
}

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function Location({ config }: LocationProps) {
  // Mapeo directo de los campos del Schema
  const name = config.venueName || "Nombre del Salón";
  const address = config.venueAddress || "Dirección del evento";
  const link = config.mapLink || "#";

  return (
    <section className="relative py-24 bg-[#0c001a] overflow-hidden">
      
      {/* --- FONDO CON IMAGEN DEL SALÓN Y OVERLAY --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/salon.webp" 
          alt="Salón del evento" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.3]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c001a] via-transparent to-[#0c001a]" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          {/* HEADER DE SECCIÓN */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-purple-400">
               <Zap size={18} fill="currentColor" className="animate-pulse" />
               <span className="text-[10px] tracking-[0.6em] uppercase font-black italic">Punto de Encuentro</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black italic text-white mb-4 tracking-tighter uppercase leading-none drop-shadow-2xl">
              La <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Fiesta</span>
            </h2>
          </div>

          {/* TARJETA CRYSTAL PREMIUM */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-black/60 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 border border-white/10 text-center overflow-hidden">
              
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[60px] group-hover:bg-purple-600/40 transition-all duration-700" />

              {/* Icono de Pin Neón */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)] mb-8 text-white group-hover:scale-110 transition-transform duration-500">
                <MapPin size={36} strokeWidth={1.5} className="text-purple-400" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl md:text-5xl font-black italic text-white mb-4 uppercase tracking-tighter leading-none">
                  {name}
                </h3>
                <p className="text-purple-100/60 text-lg md:text-xl mb-12 max-w-[300px] mx-auto leading-tight italic font-medium uppercase">
                  {address}
                </p>

                <div className="flex flex-col items-center gap-7">
                  {/* Botón Call to Action Neón */}
                  <motion.a 
                    href={link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:bg-purple-600 hover:text-white italic no-underline"
                  >
                    <Navigation size={18} fill="currentColor" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Abrir Mapa
                    <ExternalLink size={14} className="opacity-40" />
                  </motion.a>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-purple-500/30" />
                    <p className="text-[9px] text-purple-400 font-black uppercase tracking-[0.5em] italic">
                      Te esperamos puntual
                    </p>
                    <div className="h-[1px] w-6 bg-purple-500/30" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <NeonDivider />
    </section>
  );
}