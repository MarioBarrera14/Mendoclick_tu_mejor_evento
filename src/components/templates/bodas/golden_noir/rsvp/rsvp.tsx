"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, KeyRound, Phone, Users, Utensils, Send 
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

interface RSVPProps {
  config: {
    heroImage: string;
    eventDate: string;
    confirmDate: string;
    eventName: string;
    confirmPhone?: string;
    plan?: "CLASSIC" | "PREMIUM" | "DELUXE";
  };
}

const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]" />
  </div>
);

export function RSVP({ config }: RSVPProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [guestInfo, setGuestInfo] = useState<any>(null);
  
  const [status, setStatus] = useState<"CONFIRMED" | "CANCELLED">("CONFIRMED");
  const [confirmados, setConfirmados] = useState(1);
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [familyCode, setFamilyCode] = useState("");

  const currentPlan = config.plan || "CLASSIC";

  useEffect(() => {
    const isAnyModalOpen = isOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "";
  }, [isOpen]);

  // --- LÓGICA WHATSAPP (PLAN CLASSIC) ---
  const handleWhatsAppConfirm = () => {
    const telefono = config.confirmPhone || "549261000000";
    const texto = encodeURIComponent(
      `¡Hola! Quiero confirmar mi asistencia al evento de ${config.eventName}. \nAsistiremos: [Cantidad] personas. \nMenú especial: [Opcional]. \n¡Gracias!`
    );
    window.open(`https://wa.me/${telefono}?text=${texto}`, "_blank");
  };

  // --- LÓGICA BASE DE DATOS (PLAN PREMIUM / DELUXE) ---
  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setIsValidated(false);
      setFamilyCode("");
      setDietary("");
      setMessage("");
    }
  };

  const handleValidateCode = async () => {
    if (!familyCode) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/guests?code=${familyCode.toUpperCase().trim()}`);
      const data = await res.json();
      if (res.ok) {
        if (data.status !== "PENDING") {
          Swal.fire({
            title: "RESPUESTA RECIBIDA",
            text: `¡Hola ${data.nombre}! Ya registramos tu respuesta anteriormente.`,
            icon: "info",
            confirmButtonColor: "#b5a47a"
          });
          setFamilyCode("");
          return;
        }
        setGuestInfo(data);
        setConfirmados(data.cupos);
        setIsValidated(true);
      } else {
        Swal.fire({ title: "CÓDIGO INVÁLIDO", icon: "error", confirmButtonColor: "#b5a47a" });
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
          code: familyCode,
          status: status,
          confirmados: status === "CONFIRMED" ? confirmados : 0,
          dietary: dietary,
          message: message,
          name: guestInfo.nombre
        })
      });
      if (res.ok) {
        await Swal.fire({ title: "¡CONFIRMADO!", text: "Tu respuesta ha sido enviada con éxito.", icon: "success", confirmButtonColor: "#b5a47a" });
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
    <section className="relative py-12 md:py-20 overflow-hidden bg-transparent font-sans">
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale" style={{ backgroundImage: `url(${config.heroImage})` }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <div className="flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-2xl border border-white/5 mb-6 aspect-square flex items-center justify-center z-10">
            <div className="relative w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white z-20 aspect-square">
              <Image src={config.heroImage} alt="Pareja" fill className="object-cover grayscale contrast-[1.1] brightness-[1.05]" />
            </div>
          </motion.div>

          <div className="text-center px-4 max-w-sm relative z-10">
            <h2 className="text-5xl md:text-6xl font-script text-white mb-2 drop-shadow-md leading-tight">¿Nos acompañas?</h2>
            <p className="text-[#b5a47a] text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] mb-6 drop-shadow-sm opacity-90">Confirmar antes del {formattedDate}</p>

            {currentPlan === "CLASSIC" ? (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} 
                onClick={handleWhatsAppConfirm} 
                className="w-full px-10 py-4 bg-[#25D366] text-white tracking-[0.2em] text-[10px] uppercase font-black rounded-xl shadow-2xl flex items-center justify-center gap-3 border border-white/20"
              >
                <Phone size={16} strokeWidth={2.5} /> Confirmar por WhatsApp
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} 
                onClick={() => setIsOpen(true)} 
                className="w-full px-10 py-4 bg-gradient-to-r from-[#b5a47a] via-[#e2d1a4] to-[#b5a47a] text-black tracking-[0.3em] text-[10px] uppercase font-black rounded-xl shadow-2xl flex items-center justify-center gap-3 border border-[#b5a47a]/50"
              >
                <CalendarCheck size={16} strokeWidth={2.5} /> Confirmar Asistencia
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && currentPlan !== "CLASSIC" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/95 backdrop-blur-md touch-none" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden touch-auto p-10 text-center">
              <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors"><X size={24} /></button>

              {!isValidated ? (
                <div className="animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-[#b5a47a] border border-gray-100 shadow-inner">
                      <KeyRound size={28} strokeWidth={1} />
                    </div>
                  </div>
                  <h4 className="text-4xl font-script text-gray-800 mb-2 leading-tight">Tu Invitación</h4>
                  <p className="text-gray-400 text-[10px] mb-8 tracking-wide italic uppercase">Ingresa el código de tu tarjeta</p>
                  <input type="text" value={familyCode} onChange={(e) => setFamilyCode(e.target.value.toUpperCase())} placeholder="CÓDIGO" className="w-full bg-gray-50 border border-gray-100 px-6 py-5 rounded-xl text-center text-sm tracking-[0.2em] uppercase focus:outline-none focus:ring-2 focus:ring-[#b5a47a]/20 transition-all text-black mb-6" />
                  <button onClick={handleValidateCode} disabled={isSubmitting || !familyCode} className="w-full py-5 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Validar"}
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
                  <h4 className="text-3xl font-script text-gray-800 mb-6 text-center italic">¡Hola {guestInfo?.nombre}!</h4>
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-6">
                      <button onClick={() => setStatus("CONFIRMED")} className={`flex-1 py-3 rounded-xl border-2 font-bold text-[9px] tracking-widest transition-all ${status === "CONFIRMED" ? "border-[#b5a47a] bg-[#b5a47a]/5 text-[#b5a47a]" : "border-gray-100 text-gray-400"}`}>ASISTIRÉ</button>
                      <button onClick={() => setStatus("CANCELLED")} className={`flex-1 py-3 rounded-xl border-2 font-bold text-[9px] tracking-widest transition-all ${status === "CANCELLED" ? "border-red-200 bg-red-50 text-red-500" : "border-gray-100 text-gray-400"}`}>NO PODRÉ</button>
                    </div>

                    {status === "CONFIRMED" && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 flex items-center gap-2"><Users size={14}/> Invitados</label>
                          <select value={confirmados} onChange={(e) => setConfirmados(Number(e.target.value))} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-black focus:outline-none focus:border-[#b5a47a]">
                            {[...Array(guestInfo?.cupos)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Persona{i > 0 ? 's' : ''}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 flex items-center gap-2"><Utensils size={14}/> Menú Especial</label>
                          <input type="text" placeholder="CELÍACO, VEGETARIANO..." value={dietary} onChange={(e) => setDietary(e.target.value.toUpperCase())} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 text-[10px] text-black focus:outline-none focus:border-[#b5a47a] placeholder:text-gray-300" />
                        </div>
                      </div>
                    )}
                    
                    <button onClick={handleConfirmarFinal} disabled={isSubmitting} className="w-full py-5 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 mt-6 shadow-xl">
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={14} />} Enviar Confirmación
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