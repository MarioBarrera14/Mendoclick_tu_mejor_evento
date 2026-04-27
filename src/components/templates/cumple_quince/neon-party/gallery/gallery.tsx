"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Film, Zap, X, Sparkles, 
  Play, Pause
} from "lucide-react";
import Image from "next/image";

interface FotoCarouselProps {
  images?: string | string[] | null;
  videoUrl?: string | null;
}

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[2px] z-10">
    <div className="absolute inset-0 bg-purple-500 blur-[2px] opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- BLOQUEO DE SCROLL RADICAL Y VERSÁTIL (SIN SALTOS) ---
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (selectedImg) {
      // 1. Bloqueamos el scroll visual en ambos contenedores principales
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      
      // 2. Impedimos cualquier interacción táctil o de mouse con el fondo
      // Esto es lo que realmente mata el scroll en mobile sin position:fixed
      body.style.pointerEvents = "none";
      body.style.touchAction = "none";
    } else {
      // Restauramos todo al cerrar
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.pointerEvents = "";
      body.style.touchAction = "";
    }

    return () => {
      // Limpieza por seguridad si el componente se desmonta
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.pointerEvents = "";
      body.style.touchAction = "";
    };
  }, [selectedImg]);

  const fotos = useMemo((): string[] => {
    let baseFotos: string[] = [];
    try {
      if (images) {
        const urls = typeof images === "string" ? JSON.parse(images) : images;
        if (Array.isArray(urls)) {
          baseFotos = urls.filter((u: string) => u && u !== "");
        }
      }
    } catch (e) {
      if (Array.isArray(images)) baseFotos = images;
    }
    if (baseFotos.length === 0) return [];
    return [...baseFotos, ...baseFotos]; 
  }, [images]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-6 md:py-10 bg-[#0c001a] overflow-hidden font-sans min-h-[90vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* HEADER COMPACTO */}
      <div className="relative z-10 container mx-auto px-6 mb-4">
        <div className="flex items-center gap-2 text-purple-500 mb-0.5">
          <Zap size={14} fill="currentColor" className="animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Live Gallery</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
          The <span className="text-purple-600">Vibe</span>
        </h3>
      </div>

      {/* CARRUSEL REDUCIDO Y TORCIDO */}
      <div className="relative z-30 py-4 md:py-6 overflow-hidden group"> 
        <motion.div 
          className="flex gap-5 md:gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {fotos.map((url, i) => (
            <motion.div 
              key={`${url}-${i}`}
              onClick={() => setSelectedImg(url)}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
              // Efecto torcido responsivo y alterno
              className={`relative flex-shrink-0 w-[170px] md:w-[240px] cursor-pointer transition-all duration-500 z-20 shadow-xl ${
                i % 2 === 0 ? 'rotate-[2deg] md:rotate-[3deg]' : '-rotate-[2deg] md:-rotate-[3deg]'
              }`}
            >
              <div className="p-1 rounded-lg border border-white/10 backdrop-blur-sm bg-black/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <div className="relative aspect-[3/4] rounded-md overflow-hidden PolariodFrame">
                  <Image src={url} alt="Gallery item" fill className="object-cover" sizes="(max-width: 768px) 170px, 240px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
                </div>
              </div>
              {i % 3 === 0 && (
                <div className="absolute -top-3 -right-3 bg-white text-purple-600 p-1.5 rounded-full shadow-lg z-40 animate-pulse">
                  <Sparkles size={14} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* VIDEO SECTION COMPACTA */}
      <div className="mt-6 container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative group p-0.5 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl">
            <div className="absolute -top-3 -left-1 z-20 bg-purple-600 text-white px-3 py-1 font-black italic text-xs -rotate-2 shadow-lg uppercase">
              Director's Cut
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              {videoUrl ? (
                <>
                  <video 
                    ref={videoRef} src={videoUrl} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                    loop muted={isMuted} autoPlay playsInline 
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <button onClick={togglePlay} className="p-2 rounded-full bg-black/60 text-white border border-white/10">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button onClick={toggleMute} className="p-2 rounded-full bg-black/60 text-white border border-white/10">
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-purple-900/50">
                  <Film size={30} />
                  <p className="text-[8px] uppercase tracking-widest mt-1">Tape loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CON BLOQUEO DE SCROLL ROBUSTO */}
      <AnimatePresence>
        {selectedImg && (
          // El modal tiene pointer-events-auto para que ÉL SÍ reciba clicks
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto touch-none overscroll-none">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-[65vh] md:h-[80vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedImg(null)} className="absolute -top-12 right-0 text-white hover:text-purple-400 p-2 transition-colors">
                <X size={32} />
              </button>
              <Image src={selectedImg} alt="Preview" fill className="object-contain" priority />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NeonDivider />
    </section>
  );
}