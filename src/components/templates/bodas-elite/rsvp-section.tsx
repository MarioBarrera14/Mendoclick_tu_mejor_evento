"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, KeyRound, CheckCircle2, 
  AlertCircle 
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

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden font-sans mb-[-1px]">
      
      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-black/5 shadow-2xl max-w-5xl w-full flex flex-col md:flex-row rounded-[3rem] overflow-hidden"
        >
          {/* Imagen de la pareja en escala de grises */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] overflow-hidden">
            <img 
              src="/img_boda/gallery-2.jpg" 
              alt="Pareja" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* Contenido de Confirmación en B/N */}
          <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col items-center justify-center text-center bg-white">
            <div className="mb-8 text-black/20">
              <CalendarCheck size={40} strokeWidth={1} />
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl text-black mb-6 italic leading-tight">
              Confirmación
            </h2>
            
            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-6 max-w-xs">
              Tu presencia es nuestro mejor regalo. Por favor, confírmanos tu asistencia antes del evento.
            </p>
            
            <p className="text-black text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-12 border-b border-black/10 pb-4">
              ¡R.S.V.P!
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#000" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setIsOpen(true)} 
              className="px-16 py-5 bg-black text-white tracking-[0.2em] text-[11px] uppercase font-bold rounded-full shadow-2xl transition-all"
            >
              CONFIRMAR ASISTENCIA
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal - Estética Black & White */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black">
                        <KeyRound size={20} />
                    </div>
                </div>
                <h4 className="text-3xl font-serif italic text-black mb-4">Ingresa tu código</h4>
                <p className="text-zinc-400 text-sm mb-8">Usa el código que recibiste en tu invitación física o mensaje.</p>
                
                {/* Aquí iría el resto de tu lógica de validación con inputs negros y elegantes */}
                <div className="space-y-4">
                   <button 
                    onClick={handleClose}
                    className="mt-8 text-xs font-bold tracking-widest text-zinc-400 uppercase hover:text-black transition-colors"
                   >
                     Cerrar
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