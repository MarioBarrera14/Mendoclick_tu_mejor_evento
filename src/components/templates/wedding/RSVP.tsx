"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, X, Loader2, KeyRound, CheckCircle2, 
  AlertCircle, PartyPopper, Heart, MessageSquareHeart, 
  Ban 
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
    // Agregamos mb-[-1px] para eliminar la línea de separación con el footer
    <section className="relative py-24 md:py-30 bg-[#F9FAF7] overflow-hidden font-sans mb-[-1px]">
      
      <motion.img 
        src="/elegance-1b.png" 
        className="absolute left-[-3%] top-0 w-32 md:w-64 opacity-10 pointer-events-none z-0"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.img 
        src="/elegance-1a.png" 
        className="absolute right-[-3%] bottom-0 w-32 md:w-64 opacity-10 pointer-events-none z-0"
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-[#94A994]/20 shadow-xl max-w-5xl w-full flex flex-col md:flex-row rounded-[3rem] overflow-visible"
        >
          {/* Planta Moño con opacidad corregida */}
          <motion.div 
            className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 z-30 pointer-events-none drop-shadow-md"
            initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.8, rotate: 12, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img src="/elegance-4b.png" alt="detalle moño" className="w-full h-full object-contain" />
          </motion.div>

          <div className="w-full md:w-1/2 h-[350px] md:h-[550px] overflow-hidden rounded-[3rem] md:rounded-l-[3rem] md:rounded-r-none">
            <img src="/img_boda/gallery-2.jpg" alt="Pareja" className="w-full h-full object-cover grayscale brightness-95" />
          </div>

          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-[3rem] md:rounded-r-[3rem] md:rounded-l-none">
            <div className="mb-6 text-[#94A994]/60"><CalendarCheck size={32} strokeWidth={1} /></div>
            <h2 className="font-serif text-5xl md:text-7xl text-[#94A994] mb-4 italic leading-tight">Confirmación</h2>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-4 max-w-sm">Esperamos que puedas acompañarnos.</p>
            <p className="text-[#94A994] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-12">¡Confirmá tu asistencia!</p>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setIsOpen(true)} className="px-12 py-5 bg-[#94A994] text-white tracking-[0.2em] text-[11px] uppercase font-bold rounded-full shadow-lg">CONFIRMAR</motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Contenido del Modal simplificado para el ejemplo */}
              <div className="p-8 text-center text-[#94A994]">Formulario de Invitación</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}