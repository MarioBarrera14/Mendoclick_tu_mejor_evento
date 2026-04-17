"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  FiArrowRight, FiSmartphone, FiClock, FiMapPin, FiCheckCircle, FiPlayCircle, 
  FiMenu, FiX, FiInstagram, FiTwitter, FiSend 
} from 'react-icons/fi';

// --- VARIANTES CON TIPADO TSX ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
  }),
};

const childVariants: Variants = {
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", damping: 12, stiffness: 100 } 
  },
  hidden: { opacity: 0, y: 20 },
};

// Variantes de vibración: activas en hover (PC) y tap (Mobile)
const phoneShakeVariants: Variants = {
  vibrate: {
    rotate: [0, -1, 1, -1, 1, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
  }
};

const WordByWord = ({ text, className, isTransparent = false }: { text: string, className?: string, isTransparent?: boolean }) => {
  const words = text.split(" ");
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-wrap justify-center gap-x-2 md:gap-x-4 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={childVariants} 
          className={isTransparent ? "text-transparent [text-stroke:1px_#71717a] [-webkit-text-stroke:1px_#71717a] hover:[-webkit-text-stroke:1px_#dc2626] transition-all duration-500" : ""}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE LUX', img: '/img_demo/plantilla1_15.png', tag: 'LUXURY', category: '15_AÑOS', link: '/demo/cumple_quince/champagne' },
  { id: '02', title: 'NEON WAVE', img: '/img_demo/plantilla2_15.png', tag: 'VIBRANT', category: '15_AÑOS', link: '/demo/cumple_quince/neon-party' },
  { id: '03', title: 'URBAN VIBE', img: '/img_demo/plantilla3_15.png', tag: 'STREET', category: '15_AÑOS', link: '/demo/cumple_quince/golden-grafitis' },
  { id: '04', title: 'DARK PREMIUM', img: '/img_boda/plantilla4.jpg', tag: 'NOIR', category: 'BODAS', link: '/demo/bodas/golden_noir' },
  { id: '05', title: 'VINTAGE ROCK', img: '/img_boda/plantilla5.png', tag: 'VIBE', category: 'BODAS', link: '/demo/bodas/bodas-rockeras' },
  { id: '06', title: 'GRAFFITI LOVE', img: '/img_boda/plantilla6.jpg', tag: 'URBAN', category: 'BODAS', link: '/demo/bodas/bodas-grafitis' },
];

export default function LuxuryLanding() {
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const yHero = useTransform(scrollY, [0, 400], [0, -50]);

  const filteredDesigns = allDesigns.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      <Head>
        <title>MENDOCLICK | Invitaciones Digitales</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(220,38,38,0.3)] text-white">M</div>
            <span className="text-lg font-black uppercase italic tracking-tighter">MENDO<span className="text-red-600">CLICK</span></span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-white"><FiMenu /></button>
          <div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
             <a href="#modelos" className="hover:text-white transition">Modelos</a>
             <a href="#experiencia" className="hover:text-white transition">Tecnología</a>
             <Link href="https://wa.me/tu-numero" className="bg-white text-black px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all font-bold tracking-widest">CONTACTO</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden text-center">
        <motion.div style={{ opacity: opacityHero, y: yHero }} className="container mx-auto z-10">
          <span className="text-red-600 font-black tracking-[0.4em] text-[9px] uppercase mb-6 block text-center">Mendoza // Digital Architecture</span>
          <div className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] uppercase italic tracking-tighter mb-8 text-center flex flex-col items-center">
            <WordByWord text="ESTILO" />
            <WordByWord text="SIN LÍMITES" isTransparent={true} />
          </div>
          <p className="max-w-2xl mx-auto text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed mb-12 text-center px-4">
            No enviamos un link. Entregamos una <span className="text-white italic font-bold underline decoration-red-600 underline-offset-4">experiencia inmersiva</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
            <div className="flex items-center gap-4 bg-zinc-900/40 backdrop-blur-md border border-white/5 px-6 py-4 rounded-2xl w-full group hover:border-red-600/30 transition-all">
              <FiSmartphone className="text-red-600 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-zinc-500 text-[8px] font-black uppercase leading-none mb-1">INTERFACE</p>
                <p className="text-white text-[10px] font-black uppercase tracking-wider">MOBILE FIRST UX</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/40 backdrop-blur-md border border-white/5 px-6 py-4 rounded-2xl w-full group hover:border-red-600/30 transition-all">
              <FiPlayCircle className="text-red-600 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-zinc-500 text-[8px] font-black uppercase leading-none mb-1">MEDIA</p>
                <p className="text-white text-[10px] font-black uppercase tracking-wider">DYNAMIC AUDIO</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="modelos" className="py-24 bg-[#040404]">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-center">La <span className="text-red-600">Colección.</span></h2>
            <div className="flex justify-center gap-2 mt-8">
              {(['BODAS', '15_AÑOS'] as const).map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all ${activeCategory === cat ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-4 justify-items-center">
            <AnimatePresence mode="wait">
              {filteredDesigns.map((item) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  className="flex justify-center w-full"
                >
                  {/* AQUÍ ESTÁ LA VIBRACIÓN PARA PC Y MÓVIL */}
                  <motion.div 
                    whileHover="vibrate"
                    whileTap="vibrate"
                    variants={phoneShakeVariants}
                    className="group relative w-full max-w-[280px] cursor-pointer"
                  >
                    <div className="relative w-full aspect-[9/18.5] border-[6px] border-zinc-800 rounded-[3rem] bg-black overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-red-600/40">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-2xl z-20" />
                      <img src={item.img} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 w-full p-8 text-center">
                        <span className="text-[8px] text-red-600 font-black tracking-[0.3em] uppercase mb-1 block">{item.tag}</span>
                        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-6 leading-none">{item.title}</h3>
                        <Link href={item.link} className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black text-[9px] font-black tracking-widest rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                          VER DEMO <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- TECH --- */}
      <section id="experiencia" className="py-32 relative text-center md:text-left">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center justify-center">
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12 text-center md:text-left">Invisible <br/><span className="text-red-600">Power.</span></h2>
            <div className="space-y-6 max-w-md w-full">
              {[
                { i: FiSmartphone, t: "SMART ARCHITECTURE", d: "Optimizada para una carga instantánea sin esperas." },
                { i: FiClock, t: "LIVE SYNC", d: "Confirmaciones en tiempo real directo a tu panel." },
                { i: FiMapPin, t: "DEEP LINKING", d: "Navegación nativa con Google Maps & Apple Maps." }
              ].map((f, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 p-6 bg-zinc-900/30 rounded-3xl border border-white/5 group hover:border-red-600/20 transition-all">
                  <f.i className="text-red-600 text-2xl shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-[10px] font-black tracking-widest uppercase italic text-white mb-2">{f.t}</h4>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center relative order-1 md:order-2">
            <div className="absolute inset-0 bg-red-600/10 blur-[120px] rounded-full" />
            <motion.div 
              animate={{ rotate: [2, -2, 2], y: [0, -20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-[240px] md:w-[280px] h-[500px] md:h-[580px] border-[10px] border-zinc-800 rounded-[3.5rem] bg-zinc-900 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-800 rounded-b-2xl z-20" />
              <img src="/img_demo/plantilla1_15.png" className="w-full h-full object-cover opacity-60" alt="demo" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CENTRADO --- */}
      <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10 text-center md:text-left">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-16 items-center md:items-start">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black italic text-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] text-white">M</div>
                <span className="text-2xl font-black uppercase italic tracking-tighter">MENDO<span className="text-red-600">CLICK</span></span>
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] leading-relaxed max-w-sm mb-8 px-4 md:px-0">
                Redefiniendo el estándar de las celebraciones digitales en Mendoza. Tecnología, diseño y exclusividad en cada click.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-zinc-400 hover:border-white">
                  <FiInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-zinc-400 hover:border-white">
                  <FiTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-zinc-400 hover:border-white">
                  <FiSend />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Navegación</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <li><a href="#" className="hover:text-red-600 transition">Inicio</a></li>
                <li><a href="#modelos" className="hover:text-red-600 transition">Colección</a></li>
                <li><a href="#experiencia" className="hover:text-red-600 transition">Tecnología</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Contacto</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <li className="italic text-white underline decoration-red-600 underline-offset-4">info@mendoclick.com.ar</li>
                <li>WhatsApp Business</li>
                <li>Mendoza, Argentina</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center w-full">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] px-4">
              © 2026 MendoClick Studio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}