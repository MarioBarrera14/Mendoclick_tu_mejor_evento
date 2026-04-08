"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, Instagram, ChevronUp, Star } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden bg-[#1a1a1a] mt-[-1px]">
      
      {/* 1. FONDO DE PUNTOS TIPO REJILLA */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #4fb0a2 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* TARJETA DE CONTACTO REDUCIDA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl bg-[#fdfcf0] border-[3px] border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(176,42,48,1)] flex flex-col items-center text-center relative rotate-[-0.3deg]"
        >
          {/* Estrellitas más pequeñas */}
          <Star className="absolute top-4 left-4 text-[#b02a30] fill-current w-4 h-4 opacity-40" />
          <Star className="absolute bottom-4 right-4 text-[#4fb0a2] fill-current w-4 h-4 opacity-40" />

          <div className="mb-4">
            <span className="bg-black text-[#fdfcf0] px-3 py-0.5 text-[8px] uppercase font-black tracking-[0.2em] italic">
              Backstage
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black italic text-black uppercase tracking-tighter leading-none mb-6">
            ¿Tenés alguna duda?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center">
            {/* Botones más compactos */}
            <motion.a 
              href={whatsappUrl} 
              target="_blank" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#b02a30] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-[10px] tracking-widest hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
            </motion.a>
            
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#4fb0a2] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-[10px] tracking-widest hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Instagram className="w-4 h-4" /> @mendo.click
            </motion.a>
          </div>

          {/* Divisor reducido */}
          <div className="w-full border-t-2 border-dotted border-black/20 pt-6 flex flex-col items-center">
            <span className="text-3xl md:text-4xl text-black font-black uppercase italic tracking-tighter">
              {footer.marca}
            </span>
          </div>
        </motion.div>

        {/* Botón Volver Arriba más discreto */}
        <button 
          onClick={scrollToTop} 
          className="group flex flex-col items-center gap-1 mt-10 text-[#fdfcf0]/60 hover:text-[#4fb0a2] transition-colors z-30"
        >
          <ChevronUp className="w-5 h-5 animate-bounce" />
          <span className="text-[8px] tracking-[0.3em] uppercase font-black italic">Mendoclick</span>
        </button>

        {/* Créditos */}
        <div className="mt-8 text-[#fdfcf0]/10 text-[8px] font-bold uppercase tracking-widest">
          Mendoza • 2026
        </div>
      </div>

      {/* Marca de agua de fondo reducida en opacidad */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10vw] font-black italic text-white/[0.02] whitespace-nowrap z-0 select-none pointer-events-none uppercase">
        Mendoclick
      </div>
    </footer>
  );
}