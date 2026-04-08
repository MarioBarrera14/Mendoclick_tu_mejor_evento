"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Headset, X, Send, Loader2, KeyRound } from "lucide-react";
import { submitSongSuggestions } from "@/app/api/admin/songs/route";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

const MusicNoteIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 512 512" className={className} style={style} fill="currentColor">
    <path d="M470.38 43.61c-11.89-6.38-26.06-6.19-37.75.52l-231.52 133.2v200.74c-13.84-11.33-33.15-18.17-54.71-18.17-48.6 0-88 33.13-88 74s39.4 74 88 74 88-33.13 88-74V226.78l184.88-106.35v116.12c-13.84-11.33-33.15-18.17-54.71-18.17-48.6 0-88 33.13-88 74s39.4 74 88 74 88-33.13 88-74V68.32c0-10.45-5.69-20.17-14.88-25.11z"/>
  </svg>
);

const RainNote = ({ x, delay, duration, size }: { x: number; delay: number; duration: number; size: number }) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ 
      y: ["0vh", "100vh"], 
      opacity: [0, 0.15, 0.15, 0] 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    className="absolute text-black pointer-events-none"
    style={{ left: `${x}%`, zIndex: 0 }}
  >
    <MusicNoteIcon style={{ width: size, height: size }} />
  </motion.div>
);

export function MusicSuggestion({ eventId }: MusicSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [songs, setSongs] = useState(["", "", ""]);
  const [mounted, setMounted] = useState(false);

  // Evitamos errores de hidratación asegurando que el random solo ocurra en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const rainNotes = useMemo(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * -20,
      duration: Math.random() * 5 + 8,
      size: Math.random() * 15 + 15
    })), []);

  const handleSongChange = (index: number, value: string) => {
    const newSongs = [...songs];
    newSongs[index] = value;
    setSongs(newSongs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      showToast("Falta un detalle", "Por favor, ingresa tu código de invitado", "info");
      return;
    }
    const filteredSongs = songs.filter(s => s.trim() !== "");
    if (filteredSongs.length === 0) {
      showToast("¡Ups!", "Escribe al menos una canción", "warning");
      return;
    }

    setIsSending(true);
    try {
      const songsPayload = {
        tema1: songs[0] || "",
        tema2: songs[1] || "",
        tema3: songs[2] || "",
      };
      const result = await submitSongSuggestions(eventId, guestCode, songsPayload);
      if (result.success) {
        setIsOpen(false);
        setSongs(["", "", ""]);
        setGuestCode("");
        showToast("¡DJ Notificado!", "Tus sugerencias fueron enviadas con éxito. 🎵", "success");
      } else {
        showToast("Código inválido", result.error || "El código no es correcto.", "error");
      }
    } catch (error) {
      showToast("Error", "No se pudo conectar con el servidor", "error");
    } finally {
      setIsSending(false);
    }
  };

  const showToast = (title: string, text: string, icon: any) => {
    Swal.fire({
      title, text, icon,
      confirmButtonColor: "#171717",
      customClass: { popup: 'rounded-[2rem] border-none shadow-2xl' }
    });
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-neutral-50 min-h-[600px]">
      
      {/* CAPA DE LLUVIA MUSICAL - Solo se renderiza cuando el componente está montado */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full w-full">
        {mounted && rainNotes.map((note, i) => (
          <RainNote key={i} {...note} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="relative bg-black/30 backdrop-blur-md p-10 md:p-14 rounded-[3rem] mb-10 flex flex-col items-center shadow-2xl overflow-hidden min-w-[320px] md:min-w-[480px]">
            
            {/* Ecualizador Interno - También protegido contra hidratación */}
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-1 opacity-[0.15] h-32 pointer-events-none">
              {mounted && Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [5, Math.random() * 70 + 10, 5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.03 }}
                  className="w-1.5 bg-white rounded-t-full"
                />
              ))}
            </div>

            <div className="relative mb-8 group z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-[#121212] flex items-center justify-center relative shadow-2xl"
              >
                <div className="absolute inset-3 border border-white/5 rounded-full" />
                <div className="absolute inset-10 border border-white/5 rounded-full" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-100 flex items-center justify-center border-[5px] border-neutral-900 shadow-inner">
                   <Music className="text-neutral-900 w-6 h-6" />
                </div>
              </motion.div>
              
              <div className="absolute -right-3 -top-3 w-16 h-24 pointer-events-none">
                <div className="w-1.5 h-16 bg-neutral-300 rounded-full rotate-[25deg] origin-top border border-neutral-400/20 shadow-md" />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center space-y-3 mb-10 z-10"
            >
              <span className="text-[10px] tracking-[0.7em] text-white/50 uppercase font-black">Music Request</span>
              <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                ¿Qué canción te saca <br /> a bailar?
              </h3>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative z-10 flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full transition-all shadow-xl hover:shadow-white/10"
            >
              <Headset className="w-5 h-5 group-hover:animate-bounce" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Sugerir Canción</span>
            </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white p-10 rounded-[3rem] shadow-2xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors">
                <X size={20} />
              </button>

              <div className="mb-10 text-center">
                <div className="inline-block p-3 bg-neutral-50 rounded-2xl mb-4 text-black">
                   <Music size={24} />
                </div>
                <h4 className="text-2xl font-serif italic">Música para la fiesta</h4>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                  <input 
                    type="text" value={guestCode} onChange={(e) => setGuestCode(e.target.value)}
                    placeholder="CÓDIGO DE INVITADO" 
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:bg-white focus:border-black transition-all text-[10px] font-bold tracking-widest"
                  />
                </div>

                <div className="space-y-3">
                  {songs.map((song, idx) => (
                    <input
                      key={idx} type="text" value={song} onChange={(e) => handleSongChange(idx, e.target.value)}
                      placeholder={`Canción #${idx + 1}`}
                      className="w-full bg-white border-b border-neutral-200 py-3 px-1 outline-none focus:border-black text-sm transition-all placeholder:text-neutral-300"
                    />
                  ))}
                </div>

                <button
                  type="submit" disabled={isSending}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-[11px] tracking-[0.2em] uppercase mt-4 transition-all flex items-center justify-center gap-3 disabled:bg-neutral-300"
                >
                  {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {isSending ? "Enviando..." : "Enviar Sugerencias"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}