"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Headset, X, Send, Loader2, KeyRound } from "lucide-react";
import { submitSongSuggestions } from "@/app/api/admin/songs/route";
import Swal from "sweetalert2";
import { DiamondDivider } from "./Decorations";

interface MusicSuggestionProps {
  eventId: string;
}

const WAVE_PATH = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

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
      Swal.fire({ title: "Falta un detalle", text: "Por favor, ingresa tu código de invitado", icon: "info", confirmButtonColor: "#4B664B" });
      return;
    }
    if (!songs.tema1 && !songs.tema2 && !songs.tema3) {
      Swal.fire({ title: "Ups!", text: "Escribe al menos una canción", icon: "warning", confirmButtonColor: "#4B664B" });
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
          confirmButtonColor: "#4B664B",
          customClass: { popup: 'rounded-[2rem]' }
        });
      } else {
        Swal.fire({ title: "Código inválido", text: result.error || "Error de validación", icon: "error", confirmButtonColor: "#4B664B" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo enviar la sugerencia", icon: "error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section 
      className="relative pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondowedin.jpg')" }}
    >
      {/* Overlay verde sutil general */}
      <div className="absolute inset-0 bg-[#94A994]/50 z-0" />
      
      {/* --- OLAS SUPERIORES --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[200%] h-[60px] md:h-[100px]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity="0.25" />
          <path d={WAVE_PATH} x="1200" fill="#ffffff" fillOpacity="0.25" />
        </motion.svg>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 block w-[200%] h-[50px] md:h-[90px]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#F9FAF7" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* TARJETA BLANCA TRASLÚCIDA CENTRAL */}
        <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md rounded-[3rem] p-10 md:p-20 shadow-xl border border-white/40 text-center flex flex-col items-center">
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-8 text-[#4B664B]/60"
          >
            <Disc3 className="w-20 h-20 md:w-24 md:h-24 stroke-[0.5px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center"
          >
            <p className="font-serif italic text-4xl md:text-7xl text-[#4B664B] mb-3 tracking-tight">Musicalizá la fiesta</p>
            <DiamondDivider className="mb-4 text-[#4B664B]/20" />
            <p className="text-[#4B664B]/60 tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold">¿Qué canción no puede faltar?</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#4B664B] text-white font-bold tracking-[0.3em] text-[10px] uppercase rounded-full shadow-2xl hover:bg-[#3a503a] transition-all duration-500"
          >
            <Headset className="w-4 h-4" />
            Sugerí tu tema acá
          </motion.button>
          
          {/* ECUALIZADOR (Ajustado a color verde dentro de la tarjeta) */}
          <div className="flex justify-center items-end gap-1 mt-12 opacity-30 h-10">
            {bars.slice(0, 20).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [5, Math.random() * 30 + 10, 5] }}
                transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 bg-[#4B664B] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- OLAS INFERIORES --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[200%] h-[70px] md:h-[130px]"
          style={{ rotate: 180 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity="0.3" />
          <path d={WAVE_PATH} x="1200" fill="#ffffff" fillOpacity="0.3" />
        </motion.svg>

        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 left-0 block w-[200%] h-[60px] md:h-[110px]"
          style={{ rotate: 180 }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>

      {/* MODAL DE SUGERENCIAS */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-md h-fit bg-white p-8 md:p-10 z-[101] rounded-[2.5rem] shadow-2xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-[#4B664B]/20 hover:text-[#4B664B]">
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <span className="text-[9px] tracking-[0.4em] text-[#94A994] uppercase font-bold mb-2 block">Playlist</span>
                <h4 className="text-3xl font-serif italic text-[#4B664B]">¿Qué vamos a bailar?</h4>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="bg-[#4B664B]/5 p-4 rounded-2xl border border-[#4B664B]/10">
                  <label className="text-[9px] uppercase tracking-widest text-[#4B664B]/60 mb-2 block font-bold">Tu Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={16} className="text-[#4B664B]/30" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      placeholder="Ej: MAR-123" 
                      className="bg-transparent border-none outline-none text-[#4B664B] w-full uppercase placeholder:text-[#4B664B]/30 text-sm font-medium" 
                    />
                  </div>
                </div>

                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <label className="text-[9px] uppercase tracking-widest text-[#4B664B]/40 mb-1 block font-bold">Tema {num}</label>
                    <input
                      type="text"
                      name={`tema${num}`}
                      value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                      onChange={handleChange}
                      placeholder="Nombre de la canción..."
                      className="w-full bg-transparent border-b border-[#4B664B]/10 py-2 outline-none focus:border-[#94A994] transition-all text-[#4B664B] text-sm px-1"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#4B664B] text-white py-4 rounded-full font-bold text-[10px] tracking-widest uppercase mt-4 hover:bg-[#3a503a] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  {isSending ? "ENVIANDO..." : "ENVIAR SUGERENCIAS"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}