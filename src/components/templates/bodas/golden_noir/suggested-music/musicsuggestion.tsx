"use client";

import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon } from "lucide-react";
import { submitSongSuggestions } from "@/actions/songs.actions";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]"
    />
  </div>
);

export function MusicSuggestion({ eventId }: MusicSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [songs, setSongs] = useState({ tema1: "", tema2: "", tema3: "" });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({ 
        title: "Detalle requerido", 
        text: "Por favor, ingresa tu código de invitado", 
        icon: "info", 
        confirmButtonColor: "#b5a47a" 
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
          title: "¡Playlist Actualizada!", 
          text: "Tus canciones ya están en la lista del DJ.", 
          icon: "success", 
          confirmButtonColor: "#b5a47a"
        });
      } else {
        Swal.fire({ title: "Código inválido", text: result.error || "Verifica tu código e intenta de nuevo", icon: "error", confirmButtonColor: "#b5a47a" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Hubo un problema al conectar con el servidor", icon: "error", confirmButtonColor: "#b5a47a" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center group cursor-pointer relative"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative z-10 bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-500 group-hover:scale-[1.05] mb-4 aspect-square flex items-center justify-center">
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
            <div className="absolute inset-5 md:inset-6 border border-black/80 rounded-full z-10 pointer-events-none" />
            <div className="relative w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] z-20">
              <MusicIcon size={40} strokeWidth={1} className="text-[#b5a47a] mb-2 transition-transform duration-500 group-hover:scale-110" />
              <span className="text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em] px-4 text-center">Playlist</span>
            </div>
          </div>

          <div className="text-center px-4 relative z-10">
            {/* Fuente Aplicada: font-script */}
            <h2 className="text-4xl md:text-5xl font-script text-white mb-1.5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500">
              ¿Bailamos?
            </h2>
            <div className="w-8 h-px bg-[#b5a47a]/40 mx-auto mb-2 shadow-sm" />
            <p className="text-[#b5a47a] text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
              Sugiere tu canción favorita
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div key="modal-container" className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md touch-none"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full md:w-[92%] max-w-md h-fit bg-[#fdfcf9] rounded-t-[2.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden border-t border-white/20 touch-auto p-8 md:p-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-[#b5a47a] transition-colors p-2"
                disabled={isSending}
              >
                <X size={20} />
              </button>

              <header className="mb-6">
                {/* Fuente Aplicada: font-script */}
                <h4 className="text-4xl md:text-5xl font-script text-gray-900 tracking-tight leading-tight">
                  Sugerencias Musicales
                </h4>
                <div className="w-12 h-[1px] bg-[#b5a47a]/60 mx-auto my-3" />
                <p className="text-[#b5a47a] text-[9px] uppercase tracking-[0.4em] font-semibold">Ready for the Party</p>
              </header>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5 text-left">
                  <label className="text-[8px] uppercase font-bold text-[#b5a47a] tracking-[0.2em] ml-1">Validar Identidad</label>
                  <div className="relative group">
                    <KeyRound size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5a47a]/60 group-focus-within:text-[#b5a47a] transition-colors" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      placeholder="INGRESA TU CÓDIGO AQUÍ" 
                      className="w-full bg-white border border-gray-100 pl-11 pr-4 py-4 rounded-2xl text-xs uppercase tracking-widest focus:outline-none focus:border-[#b5a47a]/40 focus:ring-4 focus:ring-[#b5a47a]/5 transition-all shadow-sm text-black" 
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[8px] uppercase font-bold text-gray-400 tracking-[0.2em] text-center">Top 3 para la pista</p>
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="relative">
                      <input
                        type="text"
                        name={`tema${num}`}
                        value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                        onChange={handleChange}
                        placeholder={`Canción o artista #${num}`}
                        className="w-full bg-white border border-gray-100 px-5 py-3 rounded-xl text-[13px] italic text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#b5a47a]/30 transition-all shadow-sm"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={14} className="opacity-80" />}
                    {isSending ? "PROCESANDO..." : "ENVIAR AL DJ"}
                  </button>
                  <p className="mt-4 text-[7px] text-gray-300 uppercase tracking-widest">Tu música hace la fiesta</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}