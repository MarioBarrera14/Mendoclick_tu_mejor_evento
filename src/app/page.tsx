"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGift, FiMapPin, FiHeart, FiStar, FiCalendar, 
  FiArrowRight, FiShield, FiUser, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';

const features = [
  { icon: FiStar, text: "Filtros Pro", desc: "Estilo Instagram" },
  { icon: FiHeart, text: "Asistencia", desc: "Confirmación Directa" },
  { icon: FiMapPin, text: "Maps", desc: "Ubicación GPS" },
  { icon: FiCalendar, text: "Calendar", desc: "Save the Date" },
  { icon: FiGift, text: "Regalos", desc: "Dress Code & Mesa" },
];

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE', img: '/img_demo/plantilla1_15.png', link: '/demo/cumple_quince/champagne', tag: 'LUXURY', category: '15_AÑOS' },
  { id: '02', title: 'NEON PARTY', img: '/img_demo/plantilla2_15.png', link: '/demo/cumple_quince/neon-party', tag: 'VIBRANT', category: '15_AÑOS' },
  { id: '03', title: 'GRAFFITI URBANO', img: '/img_demo/plantilla3_15.png', link: '/demo/cumple_quince/golden-grafitis', tag: 'URBANO', category: '15_AÑOS' },
  { id: '04', title: 'GOLDEN NOIR', img: '/img_boda/plantilla4.jpg', link: '/demo/bodas/golden_noir', tag: 'PREMIUM', category: 'BODAS' },
  { id: '05', title: 'RETRO VINYL', img: '/img_boda/plantilla5.png', link: '/demo/bodas/bodas-rockeras', tag: 'VINTAGE', category: 'BODAS' },
  { id: '06', title: 'GRAFFITI URBANO', img: '/img_boda/bodas/plantilla6.jpg', link: '/demo/bodas/bodas-grafitis', tag: 'URBANO', category: 'BODAS' },
];

export default function LandingPage() {
  const [isManager, setIsManager] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');

  useEffect(() => {
    const session = localStorage.getItem("manager_session");
    if (session === "active") setIsManager(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("manager_session");
    setIsManager(false);
    window.location.reload();
  };

  const filteredDesigns = allDesigns.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase italic">
            Mendo<span className="text-rose-500 underline decoration-2 underline-offset-4">Click</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
              <a href="#designs">Modelos</a>
              <a href="#features">Funciones</a>
            </div>
            <div className="flex items-center gap-6 border-l pl-8 border-zinc-100">
              {isManager && (
                <Link href="/manager/dashboard" className="bg-rose-500 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase">
                  Manager
                </Link>
              )}
              <Link href="/login" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950">Login</Link>
              <a href="https://wa.me/tu-numero" className="bg-zinc-950 text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest">Comenzar</a>
            </div>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="lg:hidden bg-white border-b border-zinc-100 overflow-hidden">
              <div className="flex flex-col p-6 gap-4 text-center text-[10px] font-black uppercase tracking-widest">
                <a href="#designs" onClick={() => setIsMobileMenuOpen(false)}>Modelos</a>
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Funciones</a>
                <Link href="/login">Acceso Clientes</Link>
                <a href="https://wa.me/tu-numero" className="bg-rose-500 text-white py-4 rounded-xl">Hablar por WhatsApp</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO --- */}
      <header className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-10 right-[-10%] w-64 h-64 bg-rose-100/50 rounded-full blur-[80px] -z-10" />
        <div className="container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1] tracking-tighter uppercase italic mb-8"
          >
            Celebraciones <br />
            <span className="text-transparent [-webkit-text-stroke:1px_#18181b]">Inolvidables.</span>
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <p className="text-zinc-500 font-medium leading-relaxed max-w-md">Invitaciones digitales premium para Mendoza. Experiencias interactivas que elevan tu evento.</p>
            <Link href="#designs" className="bg-zinc-950 text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex justify-between items-center group">
              VER CATÁLOGO 2026 <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* --- FEATURES (Grilla 2 columnas en mobile) --- */}
      <section id="features" className="py-16 bg-zinc-50 border-y border-zinc-100 px-4">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-zinc-100 shadow-sm flex flex-col justify-between aspect-square lg:h-48">
              <div className="bg-rose-50 w-10 h-10 rounded-xl flex items-center justify-center text-rose-500"><f.icon size={20} /></div>
              <div>
                <p className="text-[7px] font-black uppercase text-zinc-400 mb-1">{f.desc}</p>
                <p className="font-bold text-zinc-900 uppercase italic text-[11px]">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="designs" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-center">Catálogo <span className="text-rose-500">2026</span></h2>
            <div className="flex bg-zinc-100 p-1 rounded-xl w-full max-w-[300px]">
              <button onClick={() => setActiveCategory('BODAS')} className={`flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === 'BODAS' ? 'bg-white shadow-sm' : 'text-zinc-400'}`}>BODAS</button>
              <button onClick={() => setActiveCategory('15_AÑOS')} className={`flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === '15_AÑOS' ? 'bg-white shadow-sm' : 'text-zinc-400'}`}>15 AÑOS</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDesigns.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group rounded-[32px] overflow-hidden border border-zinc-100 relative aspect-[3/4]">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                    <p className="text-rose-400 text-[8px] font-black tracking-widest mb-1">MNDCLK {item.id}</p>
                    <h3 className="text-xl font-black text-white uppercase italic mb-4">{item.title}</h3>
                    <Link href={item.link} className="bg-rose-500 text-white py-3 rounded-xl font-black text-[9px] text-center tracking-widest uppercase">Ver Demo</Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}