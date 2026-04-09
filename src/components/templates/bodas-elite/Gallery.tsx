"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pause, 
  Play,
  Volume2, 
  VolumeX, 
  X,
  Maximize2
} from "lucide-react";

export function PhotoGallerySection() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const fotos: string[] = [
    "/img_boda/gallery-1.jpg", "/img_boda/gallery-2.jpg", "/img_boda/gallery-3.jpg",
    "/img_boda/gallery-4.jpg", "/img_boda/gallery-5.jpg", "/img_boda/gallery-6.jpg"
  ];
  
  const allPhotos = [...fotos, ...fotos];
  const videoUrl = "/movie/Video_Generado_Con_Movimiento_Natural.mp4";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (selectedImg || isVideoModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedImg, isVideoModalOpen]);

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-24 md:py-40 overflow-hidden text-white font-sans">
      
      {/* --- FONDO --- */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/img_boda/galeria.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[2px] pointer-events-none" />

      {/* --- ENCABEZADO --- */}
      <div className="container mx-auto px-6 mb-24 text-center flex flex-col items-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.8em] text-[#b5a47a] uppercase font-bold mb-4"
        >
          The Gallery
        </motion.span>
        <h3 className="text-4xl md:text-7xl font-serif italic text-white mb-6 tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
          Momentos Inolvidables
        </h3>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#b5a47a]/40 to-transparent" />
      </div>

      {/* --- CARRUSEL --- */}
      <div className="relative mb-32 z-10 [perspective:3000px]">
        <div className="flex overflow-hidden [transform:rotateX(1.5deg)] py-10">
          <div className="flex gap-12 md:gap-20 pr-10 animate-marquee-infinite hover:[animation-play-state:paused] items-center">
            {allPhotos.map((url, index) => (
              <motion.div 
                key={`${url}-${index}`} 
                onClick={() => setSelectedImg(url)}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative flex-shrink-0 cursor-pointer group px-4"
              >
                {/* 1. Paspartú con esquinas redondeadas */}
                <div className="relative bg-[#fcfaf2] p-4 md:p-5 rounded-2xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] border border-white/10 transition-all duration-500">
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] z-10 rounded-2xl pointer-events-none" />
                  
                  {/* 2. Borde Metálico Redondeado */}
                  <div className="absolute inset-6 md:inset-7 border border-black/60 z-10 rounded-xl pointer-events-none" />
                  
                  {/* 3. Marco Dorado Redondeado */}
                  <div className="relative w-[65vw] md:w-[20vw] aspect-[3/4] overflow-hidden rounded-lg border-[5px] md:border-[8px] border-[#b5a47a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-20">
                    <Image
                      src={url} 
                      alt={`Galería ${index}`} 
                      fill 
                      sizes="(max-width: 768px) 65vw, 20vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] z-30 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE VIDEO --- */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Marco Exterior Redondeado */}
          <div className="relative p-3 bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] rounded-3xl border-b-4 border-r-4 border-gray-300">
            <div className="relative p-2 md:p-4 bg-[#fcfaf2] border border-black/10 rounded-2xl">
                <div className="relative aspect-video overflow-hidden bg-black border-[6px] md:border-[10px] border-[#b5a47a] rounded-xl shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] group">
                  <video
                    ref={videoRef} 
                    src={videoUrl}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-1000 group-hover:scale-[1.02]" 
                    loop muted={isMuted} autoPlay playsInline
                    onClick={() => setIsVideoModalOpen(true)}
                  />
                  
                  <div className="absolute bottom-6 right-6 flex items-center gap-5 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:text-[#b5a47a]">
                      {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white hover:text-[#b5a47a]">
                      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(true); }} className="text-white hover:text-[#b5a47a]">
                      <Maximize2 size={22} />
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE IMAGEN */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
             <button className="absolute top-8 right-8 text-white"><X size={40} /></button>
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full h-[80vh]">
               <Image src={selectedImg} alt="Full" fill className="object-contain" />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE VIDEO PANTALLA COMPLETA */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-8 right-8 text-white z-[260] hover:text-[#b5a47a] transition-colors"
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <video 
                ref={modalVideoRef}
                src={videoUrl}
                className="max-w-full max-h-full"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}