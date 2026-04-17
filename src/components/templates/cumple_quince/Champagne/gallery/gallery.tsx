"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Importante para Next.js
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize,
  X 
} from "lucide-react";

interface FotoCarouselProps {
  images?: string | any[] | null;
  videoUrl?: string | null;
}

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedImg) {
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
  }, [selectedImg]);

  const fotos = useMemo(() => {
    const defaultPhotos = ["/img_demo/9.webp", "/img_demo/10.webp", "/img_demo/11.webp", "/img_demo/12.webp"];
    try {
      if (images) {
        if (Array.isArray(images)) return images.length > 0 ? images : defaultPhotos;
        if (typeof images === 'string' && images.trim() !== "") {
          const validUrls = JSON.parse(images).filter((u: any) => u);
          if (validUrls.length > 0) return validUrls;
        }
      }
    } catch (e) {
      console.error("Error en Carrusel Golden:", e);
    }
    return defaultPhotos;
  }, [images]);

  const nextStep = () => setIndex((prev) => (prev >= fotos.length - 1 ? 0 : prev + 1));
  const prevStep = () => setIndex((prev) => (prev <= 0 ? fotos.length - 1 : prev - 1));

  const currentView = [
    fotos[index % fotos.length],
    fotos[(index + 1) % fotos.length],
    fotos[(index + 2) % fotos.length]
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
      else if ((videoRef.current as any).webkitRequestFullscreen) (videoRef.current as any).webkitRequestFullscreen();
    }
  };

  return (
    <section className="relative py-12 bg-white overflow-hidden font-sans">
      
      {/* CABECERA */}
      <div className="container mx-auto px-6 text-center mb-8">
        <motion.h3 
          className="font-script text-4xl md:text-5xl text-[#b4a178] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Mi Historia
        </motion.h3>
        <motion.p 
          className="max-w-2xl mx-auto text-gray-500 text-[11px] md:text-[13px] leading-relaxed font-light px-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Hay momentos en la vida que son especiales, pero lo son aún más cuando se comparten con las personas que llenan el corazón. ¡Te espero para celebrar mis 15 años!
        </motion.p>
      </div>

      {/* CARRUSEL CONTAINER */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-12">
        
        {/* BOTONES DE NAVEGACIÓN LATERALES */}
        <button 
          onClick={prevStep}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-gray-800 hover:bg-[#b4a178] hover:text-white transition-all border border-[#b4a178]/20"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={nextStep}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-gray-800 hover:bg-[#b4a178] hover:text-white transition-all border border-[#b4a178]/20"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>

        {/* FOTOS */}
        <div 
          className="flex justify-center gap-1.5 md:gap-3"
          style={{ transform: "skewY(-2deg)" }} 
        >
          <AnimatePresence mode="popLayout">
            {currentView.map((url, i) => (
              <motion.div
                key={`${url}-${i}`}
                className="relative w-1/3 aspect-[3/4] md:aspect-[4/3] overflow-hidden shadow-md bg-neutral-100 cursor-zoom-in group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImg(url)}
              >
                <Image 
                  src={url} 
                  fill
                  sizes="(max-width: 768px) 33vw, 30vw"
                  className="object-cover transform skew-y-[2deg] scale-110 group-hover:scale-115 transition-transform duration-500" 
                  alt={`Foto galería ${i}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* VIDEO */}
      {videoUrl && (
        <div className="mt-16 container mx-auto px-6 max-w-2xl">
          <div 
            className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg border-[3px] border-white group"
            style={{ transform: "skewY(-2deg)" }}
          >
            <video 
              ref={videoRef}
              src={videoUrl} 
              autoPlay muted={isMuted} loop playsInline 
              className="w-full h-full object-cover transform skew-y-[2deg] scale-110"
            />
            
            <div className="absolute inset-0 z-30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 via-transparent to-transparent transform skew-y-[2deg]">
              <div className="flex items-center justify-between text-white">
                <div className="flex gap-3">
                  <button onClick={togglePlay} className="hover:text-[#b4a178] transition-colors">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#b4a178] transition-colors">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
                <button onClick={toggleFullscreen} className="hover:text-[#b4a178] transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out touch-none"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-[80vh] z-[101] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-14 right-0 text-white hover:text-[#b4a178] transition-colors p-2 z-[102]"
              >
                <X size={40} />
              </button>
              
              <div className="relative w-full h-full">
                <Image 
                  src={selectedImg} 
                  fill
                  className="object-contain" 
                  alt="Imagen ampliada"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}