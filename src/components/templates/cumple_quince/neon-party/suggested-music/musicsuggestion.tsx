"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon, Sparkles } from "lucide-react";
import { submitSongSuggestions } from "@/actions/songs.actions";
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

  useEffect(() => { setMounted(true); }, []);

  // --- LÓGICA PARA BLOQUEAR SCROLL ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const buttonBase = "relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_10px_30px_-5px_rgba(147,51,234,0.5)] hover:from-purple-500 hover:to-pink-500 italic group overflow-hidden";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({ title: "Código requerido", text: "Ingresá tu código de invitación", icon: "info", confirmButtonColor: "#9333ea" });
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
          confirmButtonColor: "#db2777" 
        });
      } else {
        Swal.fire({ 
          title: result.error?.includes("recibimos") ? "AVISO" : "ERROR", 
          text: result.error || "No se pudo procesar el código", 
          icon: result.error?.includes("recibimos") ? "info" : "error", 
          confirmButtonColor: "#9333ea" 
        });
      }
    } catch (error: any) {
      Swal.fire({ title: "Error", text: "Hubo un problema de conexión", icon: "error", confirmButtonColor: "#9333ea" });
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-16 bg-[#0c001a] overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img 
          src="/controladordj.png" 
          alt="DJ Background" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c001a] via-transparent to-[#0c001a]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2.5rem] text-center shadow-2xl relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_15px_#db2777]" />

          <div className="flex justify-center mb-6 text-purple-500">
            <div className="p-4 rounded-2xl bg-purple-500/10 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
              <MusicIcon size={32} strokeWidth={1.5} />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-4xl font-black italic text-white uppercase tracking-tighter mb-2 leading-none">
              Music{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 pr-2">
                Request
              </span>
            </h2>
            <p className="text-purple-100/70 font-medium italic text-xs md:text-sm max-w-[280px] mx-auto leading-relaxed">
              ¿Qué canciones no pueden faltar? Ayudanos a armar la playlist ideal.
            </p>
          </div>

          <div className="flex justify-center">
            <button onClick={() => setIsOpen(true)} className={buttonBase}>
              <Sparkles size={14} />
              Sugerir Canciones
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="fixed inset-0 m-auto w-[92%] max-w-sm h-fit bg-[#0c001a] border border-white/10 p-8 z-[201] rounded-[2.5rem] shadow-[0_0_50px_rgba(147,51,234,0.3)]"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="text-center mb-6 font-sans">
                <h4 className="text-2xl font-black italic text-white uppercase tracking-tight">Playlist Request</h4>
                <div className="h-1 w-10 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
              </div>

              <form className="space-y-4 font-sans" onSubmit={handleSubmit}>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left">
                  <label className="text-[9px] uppercase font-black text-pink-500 mb-1 block tracking-[0.3em]">Código Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={18} className="text-purple-500" />
                    <input 
                      type="text" value={guestCode} onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                      placeholder="INGRESA TU CÓDIGO" className="bg-transparent border-none outline-none text-white w-full uppercase placeholder:text-white/10 font-black text-base focus:ring-0" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3">
                        <span className="text-pink-500 font-black italic text-xs">{num}.</span>
                        <input
                          type="text" name={`tema${num}`} value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3} onChange={handleChange}
                          placeholder="ARTISTA - CANCIÓN" className="w-full bg-transparent border-none outline-none text-white font-bold text-xs uppercase focus:ring-0 italic placeholder:text-white/5"
                        />
                    </div>
                    ))}
                </div>
                
                <div className="pt-2 text-center">
                    <button type="submit" disabled={isSending} className={`${buttonBase} w-full justify-center py-4`}>
                        {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        {isSending ? "Enviando..." : "Enviar Sugerencia"}
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