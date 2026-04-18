"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone, FiClock, FiMapPin } from 'react-icons/fi';

const features = [
  { i: FiSmartphone, t: "SMART ARCHITECTURE", d: "Optimizada para una carga instantánea sin esperas." },
  { i: FiClock, t: "LIVE SYNC", d: "Confirmaciones en tiempo real directo a tu panel." },
  { i: FiMapPin, t: "DEEP LINKING", d: "Navegación nativa con Google Maps & Apple Maps." }
];

export const TechSection = () => (
  <section id="experiencia" className="py-32 bg-[#edede9]">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.85] mb-12 text-zinc-900">Invisible <br/><span className="text-red-600">Power.</span></h2>
        <div className="space-y-6 max-w-md">
          {features.map((f, index) => (
            <div key={index} className="flex gap-5 p-6 bg-white/60 rounded-3xl border border-black/5 group hover:bg-white transition-all shadow-sm">
              <f.i className="text-red-600 text-2xl shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-900 mb-2">{f.t}</h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center order-1 md:order-2">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="w-[240px] md:w-[280px] h-[500px] border-[10px] border-zinc-900 rounded-[3.5rem] bg-white overflow-hidden shadow-2xl">
          <img src="/img_demo/plantilla1_15.png" className="w-full h-full object-cover opacity-90" alt="demo" />
        </motion.div>
      </div>
    </div>
  </section>
);