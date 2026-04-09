"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, KeyRound 
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Componente de líneas de velocidad con Tailwind puro
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px)] bg-[length:8px_100%]"
    />
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

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent font-sans">
      
      {/* FONDO UNIFICADO */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center pointer-events-none opacity-40 grayscale"
      />
      
      {/* OVERLAY CORREGIDO */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <div className="flex flex-col items-center">
          
          {/* MARCO REDONDO TIPO ARTE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5 mb-8 aspect-square flex items-center justify-center z-10"
          >
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 rounded-full pointer-events-none" />
            <div className="absolute inset-5 md:inset-6 border border-black/80 rounded-full z-10 pointer-events-none" />
            
            <div className="relative w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] z-20 aspect-square">
              <Image 
                src="/img_boda/gallery-6.jpg" 
                alt="Pareja" 
                fill
                className="object-cover grayscale contrast-[1.1] brightness-[1.05]" 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-30 rounded-full pointer-events-none" />
            </div>
          </motion.div>

          {/* CONTENIDO Y BOTÓN DORADO */}
          <div className="text-center px-4 max-w-sm relative z-10">
            <h2 className="text-2xl md:text-4xl font-serif italic text-white mb-2 drop-shadow-md">
              ¿Nos acompañas?
            </h2>
            <p className="text-[#b5a47a] text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] mb-8 drop-shadow-sm opacity-90">
              Confirmar asistencia antes del 10/08/2026
            </p>

            <motion.button 
              whileHover={{ scale: 1.05, translateY: -2 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => setIsOpen(true)} 
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#b5a47a] via-[#e2d1a4] to-[#b5a47a] text-black tracking-[0.3em] text-[10px] uppercase font-black rounded-xl shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto border border-[#b5a47a]/50"
            >
              <CalendarCheck size={16} strokeWidth={2.5} />
              Confirmar Asistencia
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal - Estética Black & White Premium */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="absolute inset-0 bg-black/95 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={handleClose}
                className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-12 text-center">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-[#b5a47a] border border-gray-100 shadow-inner">
                        <KeyRound size={28} strokeWidth={1} />
                    </div>
                </div>
                
                <h4 className="text-2xl font-serif text-gray-800 uppercase tracking-widest mb-2">
                  Ingresa tu código
                </h4>
                <div className="w-10 h-px bg-[#b5a47a]/40 mx-auto mb-6" />
                <p className="text-gray-400 text-xs font-light mb-10 tracking-wide italic">
                  Usa el código de tu invitación física para continuar.
                </p>
                
                <div className="space-y-6">
                  <input 
                    type="text" 
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                    placeholder="FAMILIA-2026"
                    className="w-full bg-gray-50 border border-gray-100 px-6 py-5 rounded-xl text-center text-sm tracking-[0.2em] uppercase focus:outline-none focus:ring-2 focus:ring-[#b5a47a]/10 transition-all shadow-inner"
                  />

                  {errorMessage && (
                    <p className="text-red-400 text-xs font-medium animate-pulse uppercase tracking-widest">{errorMessage}</p>
                  )}

                  <button 
                    onClick={handleValidateCode}
                    disabled={isSubmitting || !familyCode}
                    className="w-full py-5 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Validar Código"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}