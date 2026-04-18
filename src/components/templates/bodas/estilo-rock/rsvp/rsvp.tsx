"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  X, Loader2, Ticket, AlertCircle, CheckCircle2 
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import SeparadorEntrePaginas from "../line/separadordepaaginas";

// --- INTERFAZ DE PROPS ---
interface RSVPProps {
  config: {
    heroImage: string;
    eventDate: string;
    confirmDate: string;
  };
}

// --- CLASES DE BOTÓN GLOBALES (Rojo Rockabilly) ---
const colorRojo = "#b02a30";
const buttonBase = "relative text-white px-8 py-3 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 group z-10";
const buttonBorder = `after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:translate-x-1.5 after:translate-y-1.5 after:-z-10 after:transition-transform hover:after:translate-x-0 hover:after:translate-y-0 after:shadow-[4px_4px_0px_0px_${colorRojo}]`;

export function RSVP({ config }: RSVPProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [familyCode, setFamilyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [guestInfo, setGuestInfo] = useState<any>(null);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    attendance: "", 
    confirmados: 1,
    dietary: "",   
    message: "",   
  });

  // --- LÓGICA DE BLOQUEO DE SCROLL ROBUSTA ---
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

  const cardVariants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  const formattedDate = new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();
  
  const resetAll = () => {
    setIsValidated(false);
    setFamilyCode("");
    setErrorMessage("");
    setGuestInfo(null);
    setAlreadyConfirmed(false);
    setFormData({ name: "", attendance: "", confirmados: 1, dietary: "", message: "" });
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
    setAlreadyConfirmed(false);

    try {
      const response = await fetch(`/api/guests?code=${familyCode.toUpperCase().trim()}`);
      if (!response.ok) {
        setErrorMessage("Código no reconocido.");
        return;
      }
      
      const invitadoEncontrado = await response.json();

      if (invitadoEncontrado) {
        if (invitadoEncontrado.status !== "PENDING") {
          setAlreadyConfirmed(true);
          setErrorMessage("ESTE CÓDIGO YA FUE UTILIZADO.");
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
          dietary: formData.dietary,
          message: formData.message,
          confirmados: formData.confirmados,
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
    <>
    <section className="relative py-16 md:py-24 bg-[#1a1a1a] overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
        <div className="w-[150%] h-[150%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg_10deg,#b02a30_10deg_20deg,transparent_20deg_30deg,#b02a30_30deg_40deg)] [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className={`relative bg-[#fdfcf0] border-4 border-black shadow-[15px_15px_0px_0px_${colorRojo}] max-w-6xl w-full flex flex-col md:flex-row overflow-visible transform md:rotate-[-0.5deg]`}
        >
          <div className="absolute -top-6 -left-6 text-[#33aba1] text-5xl hidden md:block animate-pulse">✦</div>
          <div className="absolute -bottom-6 -right-6 text-[#33aba1] text-5xl hidden md:block animate-pulse">✦</div>

          <div className="w-full md:w-1/2 h-[350px] md:h-[550px] relative p-6 bg-white border-r-4 border-black">
            <div className="w-full h-full relative border-2 border-black overflow-hidden group">
              <Image 
                src={config.heroImage}
                alt="Pareja Rock" 
                fill
                className="object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-black text-white text-4xl md:text-5xl uppercase italic tracking-tighter leading-none [text-shadow:3px_3px_0px_#b02a30]">
                  Confirmar<br/>Asistencia
                </h3>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
            <div className="absolute inset-4 border-2 border-dotted border-[#b02a30] pointer-events-none opacity-40"></div>
            <div className="mb-4">
              <div className="relative w-16 h-16 mx-auto">
                 <Image src="/img-rock/invitacion.webp" alt="icon" fill className="object-contain rotate-12" />
              </div>
            </div>
            <p className="text-black font-black text-lg md:text-xl leading-tight mb-3 max-w-xs uppercase tracking-tighter italic">
              Esperamos que puedas <span className="text-[#b02a30]">Festejar</span> con nosotros.
            </p>
            <p className="text-gray-600 text-sm md:text-base font-bold mb-8 italic">
              ¡Confirmá tu asistencia antes del {formattedDate}!
            </p>
            <button 
              onClick={() => setIsOpen(true)} 
              className={`${buttonBase} ${buttonBorder} bg-[#b02a30] px-14 py-4 text-lg outline-none`}
            >
              CONFIRMAR
            </button>
            <div className="mt-8 opacity-70 text-[#33aba1]">
                <Ticket size={40} className="rotate-[-20deg]" />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* touch-none en el fondo para evitar scroll táctil */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md touch-none" 
            />
            
            <motion.div 
              initial={{ scale: 0.5, y: 100, rotate: 5 }} 
              animate={{ scale: 1, y: 0, rotate: 0 }} 
              exit={{ scale: 0.5, y: 100, rotate: -5 }} 
              className={`relative w-full max-w-xl bg-[#fdfcf0] border-4 border-black p-8 shadow-[15px_15px_0px_0px_${colorRojo}] overflow-y-auto max-h-[90vh] touch-auto`}
            >
              <button onClick={handleClose} className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform">
                <X size={32} strokeWidth={3} />
              </button>

              {!isValidated ? (
                <div className="space-y-6 py-4 text-center">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-[#b02a30]">¿Quién eres?</h3>
                  
                  {alreadyConfirmed && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-amber-50 border-2 border-amber-500 p-4 flex flex-col items-center gap-2">
                      <AlertCircle className="text-amber-600" size={24} />
                      <p className="text-amber-900 font-black text-xs uppercase italic tracking-tighter">
                        ¡Este show ya tiene tu entrada! <br />
                        Tu confirmación ya fue recibida anteriormente.
                      </p>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <p className="font-bold uppercase text-[10px] tracking-widest opacity-60">Ingresa el código de tu invitación</p>
                    <input 
                        type="text" 
                        value={familyCode}
                        onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                        className={`w-full bg-white border-2 border-black p-4 text-center text-2xl font-black uppercase text-black shadow-[4px_4px_0px_0px_${colorRojo}] focus:outline-none disabled:opacity-20`}
                        placeholder="ROCK-123"
                        disabled={alreadyConfirmed}
                    />
                  </div>
                  {errorMessage && !alreadyConfirmed && <p className="text-[#b02a30] font-black text-sm uppercase italic animate-bounce">{errorMessage}</p>}
                  
                  <div className="flex justify-center">
                    <button 
                        onClick={handleValidateCode}
                        disabled={isSubmitting || alreadyConfirmed}
                        className={`${buttonBase} ${buttonBorder} bg-black w-full py-4 disabled:opacity-30`}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : alreadyConfirmed ? <CheckCircle2 /> : "ACCEDER AL SHOW"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  <h3 className="text-3xl font-black uppercase italic text-center text-[#b02a30]">
                    ¡Hola {guestInfo?.nombre}!
                  </h3>
                  <div className="space-y-4">
                    <p className="text-center font-bold uppercase text-xs tracking-widest opacity-60">¿Vienes a la fiesta?</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setFormData({...formData, attendance: "YES"})}
                            className={`${buttonBase} ${buttonBorder} flex-1 py-4 !px-2 text-[10px] md:text-xs ${formData.attendance === "YES" ? 'bg-[#b02a30] after:shadow-none' : 'bg-black opacity-40'}`}
                        >
                            SÍ, DE UNA!
                        </button>
                        <button 
                            onClick={() => setFormData({...formData, attendance: "NO"})}
                            className={`${buttonBase} ${buttonBorder} flex-1 py-4 !px-2 text-[10px] md:text-xs ${formData.attendance === "NO" ? 'bg-black after:shadow-none' : 'bg-black opacity-40'}`}
                        >
                            NO PUEDO :(
                        </button>
                    </div>
                  </div>

                  {formData.attendance === "YES" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-6 border-t-2 border-black/10">
                      
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-50 text-[#b02a30]">Confirmar cantidad de personas:</p>
                        <div className="flex items-center gap-4 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <button 
                                onClick={() => setFormData(prev => ({ ...prev, confirmados: Math.max(1, prev.confirmados - 1) }))}
                                className="w-10 h-10 bg-black text-white font-black text-xl"
                            >-</button>
                            <span className="flex-1 text-center font-black text-2xl text-black">{formData.confirmados}</span>
                            <button 
                                onClick={() => setFormData(prev => ({ ...prev, confirmados: Math.min(guestInfo.cupos, prev.confirmados + 1) }))}
                                className="w-10 h-10 bg-[#b02a30] text-white font-black text-xl"
                            >+</button>
                        </div>
                        <p className="text-[8px] font-bold text-center opacity-40 uppercase italic">Máximo permitido para tu código: {guestInfo.cupos}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-50 text-[#b02a30]">Comentarios / Dieta especial:</p>
                        <textarea 
                            className={`w-full bg-white border-2 border-black p-4 font-bold text-black focus:outline-none shadow-[4px_4px_0px_0px_${colorRojo}]`}
                            placeholder="Celiaquía, vegetariano, etc..."
                            rows={2}
                            value={formData.dietary}
                            onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-50 text-[#b02a30]">Un mensaje para nosotros:</p>
                        <textarea 
                            className={`w-full bg-white border-2 border-black p-4 font-bold text-black focus:outline-none shadow-[4px_4px_0px_0px_${colorRojo}]`}
                            placeholder="Escribe algo lindo..."
                            rows={2}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <div className="flex justify-center">
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`${buttonBase} ${buttonBorder} bg-black w-full py-4`}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "ENVIAR CONFIRMACIÓN"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formData.attendance === "NO" && (
                     <div className="flex justify-center pt-6">
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`${buttonBase} ${buttonBorder} bg-black w-full py-4`}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "AVISAR QUE NO VOY"}
                        </button>
                     </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
    <SeparadorEntrePaginas />
    </>
  );
}