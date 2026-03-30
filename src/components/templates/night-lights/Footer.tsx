"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;

  return (
    <footer className="relative bg-black pt-32 pb-12 overflow-hidden">
      {/* Elemento Decorativo de Fondo */}
          {/* ONDA SUPERIOR (La que ya tenías) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Título de Conversación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-white/30 tracking-[0.5em] text-[10px] uppercase block mb-4">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight">
              ¿Tenés alguna duda?
            </h2>
          </motion.div>

          {/* Botones Estilizados */}
          <div className="flex flex-col md:flex-row gap-6 mb-24">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex items-center gap-4 px-10 py-4 bg-white text-black rounded-full transition-all duration-500"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="tracking-[0.2em] text-[10px] uppercase font-bold">Consultar Ahora</span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar/15-2/#15ESTRUCTURAS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex items-center gap-4 px-10 py-4 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all duration-500"
            >
              <span className="tracking-[0.2em] text-[10px] uppercase">Más Diseños</span>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </motion.a>
          </div>

          {/* Branding y Copyright */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12 border-t border-white/5 pt-12">
            
            {/* Izquierda: Instagram */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] tracking-[0.3em] uppercase"
                >
                  <Instagram className="w-4 h-4 stroke-[1px]" />
                  {contacto.instagram}
                </a>
              )}
            </div>

            {/* Centro: Marca principal */}
            <div className="order-1 md:order-2">
              <span className="text-2xl md:text-4xl text-white font-serif italic tracking-tighter">
                {footer.marca}
              </span>
              <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mt-2">
                Digital Studio
              </p>
            </div>

            {/* Derecha: Descripción/Copyright */}
            <div className="order-3 text-center md:text-right">
              <p className="text-[10px] text-white/20 uppercase leading-loose tracking-widest whitespace-pre-line">
                {footer.descripcion}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Marca de agua sutil de fondo */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-serif italic text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        {footer.marca}
      </div>
    </footer>
  );
}