"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [guestCode, setGuestCode] = useState("");

  // BLOQUEO DE SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };
  const formattedDate = new Date(`${config.eventDate}T00:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-28 overflow-hidden font-sans bg-[url('/images/img-grafitis/pared.jpg')] bg-cover bg-center">
      
      {/* SEPARADOR SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
        <div className="w-full h-[60px] md:h-[180px] bg-[#f7e6c4] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
      
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/20 backdrop-blur-xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/30"
        >
          
          {/* IMAGEN IZQUIERDA */}
          <div className="w-full md:w-1/2 h-[220px] md:h-auto min-h-[300px] md:min-h-[500px] relative">
            <Image 
              src={config.heroImage}
              alt="Evento" 
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
          </div>

          {/* CONTENIDO DERECHA */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center justify-center text-center relative bg-white/10 md:bg-transparent">
            <div className="mb-4 w-10 h-10 md:w-16 md:h-16 relative">
              <Image 
                src="/images/img-grafitis/sobre.png"
                alt="Confirmar"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="font-['Permanent_Marker',_cursive] text-2xl sm:text-4xl md:text-4xl text-black md:text-black mb-4 uppercase tracking-tighter leading-none">
              Confirmación
            </h2>

            <p className="text-black md:text-black text-sm md:text-base font-bold leading-tight mb-2 max-w-[200px] md:max-w-xs uppercase">
              Esperamos que puedas acompañarnos en este día.
            </p>
            
            <p className="text-black/80 md:text-black/70 text-[10px] md:text-xs font-black tracking-[0.1em] mb-8 uppercase">
              Confirmá antes del {formattedDate}
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setIsOpen(true)} 
              className="w-full max-w-[260px] md:w-auto px-8 py-4 bg-[#5ba394] hover:bg-[#4d8a7d] text-white tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold rounded-full shadow-lg transition-colors font-sans"
            >
              CONFIRMAR ASISTENCIA
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* MODAL RESPONSIVO */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 40 }} 
               animate={{ scale: 1, opacity: 1, y: 0 }} 
               exit={{ scale: 0.9, opacity: 0, y: 40 }} 
               className="relative w-full max-w-md bg-white/90 md:bg-white/40 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 shadow-2xl z-10 border border-white/40 text-center"
            >
              <button onClick={handleClose} className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors">
                <X strokeWidth={2.5} className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <div className="mt-4">
                 <h3 className="font-['Permanent_Marker',_cursive] text-3xl md:text-4xl mb-2 text-black uppercase tracking-tighter">Asistencia</h3>
                 <p className="text-black/70 font-bold text-[9px] md:text-[10px] mb-6 md:mb-8 uppercase tracking-[0.2em]">Ingresá tu código de invitación</p>
                 
                 <input 
                  type="text" 
                  value={guestCode}
                  onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                  placeholder="CÓDIGO" 
                  className="w-full bg-white/80 border-2 border-transparent focus:border-[#5ba394] p-3 md:p-4 rounded-xl md:rounded-2xl mb-4 text-center font-black tracking-[0.3em] outline-none text-black placeholder:text-black/30 shadow-inner"
                 />
                 
                 <button className="w-full py-4 bg-black text-white rounded-xl md:rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl hover:bg-zinc-800 transition-all">
                   VALIDAR ACCESO
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SEPARADOR INFERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
        <div className="w-full h-[60px] md:h-[160px] bg-white [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}