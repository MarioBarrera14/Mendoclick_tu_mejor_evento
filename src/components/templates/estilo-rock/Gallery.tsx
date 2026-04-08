"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, X, Expand } from "lucide-react";

const rockPosterStyle = {
  textShadow: `3px 3px 0px #000, 8px 8px 0px rgba(51, 171, 161, 0.25)`,
  WebkitTextStroke: '1.5px black',
  lineHeight: '0.9', // Aumentado ligeramente para evitar cortes en mobile
};

export function FotoCarouselRetro({ images, videoUrl }: { images?: string | null; videoUrl?: string | null }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if ((v as any).webkitRequestFullscreen) (v as any).webkitRequestFullscreen();
  };

  const duplicatedPhotos = useMemo(() => {
    const defaultPhotos = ["/img_boda/gallery-1.jpg", "/img_boda/gallery-2.jpg", "/img_boda/gallery-4.jpg"];
    let base = defaultPhotos;
    try {
      if (images) {
        const urls = JSON.parse(images);
        base = Array.isArray(urls) ? urls.filter((u: string) => u) : defaultPhotos;
      }
    } catch (e) { base = defaultPhotos; }
    return [...base, ...base, ...base];
  }, [images]);

  return (
    <section className="pb-10 bg-white font-sans z-30 pt-24 md:pt-32">
      
      {/* Header - MOMENTOS INOLVIDABLES REFORMADO PARA CELULAR */}
      <div className="w-full px-4 mb-2 text-center flex flex-col items-center relative">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-[#33aba1] text-white px-5 py-1 text-[10px] font-black uppercase tracking-[0.4em] mb-2 shadow-[4px_4px_0px_black] z-10"
        >
          Memories
        </motion.div>
        
        {/* AJUSTE: text-4xl para mobile y text-6xl+ para desktop */}
        <h3 
          style={rockPosterStyle} 
          className="text-4xl sm:text-5xl md:text-8xl font-black text-[#a02133] uppercase tracking-[-0.04em] italic mb-6 relative z-10 px-2"
        >
          Momentos <br /> 
          <span className="text-[#33aba1]">Inolvidables</span>
        </h3>
      </div>

      {/* CARRUSEL DE FOTOS */}
      <div className="relative mb-6 z-20 overflow-hidden py-4">
        <motion.div
          className="flex gap-4 md:gap-6 px-4 w-max"
          initial={{ x: 0 }}
          animate={{ x: "-33.333%" }} 
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {duplicatedPhotos.map((url, index) => (
            <motion.div 
              key={`${url}-${index}`} 
              className="flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-[15vw] cursor-pointer"
              onClick={() => setSelectedImg(url)}
              whileHover={{ scale: 1.05, zIndex: 40 }}
              style={{ rotate: index % 2 === 0 ? -2 : 2 }}
            >
              <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src={url} 
                  alt="Gallery Moment" 
                  className="w-full aspect-square object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECCIÓN DE VIDEO */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -top-6 -left-5 w-16 md:w-28 z-20 -rotate-12 drop-shadow-xl pointer-events-none">
             <img src="/img-rock/radio.png" alt="Radio" className="w-full h-auto" />
          </div>

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
                      if (isPlaying) videoRef.current?.pause();
                      else videoRef.current?.play();
                      setIsPlaying(!isPlaying);
                    }} 
                    className="bg-[#33aba1] border border-black px-3 py-1 text-white font-black text-[9px] uppercase italic shadow-[2px_2px_0px_black]"
                  >
                    {isPlaying ? "STOP SHOW" : "PLAY SHOW"}
                  </button>
                </div>
              </>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center font-black text-white/10 text-2xl italic tracking-tighter uppercase">No Signal</div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL RESPONSIVE */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.85, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white p-2 border-4 border-black shadow-[12px_12px_0px_#a02133] max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-1.5 font-black uppercase tracking-widest text-[10px]"
              >
                Close <X size={24}/>
              </button>
              <img 
                src={selectedImg} 
                className="max-h-[70vh] w-full object-contain border border-black" 
                alt="Selected" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}