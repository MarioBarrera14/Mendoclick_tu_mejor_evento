"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiMapPin, FiClock, FiGift, 
  FiCamera, FiMusic, FiUsers 
} from 'react-icons/fi';
import { AiOutlineQrcode } from 'react-icons/ai';
import { CreditCard } from 'lucide-react';
const funciones = [
 { i: AiOutlineQrcode, t: "ACCESO QR", d: "Pase digital exclusivo por familia o cupo para un ingreso ágil." },
  { i: FiUsers, t: "ASIGNACIÓN DE MESAS", d: "Tus invitados sabrán su ubicación exacta con su código único." },
  { i: FiCalendar, t: "RSVP", d: "Confirmación de asistencia online con un click y lista final." },
  { i: FiMapPin, t: "UBICACIÓN", d: "Google Maps integrado con navegación nativa directa." },
  { i: FiClock, t: "CUENTA REGRESIVA", d: "Reloj dinámico para generar expectativa en tus invitados." },
  { i: CreditCard, t: "REGALOS", d: "Datos bancarios (CBU/Alias) presentados de forma elegante y práctica." },
  { i: FiCamera, t: "GALERÍA DE FOTOS", d: "Sección dedicada para mostrar los mejores momentos previos." },
  { i: FiMusic, t: "MÚSICA DE FONDO", d: "Tu tema favorito sonando mientras navegan la invitación." },
];

export const TechSection = () => (
  <section id="experiencia" className="py-12 md:py-20 bg-[#f8f9fa] overflow-hidden">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      
      {/* --- SMARTPHONE --- */}
      <div className="order-1 lg:order-2 flex justify-center relative scale-90 md:scale-100">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#33aba1]/10 blur-3xl rounded-full z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative w-[240px] md:w-[280px] aspect-[9/18.5] border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-200 shadow-2xl z-20 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-b-2xl z-40 shadow-inner" />
          
          <div className="absolute inset-0 overflow-y-auto bg-white scrollbar-hide touch-pan-y">
            <Image 
              src="https://res.cloudinary.com/diqipcpuu/image/upload/v1777242233/champagnecumple_uqdlfs.webp" 
              alt="Demo de funciones interactivas MendoClick"
              width={280}
              height={575}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* --- SECCIÓN DE TEXTO --- */}
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <header className="mb-10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] mb-4 text-zinc-900 italic tracking-tighter">
            Funciones
          </h2>
          <p className="text-[#33aba1] text-xs md:text-sm font-black uppercase tracking-[0.1em] mb-2 italic">
            Tecnología para tu evento.
          </p>
          <p className="text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
            Gestión inteligente de invitados y mesas.
          </p>
          <div className="h-1 w-12 bg-zinc-900 mt-6 mx-auto lg:mx-0" />
        </header>

        {/* Grid de funciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {funciones.map((f, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-4 bg-white rounded-2xl border border-zinc-100 hover:border-[#33aba1] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="flex flex-col lg:flex-row items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-50 rounded-xl group-hover:bg-[#33aba1] transition-colors duration-300">
                  <f.i className="text-zinc-900 text-lg group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-[10px] md:text-[11px] font-black tracking-widest uppercase text-zinc-900">
                  {f.t}
                </h4>
              </div>
              <p className="text-zinc-500 text-[9px] md:text-[10px] leading-relaxed font-bold">
                {f.d}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

    </div>
  </section>
);