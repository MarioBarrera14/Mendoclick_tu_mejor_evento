"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Film, Zap, X, Sparkles, 
  Play, Pause, Maximize // Nuevos iconos
} from "lucide-react";
import Image from "next/image";

interface FotoCarouselProps {
  images?: string | string[] | null;
  videoUrl?: string | null;
}

const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-1 z-10">
    <div className="absolute inset-0 bg-purple-500 blur-sm opacity-80" />
    <div className="absolute inset-0 bg-white opacity-90" />
    <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // Estado para play/pause
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = selectedImg ? "hidden" : "unset";
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
    return [...baseFotos, ...baseFotos, ...baseFotos];
  }, [images]);

  // --- FUNCIONES DE CONTROL ---
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <section className="relative py-16 bg-[#0c001a] overflow-hidden font-sans">
      
      {/* Fondo Decorativo Grilla */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#9333ea_1px,transparent_1px),linear-gradient(90deg,#9333ea_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-purple-500 mb-1">
          <Zap size={16} fill="currentColor" className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Gallery</span>
        </div>
        <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
          The <span className="text-purple-600">Vibe</span>
        </h3>
      </div>

      {/* --- CARRUSEL --- */}
      <div className="relative z-30 py-10"> 
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex gap-6 animate-marquee-infinite group-hover:[animation-play-state:paused] py-2">
            {fotos.map((url, i) => (
              <motion.div 
                key={`${url}-${i}`}
                onClick={() => setSelectedImg(url)}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                className={`relative flex-shrink-0 w-[240px] md:w-[300px] cursor-pointer transition-all duration-500 z-20 ${
                  i % 2 === 0 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                <div className={`p-1.5 rounded-xl border-2 shadow-xl backdrop-blur-sm bg-black/20 ${
                  i % 2 === 0 ? 'border-purple-500/40' : 'border-white/10'
                }`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image 
                      src={url} 
                      alt="Gallery" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
                  </div>
                </div>
                {i % 3 === 0 && (
                  <div className="absolute -top-3 -right-3 bg-white text-purple-600 p-1.5 rounded-full shadow-lg z-40">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- VIDEO --- */}
      <div className="mt-8 container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="relative group p-1 bg-gradient-to-br from-purple-500/10 to-transparent rounded-[2rem]">
             <div className="absolute -top-4 -left-2 z-20 bg-purple-600 text-white px-4 py-1.5 font-black italic text-base -rotate-3 shadow-xl uppercase tracking-tighter">
              Director's Cut
            </div>
            <div className="relative aspect-video rounded-[1.8rem] overflow-hidden border-2 border-white/5 bg-black shadow-2xl">
              {videoUrl ? (
                <>
                  <video 
                    ref={videoRef} src={videoUrl} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                    loop muted={isMuted} autoPlay playsInline 
                  />
                  
                  {/* BOTONES DE CONTROL */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <button 
                        onClick={togglePlay} 
                        className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                        title={isPlaying ? "Pausar" : "Reproducir"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      
                      <button 
                        onClick={toggleMute} 
                        className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                        title={isMuted ? "Activar Sonido" : "Silenciar"}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>

                    <button 
                      onClick={handleFullscreen} 
                      className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                      title="Pantalla completa"
                    >
                      <Maximize size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-purple-900">
                  <Film size={40} className="animate-pulse" />
                  <p className="font-mono text-[9px] uppercase tracking-widest mt-2">Tape loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FULLSCREEN FOTO */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} 
              className="relative w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImg} alt="Preview" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <NeonDivider />
    </section>
  );
}