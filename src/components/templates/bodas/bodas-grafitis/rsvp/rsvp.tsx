"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Users, Utensils, Send } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

interface RSVPProps {
  config: {
    heroImage: string;
    eventDate: string;
    confirmDate: string;
  };
}

export function RSVP({ config }: RSVPProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestCode, setGuestCode] = useState("");

  const [isValidated, setIsValidated] = useState(false);
  const [guestData, setGuestData] = useState<any>(null);
  const [confirmados, setConfirmados] = useState(1);
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"CONFIRMED" | "CANCELLED">("CONFIRMED");

  // --- BLOQUEO DE SCROLL ROBUSTO (HTML + BODY) ---
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

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setIsValidated(false);
      setGuestCode("");
      setDietary("");
      setMessage("");
    }
  };

  const handleValidarCodigo = async () => {
    if (!guestCode) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/guests?code=${guestCode.trim()}`);
      const data = await res.json();
      if (res.ok) {
        if (data.status !== "PENDING") {
          Swal.fire({
            title: "RESPUESTA RECIBIDA",
            text: `¡Hola ${data.nombre}! Ya registramos tu respuesta.`,
            icon: "info",
            confirmButtonColor: "#5ba394"
          });
          setGuestCode("");
          return;
        }
        setGuestData(data);
        setConfirmados(data.cupos); 
        setIsValidated(true); 
      } else {
        Swal.fire({ title: "CÓDIGO INVÁLIDO", icon: "error", confirmButtonColor: "#5ba394" });
      }
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const handleConfirmarFinal = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: guestCode,
          status: status,
          confirmados: status === "CONFIRMED" ? confirmados : 0,
          dietary: dietary,
          message: message,
          name: guestData.nombre
        })
      });
      if (res.ok) {
        await Swal.fire({ title: "¡LISTO!", icon: "success", confirmButtonColor: "#5ba394" });
        handleClose();
      }
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const formattedDate = new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).toUpperCase();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-28 overflow-hidden font-sans bg-[url('/images/img-grafitis/pared.jpg')] bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
        <div className="w-full h-[60px] md:h-[180px] bg-[#f7e6c4] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-white/20 backdrop-blur-xl max-w-5xl w-full flex flex-col md:flex-row rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/30 shadow-2xl">
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <Image src={config.heroImage} alt="Evento" fill className="object-cover opacity-90" priority />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center justify-center text-center relative">
            <div className="mb-4 w-12 h-12 relative">
              <Image src="/images/img-grafitis/sobre.png" alt="Confirmar" fill className="object-contain" />
            </div>
            <h2 className="font-['Permanent_Marker',_cursive] text-2xl md:text-4xl text-black mb-4 uppercase tracking-tighter">Confirmación</h2>
            <p className="text-black font-bold text-sm mb-8 uppercase tracking-widest">Antes del {formattedDate}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(true)} className="px-8 py-4 bg-[#5ba394] text-white text-[10px] md:text-xs uppercase font-bold rounded-full shadow-lg tracking-[0.2em]">
              CONFIRMAR ASISTENCIA
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm touch-none" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="relative w-full max-w-md bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl z-10 border border-white/40 text-center touch-auto">
              <button onClick={handleClose} className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
              
              {!isValidated ? (
                <div className="mt-4">
                   <h3 className="font-['Permanent_Marker',_cursive] text-3xl mb-2 text-black uppercase">Asistencia</h3>
                   <input type="text" value={guestCode} onChange={(e) => setGuestCode(e.target.value.toUpperCase())} placeholder="CÓDIGO" className="w-full bg-zinc-100 border-2 border-transparent focus:border-[#5ba394] p-4 rounded-2xl mb-4 text-center font-black tracking-[0.3em] outline-none text-black text-xl shadow-inner" />
                   <button onClick={handleValidarCodigo} disabled={isSubmitting || !guestCode} className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl flex justify-center items-center gap-2">
                     {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "VALIDAR ACCESO"}
                   </button>
                </div>
              ) : (
                <div className="mt-4 text-left animate-in fade-in zoom-in duration-500">
                  <h3 className="font-['Permanent_Marker',_cursive] text-2xl mb-1 text-black uppercase text-center italic">¡Hola {guestData?.nombre}!</h3>
                  <div className="space-y-4 font-sans">
                    <div className="flex gap-2">
                        <button onClick={() => setStatus("CONFIRMED")} className={`flex-1 py-3 rounded-xl border-2 font-black text-[9px] transition-all ${status === "CONFIRMED" ? "border-[#5ba394] bg-[#5ba394]/10 text-[#5ba394]" : "border-zinc-200 bg-white text-zinc-400"}`}>SI, ASISTIRÉ</button>
                        <button onClick={() => setStatus("CANCELLED")} className={`flex-1 py-3 rounded-xl border-2 font-black text-[9px] transition-all ${status === "CANCELLED" ? "border-red-500 bg-red-50 text-red-600" : "border-zinc-200 bg-white text-zinc-400"}`}>NO PODRÉ IR</button>
                    </div>

                    {status === "CONFIRMED" && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[9px] font-black text-black/60 uppercase tracking-widest ml-2 mb-1 flex items-center gap-2"><Users size={14} className="text-[#5ba394]"/> Invitados</label>
                                <select value={confirmados} onChange={(e) => setConfirmados(Number(e.target.value))} className="w-full p-3 bg-zinc-50 rounded-xl border-2 border-zinc-200 font-bold text-sm text-black outline-none focus:border-[#5ba394]">
                                    {[...Array(guestData?.cupos)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Persona{i > 0 ? 's' : ''}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-black/60 uppercase tracking-widest ml-2 mb-1 flex items-center gap-2"><Utensils size={14} className="text-[#5ba394]"/> Menú Especial</label>
                                <input type="text" placeholder="CELÍACO, VEGANO, ETC..." value={dietary} onChange={(e) => setDietary(e.target.value.toUpperCase())} className="w-full p-3 bg-zinc-50 rounded-xl border-2 border-zinc-200 font-bold text-xs text-black outline-none focus:border-[#5ba394] uppercase" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-black/60 uppercase tracking-widest ml-2 mb-1 flex items-center gap-2">✍️ Un mensaje lindo</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribí acá..." rows={2} className="w-full p-3 bg-zinc-50 rounded-xl border-2 border-zinc-200 font-bold text-xs text-black outline-none focus:border-[#5ba394] shadow-inner resize-none uppercase" />
                            </div>
                        </div>
                    )}
                    <button onClick={handleConfirmarFinal} disabled={isSubmitting} className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl flex justify-center items-center gap-2 mt-4">
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={14} />} ENVIAR CONFIRMACIÓN
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}