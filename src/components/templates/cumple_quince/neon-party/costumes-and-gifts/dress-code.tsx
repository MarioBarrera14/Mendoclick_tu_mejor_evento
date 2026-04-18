"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift, Zap, Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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

function DetailModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/90 backdrop-blur-md touch-none" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="relative w-full max-w-md bg-[#0c001a] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-purple-500/30 text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-purple-500/40 hover:text-purple-400 transition-colors p-2">
              <X size={24} />
            </button>
            <h3 className="text-3xl font-black italic text-white mb-6 tracking-tighter uppercase">{title}</h3>
            <div className="text-purple-100/70 text-sm font-medium leading-relaxed">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  }, [text]);

  return (
    <button 
      onClick={handleCopy} 
      className="group w-full py-3 bg-white/5 border border-purple-500/20 rounded-xl hover:bg-purple-600/10 active:scale-95 transition-all flex flex-col items-center"
    >
      <span className="text-[8px] text-purple-400 font-black uppercase tracking-[0.2em]">{label}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-white font-mono font-bold text-sm tracking-tight">{text}</span>
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="text-purple-500/40 group-hover:text-purple-400 transition-colors" />
        )}
      </div>
    </button>
  );
}

export function Details({ config }: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-20 bg-[#0c001a] overflow-hidden">
      
      {/* FONDO OPTIMIZADO */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/regalosyropa.webp" 
          alt="Fondo Detalles Neon" 
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25 grayscale-[0.3]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c001a] via-transparent to-[#0c001a]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pr-2">Info</span>
          </h2>
          <p className="text-purple-400 tracking-[0.5em] text-[10px] uppercase font-black italic mt-4">Detalles del Evento</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* DRESS CODE CARD */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="group bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center hover:border-purple-500/50 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shirt size={32} className="text-purple-500" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/60 italic mb-2">// Estilo</p>
            <span className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">
              {config.dressCode || "Elegante"}
            </span>
            <button 
              onClick={() => setActiveModal("dress")} 
              className="mt-auto flex items-center gap-2 bg-purple-600 hover:bg-white text-white hover:text-black px-8 py-4 rounded-full transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Ver Detalles <Plus size={14} />
            </button>
          </motion.div>

          {/* GIFTS CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="group bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center hover:border-purple-500/50 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Gift size={32} className="text-purple-500" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/60 italic mb-2">// Presentes</p>
            <span className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">Regalos</span>
            <button 
              onClick={() => setActiveModal("gift")} 
              className="mt-auto flex items-center gap-2 border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white px-8 py-3.5 rounded-full transition-all text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Ver Cuentas <Zap size={14} fill="currentColor" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* MODAL DRESS CODE */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <div className="bg-purple-600/10 p-6 rounded-3xl border border-purple-500/20 mb-6 text-white text-3xl font-black italic uppercase leading-none">
          {config.dressCode || "Elegante"}
        </div>
        <p className="italic text-sm leading-relaxed text-purple-100/80 px-4">
          {config.dressDescription || "Tu mejor outfit para brillar en esta noche especial de neón y música."}
        </p>
      </DetailModal>

      {/* MODAL REGALOS */}
      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="text-[10px] text-purple-400 font-black italic mb-8 uppercase tracking-[0.3em]">Si deseas colaborar con mi regalo:</p>
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-purple-500/10 text-center mb-2">
            <p className="text-[8px] uppercase tracking-widest text-purple-400/60 font-black">Titular de la cuenta</p>
            <p className="text-white font-black italic text-xl uppercase tracking-tight leading-none mt-2">
              {config.holderName || "Quinceañera"}
            </p>
          </div>
          <CopyButton label="Alias" text={config.alias || "CARGANDO.ALIAS"} />
          <CopyButton label="CBU / CVU" text={config.cbu || "000000000000000000000"} />
          {config.bankName && (
            <p className="text-[9px] font-black text-white/30 tracking-[0.3em] uppercase mt-4">
              Entidad: {config.bankName}
            </p>
          )}
        </div>
      </DetailModal>
    </section>
  );
}