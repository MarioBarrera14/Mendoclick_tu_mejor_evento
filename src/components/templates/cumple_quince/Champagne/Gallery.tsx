"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FotoCarouselProps {
  images?: string | null;
  videoUrl?: string | null;
}

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const [index, setIndex] = useState(0);

  const fotos = (() => {
    try {
      if (images) {
        const validUrls = JSON.parse(images).filter((u: any) => u);
        if (validUrls.length > 0) return validUrls;
      }
    } catch (e) {}
    return ["/img_demo/9.webp", "/img_demo/10.webp", "/img_demo/11.webp", "/img_demo/12.webp"];
  })();

  const nextStep = () => setIndex((prev) => (prev >= fotos.length - 1 ? 0 : prev + 1));
  const prevStep = () => setIndex((prev) => (prev <= 0 ? fotos.length - 1 : prev - 1));

  // Vista de 3 fotos
  const currentView = [
    fotos[index % fotos.length],
    fotos[(index + 1) % fotos.length],
    fotos[(index + 2) % fotos.length]
  ];

  return (
    <section className="relative py-12 bg-white overflow-hidden">
      
      {/* CABECERA: Mi Historia (Más pequeña y compacta) */}
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

      {/* CARRUSEL: Altura reducida y Skew sutil */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div 
          className="flex justify-center gap-1.5 md:gap-3"
          style={{ transform: "skewY(-2deg)" }} 
        >
          <AnimatePresence mode="popLayout">
            {currentView.map((url, i) => (
              <motion.div
                key={`${url}-${i}`}
                className="relative w-1/3 aspect-[3/4] md:aspect-[4/3] overflow-hidden shadow-md bg-neutral-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img 
                  src={url} 
                  className="w-full h-full object-cover transform skew-y-[2deg] scale-110" 
                  alt="Galería"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botones más pequeños y finos */}
        <div className="absolute inset-0 flex items-center justify-between px-2 md:-mx-10 z-20 pointer-events-none">
          <button 
            onClick={prevStep}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-[#b4a178] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextStep}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-[#b4a178] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* VIDEO: Más compacto y centrado */}
      {videoUrl && (
        <div className="mt-12 container mx-auto px-6 max-w-2xl">
          <div 
            className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg border-[3px] border-white"
            style={{ transform: "skewY(-2deg)" }}
          >
            <video 
              src={videoUrl} 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover transform skew-y-[2deg] scale-110"
            />
          </div>
        </div>
      )}
    </section>
  );
}