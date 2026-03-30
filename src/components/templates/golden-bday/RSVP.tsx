"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, X, Loader2, KeyRound, CheckCircle2, AlertCircle, PartyPopper, Heart, MessageSquareHeart } from "lucide-react";
import { useEffect, useState } from "react";

export function RSVP() {
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
    dietary: [] as string[],
    message: "",
  });

  const resetAll = () => {
    setIsValidated(false);
    setAlreadyResponded(false);
    setFamilyCode("");
    setErrorMessage("");
    setGuestInfo(null);
    setFormData({ name: "", attendance: "", dietary: [], message: "" });
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
      const response = await fetch("/api/guests");
      const invitados = await response.json();
      const invitadoEncontrado = invitados.find((inv: any) => inv.codigo === familyCode.toUpperCase().trim());

      if (invitadoEncontrado) {
        if (invitadoEncontrado.status !== "PENDING" && invitadoEncontrado.status !== null) {
          setAlreadyResponded(true);
          setIsValidated(true);
          return;
        }
        setGuestInfo(invitadoEncontrado);
        setIsValidated(true);
        setFormData(prev => ({ ...prev, name: invitadoEncontrado.apellido }));
      } else {
        setErrorMessage("Código no reconocido.");
      }
    } catch (error) { setErrorMessage("Error de conexión."); }
    finally { setIsSubmitting(false); }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.attendance) return alert("Completa los datos requeridos.");
    setIsSubmitting(true);
    try {
      const dietaFinal = formData.dietary.length > 0 ? formData.dietary.join(", ") : "Ninguna";
      const infoFinal = formData.message ? `${dietaFinal} | Mensaje: ${formData.message}` : dietaFinal;
      const response = await fetch("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: familyCode.toUpperCase().trim(),
          name: formData.name,
          status: formData.attendance === "YES" ? "CONFIRMED" : "CANCELLED",
          dietary: infoFinal,
        }),
      });
      if (response.ok) setAlreadyResponded(true);
    } catch (error) { alert("Error de red."); }
    finally { setIsSubmitting(false); }
  };

  const handleDietaryChange = (item: string) => {
    setFormData(prev => {
      if (item.includes("NINGUNA")) return { ...prev, dietary: [item] };
      const newDietary = prev.dietary.filter(i => !i.includes("NINGUNA"));
      return { ...prev, dietary: newDietary.includes(item) ? newDietary.filter(i => i !== item) : [...newDietary, item] };
    });
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-24 bg-[#fdfaf1] font-sans">

      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-[#B87321]/20 flex items-center justify-center shadow-sm">
            <CalendarCheck className="w-7 h-7 text-[#B87321] stroke-[1.5]" />
          </div>
        </motion.div>

        <h2 className="font-serif italic text-5xl md:text-6xl text-[#5d4037] mb-10 tracking-tight">¡No podés faltar!</h2>
     
        <p className="text-[#B87321] font-medium tracking-[0.3em] mb-12 uppercase text-[10px]">
          Confirma tu asistencia ahora
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-12 py-4 bg-[#B87321] text-white tracking-[0.3em] text-[10px] uppercase font-bold rounded-full transition-all duration-300 shadow-xl shadow-[#B87321]/20"
        >
          CONFIRMAR MI ASISTENCIA
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-[#5d4037]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#B87321]/10"
            >
              {/* Contenido del Modal (Código de validación, Respuesta o Formulario) */}
              {!isValidated ? (
                <div className="p-10 text-center">
                   <button onClick={handleClose} className="absolute right-8 top-8 text-zinc-300 hover:text-[#B87321]">
                    <X size={20} />
                  </button>
                  <KeyRound className="w-12 h-12 text-[#B87321]/30 mx-auto mb-6" />
                  <h3 className="font-serif italic text-3xl text-[#5d4037] mb-8">Ingresá tu código</h3>
                  
                  <input 
                    type="text"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                    placeholder="CÓDIGO"
                    className="w-full bg-[#fdfaf1]/50 border-b-2 border-[#B87321]/20 py-5 text-center text-2xl font-mono tracking-[0.3em] focus:border-[#B87321] outline-none transition-all text-[#5d4037] uppercase"
                  />
                  {errorMessage && (
                    <p className="mt-4 text-rose-500 text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-wide">
                      <AlertCircle size={14} /> {errorMessage}
                    </p>
                  )}
                  <button 
                    onClick={handleValidateCode}
                    disabled={isSubmitting || familyCode.length < 3}
                    className="w-full mt-8 bg-[#B87321] text-white py-5 rounded-2xl font-bold text-[11px] tracking-widest uppercase disabled:bg-zinc-200 transition-all shadow-xl shadow-[#B87321]/20"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "ACCEDER"}
                  </button>
                </div>
              ) : alreadyResponded ? (
                <div className="p-12 text-center bg-[#fdfaf1]/80">
                  <PartyPopper size={50} strokeWidth={1} className="text-[#B87321] mx-auto mb-6" />
                  <h4 className="font-serif italic text-3xl text-[#5d4037] mb-4">¡Muchas gracias!</h4>
                  <p className="text-[#5d4037]/70 text-sm leading-relaxed mb-8">
                    Tu respuesta ya fue registrada. ¡Estamos felices de compartir esto con vos!
                  </p>
                  <button onClick={handleClose} className="px-10 py-4 bg-[#B87321] text-white rounded-full text-[10px] font-bold tracking-widest uppercase">
                    CERRAR
                  </button>
                </div>
              ) : (
                <div>
                  {/* Header del Formulario */}
                  <div className="bg-[#5d4037] text-center py-10 px-8 relative">
                    <button onClick={handleClose} className="absolute right-6 top-6 text-white/30 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#B87321] mb-2">Invitado / Familia</p>
                    <h3 className="font-serif italic text-4xl text-[#fdfaf1] mb-2 uppercase tracking-tighter">{guestInfo?.apellido}</h3>
                    <div className="inline-block px-4 py-1 bg-white/5 rounded-full border border-white/10">
                      <p className="text-[10px] text-amber-200/60 uppercase tracking-widest font-medium">Cupos: {guestInfo?.cupos}</p>
                    </div>
                  </div>

                  <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* Campos del Formulario (Confirmado por, Asistencia, Menú, Mensaje) */}
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold tracking-widest uppercase text-[#B87321]">Confirmado por:</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-2 border-[#B87321]/10 py-2 outline-none focus:border-[#B87321] text-[#5d4037] font-serif italic text-xl transition-colors bg-transparent"
                        placeholder="Nombre completo"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({...formData, attendance: "YES"})}
                        className={`py-6 rounded-2xl text-[10px] font-bold transition-all border-2 flex flex-col items-center gap-3 ${formData.attendance === "YES" ? 'bg-[#B87321] text-white border-[#B87321] shadow-xl shadow-[#B87321]/20' : 'bg-white/50 text-[#B87321]/40 border-[#B87321]/10 hover:border-[#B87321]/30'}`}
                      >
                        <CheckCircle2 size={20} /> SÍ, ASISTIRÉ
                      </button>
                      <button
                        onClick={() => setFormData({...formData, attendance: "NO"})}
                        className={`py-6 rounded-2xl text-[10px] font-bold transition-all border-2 flex flex-col items-center gap-3 ${formData.attendance === "NO" ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-xl' : 'bg-white/50 text-[#5d4037]/40 border-[#5d4037]/10 hover:border-[#5d4037]/30'}`}
                      >
                        <X size={20} /> NO PUEDO
                      </button>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[9px] font-bold tracking-widest uppercase text-[#B87321] block text-center">Menú Especial</label>
                      <div className="flex flex-wrap justify-center gap-2">
                        {["NINGUNA 🍽️", "SIN TACC 🚫🌾", "VEGANO 🥑", "VEGETARIANO 🥗"].map((item) => (
                          <button
                            key={item}
                            onClick={() => handleDietaryChange(item)}
                            className={`py-3 px-5 rounded-full text-[9px] font-bold transition-all border ${formData.dietary.includes(item) ? 'bg-[#5d4037] text-white shadow-md' : 'bg-white/40 text-[#5d4037]/60 border-[#B87321]/10'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#fdfaf1] p-6 rounded-3xl border border-[#B87321]/10 space-y-3 shadow-inner">
                      <label className="text-[9px] font-bold tracking-widest uppercase text-[#B87321] flex items-center gap-2">
                        <MessageSquareHeart size={16} /> Un mensaje especial
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-none p-0 outline-none text-[#5d4037] font-medium text-sm placeholder:text-[#5d4037]/20 resize-none italic"
                        rows={3}
                        placeholder="Escribí tus deseos aquí..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-[#B87321] text-white py-6 rounded-2xl text-[11px] font-bold tracking-[0.3em] uppercase shadow-2xl shadow-[#B87321]/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Heart size={16} className="fill-current"/> ENVIAR RESPUESTA</>}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
            {/* --- SVG INFERIOR CORREGIDO --- */}
<div className="absolute top-full left-0 w-full overflow-hidden leading-[0] z-50">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 md:h-28"
          style={{ transform: 'rotate(180deg) scale-x(-1)' }}
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