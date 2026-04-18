"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { FiInstagram, FiTwitter, FiSend } from 'react-icons/fi';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const Footer = () => (
  <footer className="bg-white border-t border-black/5 pt-20 pb-16 text-center">
         <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-16 items-center md:items-start">
             
             {/* Logo y Redes */}
             <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
               <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                 <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black italic text-xl shadow-[0_10px_20px_rgba(220,38,38,0.2)] text-white">
                   M
                 </div>
                 <span className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900">
                   MENDO<span className="text-red-600">CLICK</span>
                 </span>
               </div>
               <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm mb-8 px-4 md:px-0 text-center md:text-left">
                 Redefiniendo el estándar de las celebraciones digitales en Mendoza. Tecnología, diseño y exclusividad en cada click.
               </p>
               <div className="flex gap-4 justify-center md:justify-start w-full">
                 <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-zinc-400 hover:border-red-600 shadow-sm">
                   <FiInstagram />
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-zinc-400 hover:border-red-600 shadow-sm">
                   <FiTwitter />
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-zinc-400 hover:border-red-600 shadow-sm">
                   <FiSend />
                 </a>
               </div>
             </div>
 
             {/* Navegación */}
             <div className="flex flex-col items-center md:items-start">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 mb-8">Navegación</h4>
               <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                 <li><a href="#" className="hover:text-red-600 transition">Inicio</a></li>
                 <li><a href="#modelos" className="hover:text-red-600 transition">Colección</a></li>
                 <li><a href="#experiencia" className="hover:text-red-600 transition">Tecnología</a></li>
               </ul>
             </div>
 
             {/* Contacto */}
             <div className="flex flex-col items-center md:items-start">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 mb-8">Contacto</h4>
               <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                 <li className="italic text-zinc-900 underline decoration-red-600 underline-offset-4">info@mendoclick.com.ar</li>
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
               className="group flex flex-col items-center gap-2 text-red-600 hover:scale-110 transition-transform z-30 appearance-none bg-transparent border-none outline-none cursor-pointer"
             >
               <ChevronUp className="w-6 h-6 animate-bounce" />
               <span className="text-[10px] tracking-[0.6em] uppercase font-black italic">
                 Mendoclick
               </span>
               <div className="w-8 h-[2px] bg-red-600 mt-1 group-hover:w-12 transition-all duration-300" />
             </motion.button>
           </div>
         </div>
       </footer>
);