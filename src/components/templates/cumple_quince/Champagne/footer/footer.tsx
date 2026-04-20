"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram, ChevronUp } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;

  return (
    // SECCIÓN CON FONDO GRIS PERLA INCLINADO
    <footer className="relative py-24 md:py-32 bg-white overflow-hidden font-sans -mt-16 md:-mt-20">
      
      {/* LA FRANJA INCLINADA (Gris suave #d1d1d1) */}
      <div 
        className="absolute inset-0 bg-[#d1d1d1] z-0"
        style={{ 
          clipPath: "polygon(0 8%, 100% 0%, 100% 100%, 0% 100%)" 
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* TÍTULO DE CONTACTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-gray-400 tracking-[0.5em] text-[10px] uppercase block mb-4 font-bold">
              Contacto
            </span>
            <h2 className="font-script text-4xl md:text-6xl text-[#b4a178] tracking-tight">
              ¿Tenés alguna duda?
            </h2>
          </motion.div>

          {/* BOTONES PRINCIPALES */}
          <div className="flex flex-col md:flex-row gap-4 mb-20">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-10 py-3 bg-white border border-gray-300 rounded-full text-gray-600 text-[10px] font-bold tracking-widest uppercase shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar Ahora
            </motion.a>

            <motion.a
              href="https://www.mendoclick.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-10 py-3 bg-white border border-gray-300 rounded-full text-gray-600 text-[10px] font-bold tracking-widest uppercase shadow-sm transition-all"
            >
              Más Diseños
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </motion.a>
          </div>

          {/* BRANDING Y COPYRIGHT */}
          <div className="w-full border-t border-gray-400/30 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4">
              
              {/* Instagram */}
              <div className="order-2 md:order-1">
                {contacto.instagram && (
                  <a
                    href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-500 hover:text-[#b4a178] transition-colors text-[9px] tracking-[0.3em] uppercase font-bold"
                  >
                    <Instagram className="w-3.5 h-3.5 stroke-[1.5px]" />
                    {contacto.instagram}
                  </a>
                )}
              </div>

              {/* Marca Central */}
              <div className="order-1 md:order-2">
                <span className="text-2xl md:text-3xl text-gray-800 font-script italic">
                  {footer.marca}
                </span>
                <p className="text-[9px] text-gray-400 tracking-[0.4em] uppercase mt-1 font-bold">
                  Digital Studio
                </p>
              </div>

              {/* Descripción */}
              <div className="order-3">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-loose md:text-right font-medium">
                  {footer.descripcion}
                </p>
              </div>
            </div>
          </div>

          {/* BOTÓN VOLVER ARRIBA / SELLO MENDOCLICK */}
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onClick={scrollToTop} 
            className="group flex flex-col items-center gap-1 mt-12 text-gray-400 hover:text-[#b4a178] transition-colors z-30 appearance-none bg-transparent border-none outline-none"
          >
            <ChevronUp className="w-5 h-5 animate-bounce" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-black italic">
              Mendoclick
            </span>
          </motion.button>

        </div>
      </div>

      {/* MARCA DE AGUA FONDO */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[12vw] font-script text-gray-400/5 select-none pointer-events-none whitespace-nowrap z-0">
        {footer.marca}
      </div>
    </footer>
  );
}