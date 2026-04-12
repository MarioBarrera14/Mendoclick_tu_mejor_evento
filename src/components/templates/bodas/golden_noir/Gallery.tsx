"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// 1. Definimos la interface para recibir la config del evento
interface PhotoGalleryProps {
  config: {
    carruselImages?: string | null; // El JSON de la DB
    videoUrl?: string | null;
  };
}

export function PhotoGallerySection({ config }: PhotoGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // 2. PARSEAMOS LAS IMÁGENES: De String JSON a Array real
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    if (config.carruselImages) {
      try {
        const parsed = JSON.parse(config.carruselImages);
        // Si no hay fotos, usamos unas por defecto para que no quede vacío
        setFotos(parsed.length > 0 ? parsed : ["/img_boda/gallery-1.jpg", "/img_boda/gallery-2.jpg"]);
      } catch (e) {
        setFotos([]);
      }
    }
  }, [config.carruselImages]);

  // Duplicamos para el efecto infinito
  const allPhotos = [...fotos, ...fotos, ...fotos];
  const videoUrl = config.videoUrl || "/movie/Video_Generado_Con_Movimiento_Natural.mp4";

  useEffect(() => {
    if (selectedImg || isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImg, isVideoModalOpen]);

  if (!mounted) return null;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden text-white font-sans">
      
      {/* Fondo con Overlay */}
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center bg-[url('/img_boda/galeria.jpg')]" />
      <div className="absolute inset-0 z-0 bg-black/75 backdrop-blur-sm" />

      {/* Título */}
      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
        <h3 className="text-3xl md:text-5xl font-serif italic text-white mb-2 drop-shadow-lg">Momentos Inolvidables</h3>
        <div className="w-12 h-px bg-[#b5a47a]/60 mx-auto" />
      </div>

      {/* CARRUSEL INFINITO (Solo renderiza si hay fotos) */}
      {fotos.length > 0 && (
        <div className="relative mb-16 z-10 w-full overflow-visible">
          <motion.div 
            className="flex gap-4 md:gap-6 w-max px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ 
              ease: "linear", 
              duration: 35, 
              repeat: Infinity 
            }}
            whileHover={{ animationPlayState: "paused" }} 
          >
            {allPhotos.map((url, index) => (
              <motion.div 
                key={`${url}-${index}`} 
                onClick={() => setSelectedImg(url)}
                className="relative flex-shrink-0 cursor-pointer p-1 bg-[#fcfaf2] rounded-md shadow-xl"
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative w-[40vw] md:w-[15vw] aspect-[3/4] overflow-hidden rounded-sm border-2 border-[#b5a47a]">
                  <Image 
                    src={url} 
                    alt="Gallery" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* VIDEO CENTRAL (Solo si existe URL) */}
      {videoUrl && (
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto p-1.5 bg-white/10 rounded-xl border border-white/20">
            <div className="relative aspect-video overflow-hidden bg-black rounded-lg group border border-[#b5a47a]/30">
              <video
                ref={videoRef} 
                src={videoUrl}
                className="w-full h-full object-cover cursor-pointer" 
                loop 
                muted 
                autoPlay 
                playsInline
                onClick={() => setIsVideoModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL IMAGEN */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"><X size={35} /></button>
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="relative w-full h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImg} alt="Full" fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL VIDEO */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4"
          >
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-5 right-5 text-white/50 hover:text-white"><X size={35} /></button>
            <video src={videoUrl} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" controls autoPlay />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}