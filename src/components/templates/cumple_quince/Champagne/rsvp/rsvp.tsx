"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, AlertCircle, 
  PartyPopper, Heart, MessageSquareHeart, 
  Utensils 
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
    <section 
      className="relative py-28 md:py-36 overflow-hidden font-sans bg-[#b4a178]"
      style={{ 
        /* Esta es la magia: define la inclinación superior e inferior de toda la sección */
        clipPath: "polygon(0 4%, 100% 0, 100% 98%, 0 100%)",
        marginTop: "-60px", // Solapa un poco con el de arriba para que no haya aire
        marginBottom: "-60px" // Solapa con el de abajo
      }}
    >
      
      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start text-white max-w-xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex justify-center md:justify-start mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shadow-inner">
                <CalendarCheck className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[1]" />
              </div>
            </motion.div>

            <h2 className="font-script text-5xl md:text-7xl text-white mb-4">Confirmación</h2>
            <p className="text-white/80 text-[11px] md:text-[13px] leading-relaxed font-light max-w-sm md:max-w-none mx-auto md:mx-0 uppercase tracking-[0.2em] mb-10">
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

          {/* COLUMNA DERECHA: FOTO DINÁMICA */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: -5 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-sm md:max-w-none md:w-2/5 aspect-[3/4] z-20"
          >
            <div className="absolute inset-0 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm transform rotate-[-2deg]">
              <div className="relative w-full h-full overflow-hidden rounded-sm border border-gray-100">
                <Image 
                  src={config.heroImage} 
                  alt="Evento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-[#b4a178]/10 mix-blend-multiply" />
              </div>
            </div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center z-30"
            >
              <Heart className="w-8 h-8 text-white stroke-[1]" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white p-8 rounded-sm shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-gray-800"
            >
              <button onClick={handleClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>

              {!isValidated ? (
                <div className="py-6 text-center">
                  <h3 className="font-script text-4xl text-[#b4a178] mb-6">Ingresar Código</h3>
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-8 font-light">Encontralo en tu invitación</p>
                  <input 
                    type="text" value={familyCode} onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                    placeholder="TU CÓDIGO"
                    className="w-full bg-gray-50 border-b border-gray-200 py-4 text-center text-2xl font-light tracking-[0.3em] outline-none text-gray-700 uppercase"
                  />
                  {errorMessage && (
                    <p className="mt-4 text-rose-400 text-[9px] font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                      <AlertCircle size={12} /> {errorMessage}
                    </p>
                  )}
                  <button onClick={handleValidateCode} disabled={isSubmitting || familyCode.length < 3} className="w-full mt-10 bg-[#b4a178] text-white py-3 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={14} /> : "VALIDAR"}
                  </button>
                </div>
              ) : alreadyResponded ? (
                <div className="py-10 text-center">
                  <PartyPopper size={40} className="text-[#b4a178] mx-auto mb-6" />
                  <h4 className="font-script text-4xl text-[#b4a178] mb-4">¡Muchas gracias!</h4>
                  <p className="text-gray-500 text-xs font-light leading-relaxed mb-10">Tu respuesta ya fue registrada correctamente.</p>
                  <button onClick={handleClose} className="px-10 py-2 border border-gray-400 rounded-full text-[10px] font-medium tracking-widest uppercase text-gray-600">Cerrar</button>
                </div>
              ) : (
                <div className="overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-center mb-10">
                    <h3 className="font-script text-4xl text-[#b4a178]">Familia {guestInfo?.apellido}</h3>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-light mt-1">Válido para {guestInfo?.cupos} personas</p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-b border-gray-100 pb-2">
                      <label className="text-[9px] font-medium tracking-widest uppercase text-gray-400">¿Quién confirma?</label>
                      <input
                        type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent p-1 outline-none text-gray-700 font-light text-lg italic"
                        placeholder="Nombre completo"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setFormData({...formData, attendance: "YES"})} className={`py-4 rounded-sm text-[10px] font-medium tracking-widest transition-all border ${formData.attendance === "YES" ? 'bg-[#b4a178] text-white border-[#b4a178]' : 'bg-white text-gray-400 border-gray-200'}`}>
                        ASISTIRÉ
                      </button>
                      <button onClick={() => setFormData({...formData, attendance: "NO"})} className={`py-4 rounded-sm text-[10px] font-medium tracking-widest transition-all border ${formData.attendance === "NO" ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-white text-gray-400 border-gray-200'}`}>
                        NO PUEDO
                      </button>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[9px] font-medium tracking-widest uppercase text-gray-400 flex items-center gap-2">
                        <Utensils size={12}/> Menú Especial
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["NINGUNA", "SIN TACC", "VEGANO", "VEGETARIANO"].map((item) => (
                          <button 
                            key={item} 
                            onClick={() => handleDietaryChange(item)} 
                            className={`py-2 px-4 rounded-full text-[8px] font-medium tracking-widest transition-all border ${formData.dietary.includes(item) ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-50 text-gray-400 border-transparent'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-medium tracking-widest uppercase text-gray-400 flex items-center gap-2">
                        <MessageSquareHeart size={12} /> Dedicatoria
                      </label>
                      <textarea
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border-b border-gray-100 bg-transparent py-2 outline-none text-gray-600 font-light text-sm italic resize-none"
                        rows={2} placeholder="Escribe algo aquí..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit} disabled={isSubmitting || !formData.attendance || !formData.name}
                      className="w-full bg-[#b4a178] text-white py-3 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg disabled:opacity-30 mt-4"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={16} /> : "ENVIAR RESPUESTA"}
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