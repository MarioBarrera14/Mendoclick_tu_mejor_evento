"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift, Zap, Plus } from "lucide-react";
import { useState, useEffect } from "react";

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
  
  // --- BLOQUEO DE SCROLL ROBUSTO (HTML + BODY) ---
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay con touch-none para blindar el scroll táctil de fondo */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/90 backdrop-blur-md touch-none" 
          />
          
          {/* Contenedor del Modal con touch-auto para permitir interacción interna */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 10 }} 
            className="relative w-full max-w-md bg-[#0c001a] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-purple-500/30 text-center z-10 touch-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-purple-500/40 hover:text-purple-400 transition-colors">
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
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="group w-full py-3 bg-white/5 border border-purple-500/20 rounded-xl hover:bg-purple-600/10 transition-all flex flex-col items-center">
      <span className="text-[8px] text-purple-400 font-black uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white font-mono font-bold text-sm">{text}</span>
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-purple-500/40" />}
      </div>
    </button>
  );
}

export function Details({ config }: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-16 bg-[#0c001a] overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/regalosyropa.png" 
          alt="Fondo Detalles" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.2]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c001a] via-transparent to-[#0c001a]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pr-4">Info</span>
          </h2>
          <p className="text-purple-400 tracking-[0.4em] text-[9px] uppercase font-black italic mt-2">Detalles del Evento</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group bg-black/50 backdrop-blur-md border border-purple-500/20 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-purple-500/50 transition-all">
            <Shirt size={28} className="text-purple-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic mb-2">// Estilo</p>
            <span className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">
              {config.dressCode || "Elegante"}
            </span>
            <button onClick={() => setActiveModal("dress")} className="mt-auto flex items-center gap-2 bg-purple-600 hover:bg-white text-white hover:text-black px-6 py-3 rounded-full transition-all text-[10px] font-black uppercase tracking-widest shadow-lg">
              Ver Detalles <Plus size={14} />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group bg-black/50 backdrop-blur-md border border-purple-500/20 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-purple-500/50 transition-all">
            <Gift size={28} className="text-purple-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic mb-2">// Presentes</p>
            <span className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">Regalos</span>
            <button onClick={() => setActiveModal("gift")} className="mt-auto flex items-center gap-2 border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white px-6 py-2.5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest">
              Ver Cuentas <Zap size={14} fill="currentColor" />
            </button>
          </motion.div>
        </div>
      </div>

      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <div className="bg-purple-600/10 p-5 rounded-2xl border border-purple-500/20 mb-4 text-white text-2xl font-black italic uppercase leading-none">
          {config.dressCode || "Elegante"}
        </div>
        <p className="italic text-sm leading-relaxed">
          {config.dressDescription || "Tu mejor outfit para brillar en esta noche especial."}
        </p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="text-xs text-purple-200/50 italic mb-6 uppercase tracking-widest">Si deseas colaborar con mi regalo:</p>
        <div className="space-y-3">
          <div className="bg-white/5 p-3 rounded-xl border border-purple-500/10 text-center">
            <p className="text-[8px] uppercase tracking-widest text-purple-400 font-black">Titular</p>
            <p className="text-white font-black italic text-lg uppercase tracking-tight leading-none mt-1">
              {config.holderName || "Quinceañera"}
            </p>
          </div>
          <CopyButton label="Alias" text={config.alias || "ALIAS.PENDIENTE"} />
          <CopyButton label="CBU / CVU" text={config.cbu || "000000000000000000000"} />
          {config.bankName && (
            <p className="text-[9px] font-black text-white/20 tracking-widest uppercase mt-2">
              Banco: {config.bankName}
            </p>
          )}
        </div>
      </DetailModal>
    </section>
  );
}