"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseMusicPlayerOptions {
  musicUrl: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

interface UseMusicPlayerReturn {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  mute: () => void;
  unmute: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

export function useMusicPlayer({
  musicUrl,
  autoPlay = false,
  loop = true,
  volume: initialVolume = 0.5,
}: UseMusicPlayerOptions): UseMusicPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Inicializar audio
  useEffect(() => {
    if (typeof window === "undefined" || !musicUrl) return;

    const audio = new Audio(musicUrl);
    audio.loop = loop;
    audio.volume = initialVolume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!loop) setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    if (autoPlay) {
      audio.play().catch(() => {
        // Autoplay bloqueado por el navegador
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [musicUrl, loop, initialVolume, autoPlay]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const mute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  }, []);

  const unmute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setVolumeState(clampedVolume);
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, Math.max(0, time));
    }
  }, [duration]);

  return {
    isPlaying,
    isMuted,
    volume,
    duration,
    currentTime,
    play,
    pause,
    toggle,
    mute,
    unmute,
    setVolume,
    seek,
  };
}
