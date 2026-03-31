"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Music, Headset, X, Send, Loader2, KeyRound } from "lucide-react";
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
        title: "Falta un detalle",
        text: "Por favor, ingresa tu código de invitado",
        icon: "info",
        confirmButtonColor: "#B87321"
      });
      return;
    }

    if (!songs.tema1 && !songs.tema2 && !songs.tema3) {
      Swal.fire({
        title: "¡Ups!",
        text: "Escribe al menos una canción",
        icon: "warning",
        confirmButtonColor: "#B87321"
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
          confirmButtonColor: "#B87321",
          customClass: { popup: 'rounded-[2rem] font-serif' }
        });
      } else {
        Swal.fire({
          title: "Código inválido",
          text: result.error || "El código no pertenece a la lista de invitados.",
          icon: "error",
          confirmButtonColor: "#5d4037"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar la sugerencia",
        icon: "error"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-32 bg-[#fdfaf1] overflow-hidden">
      
      {/* --- CAPA DE DEGRADADO RADIAL (Igual a Location) --- */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(216, 191, 162, 0.16) 40%, rgba(160, 119, 69, 0.4) 100%)"
        }}
      />

      {/* ECUALIZADOR EN TONOS ORO/MARRÓN */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center items-end gap-1 px-4 opacity-20 z-0 h-20">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [Math.random() * 20 + 10, Math.random() * 80 + 20, Math.random() * 20 + 10] }}
            transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 md:w-2 bg-[#B87321] rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center">
        
        {/* ICONO DEL DISCO EN TONO ORO */}
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="relative z-10 text-[#B87321]/30"
          >
            <Disc3 className="w-20 h-20 md:w-24 md:h-24 stroke-[1px]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#B87321] uppercase font-bold mb-4 block italic">
            Soundtrack de la Noche
          </span>
          <h3 className="text-5xl md:text-7xl font-serif italic text-[#5d4037] tracking-tight mb-8">
            ¡Te invito a ser <br />mi DJ personal!
          </h3>
          <p className="text-[#5d4037]/60 text-sm md:text-base tracking-[0.1em] italic max-w-sm mx-auto">
            ¿Qué canción no puede <br /> faltar en la pista?
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-4 px-14 py-6 bg-[#B87321] text-white font-bold tracking-[0.3em] text-[10px] uppercase rounded-full transition-all shadow-xl shadow-[#B87321]/20"
        >
          <Headset className="w-4 h-4" />
          SUGERIR MIS TEMAS
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#5d4037]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-[#B87321]/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-8 right-8 text-zinc-300 hover:text-[#B87321] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-10">
                <Music className="w-10 h-10 text-[#B87321]/30 mx-auto mb-4" />
                <h4 className="text-3xl font-serif italic text-[#5d4037]">¿Qué vamos a bailar?</h4>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                
                {/* CÓDIGO CON ESTILO GOLDEN */}
                <div className="bg-[#fdfaf1] p-5 rounded-2xl border border-[#B87321]/10 mb-4">
                  <label className="text-[9px] uppercase tracking-widest text-[#B87321] mb-2 block font-bold">Tu Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={16} className="text-[#B87321]/40" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                      placeholder="CÓDIGO" 
                      className="bg-transparent border-none outline-none text-[#5d4037] font-mono tracking-widest w-full uppercase placeholder:text-zinc-300 text-lg" 
                    />
                  </div>
                </div>

                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1 block font-bold">Tema {num}</label>
                    <input
                      type="text"
                      name={`tema${num}`}
                      value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                      onChange={handleChange}
                      placeholder="Nombre de la canción..."
                      className="w-full bg-transparent border-b border-[#B87321]/20 py-3 outline-none focus:border-[#B87321] transition-all text-[#5d4037] font-serif italic text-lg px-2"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#B87321] text-white py-5 rounded-full font-bold text-[10px] tracking-widest uppercase mt-6 transition-all shadow-xl shadow-[#B87321]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} className="fill-current" />}
                  {isSending ? "ENVIANDO..." : "ENVIAR SUGERENCIAS"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* --- ONDA INFERIOR (Igual a Location/RSVP para conectar) --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 transform translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[100px]" 
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#fdfaf1"
          />
        </svg>
      </div>
    </section>
  );
}