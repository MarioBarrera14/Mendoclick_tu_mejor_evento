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
  <section id="experiencia" className="py-24 bg-[#f8f9fa]">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* --- SECCIÓN DE FUNCIONES --- */}
      <div className="order-2 lg:order-1">
        <div className="mb-12">
          {/* Título Principal */}
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] mb-4 text-zinc-900 italic tracking-tighter">
            Funciones
          </h2>
          {/* Subtítulo Prácticas y Modernas */}
          <p className="text-red-600 text-sm md:text-lg font-bold uppercase tracking-[0.1em] mb-2 italic">
            Prácticas y modernas.
          </p>
          {/* Descripción Técnica */}
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold">
            Interactividad total en cada detalle.
          </p>
          <div className="h-1 w-12 bg-zinc-900 mt-6" />
        </div>

        {/* Cuadrícula de Funciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {funciones.map((f, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-5 bg-white rounded-2xl border border-zinc-200 hover:border-red-600 transition-all shadow-sm hover:shadow-md cursor-default"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-red-50 transition-colors">
                  <f.i className="text-zinc-900 text-xl group-hover:text-red-600 transition-colors" />
                </div>
                <h4 className="text-[11px] font-black tracking-widest uppercase text-zinc-900">{f.t}</h4>
              </div>
              <p className="text-zinc-500 text-[10px] leading-relaxed font-bold">
                {f.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SMARTPHONE CON SCROLL INTERNO --- */}
      <div className="order-1 lg:order-2 flex justify-center relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100/40 blur-3xl rounded-full z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -5 }} 
          className="relative w-[260px] md:w-[320px] aspect-[9/18.5] border-[10px] border-zinc-900 rounded-[3rem] bg-zinc-200 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-20 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-b-3xl z-40 shadow-inner" />
          
          <div className="absolute inset-0 overflow-y-auto scrollbar-hide bg-white">
            <img 
              src="/img_demo/Samsun.webp" 
              className="w-full h-auto"
              alt="Demo Invitación MendoClick" 
            />
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] bg-zinc-950/90 backdrop-blur-md py-3 rounded-2xl shadow-2xl z-30 border border-white/10 text-center">
              <p className="text-[9px] font-black text-white tracking-[0.2em] uppercase italic">Probar Experiencia</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);