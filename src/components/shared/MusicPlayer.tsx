"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";

export default function ReproductorMusica({ url, autoPlay = false }: { url: string, autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      handlePlay();
    }
  }, [autoPlay]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay bloqueado", err));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        handlePlay();
      }
    }
  };

  if (!url) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[120]">
      <audio ref={audioRef} src={url} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        className={`
          relative flex items-center justify-center rounded-full 
          transition-all duration-500 border-2 shadow-xl
          w-10 h-10 md:w-14 md:h-14 
          ${isPlaying 
            ? "bg-[#33aba1] border-white scale-105 md:scale-110 shadow-[#33aba1]/50" 
            : "bg-white border-[#33aba1] text-[#33aba1]"
          }
        `}
      >
        {/* Onda de choque reducida para mobile */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-[#33aba1] animate-ping opacity-20" />
        )}

        <div className="relative z-10">
          {isPlaying ? (
            /* Ecualizador: más pequeño en mobile */
            <div className="flex items-end gap-[2px] md:gap-[3px] h-3 md:h-5">
              <div className="w-[2px] md:w-[3px] bg-white rounded-full animate-[bounce_0.8s_infinite] h-full" />
              <div className="w-[2px] md:w-[3px] bg-white rounded-full animate-[bounce_0.5s_infinite] h-[60%]" />
              <div className="w-[2px] md:w-[3px] bg-white rounded-full animate-[bounce_1.1s_infinite] h-[80%]" />
              <div className="w-[2px] md:w-[3px] bg-white rounded-full animate-[bounce_0.7s_infinite] h-[40%]" />
            </div>
          ) : (
            /* Icono que también escala */
            <Music className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          )}
        </div>
      </button>
    </div>
  );
}