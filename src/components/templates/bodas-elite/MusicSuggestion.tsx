"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon } from "lucide-react";
import { submitSongSuggestions } from "@/app/api/admin/songs/route";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

// Componente de líneas de velocidad sutiles para coherencia visual
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px)`,
        backgroundSize: '8px 100%',
      }}
    />
  </div>
);

export function MusicSuggestion({ eventId }: MusicSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [songs, setSongs] = useState({ tema1: "", tema2: "", tema3: "" });

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
        confirmButtonColor: "#000000" 
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
          confirmButtonColor: "#000000"
        });
      } else {
        Swal.fire({ title: "Error", text: result.error || "Código inválido", icon: "error", confirmButtonColor: "#000000" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo enviar", icon: "error", confirmButtonColor: "#000000" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      {/* FONDO UNIFICADO */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"
      />
      
      {/* OVERLAY CORREGIDO (via-black/40) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        {/* TARJETA PRINCIPAL CON MARCO REDONDO TIPO ARTE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center group cursor-pointer relative"
          onClick={() => setIsOpen(true)}
        >
          {/* Resplandor radial en hover */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-radial from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl z-0 pointer-events-none" />

          {/* ESTRUCTURA DE MARCO CIRCULAR */}
          <div className="relative z-10 bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-[0_35px_65px_-12px_rgba(0,0,0,0.9)] mb-6 aspect-square flex items-center justify-center">
            
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
            <div className="absolute inset-5 md:inset-6 border border-black/80 rounded-full z-10 pointer-events-none" />
            
            <div className="relative w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] z-20 transition-all duration-700 aspect-square">
              <MusicIcon size={40} strokeWidth={1} className="text-[#b5a47a] mb-2 transition-transform duration-500 group-hover:scale-110" />
              <span className="text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em] px-4 text-center">Playlist</span>
              <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(0,0,0,0.1)] z-30 rounded-full pointer-events-none" />
            </div>
          </div>

          {/* TEXTO INFORMATIVO CON SOMBRAS */}
          <div className="text-center px-4 relative z-10">
            <h2 className="text-xl md:text-3xl font-serif italic text-white mb-2 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500">
              ¿Bailamos?
            </h2>
            <div className="w-8 h-px bg-[#b5a47a]/40 mx-auto mb-3 shadow-sm" />
            <p className="text-[#b5a47a] text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
              Sugerir tu canción favorita
            </p>
          </div>
        </motion.div>
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
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 m-auto w-[92%] max-w-md h-fit bg-white z-[101] rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                disabled={isSending}
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 text-center">
                <h4 className="text-2xl font-serif text-gray-900 uppercase tracking-widest mb-2 italic">
                  Sugerencias
                </h4>
                <div className="w-10 h-px bg-[#b5a47a]/40 mx-auto mb-4" />
                <p className="text-[#b5a47a] text-[10px] uppercase tracking-widest font-bold mb-8">DJ Backstage</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-2">Tu Código</label>
                    <div className="relative">
                      <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5a47a]" />
                      <input 
                        type="text" 
                        value={guestCode}
                        onChange={(e) => setGuestCode(e.target.value)}
                        placeholder="EJ: FAMILIA-123" 
                        className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-4 rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#b5a47a]/20 transition-all shadow-inner" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest text-center mb-2">Tus 3 Temas Favoritos</p>
                    {[1, 2, 3].map((num) => (
                      <input
                        key={num}
                        type="text"
                        name={`tema${num}`}
                        value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                        onChange={handleChange}
                        placeholder={`Canción ${num} - Artista`}
                        className="w-full bg-gray-50 border border-gray-100 px-5 py-3 rounded-xl text-sm italic focus:outline-none focus:ring-2 focus:ring-[#b5a47a]/10 transition-all shadow-inner"
                      />
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-xl hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                      {isSending ? "Enviando..." : "Enviar Sugerencia"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}