"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Film, Zap, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { eventConfig as localConfig } from "@/data/event-config";

interface FotoCarouselProps {
  images?: string | null;
  videoUrl?: string | null;
}

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Bloqueo de Scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImg]);

  const fotos = useMemo((): string[] => {
    let baseFotos = [
      "/img_demo/6.webp", "/img_demo/7.webp", "/img_demo/8.webp", 
      "/img_demo/9.webp", "/img_demo/14.webp"
    ];
    try {
      if (images) {
        const urls = JSON.parse(images);
        if (Array.isArray(urls)) {
          const valid = urls.filter((u: string) => u !== "" && u !== null);
          if (valid.length > 0) baseFotos = valid;
        }
      }
    } catch (e) { console.error("Error parsing images:", e); }
    
    // Repetimos para el efecto infinito
    return [...baseFotos, ...baseFotos, ...baseFotos, ...baseFotos];
  }, [images]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative py-20 bg-[#0c001a] overflow-hidden">
      
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 mb-12">
        <div className="flex items-center gap-2 text-purple-500 mb-2">
          <Zap size={18} fill="currentColor" className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Live Gallery</span>
        </div>
        <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
          The <span className="text-purple-600">Vibe</span>
        </h3>
      </div>

      {/* --- CARRUSEL INFINITO (MARQUEE) --- */}
      {/* py-20 asegura que las rotaciones y escalas no se corten */}
      <div className="relative z-30 overflow-visible py-20"> 
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex gap-8 animate-marquee-infinite group-hover:[animation-play-state:paused] py-4">
            {fotos.map((url, i) => (
              <motion.div 
                key={`${url}-${i}`}
                onClick={() => setSelectedImg(url)}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                className={`relative flex-shrink-0 w-[280px] md:w-[350px] cursor-pointer transition-all duration-500 z-20 ${
                  i % 2 === 0 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                <div className={`p-2 rounded-2xl border-2 shadow-2xl backdrop-blur-sm bg-black/20 ${
                  i % 2 === 0 ? 'border-purple-500/50' : 'border-white/20'
                }`}>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.1)]">
                    <Image 
                      src={url} 
                      alt={`Galería ${i}`}
                      fill
                      sizes="(max-width: 768px) 280px, 350px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={i < 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
                    
                    <div className="absolute -bottom-2 -right-2 text-white font-black text-7xl italic opacity-10 pointer-events-none">
                      {i + 1}
                    </div>
                  </div>
                </div>

                {i % 3 === 0 && (
                  <div className="absolute -top-4 -right-4 bg-white text-purple-600 p-2 rounded-full shadow-lg z-40">
                    <Sparkles size={16} className="animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECCIÓN VIDEO --- */}
      <div className="mt-16 container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group p-1 bg-gradient-to-br from-purple-500/20 to-transparent rounded-[2.5rem]">
            <div className="absolute -top-6 -left-4 z-20 bg-purple-600 text-white px-5 py-2 font-black italic text-xl -rotate-6 shadow-2xl uppercase">
              Director's Cut
            </div>
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border-4 border-white/10 bg-black shadow-2xl">
              {videoUrl ? (
                <>
                  <video 
                    ref={videoRef} 
                    src={videoUrl} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" 
                    loop muted={isMuted} autoPlay playsInline 
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <button 
                      onClick={toggleMute} 
                      className="p-3 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/20 hover:bg-white hover:text-black transition-all"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <h4 className="text-white font-black italic text-4xl md:text-6xl uppercase tracking-tighter opacity-80">
                      The Movie
                    </h4>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-purple-800">
                  <Film size={50} strokeWidth={1} className="animate-pulse" />
                  <p className="font-mono text-[10px] uppercase tracking-widest">Processing Tape...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL PANTALLA COMPLETA --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 touch-none"
          >
            <button className="absolute top-6 right-6 text-white hover:text-purple-500 transition-colors z-[110]">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className="relative w-full h-[85vh]"
              onClick={(e) => e.stopPropagation()} // Evita cerrar si clickeas la foto
            >
              <Image 
                src={selectedImg} 
                alt="Preview" 
                fill
                className="object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}