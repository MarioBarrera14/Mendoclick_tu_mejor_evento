"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Expand } from "lucide-react";

interface FotoCarouselRetroProps {
  images?: string | any[] | null;
  videoUrl?: string | null;
}

export function FotoCarouselRetro({ images, videoUrl }: FotoCarouselRetroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Bloqueo de scroll robusto (HTML + BODY)
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

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

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
      console.error("Error en FotoCarouselRetro: JSON inválido", e);
      base = defaultPhotos;
    }
    
    return [...base, ...base]; 
  }, [images]);

  return (
    <section className="pb-10 bg-white font-sans z-30 pt-24 md:pt-32 overflow-hidden">
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

      {/* Carrusel Infinito */}
      <div className="relative mb-12 z-20 overflow-hidden py-4">
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
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

      {/* Video Player Section */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto relative group">
          <div className="relative border-[5px] border-black bg-black overflow-hidden shadow-[8px_8px_0px_0px_#a02133]">
            {videoUrl ? (
              <>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover opacity-90"
                  loop muted={isMuted} autoPlay playsInline
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-30">
                  <div className="flex gap-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="bg-white border border-black p-1 shadow-[1px_1px_0px_black]">
                      {isMuted ? <VolumeX size={14} className="text-black" /> : <Volume2 size={14} className="text-black" />}
                    </button>
                    <button onClick={toggleFullscreen} className="bg-white border border-black p-1 shadow-[1px_1px_0px_black]">
                      <Expand size={14} className="text-black" />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
                      setIsPlaying(!isPlaying);
                    }} 
                    className="bg-[#33aba1] border border-black px-3 py-1 text-white font-black text-[9px] uppercase italic shadow-[2px_2px_0px_black]"
                  >
                    {isPlaying ? "STOP SHOW" : "PLAY SHOW"}
                  </button>
                </div>
              </>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center font-black text-white/10 text-2xl uppercase">No Signal</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md touch-none"
          >
            <motion.div 
              initial={{ scale: 0.85 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.85 }}
              className="bg-white p-2 border-4 border-black shadow-[12px_12px_0px_#a02133] max-w-lg w-full relative touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImg(null)} 
                className="absolute -top-12 right-0 text-white flex items-center gap-1.5 font-black uppercase text-[10px] hover:text-[#33aba1] transition-colors"
              >
                Cerrar <X size={24}/>
              </button>
              <div className="relative w-full h-[70vh]">
                <Image 
                  src={selectedImg} 
                  alt="Full view" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}