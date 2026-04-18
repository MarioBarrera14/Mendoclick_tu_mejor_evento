"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Pause, 
  Play,
  Volume2, 
  VolumeX, 
  Clapperboard,
  X,
  Expand
} from "lucide-react";

export function FotoCarousel({ images, videoUrl }: { images?: string | null; videoUrl?: string | null }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const graffitiColor = "#4B664B"; 

  // --- SOLUCIÓN ROBUSTA PARA BLOQUEAR EL SCROLL (HTML + BODY) ---
  useEffect(() => {
    if (selectedImg || isVideoModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [selectedImg, isVideoModalOpen]);

  const fotos = useMemo(() => {
    const defaultPhotos = [
      "/img_boda/gallery-1.webp", "/img_boda/gallery-2.webp", "/img_boda/gallery-4.webp",
      "/img_boda/gallery-5.webp", "/img_boda/gallery-6.webp", "/img_boda/gallery-3.webp"
    ];
    try {
      if (images) {
        const urls = JSON.parse(images);
        return Array.isArray(urls) && urls.length > 0 ? urls.filter((u: string) => u) : defaultPhotos;
      }
    } catch (e) { return defaultPhotos; }
    return defaultPhotos;
  }, [images]);

  const duplicatedPhotos = [...fotos, ...fotos, ...fotos];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-12 bg-gradient-to-b from-[#649a8d] via-[#a8c9b3] to-[#f7e6c4] overflow-hidden mb-[-1px] font-['Permanent_Marker',_cursive]">
      
      {/* ENCABEZADO */}
      <div className="container mx-auto px-6 mb-8 text-center flex flex-col items-center relative z-10">
        <motion.span className="text-lg text-black mb-2">Nuestra Historia</motion.span>
        <h3 className="text-4xl md:text-6xl text-black mb-4 tracking-tight">Momentos Inolvidables</h3>
        <div className="h-[1px] w-24 bg-black opacity-20" />
      </div>

      {/* CARRUSEL */}
      <div className="relative mb-16 z-10">
        <div className="flex overflow-visible">
          <motion.div
            className="flex gap-4 px-2"
            animate={{ x: [0, "-33.33%"] }} 
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedPhotos.map((url, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, zIndex: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedImg(url)}
                className="relative flex-shrink-0 w-[45vw] md:w-[14vw] aspect-[4/5] p-2 shadow-lg rounded-2xl cursor-pointer bg-white
                           before:absolute before:inset-0 before:p-[3px] before:rounded-2xl before:bg-[conic-gradient(from_0deg,#ffb3b3_0%,#ffe0b3_10%,#eeffb3_30%,#b3ffb3_50%,#b3e0ff_70%,#d1b3ff_85%,#ffb3b3_100%)]
                           before:[mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                           before:[mask-composite:exclude] before:opacity-90"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg z-10">
                  <Image src={url} alt={`Galería ${index}`} fill className="object-cover" sizes="(max-width: 768px) 45vw, 14vw" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* VIDEO */}
      <div className="container mx-auto px-6 relative z-10 pb-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-3xl mx-auto">
          <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-white shadow-xl group border border-[#94A994]/20">
            <div 
              className="absolute top-0 left-0 w-full h-16 z-20 opacity-80 pointer-events-none [mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [mask-size:100%_100%] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.webp)] [-webkit-mask-size:100%_100%]"
              style={{ backgroundColor: graffitiColor }}
            />
            {videoUrl ? (
              <div className="relative w-full h-full">
                <video ref={videoRef} src={videoUrl} className="w-full h-full object-cover cursor-pointer" loop muted={isMuted} autoPlay playsInline onClick={() => setIsVideoModalOpen(true)} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 bg-white/90 backdrop-blur-sm p-2 px-4 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-[#4B664B]">{isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>
                  <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-[#4B664B]">{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
                  <button onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(true); }} className="text-[#4B664B]"><Expand size={16} /></button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#94A994] bg-[#FDFDFD]">
                 <Clapperboard size={32} className="opacity-30 mb-2" />
                 <p className="text-sm text-black">Video próximamente</p>
              </div>
            )}
            <div 
              className="absolute bottom-0 left-0 w-full h-14 z-20 opacity-80 pointer-events-none [mask-image:url(/images/img-grafitis/graffiti-separador-1a.webp)] [mask-size:100%_100%] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-1a.webp)] [-webkit-mask-size:100%_100%]"
              style={{ backgroundColor: graffitiColor }}
            />
          </div>
        </motion.div>
      </div>

      {/* MODALES */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm touch-none"
            />
            <X className="absolute top-6 right-6 text-white/70 w-8 h-8 cursor-pointer z-[110]" onClick={() => setSelectedImg(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-[85vh] z-10 touch-auto"
            >
              <Image src={selectedImg} alt="Imagen seleccionada" fill className="object-contain rounded-lg" />
            </motion.div>
          </div>
        )}

        {isVideoModalOpen && videoUrl && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md touch-none"
            />
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white z-[120]">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl z-10 touch-auto"
            >
              <video src={videoUrl} className="w-full h-full" controls autoPlay />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}