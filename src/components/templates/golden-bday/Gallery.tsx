"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Film, Camera, Sparkles } from "lucide-react";
import { eventConfig as localConfig } from "@/data/event-config";

interface FotoCarouselProps {
  images?: string | null;
  videoUrl?: string | null;
}

export function FotoCarousel({ images, videoUrl }: FotoCarouselProps) {
  const { imagenes: localImagenes } = localConfig;
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(false); // Para evitar error de Hydration
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);

  // Evitar error de hidratación: solo mostramos elementos aleatorios en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOdd = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yEven = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Lógica de fotos blindada
  const fotos = useMemo(() => {
    try {
      if (images) {
        const urls = JSON.parse(images);
        if (Array.isArray(urls) && urls.length > 0) {
          return urls.map((url: string, i: number) => ({
            id: i,
            url: url || localImagenes.hero,
          }));
        }
      }
    } catch (e) {
      console.error("Error parseando fotos Golden:", e);
    }
    return [
      { id: 1, url: localImagenes.hero },
      { id: 2, url: "/img/foto2.jpg" },
      { id: 3, url: "/img/foto3.jpg" },
    ];
  }, [images, localImagenes.hero]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-[#fdfdfd] overflow-hidden">
      
      {/* Capas de fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(153, 45, 45, 0) 50%, rgba(217, 119, 6, 0.1) 100%)" }} />

      {/* --- BRILLOS DORADOS (Hydration Safe) --- */}
      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          className="absolute z-10 text-amber-400/20"
          style={{
            top: `${(i * 123) % 100}%`,
            left: `${(i * 157) % 100}%`,
          }}
        >
          <Sparkles size={20} fill="currentColor" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-30">
        <div className="text-center mb-12 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center gap-2">
            <Camera className="text-amber-600/40 mb-2" size={32} strokeWidth={1} />
            <span className="text-[10px] md:text-[11px] tracking-[0.6em] text-amber-800/60 uppercase font-bold">
              Galería de Momentos
            </span>
            <h3 className="text-4xl md:text-7xl font-serif italic text-amber-950 mt-2">
              Recuerdos Eternos
            </h3>
            <div className="w-12 md:w-16 h-[2px] bg-amber-200 mt-4 md:mt-6" />
          </motion.div>
        </div>

        {/* Malla de fotos */}
     // ... (mantené todo el inicio igual)

        {/* Malla de fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 max-w-7xl mx-auto">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.id}
              // Mantenemos el movimiento vertical con el scroll (Parallax)
              style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? (i % 2 === 0 ? yOdd : yEven) : 0 }}
              
              // NUEVO: Agregamos el movimiento al mover el cursor
              whileHover={{ 
                rotate: i % 2 === 0 ? -2 : 2, // Se inclina un poquito a la izq o der
                scale: 1.05,                  // Se agranda sutilmente
                z: 10                         // Lo trae un poco hacia adelante
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }} // Movimiento suave tipo rebote
              
              className="relative group cursor-pointer z-20"
            >
              <div className="bg-white p-3 md:p-4 pb-10 md:pb-14 shadow-xl shadow-amber-900/5 border border-amber-100/30 transform transition-transform">
                <div className="aspect-[4/5] overflow-hidden relative bg-amber-50">
                  <motion.img 
                    src={foto.url} 
                    // Efecto extra: la imagen de adentro se mueve un poquito también
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover transition-all" 
                    alt={`Foto ${i + 1}`}
                  />
                </div>
                <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center">
                  <div className="text-[9px] font-serif italic text-amber-900/40 tracking-widest uppercase">
                    Captured Moment {i + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

// ... (mantené el resto del video igual)

        {/* --- VIDEO EXPERIENCE (CORREGIDO PARA MOBILE) --- */}
     {/* --- VIDEO EXPERIENCE --- */}
<motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-5xl mx-auto mt-16 md:mt-48 group px-0 md:px-4"
>
  <div className="relative aspect-[3/4] md:aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] md:border-[10px] border-white bg-neutral-900">
    {videoUrl ? (
      <>
        <video 
          ref={videoRef} 
          src={videoUrl} 
          className="w-full h-full object-cover" 
          loop muted={isMuted} autoPlay playsInline 
          onClick={togglePlay} // Permite pausar tocando cualquier parte del video
        />
        
        {/* Overlay de sombras solo cuando está pausado para mayor discreción */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* BOTÓN CENTRAL DISCRETO: Solo visible si está pausado o al hacer hover en desktop */}
        <button 
          onClick={togglePlay}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 bg-amber-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-500 
            ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} 
            group-hover:opacity-100 group-hover:scale-100`}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        {/* CONTROLES INFERIORES */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-row items-end justify-between text-white pointer-events-none">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold">
              <span className="w-4 md:w-8 h-[1px] bg-amber-400" /> Cinema Mode
            </div>
            <h4 className="text-xl md:text-3xl font-serif italic">Nuestra Película</h4>
          </div>
          
          {/* Botón de Mute (Este sí debe tener pointer-events para funcionar) */}
          <button 
            onClick={toggleMute} 
            className="p-3 md:p-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-amber-600 transition-all pointer-events-auto"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-amber-50/20 italic text-amber-900/40 uppercase tracking-[0.3em] text-xs text-center p-10">
        Cargando video especial...
      </div>
    )}
  </div>
</motion.div>
      </div>

      {/* SVG Ondas final */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50 transform translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-32" style={{ transform: 'rotate(180deg)' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fdfaf1" />
        </svg>
      </div>
    </section>
  );
}