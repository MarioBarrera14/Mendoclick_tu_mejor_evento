"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Expand, Play, Pause, Maximize } from "lucide-react";

interface FotoCarouselRetroProps {
  images?: string | any[] | null;
  videoUrl?: string | null;
  plan?: string;
}

export function FotoCarouselRetro({ images, videoUrl, plan }: FotoCarouselRetroProps) {
  // --- 1. ESTADOS Y HOOKS ---
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalización del plan
  const currentPlan = plan?.toUpperCase() || "PREMIUM";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloqueo de scroll al abrir modal
  useEffect(() => {
    document.body.style.overflow = selectedImg ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedImg]);

  // Lógica de duplicación de fotos para scroll infinito
  const duplicatedPhotos = useMemo(() => {
    const defaultPhotos = ["/img_boda/gallery-1.webp", "/img_boda/gallery-2.webp", "/img_boda/gallery-4.webp"];
    let base = defaultPhotos;
    
    try {
      if (images) {
        if (Array.isArray(images)) {
          base = images.length > 0 ? images : defaultPhotos;
        } else if (typeof images === 'string' && images.trim() !== "") {
          const urls = JSON.parse(images);
          if (Array.isArray(urls) && urls.length > 0) {
            base = urls.filter((u: string) => u);
          }
        }
      }
    } catch (e) {
      base = defaultPhotos;
    }
    return [...base, ...base]; 
  }, [images]);

  // --- 2. VALIDACIÓN DE RENDERIZADO (EARLY RETURN) ---
  if (!mounted) return null;

  // Si es CLASSIC, no se muestra nada (ni fotos ni video)
  if (currentPlan === "CLASSIC") {
    return null;
  }

  // --- 3. HANDLERS DE VIDEO ---
  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) document.exitFullscreen();
      else containerRef.current.requestFullscreen();
    }
  };

  return (
    <section className="pb-10 bg-white font-sans z-30 pt-24 md:pt-32 overflow-hidden">
      {/* Encabezado */}
      <div className="w-full px-4 mb-2 text-center flex flex-col items-center relative">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-[#33aba1] text-white px-5 py-1 text-[10px] font-black uppercase tracking-[0.4em] mb-2 shadow-[4px_4px_0px_black] z-10"
        >
          Memories
        </motion.div>
        
        <h3 className="text-4xl sm:text-5xl md:text-8xl font-black text-[#a02133] uppercase tracking-[-0.04em] italic mb-6 relative z-10 px-2 leading-[0.9] [text-shadow:3px_3px_0px_#000,8px_8px_0px_rgba(51,171,161,0.25)] [-webkit-text-stroke:1.5px_black]">
          Momentos <br /> 
          <span className="text-[#33aba1]">Inolvidables</span>
        </h3>
      </div>

      {/* Carrusel de Fotos (Solo visible en PREMIUM y DELUXE) */}
      <div className="relative mb-12 z-20 overflow-hidden py-4">
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedPhotos.map((url, index) => (
            <motion.div 
              key={`${url}-${index}`} 
              className="flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-[20vw] cursor-pointer"
              onClick={() => setSelectedImg(url)}
              whileHover={{ scale: 1.05, zIndex: 40 }}
              animate={{ rotate: index % 2 === 0 ? -2 : 2 }}
            >
              <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-square w-full">
                  <Image 
                    src={url} 
                    alt="Gallery" 
                    fill 
                    className="object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Sección de Video (Visible en PREMIUM y DELUXE) */}
      {videoUrl && (currentPlan === "DELUXE" || currentPlan === "PREMIUM") && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto relative group">
            <div 
              ref={containerRef}
              className="relative border-[5px] border-black bg-black overflow-hidden shadow-[8px_8px_0px_0px_#a02133]"
            >
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover opacity-90 cursor-pointer"
                loop muted={isMuted} autoPlay playsInline
                onTimeUpdate={() => setProgress((videoRef.current!.currentTime / videoRef.current!.duration) * 100)}
              />
              
              {/* Controles de Video Estilo Retro */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-[#33aba1]" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="hover:scale-110 transition-transform">
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    <button onClick={toggleMute} className="hover:scale-110 transition-transform">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                  <button onClick={handleFullScreen} className="hover:scale-110 transition-transform">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Imagen Fullscreen */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              className="bg-white p-2 border-4 border-black shadow-[12px_12px_0px_#a02133] max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImg(null)} 
                className="absolute -top-12 right-0 text-white flex items-center gap-1.5 font-black uppercase text-[10px] hover:text-[#33aba1] transition-colors"
              >
                Cerrar <X size={24}/>
              </button>
              <div className="relative w-full h-[70vh]">
                <Image src={selectedImg} alt="Full view" fill className="object-contain" priority />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}