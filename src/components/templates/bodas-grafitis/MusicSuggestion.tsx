"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, KeyRound, Music as MusicIcon } from "lucide-react";
import { submitSongSuggestions } from "@/app/api/admin/songs/route";
import Image from "next/image";
import Swal from "sweetalert2";

interface MusicSuggestionProps {
  eventId: string;
}

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
        title: "Falta el código", 
        text: "Ingresa tu código de invitado", 
        icon: "info", 
        confirmButtonColor: "#5ba394" 
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
          text: "Tus temas ya están en la lista. 🎵", 
          icon: "success", 
          confirmButtonColor: "#5ba394"
        });
      } else {
        Swal.fire({ title: "Error", text: result.error || "Código inválido", icon: "error", confirmButtonColor: "#d29b7b" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo enviar", icon: "error", confirmButtonColor: "#d29b7b" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-[url('/images/img-grafitis/radio.png')] bg-cover bg-center mb-[-1px]">
      
      {/* SEPARADOR GRAFITERO SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div 
          className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" 
          /* bg-[#e0f2f1] debe ser el color de la sección ANTERIOR a esta */
        />
      </div>

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="container mx-auto px-6 relative z-10 flex justify-center pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl w-full bg-white/30 backdrop-blur-xl p-8 md:p-12 shadow-2xl text-center rounded-[1rem] border border-white/30"
        >
          
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image 
                src="/images/img-grafitis/musica.png" 
                alt="Icono Baile" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-['Permanent_Marker',_cursive] text-black mb-4 uppercase tracking-tighter">
              Música
            </h2>
            <p className="text-black text-sm md:text-base font-medium leading-tight mb-2">
              ¿Qué canciones son infaltables?
            </p>
            <p className="text-black/70 text-xs italic font-medium">
              Ayudanos con la selección para bailar toda la noche
            </p>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-[#5ba394] hover:bg-[#4d8a7d] text-white px-10 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-full shadow-lg transition-all font-['Permanent_Marker',_cursive]"
            >
              <MusicIcon size={18} />
              Sugerir Canción
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE SUGERENCIAS */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-md bg-white/30 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl z-10 border border-white/40"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-6 right-6 text-black hover:scale-110 transition-transform disabled:opacity-50"
                disabled={isSending}
              >
                <X size={28} />
              </button>

              <div className="text-center mb-6">
                <h4 className="text-3xl font-['Permanent_Marker',_cursive] text-black uppercase tracking-tighter">
                  DJ Playlist
                </h4>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-white/40 p-4 rounded-xl border border-white/20">
                  <label className="text-[10px] uppercase font-bold text-black/60 mb-1 block tracking-widest text-center">Código de Invitado</label>
                  <div className="flex items-center gap-3">
                    <KeyRound size={20} className="text-[#5ba394]" />
                    <input 
                      type="text" 
                      value={guestCode}
                      onChange={(e) => setGuestCode(e.target.value)}
                      placeholder="INGRESA TU CÓDIGO" 
                      className="bg-transparent border-none outline-none text-black w-full uppercase placeholder:text-black/30 font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-black/60 tracking-widest text-center mb-2">Tus Temas Favoritos</p>
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white/40 border border-white/20 p-3 rounded-xl flex items-center gap-2">
                      <span className="text-[#d29b7b] font-bold text-sm">{num}.</span>
                      <input
                        type="text"
                        name={`tema${num}`}
                        value={num === 1 ? songs.tema1 : num === 2 ? songs.tema2 : songs.tema3}
                        onChange={handleChange}
                        placeholder="Artista - Canción"
                        className="w-full bg-transparent border-none outline-none text-black font-medium text-sm placeholder:text-black/30"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 bg-black text-white rounded-xl font-bold font-['Permanent_Marker',_cursive] flex justify-center items-center gap-2 uppercase tracking-wider shadow-lg"
                  >
                    {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    {isSending ? "ENVIANDO..." : "ENVIAR AL DJ"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
       {/* SEPARADOR GRAFITERO SUPERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div 
          className="w-full h-[60px] md:h-[160px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" 
          /* bg-[#e0f2f1] debe ser el color de la sección ANTERIOR a esta */
        />
      </div>
    </section>
  );
}