"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, KeyRound, CheckCircle2, 
  AlertCircle, PartyPopper, Heart, MessageSquareHeart, 
  ChevronRight, UserCircle2, Ban, Utensils 
} from "lucide-react";
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
      
      const invitadoEncontrado = invitados.find(
        (inv: any) => inv.codigo === familyCode.toUpperCase().trim()
      );

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
    } catch (error) {
      setErrorMessage("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.attendance) return;
    setIsSubmitting(true);
    try {
      const dietaFinal = formData.dietary.length > 0 ? formData.dietary.join(", ") : "Ninguna";
      const infoFinal = formData.message 
        ? `${dietaFinal} | Mensaje: ${formData.message}` 
        : dietaFinal;

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDietaryChange = (item: string) => {
    setFormData(prev => {
      // Si el item ya incluye el emoji o texto, lo comparamos
      if (item.includes("NINGUNA")) return { ...prev, dietary: [item] };
      const newDietary = prev.dietary.filter(i => !i.includes("NINGUNA"));
      return {
        ...prev,
        dietary: newDietary.includes(item) ? newDietary.filter(i => i !== item) : [...newDietary, item]
      };
    });
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden font-sans">
      
      {/* DIBUJOS ARTÍSTICOS DE FONDO (BOTÁNICOS) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] overflow-hidden">
        <svg className="absolute -top-10 -right-20 w-[300px] md:w-[500px] rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 20C100 20 120 60 100 100C80 140 100 180 100 180" stroke="black" strokeWidth="0.5" fill="none"/>
          <ellipse cx="100" cy="60" rx="30" ry="15" stroke="black" strokeWidth="0.5" fill="none" transform="rotate(-30 100 60)"/>
          <ellipse cx="100" cy="140" rx="30" ry="15" stroke="black" strokeWidth="0.5" fill="none" transform="rotate(30 100 140)"/>
        </svg>
        <svg className="absolute -bottom-10 -left-20 w-[350px] md:w-[600px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="0.2" fill="none"/>
          <path d="M40 160 Q 100 40 160 160" stroke="black" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-zinc-100 blur-2xl rounded-full scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-white border border-zinc-100 flex items-center justify-center shadow-xl">
              <CalendarCheck className="w-8 h-8 text-black stroke-[1.2]" />
            </div>
          </div>
        </motion.div>

        <h2 className="font-serif italic text-5xl md:text-8xl text-black mb-6 tracking-tight">Confirmación</h2>
        <p className="text-zinc-400 font-bold tracking-[0.4em] mb-12 uppercase text-[10px]">Tu presencia es nuestro mejor regalo</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-full md:w-auto px-16 py-5 bg-black text-white tracking-[0.3em] text-[11px] uppercase font-black rounded-full shadow-2xl"
        >
          CONFIRMAR ASISTENCIA
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white rounded-t-[3rem] md:rounded-[4rem] shadow-2xl overflow-hidden border border-zinc-100 flex flex-col h-[92vh] md:h-auto max-h-[92vh]"
            >
              <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mt-4 mb-2 md:hidden" />

              {!isValidated ? (
                <div className="p-8 md:p-16 text-center">
                  <button onClick={handleClose} className="absolute right-8 top-8 text-zinc-300 hover:text-black hidden md:block"><X size={24} /></button>
                  <KeyRound className="w-12 h-12 text-zinc-200 mx-auto mb-6" />
                  <h3 className="font-serif italic text-4xl text-black mb-8">Ingresar Código</h3>
                  <input 
                    type="text" value={familyCode} onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                    placeholder="TU CÓDIGO"
                    className="w-full bg-zinc-50 border-none rounded-2xl py-6 text-center text-3xl font-mono tracking-[0.4em] outline-none transition-all text-black uppercase"
                  />
                  {errorMessage && (
                    <p className="mt-4 text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                      <AlertCircle size={14} /> {errorMessage}
                    </p>
                  )}
                  <button onClick={handleValidateCode} disabled={isSubmitting || familyCode.length < 3} className="w-full mt-10 bg-black text-white py-6 rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase shadow-xl">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "VALIDAR INVITACIÓN"}
                  </button>
                </div>
              ) : alreadyResponded ? (
                <div className="p-12 md:p-20 text-center">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-black mx-auto mb-8 shadow-inner">
                    <PartyPopper size={40} />
                  </div>
                  <h4 className="font-serif italic text-4xl text-black mb-6">¡Gracias!</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-10">Tu respuesta ya fue registrada. Estamos ansiosos por compartir este momento con vos.</p>
                  <button onClick={handleClose} className="px-12 py-5 bg-black text-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase">CERRAR</button>
                </div>
              ) : (
                <>
                  <div className="bg-zinc-950 p-8 md:p-12 text-center relative shrink-0">
                    <button onClick={handleClose} className="absolute right-8 top-8 text-white/20 hover:text-white transition-colors"><X size={20} /></button>
                    <UserCircle2 size={32} className="text-white/20 mx-auto mb-4" />
                    <h3 className="font-serif italic text-4xl text-white mb-3">Familia {guestInfo?.apellido}</h3>
                    <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Válido para {guestInfo?.cupos} personas</p>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 space-y-10 overflow-y-auto flex-1 custom-scrollbar pb-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-widest uppercase text-zinc-400">¿Quién confirma?</label>
                      <input
                        type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-100 text-black font-serif italic text-2xl"
                        placeholder="Tu nombre aquí"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button onClick={() => setFormData({...formData, attendance: "YES"})} className={`py-8 rounded-[2rem] text-[10px] font-black transition-all border-2 flex flex-col items-center gap-4 ${formData.attendance === "YES" ? 'bg-black text-white border-black shadow-2xl' : 'bg-white text-zinc-400 border-zinc-50'}`}>
                        <CheckCircle2 size={24} /> ASISTIRÉ
                      </button>
                      <button onClick={() => setFormData({...formData, attendance: "NO"})} className={`py-8 rounded-[2rem] text-[10px] font-black transition-all border-2 flex flex-col items-center gap-4 ${formData.attendance === "NO" ? 'bg-zinc-100 text-zinc-900 border-zinc-200' : 'bg-white text-zinc-400 border-zinc-50'}`}>
                        <Ban size={24} /> NO PUEDO
                      </button>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black tracking-widest uppercase text-zinc-400 block text-center flex items-center justify-center gap-3">
                        <Utensils size={16}/> MENÚ ESPECIAL
                      </label>
                      <div className="flex flex-wrap justify-center gap-3">
                        {[
                          "NINGUNA 🍽️", 
                          "SIN TACC 🚫🌾", 
                          "VEGANO 🥑", 
                          "VEGETARIANO 🥗"
                        ].map((item) => (
                          <button 
                            key={item} 
                            onClick={() => handleDietaryChange(item)} 
                            className={`py-4 px-6 rounded-2xl text-[9px] font-black transition-all border-2 ${formData.dietary.includes(item) ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' : 'bg-zinc-50 text-zinc-500 border-transparent hover:border-zinc-100'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-zinc-50 p-8 rounded-[2.5rem] space-y-4 border border-zinc-100/50">
                      <label className="text-[10px] font-black tracking-widest uppercase text-zinc-400 flex items-center gap-3">
                        <MessageSquareHeart size={20} className="text-zinc-900" /> DEDICATORIA
                      </label>
                      <textarea
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border-none bg-transparent p-0 outline-none focus:ring-0 text-zinc-800 font-medium text-lg placeholder:text-zinc-300 resize-none italic"
                        rows={3} placeholder="Algo lindo para los novios..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit} disabled={isSubmitting || !formData.attendance || !formData.name}
                      className="w-full bg-black text-white py-7 rounded-[2rem] text-[12px] font-black tracking-[0.4em] uppercase shadow-2xl disabled:opacity-20"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <span className="flex items-center justify-center gap-4"><Heart size={18} className="fill-current"/> ENVIAR RESPUESTA</span>}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}