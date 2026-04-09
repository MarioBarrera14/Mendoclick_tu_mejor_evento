"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram, ChevronUp } from "lucide-react";

// Componente de líneas de velocidad con Tailwind puro
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]"
    />
  </div>
);

export function Footer() {
  const { contacto, footer } = eventConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;

  return (
    <footer className="relative bg-transparent pt-20 pb-8 overflow-hidden">
      
      {/* FONDO UNIFICADO */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"
      />
      
      {/* OVERLAY DE LEGIBILIDAD */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      {/* DEGRADADO DORADO FINAL */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#b5a47a]/20 to-transparent pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* TÍTULO COMPACTADO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-[#b5a47a] tracking-[0.5em] text-[10px] uppercase block mb-3 font-sans font-bold drop-shadow-sm">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight drop-shadow-md">
              ¿Tenés alguna duda?
            </h2>
            <div className="w-12 h-px bg-[#b5a47a]/30 mx-auto mt-4" />
          </motion.div>

          {/* BOTONES COMPACTADOS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              className="group flex items-center justify-center gap-3 px-8 py-3 bg-[#b5a47a] text-black rounded-xl transition-all shadow-lg border border-[#e2d1a4]/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="tracking-[0.2em] text-[9px] uppercase font-black font-sans">
                Consultar Ahora
              </span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="group flex items-center justify-center gap-3 px-8 py-3 border border-[#b5a47a]/30 text-white rounded-xl hover:bg-[#b5a47a]/5 transition-all backdrop-blur-sm"
            >
              <span className="tracking-[0.2em] text-[9px] uppercase font-sans font-bold">
                Más Diseños
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#b5a47a]/60 group-hover:text-[#b5a47a]" />
            </motion.a>
          </div>

          {/* GRID FOOTER COMPACTADO */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 border-t border-[#b5a47a]/10 pt-10">
            
            {/* INSTAGRAM */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#b5a47a]/60 hover:text-[#b5a47a] transition-colors text-[9px] tracking-[0.3em] uppercase font-sans font-bold"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  {contacto.instagram}
                </a>
              )}
            </div>

            {/* MARCA */}
            <div className="order-1 md:order-2">
              <span className="text-2xl md:text-3xl text-white font-serif italic tracking-tighter uppercase drop-shadow-md">
                {footer.marca}
              </span>
              <p className="text-[9px] text-[#b5a47a] tracking-[0.4em] uppercase mt-1 font-sans font-bold opacity-70">
                Digital Studio
              </p>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="order-3 text-center md:text-right">
              <p className="text-[9px] text-white/40 uppercase leading-relaxed tracking-widest whitespace-pre-line font-sans font-bold">
                {footer.descripcion}
              </p>
            </div>
          </div>

          {/* SCROLL TOP COMPACTO */}
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-1 mt-12 cursor-pointer hover:opacity-80 transition-opacity text-[#b5a47a]/50"
          >
            <ChevronUp className="w-5 h-5 animate-bounce" />
            <span className="font-sans text-[8px] tracking-widest uppercase font-bold">
              Subir
            </span>
          </button>
        </div>
      </div>

      {/* MARCA DE AGUA MÁS PEQUEÑA (Tailwind puro) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12vw] font-serif italic text-[#b5a47a]/10 select-none pointer-events-none whitespace-nowrap">
        {footer.marca}
      </div>
    </footer>
  );
}