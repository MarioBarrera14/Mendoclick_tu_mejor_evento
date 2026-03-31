"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, Film, Zap, Maximize2, Sparkles } from "lucide-react";
import { eventConfig as localConfig } from "@/data/event-config";

interface FotoCarouselProps {
  images?: string | null;
  videoUrl?: string | null;
}

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const { imagenes: localImagenes } = localConfig;
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const scaleVideo = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);

  // --- LÓGICA BLINDADA PARA FOTOS ---
  const fotos = useMemo(() => {
    const defaultPhotos = [
       { id: 1, url:"/img_demo/6.webp" },
      { id: 2, url: "/img_demo/7.webp" },
      { id: 3, url: "/img_demo/8.webp" },
      { id: 4, url: "/img_demo/9.webp" },
    ];

    try {
      if (images) {
        const urls = JSON.parse(images);
        if (Array.isArray(urls)) {
          // Filtramos nulos o vacíos que vienen del panel
          const validUrls = urls.filter(u => u !== null && u !== "");
          
          if (validUrls.length > 0) {
            return validUrls.map((url, i) => ({
              id: i,
              url: url
            }));
          }
        }
      }
    } catch (e) {
      console.error("Error parseando imágenes Neon:", e);
    }
    return defaultPhotos;
  }, [images]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Función de ayuda para obtener una foto segura (evita el error de undefined)
  const getFotoUrl = (index: number) => {
    if (fotos && fotos[index]) return fotos[index].url;
    return fotos[0]?.url || localImagenes.hero; // Fallback final
  };

  return (
    <section ref={scrollRef} className="relative py-28 bg-[#0c001a] overflow-hidden">
      
      {/* --- DIVISOR ONDULADO --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-30">
        <svg className="relative block w-[calc(160%+1.3px)] h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#9333ea" />
        </svg>
      </div>

      {/* --- FONDO GRID --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: `linear-gradient(#9333ea 1px, transparent 1px), linear-gradient(90deg, #9333ea 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* --- TEXTO GIGANTE --- */}
      <div className="absolute top-40 left-0 whitespace-nowrap opacity-[0.08] pointer-events-none z-0">
        <motion.h2 style={{ x: xLeft }} className="text-[15rem] md:text-[25rem] font-black italic text-purple-600 uppercase leading-none">
          MIS QUINCE • MIS QUINCE • MIS QUINCE
        </motion.h2>
      </div>

      <div className="relative z-10 container mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-purple-500 mb-4">
              <Zap size={20} fill="currentColor" className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.5em]">Live Gallery</span>
            </div>
            <h3 className="text-6xl md:text-9xl font-black text-white italic leading-[0.8] uppercase tracking-tighter">
              The <br /> <span className="text-purple-600">Vibe</span>
            </h3>
          </div>
          <p className="text-purple-200/50 text-sm md:text-right max-w-[200px] font-mono leading-relaxed">
            // CAPTURANDO LA ESENCIA DE UNA NOCHE INOLVIDABLE.
          </p>
        </div>

        {/* Malla de fotos con URLs protegidas */}
        <div className="relative space-y-32 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <motion.div style={{ rotate: rotateImg }} className="md:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] border-4 border-purple-500/30 shadow-2xl">
                <img src={getFotoUrl(0)} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Vibe" />
              </div>
              <div className="absolute -bottom-6 -right-6 text-white font-black text-8xl italic opacity-20">01</div>
            </motion.div>

            <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="md:col-span-7">
              <div className="relative overflow-hidden rounded-3xl aspect-video border-4 border-white/20">
                 <img src={getFotoUrl(1)} className="w-full h-full object-cover" alt="Vibe" />
                 <div className="absolute top-6 left-6 bg-purple-600 text-white px-4 py-1.5 text-xs font-bold rounded-full">FLASH ON</div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center md:pt-40">
            <div className="md:col-start-2 md:col-span-4">
              <motion.div whileHover={{ scale: 1.05 }} className="relative p-2 bg-purple-500 rounded-2xl rotate-3">
                <img src={getFotoUrl(2)} className="rounded-xl w-full aspect-square object-cover" alt="Vibe" />
                <div className="absolute -top-4 -right-4 bg-white text-purple-600 p-3 rounded-full shadow-lg">
                  <Sparkles size={22} className="animate-pulse" />
                </div>
              </motion.div>
            </div>
            <div className="md:col-start-8 md:col-span-5">
              <div className="relative overflow-hidden rounded-[3rem] aspect-[2/3] group">
                <img src={getFotoUrl(3)} className="w-full h-full object-cover" alt="Vibe" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-purple-900/20 backdrop-blur-sm">
                   <Maximize2 className="text-white w-16 h-16" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- VIDEO --- */}
        <motion.div style={{ scale: scaleVideo }} className="mt-48 relative group">
          <div className="absolute -top-10 -left-4 z-20 bg-purple-600 text-white p-4 font-black italic text-2xl -rotate-12 shadow-xl uppercase">Director's Cut</div>
          <div className="relative aspect-video md:aspect-[21/9] bg-black rounded-[3rem] overflow-hidden border-[10px] border-purple-500/20 shadow-2xl">
            {videoUrl ? (
              <>
                <video ref={videoRef} src={videoUrl} key={videoUrl} className="w-full h-full object-cover opacity-80" loop muted={isMuted} autoPlay playsInline />
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                   <button onClick={toggleMute} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                     {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                   </button>
                   <h4 className="text-white font-black italic text-4xl md:text-7xl uppercase leading-none">THE MOVIE</h4>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                 <Film className="text-purple-700 animate-pulse" size={64} strokeWidth={1} />
                 <p className="text-purple-700 font-mono text-xs tracking-widest uppercase">Video en preparación</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}