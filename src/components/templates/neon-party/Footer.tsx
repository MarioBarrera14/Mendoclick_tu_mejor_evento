"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram, Zap } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;

  return (
    <footer className="relative bg-[#0c001a] pt-40 pb-12 overflow-hidden">
      
      {/* --- DIVISOR ONDULADO SUPERIOR (Conecta con RSVP) --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-30">
        <svg 
          className="relative block w-[calc(160%+1.3px)] h-[60px] md:h-[100px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#000000" 
          />
        </svg>
      </div>

      {/* --- FONDO CON GRID Y DEGRADADO --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#9333ea 1px, transparent 1px), linear-gradient(90deg, #9333ea 1px, transparent 1px)`,
            backgroundSize: '45px 45px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#9333ea]/30 via-[#0c001a] to-[#0c001a]" />
      </div>

      {/* Resplandor decorativo neón */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
              <Zap size={16} fill="currentColor" className="animate-pulse" />
              <span className="tracking-[0.6em] text-[10px] uppercase font-black block">
                Hablemos
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
              ¿Tenés alguna <br /> <span className="text-purple-600">duda?</span>
            </h2>
            <div className="w-16 h-[3px] bg-purple-600 mx-auto mt-8 shadow-[0_0_15px_#9333ea]" />
          </motion.div>

          {/* Botones de Acción */}
          <div className="flex flex-col md:flex-row gap-6 mb-24">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.05 }}
              className="group flex items-center gap-4 px-12 py-5 bg-purple-600 text-white rounded-full transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)] hover:bg-purple-500"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span className="tracking-[0.2em] text-[11px] font-black uppercase italic">Consultar Ahora</span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="group flex items-center gap-4 px-12 py-5 border-2 border-white/10 text-white rounded-full transition-all duration-500 backdrop-blur-sm"
            >
              <span className="tracking-[0.2em] text-[11px] font-black uppercase italic">Más Diseños</span>
              <ArrowUpRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          {/* Grid de Información Inferior */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12 border-t border-white/5 pt-16">
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-white/40 hover:text-purple-400 transition-all text-[11px] tracking-[0.4em] font-black uppercase italic"
                >
                  <div className="p-3 rounded-xl border border-white/10 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xl shadow-black/50">
                    <Instagram className="w-5 h-5 stroke-[2px]" />
                  </div>
                  {contacto.instagram}
                </a>
              )}
            </div>

            <div className="order-1 md:order-2">
              <span className="text-4xl md:text-6xl text-white font-black italic tracking-tighter block uppercase">
                {footer.marca}
              </span>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-[2px] w-6 bg-purple-600" />
                <p className="text-[10px] text-purple-400 tracking-[0.5em] uppercase font-black">
                  Digital Studio
                </p>
                <div className="h-[2px] w-6 bg-purple-600" />
              </div>
            </div>

            <div className="order-3 text-center md:text-right">
              <p className="text-[10px] text-white/30 uppercase leading-relaxed tracking-[0.2em] whitespace-pre-line font-black italic">
                {footer.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marca de agua de fondo */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[18vw] font-black italic text-purple-600/[0.03] select-none pointer-events-none whitespace-nowrap uppercase tracking-tighter">
        {footer.marca}
      </div>
      
    </footer>
  );
}