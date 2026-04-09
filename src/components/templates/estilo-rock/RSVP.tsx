"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  X, Loader2, Star, Ticket
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// --- INTERFAZ DE PROPS ---
interface RSVPProps {
  confirmationDeadline?: string;
}

// --- CLASES DE BOTÓN GLOBALES (Estilo Rockabilly) ---
const buttonBase = "relative text-white px-8 py-3 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 group z-10";
const buttonBorder = "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:translate-x-1.5 after:translate-y-1.5 after:-z-10 after:transition-transform hover:after:translate-x-0 hover:after:translate-y-0";

export function RSVP({ confirmationDeadline = "10/08/2026" }: RSVPProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [familyCode, setFamilyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [guestInfo, setGuestInfo] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    attendance: "", 
    dietary: [] as string[],
    message: "",
  });

  const cardVariants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  const resetAll = () => {
    setIsValidated(false);
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
      const response = await fetch("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: familyCode.toUpperCase().trim(),
          name: formData.name,
          status: formData.attendance === "YES" ? "CONFIRMED" : "CANCELLED",
          dietary: formData.message,
        }),
      });
      if (response.ok) setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-24 md:py-32 bg-[#1a1a1a] overflow-hidden font-sans">
      
      {/* 1. FONDO DE RAYOS (Refactorizado sin style inline) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
        <div className="w-[150%] h-[150%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg_10deg,#b02a30_10deg_20deg,transparent_20deg_30deg,#4fb0a2_30deg_40deg)] [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="relative bg-[#fdfcf0] border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-6xl w-full flex flex-col md:flex-row overflow-visible transform md:rotate-[-0.5deg]"
        >
          {/* Elementos decorativos */}
          <div className="absolute -top-6 -left-6 text-[#b02a30] text-5xl hidden md:block animate-pulse">✦</div>
          <div className="absolute -bottom-6 -right-6 text-[#4fb0a2] text-5xl hidden md:block animate-pulse">✦</div>

          {/* PARTE IZQUIERDA: FOTO (Next/Image) */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative p-6 bg-white border-r-4 border-black">
            <div className="w-full h-full relative border-2 border-black overflow-hidden group">
              <Image 
                src="/img_boda/gallery-2.jpg" 
                alt="Pareja Rock" 
                fill
                className="object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-black text-white text-4xl md:text-5xl uppercase italic tracking-tighter leading-none [text-shadow:3px_3px_0px_#000]">
                  Confirmar<br/>Asistencia
                </h3>
              </div>
            </div>
          </div>

          {/* PARTE DERECHA: INFO Y BOTÓN */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center justify-center text-center relative">
            <div className="absolute inset-4 border-2 border-dotted border-[#b02a30] pointer-events-none opacity-40"></div>

            <div className="mb-6">
              <div className="relative w-20 h-20 mx-auto">
                 <Image src="/img-rock/invitacion.png" alt="icon" fill className="object-contain rotate-12" />
              </div>
            </div>

            <p className="text-black font-black text-lg md:text-xl leading-tight mb-4 max-w-xs uppercase tracking-tighter italic">
              Esperamos que puedas <span className="text-[#b02a30]">Festejar</span> con nosotros.
            </p>
            
            <p className="text-gray-600 text-sm md:text-base font-bold mb-10 italic">
              ¡Confirmá tu asistencia antes del {confirmationDeadline}!
            </p>

            <button 
              onClick={() => setIsOpen(true)} 
              className={`${buttonBase} ${buttonBorder} bg-[#b02a30] px-14 py-4 text-lg appearance-none outline-none`}
            >
              CONFIRMAR
            </button>

            <div className="mt-10 opacity-20 text-black">
                <Ticket size={40} className="rotate-[-20deg]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- MODAL DE CONFIRMACIÓN --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.5, y: 100, rotate: 5 }} 
              animate={{ scale: 1, y: 0, rotate: 0 }} 
              exit={{ scale: 0.5, y: 100, rotate: -5 }} 
              className="relative w-full max-w-xl bg-[#fdfcf0] border-4 border-black p-8 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-y-auto max-h-[90vh]"
            >
              <button onClick={handleClose} className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform appearance-none">
                <X size={32} strokeWidth={3} />
              </button>

              {!isValidated ? (
                <div className="space-y-8 py-6 text-center">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-[#b02a30]">¿Quién eres?</h3>
                  <div className="space-y-4">
                    <p className="font-bold uppercase text-[10px] tracking-widest opacity-60">Ingresa el código de tu invitación</p>
                    <input 
                        type="text" 
                        value={familyCode}
                        onChange={(e) => setFamilyCode(e.target.value)}
                        className="w-full bg-white border-2 border-black p-4 text-center text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                        placeholder="ROCK-123"
                    />
                  </div>
                  {errorMessage && <p className="text-[#b02a30] font-black text-sm uppercase italic animate-bounce">{errorMessage}</p>}
                  
                  <div className="flex justify-center">
                    <button 
                        onClick={handleValidateCode}
                        disabled={isSubmitting}
                        className={`${buttonBase} ${buttonBorder} bg-[#4fb0a2] w-full py-4 disabled:opacity-50 appearance-none`}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "ACCEDER AL SHOW"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 py-6">
                  <h3 className="text-3xl font-black uppercase italic text-center text-[#4fb0a2]">
                    ¡Hola {guestInfo?.apellido}!
                  </h3>
                  
                  <div className="space-y-4">
                    <p className="text-center font-bold uppercase text-xs tracking-widest">¿Vienes a la fiesta?</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setFormData({...formData, attendance: "YES"})}
                            className={`${buttonBase} ${buttonBorder} flex-1 py-4 !px-2 text-[10px] md:text-xs ${formData.attendance === "YES" ? 'bg-[#b02a30] after:translate-x-0 after:translate-y-0' : 'bg-black opacity-60'}`}
                        >
                            SÍ, DE UNA!
                        </button>
                        <button 
                            onClick={() => setFormData({...formData, attendance: "NO"})}
                            className={`${buttonBase} ${buttonBorder} flex-1 py-4 !px-2 text-[10px] md:text-xs ${formData.attendance === "NO" ? 'bg-black after:translate-x-0 after:translate-y-0' : 'bg-black opacity-60'}`}
                        >
                            NO PUEDO :(
                        </button>
                    </div>
                  </div>

                  {formData.attendance && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-6 border-t-2 border-black/10">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Comentarios / Dieta especial:</p>
                        <textarea 
                            className="w-full bg-white border-2 border-black p-4 font-bold focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            placeholder="Celiaquía, vegetariano, etc..."
                            rows={3}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex justify-center">
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`${buttonBase} ${buttonBorder} bg-[#b02a30] w-full py-4 appearance-none`}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "ENVIAR CONFIRMACIÓN"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}