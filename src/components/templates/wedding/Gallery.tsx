"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pause, 
  Play,
  Volume2, 
  VolumeX, 
  Clapperboard,
  X,
  Maximize,
  Expand
} from "lucide-react";

const FloralFrame = () => (
  <svg
    viewBox="0 0 800 450"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-40 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]"
    preserveAspectRatio="none"
  >
    <g transform="translate(30, 30)">
      <path d="M0 100C0 100 5 50 50 50C95 50 100 0 100 0" stroke="#94A994" strokeWidth="3.0" strokeLinecap="round" />
      <circle cx="50" cy="50" r="5" fill="#4B664B" />
      <path d="M15 65 L25 55" stroke="#94A994" strokeWidth="2.0" strokeLinecap="round"/>
      <path d="M35 45 L45 35" stroke="#94A994" strokeWidth="2.0" strokeLinecap="round"/>
    </g>
    <g transform="translate(670, 320) rotate(180, 50, 50)">
      <path d="M0 100C0 100 5 50 50 50C95 50 100 0 100 0" stroke="#94A994" strokeWidth="3.0" strokeLinecap="round" />
      <circle cx="50" cy="50" r="5" fill="#4B664B" />
      <path d="M15 65 L25 55" stroke="#94A994" strokeWidth="2.0" strokeLinecap="round"/>
      <path d="M35 45 L45 35" stroke="#94A994" strokeWidth="2.0" strokeLinecap="round"/>
    </g>
    <rect x="15" y="15" width="770" height="420" rx="4" stroke="#94A994" strokeWidth="1.0" strokeDasharray="8 12" />
  </svg>
);

const DiamondDivider = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="h-[1px] w-12 bg-current opacity-30" />
    <div className="rotate-45 w-2 h-2 bg-current" />
    <div className="h-[1px] w-12 bg-current opacity-30" />
  </div>
);

export function FotoCarousel({ images, videoUrl }: { images?: string | null; videoUrl?: string | null }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const fotos = (() => {
    const defaultPhotos = [
      "/img_boda/gallery-1.jpg", "/img_boda/gallery-2.jpg", "/img_boda/gallery-4.jpg",
      "/img_boda/gallery-5.jpg", "/img_boda/gallery-6.jpg", "/img_boda/gallery-3.jpg"
    ];
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

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    // mb-[-1px] para eliminar el gap inferior
    <section className="relative py-24 bg-[#F9FAF7] overflow-hidden mb-[-1px]">
      
      {/* --- ENCABEZADO --- */}
      <div className="container mx-auto px-6 mb-16 text-center flex flex-col items-center relative z-10">
        <motion.img
          src="/elegance-2.png"
          alt="Adorno floral"
          className="w-32 md:w-56 h-auto object-contain mb-8 opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.span className="text-[10px] tracking-[0.6em] text-[#94A994] uppercase font-bold mb-4">
          Nuestra Historia
        </motion.span>
        <h3 className="text-4xl md:text-7xl font-serif italic text-[#4B664B] mb-6 tracking-tight">
          Momentos Inolvidables
        </h3>
        <DiamondDivider className="text-[#94A994]/30" />
      </div>

      {/* --- 1. CARRUSEL --- */}
      <div className="relative mb-32 group z-10 overflow-visible">
        <motion.div 
          initial={{ rotate: -0.5 }}
          whileHover={{ rotate: 0 }}
          className="flex transition-transform duration-1000 ease-in-out cursor-default"
        >
          <motion.div
            className="flex gap-4 md:gap-6 px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedPhotos.map((url, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedImg(url)}
                className="flex-shrink-0 w-[55vw] md:w-[15vw] aspect-[4/5] bg-white p-3 shadow-[0_10px_30px_rgba(148,169,148,0.1)] border border-[#94A994]/10 rounded-2xl cursor-pointer overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Foto ${index}`}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 rounded-xl"
                  onError={(e) => (e.currentTarget.src = "/img_boda/gallery-1.jpg")}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <X className="absolute top-6 right-6 text-white/70 w-8 h-8 cursor-pointer" />
            <motion.img
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={selectedImg}
              className="max-w-full max-h-[90vh] object-contain rounded-[2rem]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. VIDEO --- */}
      <div className="relative w-full pb-12">
        <motion.img src="/elegance-1b.png" className="absolute left-[-2%] top-[-35%] w-36 md:w-64 opacity-15 pointer-events-none z-0" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 0.15, x: 0 }} transition={{ duration: 1 }} />
        <motion.img src="/elegance-1a.png" className="absolute right-[-5%] bottom-[-10%] w-36 md:w-64 opacity-15 pointer-events-none z-0" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 0.15, x: 0 }} transition={{ duration: 1 }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="relative aspect-video overflow-hidden rounded-[3rem] bg-[#F9F9F7] shadow-[0_30px_60px_-15px_rgba(75,102,75,0.1)] ring-1 ring-[#94A994]/10 group">
              <FloralFrame />
              {videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-cover cursor-pointer" 
                    loop muted={isMuted} autoPlay playsInline
                    onClick={() => setIsVideoModalOpen(true)}
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 bg-white/95 backdrop-blur-sm p-3 px-6 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 md:scale-100">
                    <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-[#4B664B] hover:scale-110">
                      {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>
                    <div className="w-[1px] h-4 bg-[#94A994]/20" />
                    <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-[#4B664B] hover:scale-110">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div className="w-[1px] h-4 bg-[#94A994]/20" />
                    <button onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(true); }} className="text-[#4B664B] hover:scale-110">
                      <Expand size={18} />
                    </button>
                    <div className="w-[1px] h-4 bg-[#94A994]/20" />
                    <button onClick={(e) => { e.stopPropagation(); handleFullscreen(); }} className="text-[#4B664B] hover:scale-110">
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#94A994] bg-[#FDFDFD] p-12 text-center">
                   <Clapperboard size={40} strokeWidth={1} className="opacity-30 mb-4" />
                   <p className="text-[10px] tracking-widest uppercase opacity-50">Video próximamente</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVideoModalOpen && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          >
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white z-[120]">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <video src={videoUrl} className="w-full h-full" controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#94A994]/5 rounded-full blur-[120px] z-0" />
    </section>
  );
}