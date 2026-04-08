"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon } from "lucide-react";
import { submitSongSuggestions } from "@/app/api/admin/songs/route";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

export function MusicSuggestion({ eventId }: MusicSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [songs, setSongs] = useState({ tema1: "", tema2: "", tema3: "" });

  // CLASES DE BOTÓN PERSONALIZADAS (Basadas en tu snippet)
  const buttonBase = "relative bg-[#a02133] text-white px-8 py-3 text-sm md:text-base font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 group z-10";
  const buttonBorder = "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:translate-x-1.5 after:translate-y-1.5 after:-z-10 after:transition-transform hover:after:translate-x-0 hover:after:translate-y-0";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({ 
        title: "Falta un detalle", 
        text: "Por favor, ingresa tu código de invitado", 
        icon: "info", 
        confirmButtonColor: "#a02133" 
      });
      return;
    }
    if (!songs.tema1 && !songs.tema2 && !songs.tema3) {
      Swal.fire({ 
        title: "Ups!", 
        text: "Escribe al menos una canción", 
        icon: "warning", 
        confirmButtonColor: "#a02133" 
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
          text: "Tus sugerencias fueron enviadas con éxito. 🎵", 
          icon: "success", 
          confirmButtonColor: "#a02133",
          customClass: { popup: 'rounded-[2rem]' }
        });
      } else {
        Swal.fire({ 
          title: "Código inválido", 
          text: result.error || "Error de validación", 
          icon: "error", 
          confirmButtonColor: "#a02133" 
        });
      }
    } catch (error) {
      Swal.fire({ 
        title: "Error", 
        text: "No se pudo enviar la sugerencia", 
        icon: "error",
        confirmButtonColor: "#a02133" 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-[#1a1a1a]">
      {/* Fondo de discos y guitarras */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img 
          src="/img-rock/baile.png" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Fondo Vinilos"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto bg-[#fdfcf0] border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden rotate-[-0.5deg]">
          
          {/* Decoración de estrella */}
          <div className="absolute bottom-4 left-4 text-[#33aba1] opacity-60">
             <StarIcon size={40} fill="currentColor" />
          </div>

          <div className="flex justify-center mb-6">
            <motion.img 
              src="/img-rock/tocadiscos.png" 
              alt="Radio Retro"
              className="w-24 h-auto drop-shadow-md"
              animate={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-black italic text-[#a02133] uppercase tracking-tighter mb-4" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
              Música
            </h2>
            <p className="text-[#1a1a1a] font-black text-lg md:text-xl leading-tight mb-2 uppercase">
              ¿Qué canciones son infaltables?
            </p>
            <p className="text-[#1a1a1a]/70 font-bold text-sm italic">
              Ayudanos con la selección para bailar toda la noche
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className={`${buttonBase} ${buttonBorder}`}
            >
              <MusicIcon size={18} strokeWidth={3} />
              Sugerir Canción
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE SUGERENCIAS */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 m-auto w-[95%] max-w-md h-fit bg-[#fdfcf0] border-4 border-black p-8 z-[101] shadow-[15px_15px_0px_0px_rgba(160,33,51,1)]"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform disabled:opacity-50"
                disabled={isSending}
              >
                <X size={28} strokeWidth={3} />
              </button>

              <div className="text-center mb-8">
                <h4 className="text-4xl font-black italic text-[#a02133] uppercase tracking-tighter">
                  Backstage Play
                </h4>
                <div className="h-1 w-20 bg-[#33aba1] mx-auto mt-2 shadow-[2px_2px_0px_black]"></div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <label className="text-[10px] uppercase font-black text-[#a02133] mb-2 block tracking-widest">Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={20} className="text-black" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      placeholder="EJ: MAR-123" 
                      className="bg-transparent border-none outline-none text-black w-full uppercase placeholder:text-black/20 font-black text-lg" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] uppercase font-black text-black/40 tracking-widest text-center">Tus 3 Temas Favoritos</p>
                    {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white border-2 border-black p-3 flex items-center gap-2 group focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-none transition-all">
                        <span className="text-[#33aba1] font-black italic text-sm">{num}.</span>
                        <input
                        type="text"
                        name={`tema${num}`}
                        value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                        onChange={handleChange}
                        placeholder="Artista - Canción"
                        className="w-full bg-transparent border-none outline-none text-black font-bold px-2 italic text-sm"
                        />
                    </div>
                    ))}
                </div>
                
                <div className="pt-4 flex justify-center">
                    <button
                        type="submit"
                        disabled={isSending}
                        // Aplicamos el mismo estilo de botón aquí, pero en color Teal
                        className={`${buttonBase} ${buttonBorder} bg-[#33aba1] w-full`}
                    >
                        {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                        {isSending ? "Enviando..." : "Enviar Playlist"}
                    </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function StarIcon({ size, fill, className }: { size: number, fill: string, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
    )
}