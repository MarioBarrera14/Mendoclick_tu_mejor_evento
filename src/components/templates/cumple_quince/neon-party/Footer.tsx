"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ChevronUp, ArrowUpRight, Instagram, Zap } from "lucide-react";

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function Footer() {
  const { contacto, footer } = eventConfig;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#0c001a] pt-16 pb-8 overflow-hidden border-t border-purple-500/20">
      <NeonDivider />
      
      {/* --- FONDO CON GRID --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-purple-400">
              <Zap size={14} fill="currentColor" className="animate-pulse" />
              <span className="tracking-[0.5em] text-[9px] uppercase font-black">Hablemos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase leading-none">
              ¿Tenés alguna <span className="text-purple-600">duda?</span>
            </h2>
          </motion.div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-lg justify-center">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl transition-all shadow-lg hover:bg-purple-500 shadow-purple-900/20"
            >
              <MessageCircle size={18} />
              <span className="tracking-widest text-[10px] font-black uppercase italic">WhatsApp</span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar"
              target="_blank"
              whileHover={{ y: -3, backgroundColor: "rgba(147,51,234,0.1)" }}
              className="flex items-center justify-center gap-3 px-8 py-4 border border-purple-500/30 text-white rounded-xl transition-all backdrop-blur-md"
            >
              <span className="tracking-widest text-[10px] font-black uppercase italic">Más Info</span>
              <ArrowUpRight size={14} className="text-purple-500" />
            </motion.a>
          </div>

          {/* Grid Inferior */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 border-t border-white/5 pt-10">
            <div className="flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  className="group flex items-center gap-3 text-white/40 hover:text-purple-400 transition-all text-[10px] tracking-widest font-black uppercase italic"
                >
                  <Instagram size={18} className="p-0.5 rounded-md bg-white/5 group-hover:bg-purple-600/20 transition-all" />
                  {contacto.instagram}
                </a>
              )}
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl text-white font-black italic tracking-tighter uppercase">
                {footer.marca}
              </span>
              <p className="text-[8px] text-purple-400/60 tracking-[0.4em] uppercase font-bold mt-1">
                Digital Studio
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[8px] text-white/20 uppercase tracking-tighter font-bold italic leading-tight">
                {footer.descripcion}
              </p>
            </div>
          </div>

          {/* BOTÓN VOLVER ARRIBA NEÓN */}
          <button 
            onClick={scrollToTop} 
            className="group relative flex flex-col items-center gap-2 mt-12 transition-all z-30"
          >
            <div className="relative p-2">
                {/* Glow del botón */}
                <div className="absolute inset-0 bg-purple-600 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <ChevronUp className="w-6 h-6 text-white relative z-10 animate-bounce" />
            </div>
            <span className="text-[9px] tracking-[0.4em] uppercase font-black text-purple-500 group-hover:text-white transition-colors">
              Volver Arriba
            </span>
            {/* Pequeña línea neón bajo el botón */}
            <div className="w-8 h-[2px] bg-white shadow-[0_0_8px_#9333ea] rounded-full" />
          </button>

        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[15vw] font-black italic text-purple-600/[0.02] select-none pointer-events-none whitespace-nowrap uppercase tracking-tighter">
        {footer.marca}
      </div>
    </footer>
  );
}