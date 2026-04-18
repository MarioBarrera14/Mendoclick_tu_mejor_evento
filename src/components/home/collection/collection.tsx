"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// --- VARIANTES DE VIBRACIÓN ---
const phoneShakeVariants: Variants = {
  vibrate: {
    rotate: [0, -1, 1, -1, 1, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
  }
};

const allDesigns = [
  { id: '01', title: 'CHAMPAGNE LUX', img: '/img_demo/plantilla1_15.png', tag: 'LUXURY', category: '15_AÑOS', link: '/demo/cumple_quince/champagne' },
  { id: '02', title: 'NEON WAVE', img: '/img_demo/plantilla2_15.png', tag: 'VIBRANT', category: '15_AÑOS', link: '/demo/cumple_quince/neon-party' },
  { id: '03', title: 'URBAN VIBE', img: '/img_demo/plantilla3_15.png', tag: 'STREET', category: '15_AÑOS', link: '/demo/cumple_quince/golden-grafitis' },
  { id: '04', title: 'DARK PREMIUM', img: '/img_boda/plantilla4.jpg', tag: 'NOIR', category: 'BODAS', link: '/demo/bodas/golden_noir' },
  { id: '05', title: 'VINTAGE ROCK', img: '/img_boda/plantilla5.png', tag: 'VIBE', category: 'BODAS', link: '/demo/bodas/bodas-rockeras' },
  { id: '06', title: 'GRAFFITI LOVE', img: '/img_boda/plantilla6.jpg', tag: 'URBAN', category: 'BODAS', link: '/demo/bodas/bodas-grafitis' },
];

export const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<'BODAS' | '15_AÑOS'>('BODAS');
  const filtered = allDesigns.filter(d => d.category === activeCategory);

  return (
    <section id="modelos" className="py-24 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-4 text-zinc-900">
          La <span className="text-red-600">Colección.</span>
        </h2>
        
        <div className="flex justify-center gap-2 mt-8 mb-16">
          {['BODAS', '15_AÑOS'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-8 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-zinc-200 text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filtered.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="flex justify-center w-full"
              >
                {/* APLICAMOS LA VIBRACIÓN AQUÍ */}
                <motion.div 
                  whileHover="vibrate"
                  whileTap="vibrate"
                  variants={phoneShakeVariants}
                  className="group relative w-full max-w-[280px] cursor-pointer"
                >
                  <div className="relative aspect-[9/18.5] border-[6px] border-zinc-900 rounded-[3rem] overflow-hidden bg-black shadow-2xl transition-all duration-500 group-hover:border-red-600">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-2xl z-20" />
                    
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                      alt={item.title} 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 text-center">
                      <span className="text-[8px] text-red-500 font-black tracking-[0.3em] uppercase mb-1 block">
                        {item.tag}
                      </span>
                      <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-6 leading-none">
                        {item.title}
                      </h3>
                      <Link 
                        href={item.link} 
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black text-[9px] font-black tracking-widest rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                      >
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
  );
};