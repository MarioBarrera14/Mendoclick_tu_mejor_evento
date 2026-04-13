"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGift, 
  FiMapPin, 
  FiHeart, 
  FiStar, 
  FiCalendar, 
  FiArrowRight, 
  FiShield, 
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

// --- CONFIGURACIÓN DE DATOS ---
const features = [
  { icon: FiStar, text: "Filtros Pro", desc: "Estilo Instagram" },
  { icon: FiHeart, text: "Asistencia", desc: "Confirmación Directa" },
  { icon: FiMapPin, text: "Maps", desc: "Ubicación GPS" },
  { icon: FiCalendar, text: "Calendar", desc: "Save the Date" },
  { icon: FiGift, text: "Regalos", desc: "Dress Code & Mesa" },
];

const testData = {
  mainTitlePart1: "Celebraciones",
  mainTitlePart2: "Inolvidables.",
  subTitle: "Venta de Invitaciones Digitales Premium",
  heroDescription: "Sorprende a tus invitados con una experiencia interactiva. Diseños de vanguardia que elevan el nivel de tu evento desde el primer clic.",
  ctaButton: "Ver Catálogo 2026",
  whatsappLink: "https://wa.me/tu-numero-aqui", 
  footerText: `© ${new Date().getFullYear()} MendoClick. Mendoza, Argentina.`,
};

const allDesigns = [
  // --- 15 AÑOS ---
  { 
    id: '01', 
    title: 'CHAMPAGNE', 
    img: '/img_demo/plantilla1_15.png', 
    link: '/demo/cumple_quince/champagne', 
    tag: 'LUXURY', 
    category: '15_AÑOS' 
  },
  { 
    id: '02', 
    title: 'NEON PARTY', 
    img: '/img_demo/plantilla2_15.png', 
    link: '/demo/cumple_quince/neon-party', 
    tag: 'VIBRANT', 
    category: '15_AÑOS' 
  },
  { 
    id: '03', 
    title: 'GRAFFITI URBANO', 
    img: '/img_demo/plantilla3_15.png', 
    link: '/demo/cumple_quince/golden-grafitis', 
    tag: 'URBANO', 
    category: '15_AÑOS' 
  },

  // --- BODAS ---
  { 
    id: '04', 
    title: 'GOLDEN NOIR', 
    img: '/img_boda/plantilla4.jpg', 
    link: '/demo/bodas/golden_noir', 
    tag: 'PREMIUM', 
    category: 'BODAS' 
  },
  { 
    id: '05', 
    title: 'RETRO VINYL', 
    img: '/img_boda/plantilla5.png', 
    link: '/demo/bodas/bodas-rockeras', // Cambié 'bodas-rockeras' por 'estilo-rock' que es como se llama tu carpeta según el log de Git
    tag: 'VINTAGE', 
    category: 'BODAS' 
  },
  { 
    id: '06', 
    title: 'GRAFFITI URBANO', 
    img: '/img_boda/bodas/plantilla6.jpg', 
    link: '/demo/bodas/bodas-grafitis', // Corregido: ahora está dentro de la carpeta /bodas/
    tag: 'URBANO', 
    category: 'BODAS' 
  },
];

export default function LandingPage(): JSX.Element {
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
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-rose-100 selection:text-rose-600 font-sans overflow-x-hidden scroll-smooth">
      <Head>
        <title>MendoClick | Digital Invitations</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-4 md:px-0">
        <div className="container mx-auto py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase italic z-10">
            Mendo<span className="text-rose-500 underline decoration-2 underline-offset-4 font-black">Click</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
              <a href="#designs" className="hover:text-rose-500 transition">Modelos</a>
              <a href="#features" className="hover:text-rose-500 transition">Funciones</a>
            </div>

            <div className="flex items-center gap-6 border-l border-zinc-100 pl-8">
              {isManager && (
                <Link href="/manager/dashboard" className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-zinc-950 transition-all">
                  <FiShield size={14} /> Manager
                </Link>
              )}
              {!isManager ? (
                <Link href="/login" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 transition-colors">
                  <FiUser size={14} className="text-rose-500" /> Login
                </Link>
              ) : (
                <button onClick={handleLogout} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-rose-500">
                  <FiLogOut size={14} /> Salir
                </button>
              )}
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={testData.whatsappLink} className="bg-zinc-950 text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-colors">
                Comenzar
              </motion.a>
            </div>
          </div>

          <button className="lg:hidden z-10 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header className="relative pt-32 md:pt-44 pb-12 md:pb-24 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-rose-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">{testData.subTitle}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="text-5xl md:text-[100px] font-black leading-[0.9] tracking-tighter mb-10 uppercase italic"
            >
              {testData.mainTitlePart1} <br />
              <span className="text-transparent [-webkit-text-stroke:1px_#18181b]">
                {testData.mainTitlePart2}
              </span>
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-10 items-end">
              <p className="text-lg text-zinc-500 font-medium leading-relaxed">{testData.heroDescription}</p>
              <Link href="#designs" className="group bg-zinc-950 text-white px-8 py-6 rounded-2xl font-black flex items-center justify-between hover:bg-rose-600 transition-all uppercase text-[11px] tracking-widest shadow-xl shadow-zinc-200">
                {testData.ctaButton}
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURES --- */}
      <section id="features" className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm flex flex-col justify-between h-48">
                <div className="bg-rose-50 w-12 h-12 rounded-2xl flex items-center justify-center text-rose-500"><f.icon size={24} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{f.desc}</p>
                  <p className="font-bold text-zinc-900 leading-tight uppercase italic">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="designs" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Catálogo <span className="text-rose-500">2026</span></h2>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Nuestras mejores piezas de diseño</p>
            </div>

            <div className="flex bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
              <button 
                onClick={() => setActiveCategory('BODAS')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === 'BODAS' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                Bodas
              </button>
              <button 
                onClick={() => setActiveCategory('15_AÑOS')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === '15_AÑOS' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                15 Años
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto md:px-10">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredDesigns.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-zinc-50 rounded-[40px] overflow-hidden border border-zinc-100 shadow-xl transition-all duration-500"
                  >
                    <div className="aspect-[9/18] overflow-hidden relative">
                      <img src={item.img} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 opacity-90" />
                      
                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest">
                          {item.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                        <span className="text-[8px] font-black text-rose-400 uppercase tracking-[0.4em] mb-2 block">MNDCLK {item.id}</span>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic mb-6 leading-tight">{item.title}</h3>
                        <Link href={item.link} className="flex items-center justify-center gap-2 bg-rose-500 text-white w-full py-4 rounded-xl font-black text-[9px] tracking-widest hover:bg-white hover:text-zinc-950 transition-all uppercase shadow-lg shadow-rose-500/20">
                          PROBAR DEMO <FiArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CON SELLO --- */}
      <footer className="py-24 bg-zinc-950 text-white text-center relative overflow-hidden">
        
        {/* SELLO MENDOCLICK TRASLÚCIDO */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black italic text-white/[0.03] select-none pointer-events-none whitespace-nowrap uppercase tracking-tighter">
          MendoClick
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase italic mb-6 block">
            Mendo<span className="text-rose-500 underline underline-offset-8 decoration-1">Click</span>
          </Link>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest max-w-xs mx-auto mb-10">
            Transformando eventos en experiencias digitales de clase mundial.
          </p>
          <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.5em]">{testData.footerText}</p>
        </div>
      </footer>
    </div>
  );
}