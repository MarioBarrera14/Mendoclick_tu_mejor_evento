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
  { id: '06', title: 'GRAFFITI URBANO', img: '/img_boda/plantilla6.jpg', link: '/demo/bodas/bodas-grafitis', tag: 'URBANO', category: 'BODAS' },
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
      <Head>
        <title>MendoClick | Invitaciones Digitales Premium</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="text-lg font-black tracking-tighter uppercase italic z-10">
            Mendo<span className="text-rose-500 underline decoration-2 underline-offset-4">Click</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-zinc-500">
              <a href="#designs" className="hover:text-zinc-950 transition">Modelos</a>
              <a href="#features" className="hover:text-zinc-950 transition">Funciones</a>
            </div>
            <div className="flex items-center gap-4 border-l pl-6 border-zinc-100">
              {isManager && (
                <Link href="/manager/dashboard" className="bg-rose-500 text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase shadow-md">
                  Manager
                </Link>
              )}
              <Link href="/login" className="text-[8px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950">Login</Link>
              <a href="https://wa.me/tu-numero" className="bg-zinc-950 text-white px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">Comenzar</a>
            </div>
          </div>

          <button className="lg:hidden p-2 text-zinc-950 z-10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white border-b border-zinc-100 overflow-hidden">
              <div className="flex flex-col p-6 gap-4 text-center text-[9px] font-black uppercase tracking-widest">
                <a href="#designs" onClick={() => setIsMobileMenuOpen(false)}>Modelos</a>
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Funciones</a>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Acceso Clientes</Link>
                <a href="https://wa.me/tu-numero" className="bg-rose-500 text-white py-3 rounded-lg shadow-lg shadow-rose-100">Hablar por WhatsApp</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO CENTRADO EN MOBILE --- */}
      <header className="relative pt-20 md:pt-36 pb-10 px-2 overflow-hidden">
        <div className="absolute top-10 right-[-5%] w-48 h-48 bg-rose-100/30 rounded-full blur-[60px] -z-10" />
        <div className="container mx-auto">
          {/* text-center para mobile, text-left para desktop */}
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter uppercase italic mb-6"
            >
              Celebraciones <br />
              <span className="text-transparent [-webkit-text-stroke:1px_#18181b]">Inolvidables</span>
            </motion.h1>
            
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
              <p className="text-zinc-500 font-medium text-xs md:text-sm leading-relaxed max-w-sm">
                Invitaciones digitales de vanguardia para Mendoza. Experiencias interactivas que elevan el nivel de tu evento.
              </p>
              
              <Link 
                href="#designs" 
                className="bg-zinc-950 text-white px-6 py-4 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] flex justify-between items-center group w-full max-w-[280px] md:max-w-xs shadow-lg shadow-zinc-200"
              >
                VER CATÁLOGO 2026 <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURES --- */}
      <section id="features" className="py-12 bg-zinc-50 border-y border-zinc-100 px-4 overflow-x-auto custom-scrollbar">
        <div className="container mx-auto flex lg:grid lg:grid-cols-5 gap-3 min-w-max lg:min-w-full">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-[20px] border border-zinc-100 shadow-sm flex flex-col justify-between w-36 h-36 lg:w-auto lg:h-40">
              <div className="bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 shrink-0"><f.icon size={16} /></div>
              <div>
                <p className="text-[6px] font-black uppercase text-zinc-400 mb-1">{f.desc}</p>
                <p className="font-bold text-zinc-900 uppercase italic text-[10px] leading-tight">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="designs" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">Catálogo <span className="text-rose-500">2026</span></h2>
            </div>
            <div className="flex bg-zinc-100 p-1 rounded-lg w-full max-w-[280px] border border-zinc-200">
              <button onClick={() => setActiveCategory('BODAS')} className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${activeCategory === 'BODAS' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'}`}>BODAS</button>
              <button onClick={() => setActiveCategory('15_AÑOS')} className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${activeCategory === '15_AÑOS' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'}`}>15 AÑOS</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDesigns.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="group flex flex-col">
                  <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-200 bg-white shadow-md aspect-[9/16] transition-all group-hover:-translate-y-1">
                    <img src={item.img} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 z-20">
                      <p className="text-rose-400 text-[6px] md:text-[8px] font-black tracking-widest mb-1 uppercase">MOD {item.id}</p>
                      <h3 className="text-[10px] md:text-lg font-black text-white uppercase italic mb-3 leading-tight">{item.title}</h3>
                      <Link href={item.link} className="bg-rose-500 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-black text-[7px] md:text-[9px] text-center tracking-widest uppercase block shadow-lg">
                        PREVIEW
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 bg-zinc-950 text-white text-center relative overflow-hidden px-6 border-t border-white/5">
        <div className="container mx-auto relative z-10">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase italic mb-4 block">
            Mendo<span className="text-rose-500 underline underline-offset-4 decoration-2">Click</span>
          </Link>
          <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest max-w-[200px] mx-auto mb-8 leading-relaxed">
            Invitaciones Digitales Premium desde Mendoza.
          </p>
          <p className="text-[7px] text-zinc-700 font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} MendoClick.
          </p>
        </div>
      </footer>
    </div>
  );
}