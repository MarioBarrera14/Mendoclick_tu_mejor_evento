"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Gift, Shirt, X, Copy, Check } from "lucide-react";

// --- INTERFAZ CONECTADA AL SCHEMA DE PRISMA ---
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

  const handleCopy = async (text: string, field: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="relative py-24 md:py-24 bg-white overflow-hidden font-sans">
      
      {/* LA FRANJA INCLINADA - Estética Champagne */}
      <div 
        className="absolute inset-0 bg-[#d1d1d1] z-0"
        style={{ 
          clipPath: "polygon(0 10%, 100% 0%, 100% 90%, 0% 100%)" 
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-start pt-6">
          
          {/* COLUMNA IZQUIERDA: REGALOS (Dinámico) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-4 px-2"
          >
            <h2 className="font-script text-4xl md:text-5xl text-[#b4a178]">Regalos</h2>
            <p className="text-gray-500 text-[11px] md:text-[13px] leading-relaxed font-light max-w-[260px]">
              El mejor regalo es que me acompañes en mi gran día, pero si deseás hacerme un presente aquí te dejo los datos.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[220px]">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal("gift")}
                className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-400 rounded-full text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-100 transition-all shadow-sm bg-white"
              >
                <Gift size={12} />
                Cuenta Bancaria
              </motion.button>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: DRESS CODE (Dinámico) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center space-y-4 px-2"
          >
            <h2 className="font-script text-4xl md:text-5xl text-[#b4a178]">Dress Code</h2>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-gray-800 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                {config.dressCode || "Elegante"}
              </span>
              <p className="text-gray-500 text-[10px] md:text-[11px] italic font-light">
                {config.dressDescription || "(Sin ropa deportiva ni gorras)"}
              </p>
            </div>
            <div className="w-full max-w-[220px]">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal("dress")}
                className="flex items-center justify-center gap-2 w-full px-6 py-2 border border-gray-400 rounded-full text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-100 transition-all shadow-sm bg-white"
              >
                <Shirt size={12} />
                Ver sugerencia
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* MODAL CON GLASSMORPHISM SUAVE */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-sm p-8 rounded-sm shadow-xl text-center text-gray-800"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>

              {activeModal === "gift" ? (
                <div className="space-y-6">
                  <h3 className="font-script text-4xl text-[#b4a178]">Datos Bancarios</h3>
                  <div className="text-left space-y-3">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="text-[9px] uppercase tracking-widest text-gray-400">Titular</p>
                      <p className="text-sm text-gray-700 font-medium uppercase">{config.holderName || "Novios"}</p>
                    </div>
                    {config.cbu && (
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <div className="overflow-hidden">
                          <p className="text-[9px] uppercase tracking-widest text-gray-400">CBU / CVU</p>
                          <p className="text-[11px] text-gray-700 truncate pr-2 tabular-nums">{config.cbu}</p>
                        </div>
                        <button onClick={() => handleCopy(config.cbu!, 'cbu')} className="text-[#b4a178] shrink-0 hover:scale-110 transition-transform">
                          {copied === 'cbu' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                    {config.alias && (
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400">Alias</p>
                          <p className="text-sm text-gray-700 font-medium italic lowercase">{config.alias}</p>
                        </div>
                        <button onClick={() => handleCopy(config.alias!, 'alias')} className="text-[#b4a178] shrink-0 hover:scale-110 transition-transform">
                          {copied === 'alias' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                    {config.bankName && (
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                        Banco: {config.bankName}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-script text-4xl text-[#b4a178]">Dress Code</h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed uppercase tracking-widest">
                    {config.dressCode || "Elegante"}
                  </p>
                  <div className="w-8 h-[1px] bg-gray-200 mx-auto" />
                  <p className="text-[11px] text-gray-500 italic leading-relaxed">
                    {config.dressDescription || "Tu mejor outfit para celebrar juntos esta noche inolvidable."}
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