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
  const [guestCode, setGuestCode] = useState(""); // Estado para capturar el código
  const [songs, setSongs] = useState({ tema1: "", tema2: "", tema3: "" });

  const bars = Array.from({ length: 40 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que el código no esté vacío
    if (!guestCode.trim()) {
      Swal.fire({
        title: "Falta un detalle",
        text: "Por favor, ingresa tu código de invitado",
        icon: "info",
        confirmButtonColor: "#18181b"
      });
      return;
    }

    // Validar que al menos haya un tema
    if (!songs.tema1 && !songs.tema2 && !songs.tema3) {
      Swal.fire({
        title: "Ups!",
        text: "Escribe al menos una canción",
        icon: "warning",
        confirmButtonColor: "#f43f5e"
      });
      return;
    }

    setIsSending(true);

    try {
      // Enviamos eventId, guestCode y el objeto de canciones
      const result = await submitSongSuggestions(eventId, guestCode, songs);

      if (result.success) {
        setIsOpen(false);
        setSongs({ tema1: "", tema2: "", tema3: "" });
        setGuestCode("");
        
        Swal.fire({
          title: "¡DJ Notificado!",
          text: "Tus sugerencias fueron enviadas con éxito. 🎵",
          icon: "success",
          confirmButtonColor: "#18181b",
          customClass: { popup: 'rounded-[2rem]' }
        });
      } else {
        // Si el código no existe en la base de datos
        Swal.fire({
          title: "Código inválido",
          text: result.error || "El código no pertenece a la lista de invitados.",
          icon: "error",
          confirmButtonColor: "#18181b"
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
    <section className="relative py-32 bg-black overflow-hidden">
      {/* ONDA SUPERIOR */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff"></path>
        </svg>
      </div>

      {/* EFECTO DE LUZ DE FONDO */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px]"
        />
      </div>

      {/* ECUALIZADOR */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center items-end gap-1 px-4 opacity-30 z-0 h-20">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [Math.random() * 20 + 10, Math.random() * 80 + 20, Math.random() * 20 + 10] }}
            transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 md:w-2 bg-gradient-to-t from-white/0 via-white/50 to-white rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center">
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="relative z-10 text-white/40"
          >
            <Disc3 className="w-20 h-20 md:w-28 md:h-28 stroke-[0.5px]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-[10px] tracking-[0.5em] text-rose-300 uppercase font-bold mb-4 block">The Party Soundtrack</span>
          <h3 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight mb-6 italic">¡Te invito a ser <br />mi DJ personal!</h3>
          <p className="text-white/40 text-sm md:text-base tracking-[0.2em] uppercase max-w-sm mx-auto">¿Qué canción no puede <br /> faltar en la pista?</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase rounded-full overflow-hidden shadow-xl"
        >
          <Headset className="w-5 h-5" />
          SUGERÍ TU TEMA ACÁ
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-[#121212] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={24} /></button>

              <div className="text-center mb-10">
                <span className="text-[9px] tracking-[0.4em] text-rose-300 uppercase font-bold mb-2 block">Playlist</span>
                <h4 className="text-3xl font-serif italic text-white italic">¿Qué vamos a bailar?</h4>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                
                {/* CAMPO DE CÓDIGO INTEGRADO EN TU DISEÑO */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-2">
                  <label className="text-[9px] uppercase tracking-widest text-rose-300 mb-2 block font-bold">Tu Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={16} className="text-white/20" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      placeholder="Ej: MAR-123" 
                      className="bg-transparent border-none outline-none text-white w-full uppercase placeholder:text-zinc-700 text-sm" 
                    />
                  </div>
                </div>

                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block font-bold">Tema {num}</label>
                    <input
                      type="text"
                      name={`tema${num}`}
                      value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                      onChange={handleChange}
                      placeholder="Nombre de la canción..."
                      className="w-full bg-white/5 border-b border-white/10 py-3 outline-none focus:border-rose-500 transition-all text-white text-sm px-2"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-white text-black py-5 rounded-full font-bold text-[10px] tracking-widest uppercase mt-6 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  {isSending ? "ENVIANDO..." : "ENVIAR SUGERENCIA"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* ONDA INFERIOR */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]" style={{ transform: 'rotate(180deg)' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}