"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Headset, X, Send, Loader2, KeyRound } from "lucide-react";
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

  const bars = Array.from({ length: 30 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({ title: "Falta un detalle", text: "Por favor, ingresa tu código de invitado", icon: "info", confirmButtonColor: "#b4a178" });
      return;
    }
    setIsSending(true);
    try {
      const result = await submitSongSuggestions(eventId, guestCode, songs);
      if (result.success) {
        setIsOpen(false);
        setSongs({ tema1: "", tema2: "", tema3: "" });
        setGuestCode("");
        Swal.fire({ title: "¡DJ Notificado!", text: "Tus sugerencias fueron enviadas con éxito. 🎵", icon: "success", confirmButtonColor: "#b4a178" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo enviar la sugerencia", icon: "error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    // Quitamos el bg-white para evitar el efecto de doble color
    <section className="relative bg-white py-28 md:py-36 overflow-hidden font-sans -mt-24 md:-mt-24">
      
      {/* LA FRANJA INCLINADA CHAMPAGNE - Único fondo visible */}
      <div 
        className="absolute inset-0 bg-[#b4a178] z-10"
        style={{ 
          clipPath: "polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)" 
        }}
      />
      
      {/* ECUALIZADOR (Tonos blancos sutiles sobre el dorado) */}
      <div className="absolute top-14 left-0 w-full flex justify-center items-end gap-1 px-4 opacity-20 h-16 pointer-events-none z-10">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [Math.random() * 10 + 5, Math.random() * 50 + 10, Math.random() * 10 + 5] }}
            transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-white rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center max-w-2xl pt-10">
        
        {/* DISCO GIRATORIO (En blanco para contraste) */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-white/60"
          >
            <Disc3 className="w-16 h-16 md:w-20 md:h-20 stroke-[1px]" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-8">
          <h3 className="font-script text-4xl md:text-5xl text-white mb-4">Música</h3>
          <p className="text-white/80 text-[11px] md:text-[13px] leading-relaxed font-light max-w-sm mx-auto uppercase tracking-[0.2em]">
            ¿Qué canción no puede faltar en la pista? <br /> ¡Te invito a ser mi DJ personal!
          </p>
        </motion.div>

        {/* BOTÓN PILL (Blanco para resaltar sobre el dorado) */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-3 px-10 py-2.5 border border-white/40 rounded-full text-white text-[10px] font-medium tracking-widest uppercase hover:bg-white/10 transition-all shadow-lg bg-white/5 backdrop-blur-sm"
        >
          <Headset size={14} />
          Sugerir canción
        </button>
      </div>

      {/* MODAL MINIMALISTA (Blanco para legibilidad) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white p-8 rounded-sm shadow-2xl text-center"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>

              <h4 className="font-script text-4xl text-[#b4a178] mb-6">Playlist</h4>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="text-left border-b border-gray-100 pb-2">
                  <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Código de Invitado</label>
                  <div className="flex items-center gap-2 text-gray-700">
                    <KeyRound size={14} className="opacity-30" />
                    <input 
                      type="text" value={guestCode} onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                      placeholder="Ej: MAR-123" 
                      className="bg-transparent outline-none w-full uppercase placeholder:text-gray-300 text-xs" 
                    />
                  </div>
                </div>

                {[1, 2, 3].map((num) => (
                  <div key={num} className="text-left border-b border-gray-100 pb-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Canción {num}</label>
                    <input
                      type="text"
                      name={`tema${num}`}
                      value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                      onChange={handleChange}
                      placeholder="Nombre del tema..."
                      className="w-full bg-transparent outline-none text-gray-700 text-xs placeholder:text-gray-300"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#b4a178] text-white py-3 rounded-full font-bold text-[10px] tracking-widest uppercase mt-4 hover:bg-[#a38f66] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                  {isSending ? "Enviando..." : "Enviar sugerencia"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}