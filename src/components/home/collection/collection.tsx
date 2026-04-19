"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShoppingCart, FiEye } from 'react-icons/fi';

const phoneShakeVariants: Variants = {
  vibrate: {
    rotate: [0, -1, 1, -1, 1, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
  }
};

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE LUX', img: '/img_demo/Samsun.webp', price: 73000, oldPrice: 80000, tag: 'LUXURY', category: '15_AÑOS', link: '/demo/cumple_quince/champagne' },
  { id: '02', title: 'NEON WAVE', img: '/img_demo/neon.webp', price: 73000, oldPrice: 80000, tag: 'VIBRANT', category: '15_AÑOS', link: '/demo/cumple_quince/neon-party' },
  { id: '03', title: 'URBAN VIBE', img: '/img_demo/grafiti15.webp', price: 73000, oldPrice: 80000, tag: 'STREET', category: '15_AÑOS', link: '/demo/cumple_quince/golden-grafitis' },
  { id: '04', title: 'DARK PREMIUM', img: '/img_boda/noir.webp', price: 73000, oldPrice: 80000, tag: 'NOIR', category: 'BODAS', link: '/demo/bodas/golden_noir' },
  { id: '05', title: 'VINTAGE ROCK', img: '/img_boda/imgrock.webp', price: 73000, oldPrice: 80000, tag: 'VIBE', category: 'BODAS', link: '/demo/bodas/bodas-rockeras' },
  { id: '06', title: 'GRAFFITI LOVE', img: '/img_boda/graffiti_boda.webp', price: 73000, oldPrice: 80000, tag: 'URBAN', category: 'BODAS', link: '/demo/bodas/bodas-grafitis' },
];

export const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');
  const filtered = allDesigns.filter(d => d.category === activeCategory);

  return (
    <section id="modelos" className="py-8 md:py-12 bg-[#f9f9f9]">
      <div className="container mx-auto px-4 text-center">
        
        {/* Encabezado más pequeño */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase mb-1 text-zinc-900 tracking-tighter leading-none">
          La <span className="text-[#33aba1]">Colección.</span>
        </h2>
        <p className="text-zinc-400 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold mb-6">
          Diseños exclusivos para momentos inolvidables
        </p>
        
        {/* Filtros compactos */}
        <div className="flex justify-center gap-2 mb-8">
          {['BODAS', '15_AÑOS'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-5 py-1.5 rounded-full text-[8px] font-black tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-[#33aba1] text-white shadow-sm' 
                : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Grid con espaciado reducido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                className="flex flex-col items-center group scale-90 lg:scale-100 transition-transform"
              >
                {/* --- MOCKUP MÁS PEQUEÑO --- */}
                <motion.div 
                  whileHover="vibrate"
                  variants={phoneShakeVariants}
                  className="relative w-full max-w-[180px] md:max-w-[200px] mb-4"
                >
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm z-50 shadow-sm">
                    -5%
                  </div>

                  <div className="relative aspect-[9/18.5] border-[5px] border-zinc-900 rounded-[2rem] bg-black shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-zinc-900 rounded-b-xl z-40" />
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide bg-white z-10">
                      <Image 
                        src={item.img} 
                        alt={item.title}
                        width={250}
                        height={750}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- INFO COMPACTA --- */}
                <div className="w-full max-w-[220px] flex flex-col items-center">
                  <p className="text-[8px] text-zinc-400 uppercase tracking-widest mb-0.5">Invitación Web</p>
                  <h3 className="text-lg md:text-xl font-black text-[#33aba1] leading-tight mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  <div className="mb-3">
                    <p className="text-zinc-400 text-[10px] line-through leading-none">${item.oldPrice.toLocaleString()}</p>
                    <p className="text-xl font-black text-zinc-900 leading-none">
                      <span className="text-[10px] font-medium mr-1 text-zinc-500">desde</span> 
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <button className="flex items-center justify-center gap-2 w-full py-2 border-2 border-zinc-800 text-zinc-800 text-[9px] font-black tracking-widest rounded-full hover:bg-zinc-800 hover:text-white transition-all uppercase">
                      <FiShoppingCart className="text-xs" /> Ver Opciones
                    </button>
                    
                    <Link 
                      href={item.link} 
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#33aba1] text-white text-[9px] font-black tracking-widest rounded-full hover:bg-[#288a82] transition-all uppercase shadow-md"
                    >
                      <FiEye className="text-xs" /> Vista Previa
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};