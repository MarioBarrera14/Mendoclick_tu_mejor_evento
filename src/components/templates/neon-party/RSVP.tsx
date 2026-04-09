"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, KeyRound, CheckCircle2, AlertCircle, PartyPopper, Heart, MessageSquareHeart, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";


// Componente de la línea de neón fija
const NeonDivider = () => (
  <div className="absolute bottom-0 left-0 w-full h-[4px] z-[10]">
    {/* Resplandor difuso (Glow) */}
    <div className="absolute inset-0 bg-purple-500 blur-[6px] opacity-80" />
    {/* Línea central brillante */}
    <div className="absolute inset-0 bg-white opacity-90" />
    {/* Luz ambiental hacia arriba */}
    <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gradient-to-t from-purple-600/20 to-transparent" />
  </div>
);

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
    <section className="relative py-24 md:py-40 bg-[#0c001a] overflow-hidden">
      
      {/* --- FONDO CON TU IMAGEN NEONBAR --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/neonbar.png" 
          alt="Neon Background" 
          fill 
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c001a] via-transparent to-[#0c001a] opacity-90" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* --- COLUMNA IMAGEN (IZQUIERDA) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-sm aspect-[3/4] group cursor-pointer"
          >
            {/* Resplandor neón exterior */}
            <div className="absolute -inset-4 bg-purple-600/30 rounded-[3rem] blur-2xl group-hover:bg-purple-500/50 transition-all duration-700" />
            
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-[#0c001a]">
              <Image 
                src="/img_demo/3.webp" 
                alt="Quinceañera"
                fill
                className="object-cover transition-all duration-700 scale-105 group-hover:scale-100 opacity-100 brightness-100"
                style={{ filter: "none" }} // Sin filtros de color
              />
              
              {/* Overlay suave para que no se corte bruscamente abajo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c001a]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
            
            {/* Detalle flotante icono Zap */}
            <div className="absolute -bottom-6 -right-6 bg-purple-600 p-4 rounded-2xl shadow-xl shadow-purple-900/50 z-30 group-hover:scale-110 transition-transform duration-500">
              <Zap size={24} className="text-white fill-white" />
            </div>
          </motion.div>

          {/* --- COLUMNA TEXTO / CARD (DERECHA) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
          >
            <p className="text-purple-400 font-black tracking-[0.5em] mb-6 uppercase text-xs italic drop-shadow-lg">
              R.S.V.P.
            </p>
            <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.8] mb-8 drop-shadow-2xl">
              ¡No podés <br /> <span className="text-purple-600">faltar!</span>
            </h2>
            <p className="text-purple-100/60 font-medium italic text-sm md:text-base mb-10 leading-relaxed max-w-md">
              Queremos compartir esta noche mágica con vos. Por favor, confirma tu asistencia antes del 15 de Mayo.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-12 py-6 bg-purple-600 text-white tracking-[0.3em] text-[11px] font-black uppercase rounded-2xl transition-all duration-300 shadow-[0_20px_50px_-10px_rgba(147,51,234,0.5)] hover:bg-purple-500 italic flex items-center gap-4"
            >
              CONFIRMAR MI ASISTENCIA <Heart size={16} fill="currentColor" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* --- MODAL FORMULARIO --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-lg bg-[#0c001a] rounded-[3rem] shadow-[0_0_80px_rgba(147,51,234,0.3)] overflow-hidden border border-purple-500/30"
            >
              {!isValidated ? (
                <div className="p-10 text-center">
                  <button onClick={handleClose} className="absolute right-8 top-8 text-purple-500/30 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                  <KeyRound className="w-16 h-16 text-purple-600/20 mx-auto mb-6" />
                  <h3 className="text-4xl font-black italic text-white mb-8 uppercase tracking-tighter">Tu Código</h3>
                  
                  <input 
                    type="text"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                    placeholder="ELEG-2026"
                    className="w-full bg-white/5 border-b-2 border-purple-500/20 py-6 text-center text-3xl font-mono tracking-[0.4em] focus:border-purple-500 outline-none transition-all text-white uppercase placeholder:text-white/5"
                  />
                  {errorMessage && (
                    <p className="mt-4 text-rose-500 text-[10px] font-black flex items-center justify-center gap-2 uppercase tracking-widest">
                      <AlertCircle size={14} /> {errorMessage}
                    </p>
                  )}
                  <button 
                    onClick={handleValidateCode}
                    disabled={isSubmitting || familyCode.length < 3}
                    className="w-full mt-10 bg-purple-600 text-white py-6 rounded-2xl font-black text-[11px] tracking-widest uppercase disabled:opacity-20 transition-all italic shadow-xl shadow-purple-900/40"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "ACCEDER"}
                  </button>
                </div>
              ) : alreadyResponded ? (
                <div className="p-12 text-center bg-[#0c001a]">
                  <PartyPopper size={60} strokeWidth={1} className="text-purple-500 mx-auto mb-6" />
                  <h4 className="text-4xl font-black italic text-white mb-4 uppercase tracking-tighter">¡LISTO!</h4>
                  <p className="text-purple-100/50 text-xs font-mono tracking-widest leading-relaxed mb-10">
                    TU RESPUESTA FUE RECIBIDA. NOS VEMOS EN LA PISTA.
                  </p>
                  <button onClick={handleClose} className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all italic">
                    CERRAR
                  </button>
                </div>
              ) : (
                <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
                  <div className="bg-purple-600 text-center py-12 px-8 relative">
                    <button onClick={handleClose} className="absolute right-8 top-8 text-white/30 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">FAMILY GROUP</p>
                    <h3 className="text-5xl font-black italic text-white mb-2 uppercase tracking-tighter">{guestInfo?.apellido}</h3>
                    <div className="inline-block px-4 py-1.5 bg-black/20 rounded-full border border-white/10 mt-2">
                      <p className="text-[10px] text-white tracking-widest font-black italic uppercase">CUPOS: {guestInfo?.cupos}</p>
                    </div>
                  </div>

                  <div className="p-8 space-y-10 bg-[#0c001a]">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-500">Confirmado por:</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-2 border-purple-500/20 py-3 outline-none focus:border-purple-600 text-white font-black italic text-2xl transition-colors bg-transparent uppercase"
                        placeholder="TU NOMBRE"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({...formData, attendance: "YES"})}
                        className={`py-8 rounded-3xl text-[11px] font-black transition-all border-2 flex flex-col items-center gap-4 italic ${formData.attendance === "YES" ? 'bg-purple-600 text-white border-purple-600 shadow-2xl shadow-purple-900/40 scale-105' : 'bg-white/5 text-purple-400/30 border-white/5 hover:border-purple-500/40'}`}
                      >
                        <CheckCircle2 size={24} /> SÍ, ASISTIRÉ
                      </button>
                      <button
                        onClick={() => setFormData({...formData, attendance: "NO"})}
                        className={`py-8 rounded-3xl text-[11px] font-black transition-all border-2 flex flex-col items-center gap-4 italic ${formData.attendance === "NO" ? 'bg-zinc-800 text-white border-zinc-700 shadow-xl' : 'bg-white/5 text-white/20 border-white/5 hover:border-white/20'}`}
                      >
                        <X size={24} /> NO PUEDO
                      </button>
                    </div>

                    <div className="space-y-5">
                      <label className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-500 block text-center">Menú Especial</label>
                      <div className="flex flex-wrap justify-center gap-3">
                        {["NINGUNA 🍽️", "SIN TACC 🚫🌾", "VEGANO 🥑", "VEGETARIANO 🥗"].map((item) => (
                          <button
                            key={item}
                            onClick={() => handleDietaryChange(item)}
                            className={`py-3 px-6 rounded-xl text-[10px] font-black transition-all border-2 ${formData.dietary.includes(item) ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/5 text-purple-300/40 border-white/5'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-purple-500/10 space-y-4 shadow-inner">
                      <label className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-500 flex items-center gap-3">
                        <MessageSquareHeart size={20} /> Dedicatoria
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-none p-0 outline-none text-white font-bold text-base placeholder:text-white/10 resize-none italic leading-relaxed"
                        rows={3}
                        placeholder="DEJALE UN MENSAJE A LA QUINCEAÑERA..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 text-white py-7 rounded-[2rem] text-[12px] font-black tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(147,51,234,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all italic"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Heart size={20} fill="currentColor"/> ENVIAR MI RESPUESTA</>}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
          <NeonDivider />
    </section>
  );
}