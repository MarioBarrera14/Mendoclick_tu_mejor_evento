"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ChevronUp, Instagram } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;
  
  const whatsappUrl: string = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="relative py-10 overflow-hidden bg-[url('/images/img-grafitis/pared.webp')] bg-cover bg-center mt-[-1px] font-['Permanent_Marker',_cursive]"
    >
      {/* SEPARADOR GRAFITERO (Elimina el corte en seco con la sección de arriba) */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div 
          className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [-webkit-mask-size:100%_100%]" 
          /* Nota: El bg-[#e0f2f1] debe ser el color de la sección de ARRIBA del footer para que "chorree" hacia abajo */
        />
      </div>

      {/* Overlay oscuro intermedio */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center pt-10">
        
        {/* PANEL CENTRAL - TERMINO MEDIO */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/20 flex flex-col items-center text-center shadow-2xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mb-6"
          >
            <h2 className="text-3xl md:text-5xl text-white uppercase tracking-tighter leading-tight">
              ¿Tenés alguna <br />
              <span className="text-[#5ba394]">duda real?</span>
            </h2>
          </motion.div>

          {/* BOTONES */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <motion.a 
              href={whatsappUrl} 
              target="_blank" 
              whileHover={{ scale: 1.05 }} 
              className="flex items-center gap-2 px-7 py-3 bg-[#5ba394] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transition-colors hover:bg-[#4d8a7d]"
            >
              <MessageCircle size={18} /> 
              WhatsApp
            </motion.a>
            
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-7 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transition-colors hover:bg-gray-200"
            >
              <Instagram size={18} />
              Instagram
            </motion.a>
          </div>

          {/* FIRMA */}
          <div className="w-full border-t border-white/10 pt-6">
            <span className="text-2xl md:text-4xl text-white/90 uppercase tracking-tighter block leading-none">
              {footer.marca}
            </span>
            <p className="text-[8px] text-gray-400 tracking-[0.4em] uppercase font-sans mt-2 font-bold">
              Urban Digital Collective
            </p>
          </div>
        </div>

        {/* BOTÓN SUBIR */}
        <button 
          onClick={scrollToTop} 
          className="group flex flex-col items-center gap-1 mt-8 text-gray-400 hover:text-[#5ba394] transition-colors"
        >
          <ChevronUp className="w-5 h-5 animate-bounce" />
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans font-black italic">Subir</span>
        </button>
      </div>

      {/* TAG DE FONDO DISCRETO */}
      <div className="absolute -bottom-4 left-6 opacity-10 select-none pointer-events-none z-0">
        <span className="text-[12vw] text-white font-black leading-none uppercase">
          {footer.marca}
        </span>
      </div>
    </footer>
  );
}