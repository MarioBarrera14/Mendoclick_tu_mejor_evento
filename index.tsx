"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, X, Expand } from "lucide-react";

// Los espacios en valores arbitrarios de Tailwind se reemplazan por guiones bajos _
const borderRadiusForma = "rounded-[65%_35%_72%_28%_/_30%_70%_30%_70%]";

const RetroFrame = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative p-2 md:p-3 ${className}`}>
    {/* Borde punteado */}
    <div 
      className={`absolute inset-0 border-2 border-dashed border-[#33aba1]/30 pointer-events-none z-10 ${borderRadiusForma}`} 
    />
    {/* Contenedor de imagen */}
    <div className={`relative overflow-hidden bg-white shadow-xl ${borderRadiusForma}`}>
      {children}
    </div>
  </div>
);

export function FotoCarouselRetro({ images, videoUrl }: { images?: string | null; videoUrl?: string | null }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // Agregado para evitar error
  const videoRef = useRef<HTMLVideoElement>(null);

  const fotos = (() => {
    const defaultPhotos = ["/img_boda/gallery-1.webp", "/img_boda/gallery-2.webp", "/img_boda/gallery-4.webp"];
    try {
      if (images) {
        const urls = JSON.parse(images);
        return Array.isArray(urls) ? urls.filter((u: string) => u) : defaultPhotos;
      }
    } catch (e) { return defaultPhotos; }
    return defaultPhotos;
  })();

  const duplicatedPhotos = [...fotos, ...fotos, ...fotos];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
    }
  };

  return (
    <section className="relative pb-24 bg-white font-serif z-10 -mt-[2px] ring-1 ring-white overflow-hidden">
      {/* Adornos de fondo */}
      <img src="/img-rock/adorno2.webp" alt="adorno" className="absolute top-4 left-4 w-24 md:w-40 z-0 opacity-50" />
      <img src="/img-rock/adorno2.webp" alt="adorno" className="absolute bottom-4 right-4 w-24 md:w-40 z-0 opacity-50" />

      {/* Cabecera */}
      <div className="container mx-auto px-6 mb-12 text-center flex flex-col items-center relative pt-24 md:pt-40 z-20">
        <motion.span className="text-[10px] md:text-xs tracking-[0.4em] text-[#33aba1] uppercase font-bold mb-2">
          Memories
        </motion.span>
        <h3 className="text-4xl md:text-8xl font-bold text-[#3D3D3D] mb-4 tracking-tighter italic">
          Keep on <span className="text-[#33aba1] not-italic">Rockin&apos;</span>
        </h3>
        <div className="h-1 w-16 md:w-24 bg-[#33aba1] rounded-full opacity-60" />
      </div>

      {/* CARRUSEL: overflow-visible para que las fotos rotadas no se corten */}
      <div className="relative mb-16 md:mb-24 z-30 overflow-visible py-10">
        <motion.div
          className="flex gap-4 md:gap-8 px-4"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedPhotos.map((url, index) => (
            <motion.div 
              key={index} 
              className={`flex-shrink-0 w-[65vw] md:w-[22vw] cursor-pointer transition-transform duration-300 ${
                index % 2 === 0 ? "-rotate-2" : "rotate-2"
              }`}
              onClick={() => setSelectedImg(url)}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
            >
              <RetroFrame>
                <img src={url} alt="Gallery" className="w-full aspect-[4/5] object-cover" />
              </RetroFrame>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* VIDEO */}
      {/* VIDEO */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto relative">
              <motion.div className="absolute -bottom-6 -left-4 w-[120px] md:w-[240px] z-[25] pointer-events-none rotate-[-10deg]">
                <img src="/img-rock/guitarra-rockabilly.webp" alt="Guitar" className="w-full h-auto" />
              </motion.div>
    <RetroFrame className="aspect-video">
                {videoUrl ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-full object-cover cursor-pointer"
                      loop
                      muted={isMuted}
                      autoPlay
                      playsInline
                      onClick={() => setIsVideoModalOpen(true)}
                    />
                    {/* Controles en Rojo con botón de Fullscreen */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30 bg-[#33aba1]/50 text-white p-2 px-6 rounded-full shadow-xl">
                      {/* Play/Pause */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        className="hover:scale-110 transition-transform"
                      >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                      </button>
    
                      {/* Mute/Unmute */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                        className="hover:scale-110 transition-transform"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
    
                      {/* Pantalla Completa */}
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          videoRef.current?.requestFullscreen(); 
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Expand size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 uppercase text-[10px] font-bold opacity-50">
                    Video próximamente
                  </div>
                )}
              </RetroFrame>
            </div>
          </div>

      {/* MODAL IMAGEN */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <div className="bg-white p-2 pb-12 border-[8px] border-white max-w-2xl relative shadow-2xl">
               <button className="absolute top-2 right-2 text-black"><X /></button>
              <img src={selectedImg} alt="Preview" className="max-h-[70vh] w-auto object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}