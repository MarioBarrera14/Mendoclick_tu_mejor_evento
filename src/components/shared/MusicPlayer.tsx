"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function ReproductorMusica({ url, autoPlay = false }: { url: string, autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Efecto para el autoPlay cuando el sobre se abre
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      handlePlay();
    }
  }, [autoPlay]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("El navegador bloqueó el autoplay hasta que el usuario interactúe", err));
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
    <div className="fixed bottom-8 left-8 z-[110]">
      <audio ref={audioRef} src={url} loop preload="auto" />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-500 ${
          isPlaying ? "bg-white text-black scale-105" : "bg-zinc-900 text-white"
        }`}
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        <div className="flex flex-col items-start leading-none text-left">
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isPlaying ? "Pausar" : "Play Music"}
          </span>
        </div>
      </button>
    </div>
  );
}