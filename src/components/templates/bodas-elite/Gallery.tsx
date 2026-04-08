"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pause, 
  Play,
  Volume2, 
  VolumeX, 
  X,
  Expand,
  Clapperboard
} from "lucide-react";

// Marco minimalista para el video
const ElegantFrame = () => (
  <svg
    viewBox="0 0 800 450"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-30"
    preserveAspectRatio="none"
  >
    <rect x="20" y="20" width="760" height="410" rx="4" stroke="white" strokeWidth="0.5" strokeDasharray="6 10" />
    <circle cx="30" cy="30" r="2" fill="white" />
    <circle cx="770" cy="30" r="2" fill="white" />
    <circle cx="30" cy="420" r="2" fill="white" />
    <circle cx="770" cy="420" r="2" fill="white" />
  </svg>
);

export function PhotoGallerySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const fotos = [
    "/img_boda/gallery-1.jpg", "/img_boda/gallery-2.jpg", "/img_boda/gallery-4.jpg",
    "/img_boda/gallery-5.jpg", "/img_boda/gallery-6.jpg", "/img_boda/gallery-3.jpg"
  ];
  
  const videoUrl = "/movie/Video_Generado_Con_Movimiento_Natural.mp4";
  const duplicatedPhotos = [...fotos, ...fotos, ...fotos];

  useEffect(() => { setMounted(true); }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-32 md:py-48 bg-black overflow-visible mb-[-1px]">
      
      {/* --- DIVISOR SUPERIOR (Líneas cortadas) --- */}
      <div className="absolute -top-[1px] left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]">
          <path d="M0,0 H1200 V60 L1150,45 L1100,65 L1050,50 L1000,70 L950,55 L900,75 L850,60 L800,80 L750,65 L700,85 L650,70 L600,90 L550,75 L500,95 L450,80 L400,100 L350,85 L300,105 L250,90 L200,110 L150,95 L100,115 L50,100 L0,120 Z" fill="#fafafa" />
        </svg>
      </div>

      {/* --- ENCABEZADO --- */}
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center relative z-10 pt-10">
        <motion.span className="text-[10px] tracking-[0.6em] text-neutral-500 uppercase font-black mb-4">
          Nuestra Historia
        </motion.span>
        <h3 className="text-4xl md:text-7xl font-serif italic text-white mb-6">
          Momentos Inolvidables
        </h3>
        <div className="w-16 h-[1px] bg-white/20" />
      </div>

      {/* --- 1. CARRUSEL INFINITO --- */}
      <div className="relative mb-32 group z-10 overflow-visible">
        <motion.div className="flex cursor-default">
          <motion.div
            className="flex gap-4 md:gap-8 px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedPhotos.map((url, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedImg(url)}
                className="flex-shrink-0 w-[60vw] md:w-[18vw] aspect-[4/5] bg-neutral-900 p-2 shadow-2xl border border-white/10 rounded-[2rem] cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Galería ${index}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-[1.5rem]"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* --- 2. SECCIÓN DE VIDEO --- */}
      <div className="container mx-auto px-6 relative z-10 pb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video overflow-hidden rounded-[3rem] bg-neutral-900 border border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.05)] group">
            <ElegantFrame />
            
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 cursor-pointer" 
              loop muted={isMuted} autoPlay playsInline
              onClick={() => setIsVideoModalOpen(true)}
            />

            {/* Controles Flotantes */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-5 z-30 bg-white/10 backdrop-blur-xl p-3 px-8 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:scale-110 transition-transform">
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <div className="w-[1px] h-4 bg-white/20" />
              <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white hover:scale-110 transition-transform">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div className="w-[1px] h-4 bg-white/20" />
              <button onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(true); }} className="text-white hover:scale-110 transition-transform">
                <Expand size={20} />
              </button>
            </div>

            {/* Overlay Play Central */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none group-hover:bg-white/5 transition-colors">
               <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={32} className="text-white fill-white ml-1" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- DIVISOR INFERIOR --- */}
      <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px] rotate-180">
          <path d="M0,0 H1200 V60 L1150,45 L1100,65 L1050,50 L1000,70 L950,55 L900,75 L850,60 L800,80 L750,65 L700,85 L650,70 L600,90 L550,75 L500,95 L450,80 L400,100 L350,85 L300,105 L250,90 L200,110 L150,95 L100,115 L50,100 L0,120 Z" fill="#fafafa" />
        </svg>
      </div>

      {/* MODALES */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 cursor-zoom-out"
          >
            <X className="absolute top-8 right-8 text-white/40 w-10 h-10 hover:text-white transition-colors" />
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImg}
              className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}

        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
          >
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-white z-[140]">
              <X size={44} strokeWidth={1} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <video src={videoUrl} className="w-full h-full" controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}