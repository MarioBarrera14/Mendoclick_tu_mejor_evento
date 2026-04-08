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
    <footer className="relative bg-black pt-32 pb-12 overflow-visible">
      
      {/* --- DIVISOR SUPERIOR (FIX SIN LÍNEA) --- */}
      <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
          className="block w-full h-[60px] md:h-[100px]"
        >
          <path 
            d="M0,0 H1200 V60 L1150,45 L1100,65 L1050,50 L1000,70 L950,55 L900,75 L850,60 L800,80 L750,65 L700,85 L650,70 L600,90 L550,75 L500,95 L450,80 L400,100 L350,85 L300,105 L250,90 L200,110 L150,95 L100,115 L50,100 L0,120 Z" 
            fill="#fcfcfc"
          />
        </svg>
      </div>
       
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* TÍTULO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 mt-10"
          >
            <span className="text-white/30 tracking-[0.5em] text-[10px] uppercase block mb-4 font-sans font-bold">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight">
              ¿Tenés alguna duda?
            </h2>
          </motion.div>

          {/* BOTONES */}
          <div className="flex flex-col md:flex-row gap-6 mb-24">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex items-center gap-4 px-10 py-4 bg-white text-black rounded-full transition-all duration-500 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="tracking-[0.2em] text-[10px] uppercase font-bold font-sans">
                Consultar Ahora
              </span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex items-center gap-4 px-10 py-4 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all duration-500"
            >
              <span className="tracking-[0.2em] text-[10px] uppercase font-sans font-bold">
                Más Diseños
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </motion.a>
          </div>

          {/* GRID FOOTER */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12 border-t border-white/5 pt-12">
            
            {/* INSTAGRAM */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] tracking-[0.3em] uppercase font-sans font-bold"
                >
                  <Instagram className="w-4 h-4 stroke-[1px]" />
                  {contacto.instagram}
                </a>
              )}
            </div>

            {/* MARCA */}
            <div className="order-1 md:order-2">
              <span className="text-2xl md:text-4xl text-white font-serif italic tracking-tighter uppercase">
                {footer.marca}
              </span>
              <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mt-2 font-sans font-bold">
                Digital Studio
              </p>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="order-3 text-center md:text-right">
              <p className="text-[10px] text-white/20 uppercase leading-loose tracking-widest whitespace-pre-line font-sans font-bold">
                {footer.descripcion}
              </p>
            </div>
          </div>

          {/* SCROLL TOP */}
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 mt-20 cursor-pointer hover:opacity-80 transition-opacity text-white/40"
          >
            <ChevronUp className="w-6 h-6 animate-bounce" />
            <span className="font-sans text-[9px] tracking-widest uppercase font-bold">
              Volver arriba
            </span>
          </button>
        </div>
      </div>

      {/* MARCA DE AGUA */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15vw] font-serif italic text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        {footer.marca}
      </div>
    </footer>
  );
}