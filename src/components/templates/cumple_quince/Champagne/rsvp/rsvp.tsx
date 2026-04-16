"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, AlertCircle, 
  PartyPopper, Heart, Plus, Minus 
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [isValidated, setIsValidated] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(false);
  const [familyCode, setFamilyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [guestInfo, setGuestInfo] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    attendance: "", 
    confirmados: 1, 
    dietary: [] as string[],
    message: "",
  });

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

  const resetAll = () => {
    setIsValidated(false);
    setAlreadyResponded(false);
    setFamilyCode("");
    setErrorMessage("");
    setGuestInfo(null);
    setFormData({ name: "", attendance: "", confirmados: 1, dietary: [], message: "" });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setTimeout(resetAll, 300);
    }
  };

  const handleValidateCode = async () => {
    if (!familyCode) return;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch(`/api/guests?code=${familyCode.toUpperCase().trim()}`);
      if (!response.ok) {
        setErrorMessage("Código no reconocido.");
        return;
      }
      const invitadoEncontrado = await response.json();
      if (invitadoEncontrado) {
        if (invitadoEncontrado.status !== "PENDING" && invitadoEncontrado.status !== null) {
          setAlreadyResponded(true);
          setIsValidated(true);
          return;
        }
        setGuestInfo(invitadoEncontrado);
        setIsValidated(true);
        setFormData(prev => ({ 
          ...prev, 
          name: invitadoEncontrado.nombre, 
          confirmados: invitadoEncontrado.cupos 
        }));
      }
    } catch (error) {
      setErrorMessage("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.attendance) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: familyCode.toUpperCase().trim(),
          name: formData.name,
          status: formData.attendance === "YES" ? "CONFIRMED" : "CANCELLED",
          dietary: formData.dietary.join(", ") || "Ninguna",
          message: formData.message,
          confirmados: formData.confirmados,
        }),
      });
      if (response.ok) setAlreadyResponded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <section 
        className="relative py-20 md:py-24 overflow-hidden font-sans bg-[#b4a178] [clip-path:polygon(0_4%,100%_0,100%_98%,0_100%)] mt-[-40px] mb-[-40px]"
      >
        <div className="container mx-auto px-6 relative z-20 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="text-center md:text-left flex flex-col items-center md:items-start text-white max-w-xl">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex justify-center md:justify-start mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shadow-inner">
                  <CalendarCheck className="w-6 h-6 md:w-7 md:h-7 text-white stroke-[1]" />
                </div>
              </motion.div>
              <h2 className="font-script text-5xl md:text-6xl text-white mb-2">Confirmación</h2>
              <p className="text-white/80 text-[10px] md:text-[12px] leading-relaxed font-light uppercase tracking-[0.2em] mb-8">
                Esperamos que puedas acompañarnos en este momento tan especial.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="px-10 py-3.5 border border-white/50 rounded-full text-white text-[10px] font-medium tracking-widest uppercase hover:bg-white/10 transition-all shadow-sm"
              >
                Confirmar asistencia
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-xs md:w-1/3 aspect-[3/4] z-20"
            >
              <div className="absolute inset-0 bg-white p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm transform rotate-[-2deg]">
                <div className="relative w-full h-full overflow-hidden rounded-sm border border-gray-100">
                  <Image src={config.heroImage} alt="Evento" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" priority />
                  <div className="absolute inset-0 bg-[#b4a178]/10 mix-blend-multiply" />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -4, 0], rotate: [15, 12, 15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 z-30"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-14 h-14 bg-white/30 backdrop-blur-[2px] rounded-full border border-white/40 shadow-sm" />
                  <Heart className="w-9 h-9 text-white fill-white stroke-[1.5] drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] relative z-10" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="fixed inset-0 backdrop-blur-md touch-none bg-[radial-gradient(circle,_rgba(180,161,120,0.3)_0%,_rgba(0,0,0,0.95)_100%)]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 rounded-sm shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-gray-800 touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-50"><X size={20} /></button>

              {!isValidated ? (
                <div className="py-4 text-center font-sans">
                  <h3 className="font-script text-4xl text-[#b4a178] mb-4">Ingresar Código</h3>
                  <input 
                    type="text" value={familyCode} onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                    placeholder="TU CÓDIGO"
                    className="w-full bg-gray-50 border-b border-gray-200 py-4 text-center text-2xl font-light tracking-[0.3em] outline-none text-gray-700 uppercase"
                  />
                  {errorMessage && <p className="mt-4 text-rose-400 text-[9px] font-medium uppercase tracking-widest flex items-center justify-center gap-2 italic"><AlertCircle size={12} /> {errorMessage}</p>}
                  <button onClick={handleValidateCode} disabled={isSubmitting || familyCode.length < 3} className="w-full mt-8 bg-[#b4a178] text-white py-3 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={14} /> : "VALIDAR"}
                  </button>
                </div>
              ) : alreadyResponded ? (
                <div className="py-8 text-center font-sans">
                  <PartyPopper size={40} className="text-[#b4a178] mx-auto mb-4" />
                  <h4 className="font-script text-4xl text-[#b4a178] mb-2">¡Muchas gracias!</h4>
                  <p className="text-gray-500 text-xs font-light leading-relaxed mb-8">Respuesta registrada correctamente.</p>
                  <button onClick={handleClose} className="px-10 py-2 border border-gray-400 rounded-full text-[10px] font-medium tracking-widest uppercase text-gray-600">Cerrar</button>
                </div>
              ) : (
                <div className="overflow-y-auto pr-2 custom-scrollbar font-sans">
                  <div className="text-center mb-6">
                    <h3 className="font-script text-4xl text-[#b4a178]">{guestInfo?.nombre}</h3>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-light mt-1">Cupos: {guestInfo?.cupos}</p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setFormData({...formData, attendance: "YES"})} className={`py-4 rounded-sm text-[10px] font-medium tracking-widest border transition-all ${formData.attendance === "YES" ? 'bg-[#b4a178] text-white border-[#b4a178]' : 'bg-white text-gray-400 border-gray-200'}`}>ASISTIRÉ</button>
                      <button onClick={() => setFormData({...formData, attendance: "NO"})} className={`py-4 rounded-sm text-[10px] font-medium tracking-widest border transition-all ${formData.attendance === "NO" ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-white text-gray-400 border-gray-200'}`}>NO PUEDO</button>
                    </div>
                    {formData.attendance === "YES" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="space-y-2 text-center">
                          <label className="text-[9px] font-medium tracking-widest uppercase text-gray-400 italic">Confirmar cantidad:</label>
                          <div className="flex items-center justify-center gap-6">
                            <button onClick={() => setFormData(p => ({...p, confirmados: Math.max(1, p.confirmados - 1)}))} className="text-[#b4a178] p-1 border border-gray-200 rounded-full"><Minus size={16}/></button>
                            <span className="font-light text-xl text-gray-700">{formData.confirmados}</span>
                            <button onClick={() => setFormData(p => ({...p, confirmados: Math.min(guestInfo?.cupos || 1, p.confirmados + 1)}))} className="text-[#b4a178] p-1 border border-gray-200 rounded-full"><Plus size={16}/></button>
                          </div>
                        </div>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#b4a178] text-white py-4 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
                          {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={16} /> : "ENVIAR RESPUESTA"}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}