"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon } from "lucide-react";
import { submitSongSuggestions } from "@/actions/songs.actions";

import Image from "next/image";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

export function MusicSuggestion({ eventId }: MusicSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [songs, setSongs] = useState({ tema1: "", tema2: "", tema3: "" });
  const [mounted, setMounted] = useState(false);

  // --- BLOQUEO DE SCROLL ROBUSTO (HTML + BODY) ---
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({ 
        title: "Falta el código", 
        text: "Ingresa tu código de invitado", 
        icon: "info", 
        confirmButtonColor: "#5ba394" 
      });
      return;
    }
    
    setIsSending(true);
    try {
      const result = await submitSongSuggestions(eventId, guestCode, songs);
      if (result.success) {
        setIsOpen(false);
        setSongs({ tema1: "", tema2: "", tema3: "" });
        setGuestCode("");
        Swal.fire({ 
          title: "¡DJ Notificado!", 
          text: "Tus temas ya están en la lista. 🎵", 
          icon: "success", 
          confirmButtonColor: "#5ba394"
        });
      } else {
        Swal.fire({ 
          title: result.error?.includes("recibimos") ? "AVISO" : "ERROR", 
          text: result.error || "Código inválido", 
          icon: result.error?.includes("recibimos") ? "info" : "error", 
          confirmButtonColor: "#5ba394" 
        });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo enviar", icon: "error", confirmButtonColor: "#d29b7b" });
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[url('/images/img-grafitis/radio.png')] bg-cover bg-center mb-[-1px]">
      
      {/* SEPARADOR SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
        <div className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>

      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex justify-center pt-6 md:pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl w-full bg-white/20 backdrop-blur-xl p-6 md:p-12 shadow-2xl text-center rounded-[1.5rem] md:rounded-[2.5rem] border border-white/30"
        >
          <div className="flex justify-center mb-4">
            <div className="relative w-14 h-14 md:w-20 md:h-20">
              <Image src="/images/img-grafitis/musica.png" alt="Música" fill className="object-contain" />
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Permanent_Marker',_cursive] text-white md:text-black mb-4 uppercase tracking-tighter leading-none">
              Música
            </h2>
            <p className="text-white md:text-black text-sm md:text-base font-bold leading-tight mb-2 uppercase">
              ¿Qué canciones son infaltables?
            </p>
            <p className="text-white/70 md:text-black/70 text-[10px] md:text-xs italic font-bold uppercase tracking-wider">
              Ayudanos con la selección para bailar toda la noche
            </p>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-full sm:w-auto bg-[#5ba394] hover:bg-[#4d8a7d] text-white px-8 md:px-12 py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-full shadow-lg transition-all font-sans"
            >
              <MusicIcon size={16} />
              Sugerir Canción
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* MODAL RESPONSIVO */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay: touch-none evita scroll táctil de fondo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm touch-none"
            />
            
            {/* Contenido: touch-auto permite scroll interno si el contenido crece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl z-10 border border-white/40 touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-black/60 hover:text-black transition-colors"
                disabled={isSending}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
              </button>

              <div className="text-center mb-6 pt-4">
                <h4 className="text-3xl md:text-4xl font-['Permanent_Marker',_cursive] text-black uppercase tracking-tighter leading-none">
                  DJ Playlist
                </h4>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-zinc-50 p-4 rounded-2xl shadow-inner border border-zinc-100">
                  <label className="text-[9px] uppercase font-black text-black/40 mb-1 block tracking-[0.2em] text-center">Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={18} className="text-[#5ba394]" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                      placeholder="INGRESA TU CÓDIGO" 
                      className="bg-transparent border-none outline-none text-black w-full uppercase placeholder:text-black/20 font-black tracking-widest text-xs" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] uppercase font-black text-black/40 tracking-[0.2em] text-center mb-2 font-sans">Sugerencias (Máx 3)</p>
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-zinc-50 p-3 rounded-xl flex items-center gap-2 border border-zinc-100">
                      <span className="text-[#5ba394] font-black text-xs">{num}.</span>
                      <input
                        type="text"
                        name={`tema${num}`}
                        value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                        onChange={handleChange}
                        placeholder="ARTISTA - CANCIÓN"
                        className="w-full bg-transparent border-none outline-none text-black font-bold text-xs placeholder:text-zinc-300 uppercase"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold font-sans flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-zinc-800 transition-all"
                  >
                    {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={16} />}
                    {isSending ? "ENVIANDO..." : "ENVIAR AL DJ"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SEPARADOR INFERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
        <div className="w-full h-[60px] md:h-[160px] bg-white [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}