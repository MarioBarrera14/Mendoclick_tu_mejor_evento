"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface PhotoGalleryProps {
  config: {
    carruselImages?: string | null;
    videoUrl?: string | null;
  };
  plan?: string; // Añadimos el plan a la interfaz
}

export function PhotoGallerySection({ config, plan }: PhotoGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [fotos, setFotos] = useState<string[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. VALIDACIÓN DE PLAN (EARLY RETURN) ---
  const currentPlan = plan?.toUpperCase();

  useEffect(() => {
    setMounted(true);
    if (config.carruselImages) {
      try {
        const parsed = JSON.parse(config.carruselImages);
        setFotos(parsed.length > 0 ? parsed : []);
      } catch (e) {
        setFotos([]);
      }
    }
  }, [config.carruselImages]);

  // Bloqueo de scroll
  useEffect(() => {
    const isAnyModalOpen = !!selectedImg || isVideoModalOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "";
  }, [selectedImg, isVideoModalOpen]);

  if (!mounted) return null;

  // Si es CLASSIC o no hay plan, no renderizamos nada
  if (!currentPlan || currentPlan === "CLASSIC") {
    return null;
  }

  const videoUrl = config.videoUrl;
  const allPhotos = [...fotos, ...fotos, ...fotos];

  // Handlers de video
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) document.exitFullscreen();
      else containerRef.current.requestFullscreen();
    }
  };

  return (
    <section className="relative py-12 md:py-16 overflow-hidden text-white font-sans">
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center bg-[url('/img_boda/galeria.webp')]" />
      <div className="absolute inset-0 z-0 bg-black/75 backdrop-blur-sm" />

      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
        <h3 className="font-script text-5xl md:text-7xl text-white mb-2 drop-shadow-lg">
          Momentos Inolvidables
        </h3>
        <div className="w-12 h-px bg-[#b5a47a]/60 mx-auto" />
      </div>

      {/* Carrusel de Fotos */}
      {fotos.length > 0 && (
        <div className="relative mb-16 z-10 w-full overflow-visible">
          <motion.div 
            className="flex gap-4 md:gap-6 w-max px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }} 
          >
            {allPhotos.map((url, index) => (
              <motion.div 
                key={`${url}-${index}`} 
                onClick={() => setSelectedImg(url)}
                className="relative flex-shrink-0 cursor-pointer p-1 bg-[#fcfaf2] rounded-md shadow-xl"
                whileHover={{ scale: 1.1, zIndex: 50 }}
              >
                <div className="relative w-[40vw] md:w-[15vw] aspect-[3/4] overflow-hidden rounded-sm border-2 border-[#b5a47a]">
                  <Image src={url} alt="Gallery" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Condicional para el Video: Solo se muestra en DELUXE */}
      {videoUrl && currentPlan === "DELUXE" && (
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto p-1.5 bg-white/10 rounded-xl border border-white/20">
            <div 
              ref={containerRef}
              className="relative aspect-video overflow-hidden bg-black rounded-lg group border border-[#b5a47a]/30"
            >
              <video
                ref={videoRef} 
                src={videoUrl}
                className="w-full h-full object-cover cursor-pointer" 
                loop muted={isMuted} autoPlay playsInline
                onTimeUpdate={() => setProgress((videoRef.current!.currentTime / videoRef.current!.duration) * 100)}
                onClick={() => setIsVideoModalOpen(true)}
              />

              {/* Controles */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-[#b5a47a]" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay}>{isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>
                    <button onClick={toggleMute}>{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
                  </div>
                  <button onClick={handleFullScreen}><Maximize size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modales (AnimatePresence) igual que antes... */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white"><X size={35} /></button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full h-[80vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image src={selectedImg} alt="Full" fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}

        {isVideoModalOpen && videoUrl && currentPlan === "DELUXE" && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white"><X size={35} /></button>
            <motion.div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <video src={videoUrl} className="w-full max-h-[85vh] rounded-lg shadow-2xl" controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}