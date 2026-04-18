"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { FiInstagram, FiTwitter, FiSend } from 'react-icons/fi';

export const Footer = () => {
  // Función para volver al inicio absoluto
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para secciones específicas
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer className="bg-white border-t border-black/5 pt-20 pb-16 text-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-16 items-center md:items-start">
          
          {/* Logo y Redes */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="w-10 h-10 bg-[#33aba1] rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg text-white">
                M
              </div>
              <span className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900">
                MENDO<span className="text-[#33aba1]">CLICK</span>
              </span>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm mb-8 px-4 md:px-0 text-center md:text-left">
              Redefiniendo el estándar de las celebraciones digitales en Mendoza. Tecnología, diseño y exclusividad en cada click.
            </p>
            <div className="flex gap-4 justify-center md:justify-start w-full">
              <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#33aba1] hover:text-white transition-all text-zinc-400">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#33aba1] hover:text-white transition-all text-zinc-400">
                <FiTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#33aba1] hover:text-white transition-all text-zinc-400">
                <FiSend />
              </a>
            </div>
          </div>

          {/* Navegación - CORREGIDO INICIO */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 mb-8">Navegación</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop(); // Usamos la función de ir arriba directamente
                  }}
                  className="hover:text-[#33aba1] transition cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#modelos" 
                  onClick={(e) => scrollToSection(e, 'modelos')}
                  className="hover:text-[#33aba1] transition cursor-pointer"
                >
                  Colección
                </a>
              </li>
              <li>
                <a 
                  href="#experiencia" 
                  onClick={(e) => scrollToSection(e, 'experiencia')}
                  className="hover:text-[#33aba1] transition cursor-pointer"
                >
                  Tecnología
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 mb-8">Contacto</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <li className="italic text-zinc-900 underline decoration-[#33aba1] underline-offset-4">info@mendoclick.com.ar</li>
              <li>WhatsApp Business</li>
              <li>Mendoza, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Línea final y Botón Volver Arriba */}
        <div className="border-t border-black/5 pt-10 flex flex-col justify-center items-center gap-10 text-center w-full">
          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.5em] px-4">
            © 2026 MendoClick Studio. Todos los derechos reservados.
          </p>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onClick={scrollToTop} 
            className="group flex flex-col items-center gap-2 text-[#33aba1] hover:scale-110 transition-transform z-30 bg-transparent border-none cursor-pointer"
          >
            <ChevronUp className="w-6 h-6 animate-bounce" />
            <span className="text-[10px] tracking-[0.6em] uppercase font-black italic">
              Mendoclick
            </span>
            <div className="w-8 h-[2px] bg-[#33aba1] mt-1 group-hover:w-12 transition-all duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};