"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Gift, Shirt, X, Copy, Check } from "lucide-react";

interface DetailsProps {
  config: {
    dressCode?: string | null;
    dressDescription?: string | null;
    cbu?: string | null;
    alias?: string | null;
    bankName?: string | null;
    holderName?: string | null;
  };
}

export function Details({ config }: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // --- BLOQUEO DE SCROLL ROBUSTO (HTML + BODY) ---
  useEffect(() => {
    if (activeModal) {
      // Bloqueamos ambos para asegurar compatibilidad en móviles y desktop
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    // Cleanup: Al desmontar el componente, nos aseguramos de devolver el scroll
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const handleCopy = async (text: string, field: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="relative py-24 md:py-24 bg-white overflow-hidden font-sans">
      
      {/* LA FRANJA INCLINADA */}
      <div 
        className="absolute inset-0 bg-[#d1d1d1] z-0"
        style={{ 
          clipPath: "polygon(0 10%, 100% 0%, 100% 120%, 0% 100%)" 
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-start pt-6">
          
          {/* REGALOS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-4 px-2"
          >
            <h2 className="font-script text-4xl md:text-5xl text-[#b4a178]">Regalos</h2>
            <p className="text-gray-500 text-[11px] md:text-[13px] leading-relaxed font-light max-w-[260px]">
              Tu presencia es nuestro mejor regalo, pero si deseás hacernos un presente, valoramos mucho tu colaboración.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[220px]">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal("gift")}
                className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-400 rounded-full text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-100 transition-all shadow-sm bg-white"
              >
                <Gift size={12} />
                Datos bancarios
              </motion.button>
            </div>
          </motion.div>

          {/* DRESS CODE */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center space-y-4 px-2"
          >
            <h2 className="font-script text-4xl md:text-5xl text-[#b4a178]">Dress Code</h2>
            <p className="text-gray-500 text-[11px] md:text-[13px] leading-relaxed font-light max-w-[260px]">
              La elegancia es la única belleza que nunca desaparece. Te esperamos con tu mejor gala.
            </p>
            <div className="w-full max-w-[220px]">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal("dress")}
                className="flex items-center justify-center gap-2 w-full px-6 py-2 border border-gray-400 rounded-full text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-100 transition-all shadow-sm bg-white"
              >
                <Shirt size={12} />
                Sugerencia
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL GLOBAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            {/* OVERLAY: touch-none evita scroll táctil en el fondo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 backdrop-blur-md touch-none"
              style={{
                background: "radial-gradient(circle, rgba(180, 161, 120, 0.2) 0%, rgba(0, 0, 0, 0.85) 100%)"
              }}
            />

            {/* CAJA DEL MODAL: touch-auto permite scroll interno si el contenido crece */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm p-8 rounded-sm shadow-2xl text-center text-gray-800 z-[10000] touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>

              {activeModal === "gift" ? (
                <div className="space-y-6">
                  <h3 className="font-script text-4xl text-[#b4a178]">Presentes</h3>
                  <div className="text-left space-y-3">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="text-[9px] uppercase tracking-widest text-gray-400">Titular de cuenta</p>
                      <p className="text-sm text-gray-700 font-medium uppercase">{config.holderName || "Confirmar Titular"}</p>
                    </div>
                    {config.cbu && (
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <div className="overflow-hidden">
                          <p className="text-[9px] uppercase tracking-widest text-gray-400">CBU / CVU</p>
                          <p className="text-[11px] text-gray-700 pr-2 tabular-nums font-bold">{config.cbu}</p>
                        </div>
                        <button onClick={() => handleCopy(config.cbu!, 'cbu')} className="text-[#b4a178] shrink-0">
                          {copied === 'cbu' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                    {config.alias && (
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400">Alias</p>
                          <p className="text-sm text-gray-700 font-bold italic lowercase">{config.alias}</p>
                        </div>
                        <button onClick={() => handleCopy(config.alias!, 'alias')} className="text-[#b4a178] shrink-0">
                          {copied === 'alias' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-script text-4xl text-[#b4a178]">Dress Code</h3>
                  <p className="text-sm text-gray-800 font-bold uppercase tracking-[0.2em]">
                    {config.dressCode || "Elegante"}
                  </p>
                  <div className="w-8 h-[1px] bg-[#b4a178] mx-auto" />
                  <p className="text-[12px] text-gray-500 font-medium leading-relaxed italic">
                    "{config.dressDescription || "Tu estilo es el mejor detalle para esta celebración."}"
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}