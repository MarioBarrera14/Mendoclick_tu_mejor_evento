"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiMapPin, FiClock, FiGift, 
  FiCamera, FiMusic 
} from 'react-icons/fi';

const funciones = [
  { i: FiCalendar, t: "RSVP", d: "Confirmación de asistencia online con un click y lista final." },
  { i: FiMapPin, t: "UBICACIÓN", d: "Google Maps integrado con navegación nativa directa." },
  { i: FiClock, t: "CUENTA REGRESIVA", d: "Reloj dinámico para generar expectativa en tus invitados." },
  { i: FiGift, t: "REGALOS", d: "CBU, alias o links a listas de regalos de forma elegante." },
  { i: FiCamera, t: "GALERÍA DE FOTOS", d: "Sección dedicada para mostrar los mejores momentos previos." },
  { i: FiMusic, t: "MÚSICA DE FONDO", d: "Tu tema favorito sonando mientras navegan la invitación." },
];

export const TechSection = () => (
  <section id="experiencia" className="py-16 md:py-24 bg-[#f8f9fa] overflow-hidden">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      
      {/* --- SMARTPHONE (Ahora primero en Mobile para mejor flujo) --- */}
      <div className="order-1 lg:order-2 flex justify-center relative scale-90 md:scale-100">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100/40 blur-3xl rounded-full z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-[240px] md:w-[300px] aspect-[9/18.5] border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-200 shadow-2xl z-20 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-2xl z-40 shadow-inner" />
          
          <div className="absolute inset-0 overflow-y-auto bg-white scrollbar-hide">
            <img 
              src="/img_demo/Samsun.webp" 
              className="w-full h-auto"
              alt="Demo Invitación" 
            />
          </div>
        </motion.div>
      </div>

      {/* --- SECCIÓN DE TEXTO Y FUNCIONES --- */}
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <div className="mb-10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] mb-4 text-zinc-900 italic tracking-tighter">
            Funciones
          </h2>
          <p className="text-[#33aba1] text-xs md:text-base font-bold uppercase tracking-[0.1em] mb-2 italic">
            Prácticas y modernas.
          </p>
          <p className="text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
            Interactividad total en cada detalle.
          </p>
          <div className="h-1 w-12 bg-zinc-900 mt-6 mx-auto lg:mx-0" />
        </div>

        {/* Cuadrícula de Funciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {funciones.map((f, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-4 bg-white rounded-xl border border-zinc-200 hover:border-[#33aba1] transition-all shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="flex flex-col lg:flex-row items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-[#33aba1]/20 transition-colors">
                  <f.i className="text-zinc-900 text-lg group-hover:text-[#33aba1] transition-colors" />
                </div>
                <h4 className="text-[10px] md:text-[11px] font-black tracking-widest uppercase text-zinc-900">
                  {f.t}
                </h4>
              </div>
              <p className="text-zinc-500 text-[9px] md:text-[10px] leading-relaxed font-bold">
                {f.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </section>
);