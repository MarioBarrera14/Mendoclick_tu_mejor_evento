"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, FiMenu, FiX, FiZap, FiAward, FiSmartphone, FiMousePointer 
} from 'react-icons/fi';

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE LUX', img: '/img_demo/plantilla1_15.png', tag: 'LUXURY', category: '15_AÑOS', link: '/demo/cumple_quince/champagne' },
  { id: '02', title: 'NEON WAVE', img: '/img_demo/plantilla2_15.png', tag: 'VIBRANT', category: '15_AÑOS', link: '/demo/cumple_quince/neon-party' },
  { id: '03', title: 'URBAN VIBE', img: '/img_demo/plantilla3_15.png', tag: 'STREET', category: '15_AÑOS', link: '/demo/cumple_quince/golden-grafitis' },
  { id: '04', title: 'DARK PREMIUM', img: '/img_boda/plantilla4.jpg', tag: 'NOIR', category: 'BODAS', link: '/demo/bodas/golden_noir' },
  { id: '05', title: 'VINTAGE ROCK', img: '/img_boda/plantilla5.png', tag: 'VIBE', category: 'BODAS', link: '/demo/bodas/bodas-rockeras' },
  { id: '06', title: 'GRAFFITI LOVE', img: '/img_boda/plantilla6.jpg', tag: 'URBAN', category: 'BODAS', link: '/demo/bodas/bodas-grafitis' },
];

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredDesigns = allDesigns.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Head>
        <title>MENDOCLICK | Industry Standard</title>
      </Head>

      {/* --- NAV --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-[-0.05em] uppercase group italic">
            MENDO<span className="text-red-600 group-hover:text-white transition-colors">CLICK</span>
            <span className="text-[9px] block font-light tracking-[0.5em] mt-[-6px] text-zinc-500">STUDIO.2026</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              <a href="#selector" className="hover:text-red-500 transition">Catálogo</a>
              <a href="#stats" className="hover:text-red-500 transition">Potencia</a>
              <Link href="/login" className="hover:text-red-500 transition">Acceso</Link>
            </div>
            <a href="https://wa.me/tu-numero" className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95">
              INICIAR PROYECTO
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-zinc-950 p-10 flex flex-col lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-red-600">
                <FiX size={40} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-20 text-4xl font-black uppercase italic italic">
              <a href="#selector" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</a>
              <a href="#stats" onClick={() => setIsMobileMenuOpen(false)}>Potencia</a>
              <a href="https://wa.me/tu-numero" className="text-red-600">WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 md:pt-44 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-600/20 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-5xl"
          >
            <h1 className="text-[14vw] md:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase italic mb-10">
              Impacto <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:1px_#dc2626] transition-all duration-700">Digital</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end gap-10">
                <p className="text-zinc-400 text-sm md:text-xl max-w-xl font-light leading-relaxed uppercase tracking-wide">
                  No enviamos links. Creamos <span className="text-white font-bold">experiencias de alto impacto</span> que redefinen tu evento.
                </p>
                <div className="flex gap-4 border-l border-zinc-800 pl-6 md:border-l-0 md:pl-0">
                    <div className="h-20 w-[1px] bg-zinc-800 hidden md:block" />
                    <div className="text-left">
                        <span className="text-red-600 font-black text-2xl block">#01</span>
                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">En Mendoza</span>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SELECTOR DE CATEGORÍA --- */}
      <section id="selector" className="py-12 md:py-20 bg-zinc-950/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-16">
            <button 
              onClick={() => setActiveCategory('BODAS')}
              className={`group relative flex-1 overflow-hidden rounded-2xl p-8 md:p-10 transition-all duration-500 ${activeCategory === 'BODAS' ? 'bg-white text-black' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
            >
              <div className="relative z-10 flex flex-col items-start h-full">
                <span className="text-[10px] font-black tracking-[0.3em] mb-2 uppercase opacity-60">Categoría</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Bodas</h2>
                <div className={`mt-6 md:mt-10 h-1 w-20 transition-all ${activeCategory === 'BODAS' ? 'bg-black' : 'bg-red-600'}`} />
              </div>
              <FiZap className={`absolute right-[-20px] bottom-[-20px] text-[120px] md:text-[150px] opacity-10 transition-transform duration-700 group-hover:rotate-12 ${activeCategory === 'BODAS' ? 'text-black' : 'text-white'}`} />
            </button>

            <button 
              onClick={() => setActiveCategory('15_AÑOS')}
              className={`group relative flex-1 overflow-hidden rounded-2xl p-8 md:p-10 transition-all duration-500 ${activeCategory === '15_AÑOS' ? 'bg-white text-black' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
            >
              <div className="relative z-10 flex flex-col items-start h-full">
                <span className="text-[10px] font-black tracking-[0.3em] mb-2 uppercase opacity-60">Categoría</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">15 Años</h2>
                <div className={`mt-6 md:mt-10 h-1 w-20 transition-all ${activeCategory === '15_AÑOS' ? 'bg-black' : 'bg-red-600'}`} />
              </div>
              <FiAward className={`absolute right-[-20px] bottom-[-20px] text-[120px] md:text-[150px] opacity-10 transition-transform duration-700 group-hover:rotate-12 ${activeCategory === '15_AÑOS' ? 'text-black' : 'text-white'}`} />
            </button>
          </div>

          {/* --- GRILLA DE DISEÑOS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {filteredDesigns.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative"
                >
                  <div className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/5 bg-zinc-900">
                    <img src={item.img} className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-xl shadow-red-600/40">
                            {item.tag}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                      <p className="text-red-500 text-[10px] font-black tracking-widest uppercase mb-2">Model Selection // {item.id}</p>
                      <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-6 md:mb-8 leading-none">{item.title}</h3>
                      
                      <Link href={item.link} className="inline-flex items-center justify-center w-full bg-white text-black py-4 md:py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all">
                        VER DEMO EN VIVO
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section id="stats" className="py-20 md:py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                <div className="lg:col-span-1">
                    <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                        No somos <br /><span className="text-red-600">iguales.</span>
                    </h2>
                    <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest leading-relaxed">
                        Desarrollamos tecnología propia para que tu invitación no solo se vea bien, sino que funcione como una App de élite.
                    </p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-8 md:p-10 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-red-600/30 transition-colors">
                        <FiSmartphone className="text-red-600 text-4xl mb-6" />
                        <h4 className="text-white font-black text-xl uppercase mb-2">Mobile First</h4>
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-tighter">Optimizado para el 100% de los smartphones actuales.</p>
                    </div>
                    <div className="p-8 md:p-10 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-red-600/30 transition-colors">
                        <FiMousePointer className="text-red-600 text-4xl mb-6" />
                        <h4 className="text-white font-black text-xl uppercase mb-2">Interactive UX</h4>
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-tighter">Mapas, RSVPs, y filtros con respuesta táctil premium.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-20 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-2xl font-black tracking-tighter italic uppercase">MENDO<span className="text-red-600">CLICK</span></span>
            <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Superior Digital Invitations</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="https://wa.me/tu-numero" className="hover:text-red-500 transition">WhatsApp</a>
            <a href="https://instagram.com/tu-ig" className="hover:text-red-500 transition">Instagram</a>
            <p className="text-zinc-800 w-full md:w-auto text-center">© 2026 MC.STUDIO</p>
          </div>
        </div>
      </footer>
    </div>
  );
}