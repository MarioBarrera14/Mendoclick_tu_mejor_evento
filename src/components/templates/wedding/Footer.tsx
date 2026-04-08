"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram, ChevronUp } from "lucide-react";

const WAVE_PATH = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

export function Footer() {
  const { contacto, footer } = eventConfig;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer 
      className="relative pt-32 pb-24 md:pb-32 overflow-hidden bg-cover bg-center bg-no-repeat mt-[-1px]"
      style={{ backgroundImage: "url('/footers.jpg')" }}
    >
      {/* Overlay verde sutil */}
      <div className="absolute inset-0 bg-[#94A994]/70 z-0" />
      
      {/* Olas superiores con ajuste para evitar gaps */}
      <div className="absolute top-[-2px] left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[200%] h-[60px] md:h-[100px] scale-y-110"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity="0.25" />
          <path d={WAVE_PATH} x="1200" fill="#ffffff" fillOpacity="0.25" />
        </motion.svg>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 block w-[200%] h-[50px] md:h-[90px] scale-y-110"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
        {/* TARJETA TRASLÚCIDA - Volvemos a los textos verdes */}
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-white/40 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mb-10"
          >
            <span className="text-[#4B664B]/60 tracking-[0.5em] text-[10px] uppercase block mb-3 font-bold">
              Contacto
            </span>
            <h2 className="text-3xl md:text-6xl font-serif italic text-[#4B664B] tracking-tight leading-tight">
              ¿Tenés alguna duda?
            </h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
            <motion.a 
              href={whatsappUrl} 
              target="_blank" 
              whileHover={{ scale: 1.05 }} 
              className="flex items-center justify-center gap-4 px-8 py-4 bg-[#4B664B] text-white rounded-full shadow-lg font-bold uppercase text-[10px] tracking-widest"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Consultar Ahora
            </motion.a>
            
            {/* Botón secundario opcional */}
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="group flex items-center justify-center gap-4 px-8 py-4 border border-[#4B664B]/20 text-[#4B664B] rounded-full hover:bg-white/10 transition-all duration-500"
            >
              <span className="tracking-[0.2em] text-[10px] uppercase font-medium">Más Diseños</span>
              <ArrowUpRight className="w-4 h-4 text-[#4B664B]/40 group-hover:text-[#4B664B]" />
            </motion.a>
          </div>

          <div className="w-full border-t border-[#4B664B]/10 pt-10">
            <span className="text-3xl md:text-5xl text-[#4B664B] font-serif italic">
              {footer.marca}
            </span>
            <p className="text-[9px] text-[#4B664B]/40 tracking-[0.4em] uppercase mt-1 font-medium">
              Digital Studio
            </p>
          </div>
        </div>

        {/* Botón Volver Arriba */}
        <button 
          onClick={scrollToTop} 
          className="group flex flex-col items-center gap-2 mt-16 text-[#4B664B] z-30"
        >
          <ChevronUp className="w-6 h-6 animate-bounce" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Volver arriba</span>
        </button>
      </div>

      {/* Marca de agua inferior */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[18vw] font-serif italic text-white/10 whitespace-nowrap z-10 select-none pointer-events-none">
        {footer.marca}
      </div>
    </footer>
  );
}