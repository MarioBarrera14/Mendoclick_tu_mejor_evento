"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Definimos qué datos esperamos recibir
interface RSVPProps {
  config: {
    heroImage: string;
    eventDate: string;
    confirmDate: string;
  };
}

export function RSVP({ config }: RSVPProps) { // Recibimos la prop config
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    <section className="relative py-20 md:py-28 overflow-hidden font-sans mb-[-1px] bg-[url('/images/img-grafitis/pared.jpg')] bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/30 backdrop-blur-xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row rounded-[1rem] overflow-hidden border border-white/30"
        >
          <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative">
            <Image 
              src={config.heroImage} // <--- USAMOS LA IMAGEN DINÁMICA
              alt="Portada RSVP" 
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center relative bg-transparent">
            <div className="mb-4 w-12 h-12 md:w-16 md:h-16 relative">
              <Image 
                src="/images/img-grafitis/sobre.png"
                alt="Sobre"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-6xl text-black mb-4 uppercase tracking-tighter">
              Confirmación
            </h2>

            <p className="text-black text-sm md:text-base font-medium leading-relaxed mb-1 max-w-xs">
              Esperamos que puedas acompañarnos.
            </p>
            
            <p className="text-black/70 text-[10px] md:text-xs font-bold tracking-normal mb-8">
              ¡Confirmá tu asistencia antes del  {formattedDate}! {/* <--- USAMOS LA FECHA DINÁMICA */}
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setIsOpen(true)} 
              className="px-10 py-3 bg-[#5ba394] hover:bg-[#4d8a7d] text-white tracking-widest text-xs uppercase font-bold rounded-full shadow-lg transition-colors font-['Permanent_Marker',_cursive]"
            >
              CONFIRMAR ASISTENCIA
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               exit={{ scale: 0.8, opacity: 0 }} 
               className="relative w-full max-w-lg bg-white/30 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl z-10 border border-white/40"
            >
              <button onClick={handleClose} className="absolute top-6 right-6 text-black hover:scale-110 transition-transform">
                <X size={24} />
              </button>
              
              <div className="text-center">
                 <h3 className="font-['Permanent_Marker',_cursive] text-3xl mb-4 text-black uppercase">Asistencia</h3>
                 <p className="text-black/80 font-medium text-sm mb-6 uppercase tracking-tight">Ingresa tu código de invitación</p>
                 <input 
                  type="text" 
                  placeholder="CÓDIGO" 
                  className="w-full bg-white/50 border-2 border-white/20 p-3 rounded-xl mb-4 text-center font-bold tracking-widest outline-none focus:border-[#5ba394] text-black placeholder:text-black/40"
                 />
                 <button className="w-full py-3 bg-black text-white rounded-xl font-bold font-['Permanent_Marker',_cursive] uppercase tracking-wider shadow-lg hover:bg-zinc-900 transition-colors">
                   VALIDAR
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div className="w-full h-[60px] md:h-[160px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" />
      </div>
    </section>
  );
}