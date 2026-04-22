"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiEye } from 'react-icons/fi';

const phoneShakeVariants: Variants = {
  vibrate: {
    rotate: [0, -1, 1, -1, 1, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
  }
};

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE LUX', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742964/Samsun_s2eqfa.webp', price: 73000, oldPrice: 80000, tag: 'LUXURY', category: '15_AÑOS', link: '/demo/cumple_quince/champagne' },
  { id: '02', title: 'NEON WAVE', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742961/neon_t9dnda.webp', price: 73000, oldPrice: 80000, tag: 'VIBRANT', category: '15_AÑOS', link: '/demo/cumple_quince/neon-party' },
  { id: '03', title: 'URBAN VIBE', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742965/grafiti15_bptpc3.webp', price: 73000, oldPrice: 80000, tag: 'STREET', category: '15_AÑOS', link: '/demo/cumple_quince/golden-grafitis' },
  { id: '04', title: 'DARK PREMIUM', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742929/noir_qamzg1.webp', price: 73000, oldPrice: 80000, tag: 'NOIR', category: 'BODAS', link: '/demo/bodas/golden_noir' },
  { id: '05', title: 'VINTAGE ROCK', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742928/imgrock_mhe0kf.webp', price: 73000, oldPrice: 80000, tag: 'VIBE', category: 'BODAS', link: '/demo/bodas/bodas-rockeras' },
  { id: '06', title: 'GRAFFITI LOVE', img: 'https://res.cloudinary.com/diqipcpuu/image/upload/f_auto,q_auto,w_400/v1776742937/graffiti_boda_l667p8.webp', price: 73000, oldPrice: 80000, tag: 'URBAN', category: 'BODAS', link: '/demo/bodas/bodas-grafitis' },
];

export const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');

  const filtered = useMemo(() => 
    allDesigns.filter(d => d.category === activeCategory),
  [activeCategory]);

  return (
    <section id="modelos" className="py-12 md:py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4 text-center">
        
        <header className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase mb-1 text-zinc-900 tracking-tighter leading-none">
            La <span className="text-[#33aba1]">Colección.</span>
          </h2>
          <p className="text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
            Diseños exclusivos para momentos inolvidables
          </p>
        </header>
        
        <nav className="flex justify-center gap-3 mb-10" aria-label="Categorías de diseños">
          {['BODAS', '15_AÑOS'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              aria-pressed={activeCategory === cat}
              className={`px-6 py-2 rounded-full text-[9px] font-black tracking-widest transition-all active:scale-95 ${
                activeCategory === cat 
                ? 'bg-[#33aba1] text-white shadow-lg' 
                : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article 
                key={item.id} 
                layout 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="flex flex-col items-center group"
              >
                {/* MOCKUP CON SCROLL RECUPERADO */}
                <motion.div 
                  whileHover="vibrate"
                  variants={phoneShakeVariants}
                  className="relative w-full max-w-[190px] md:max-w-[210px] mb-6"
                >
                  <div className="absolute -top-1 -right-1 bg-zinc-950 text-white text-[9px] font-black px-2 py-1 rounded-sm z-30 shadow-md">
                    -5% OFF
                  </div>

                  <div className="relative aspect-[9/18.5] border-[6px] border-zinc-900 rounded-[2.2rem] bg-zinc-200 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-zinc-900 rounded-b-xl z-40" />
                    
                    {/* AQUÍ EL FIX: overflow-y-auto + scrollbar-hide permite scrollear la invitación */}
                    <div className="absolute inset-0 bg-white z-10 overflow-y-auto scrollbar-hide touch-pan-y">
                      <Image 
                        src={item.img} 
                        alt={`Demo del diseño ${item.title}`}
                        width={210}
                        height={430}
                        loading="lazy" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="w-full max-w-[240px] flex flex-col items-center">
                  <p className="text-[9px] text-zinc-400 uppercase font-black tracking-[0.2em] mb-1">MendoClick Premium</p>
                  <h3 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight mb-3 tracking-tighter italic uppercase">
                    {item.title}
                  </h3>

                  <div className="mb-4">
                    <p className="text-zinc-400 text-[11px] line-through font-bold opacity-60">${item.oldPrice.toLocaleString()}</p>
                    <p className="text-2xl font-black text-[#33aba1] leading-none tracking-tighter">
                      <span className="text-[10px] font-medium mr-1 text-zinc-400">desde</span> 
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 w-full px-4">
                    <button 
                      aria-label={`Ver opciones de compra para ${item.title}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-zinc-900 text-zinc-900 text-[10px] font-black tracking-widest rounded-full hover:bg-zinc-900 hover:text-white transition-all uppercase"
                    >
                      <FiShoppingCart /> Opciones
                    </button>
                    
                    <Link 
                      href={item.link} 
                      aria-label={`Ver vista previa en vivo de ${item.title}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#33aba1] text-white text-[10px] font-black tracking-widest rounded-full hover:bg-zinc-900 transition-all uppercase shadow-md"
                    >
                      <FiEye /> Live Demo
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};