"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Headset, X, Send, Loader2, KeyRound, Zap, Music } from "lucide-react";
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

  const bars = Array.from({ length: 40 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) {
      Swal.fire({
        title: "CÓDIGO REQUERIDO",
        text: "Ingresá tu código de invitado para continuar",
        icon: "info",
        confirmButtonColor: "#9333ea",
        customClass: { popup: 'rounded-[2rem] border-2 border-purple-500/20 bg-[#0c001a] text-white' }
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
          title: "¡DJ NOTIFICADO!",
          text: "Tus temas ya están en la lista.",
          icon: "success",
          confirmButtonColor: "#9333ea",
          customClass: { popup: 'rounded-[2rem]' }
        });
      }
    } catch (error) {
      // Manejo de error
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-32 bg-[#0c001a] overflow-hidden">
      
      {/* --- FONDO CON GRID NEÓN (Consistencia con Location y RSVP) --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#9333ea 1px, transparent 1px), linear-gradient(90deg, #9333ea 1px, transparent 1px)`,
            backgroundSize: '45px 45px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* EFECTO DE LUZ PURPURA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
        />
      </div>

      {/* ECUALIZADOR DINÁMICO */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center items-end gap-1 px-4 opacity-20 z-0 h-32">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [Math.random() * 20 + 5, Math.random() * 100 + 20, Math.random() * 20 + 5] }}
            transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 md:w-2 bg-purple-500 rounded-full shadow-[0_0_10px_#9333ea]"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center">
        
        {/* HEADER BRUTALISTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-purple-500">
            <Zap size={24} fill="currentColor" className="animate-pulse" />
            <span className="text-[11px] tracking-[0.6em] uppercase font-black italic">The Playlist</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85] mb-8">
            ¡Sugerí <br /> <span className="text-purple-600 font-black">Tu Música!</span>
          </h2>
          
          <p className="text-purple-200/50 text-lg md:text-xl tracking-widest uppercase italic font-medium max-w-sm">
            ¿Qué canción no puede <br /> faltar en la pista?
          </p>
        </motion.div>

        {/* BOTÓN NEÓN */}
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-5 px-16 py-8 bg-purple-600 text-white font-black tracking-[0.4em] text-[12px] uppercase rounded-[2rem] transition-all shadow-[0_20px_50px_-10px_rgba(147,51,234,0.6)] hover:bg-purple-500 italic"
        >
          <Music size={22} className="group-hover:rotate-12 transition-transform" />
          SER MI DJ PERSONAL
        </motion.button>
      </div>

      {/* MODAL ESTILO CRYSTAL DARK */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md bg-[#0c001a] border border-purple-500/30 p-10 rounded-[3.5rem] shadow-[0_0_80px_rgba(147,51,234,0.2)]"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-purple-500/40 hover:text-white transition-colors">
                <X size={28} />
              </button>

              <div className="text-center mb-10">
                <Music className="w-12 h-12 text-purple-500 mx-auto mb-4 opacity-50" />
                <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter">¿Qué bailamos?</h4>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                
                {/* INPUT CÓDIGO BRUTALISTA */}
                <div className="bg-purple-600/5 p-6 rounded-[2rem] border border-purple-500/20">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-purple-500 mb-3 block font-black italic">Tu Código de Invitado</label>
                  <div className="flex items-center gap-4">
                    <KeyRound size={20} className="text-purple-600" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                      placeholder="ELEG-2026" 
                      className="bg-transparent border-none outline-none text-white w-full font-mono text-xl tracking-widest placeholder:text-white/5 uppercase" 
                    />
                  </div>
                </div>

                {/* TEMAS */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="relative">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-1 block font-black italic">TEMA 0{num}</label>
                    <input
                      type="text"
                      name={`tema${num}`}
                      value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                      onChange={handleChange}
                      placeholder="Título y Artista..."
                      className="w-full bg-transparent border-b-2 border-purple-500/20 py-4 outline-none focus:border-purple-600 transition-all text-white font-bold italic text-lg placeholder:text-white/5 bg-white/0 px-2"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-purple-600 text-white py-7 rounded-[2rem] font-black text-[12px] tracking-[0.4em] uppercase mt-4 hover:bg-purple-500 transition-all flex items-center justify-center gap-4 shadow-xl shadow-purple-900/40 disabled:opacity-50 italic"
                >
                  {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="fill-current" />}
                  {isSending ? "ENVIANDO..." : "ENVIAR AHORA"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </section>
  );
}