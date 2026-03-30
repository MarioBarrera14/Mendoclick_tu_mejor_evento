"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

interface DetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  cbu?: string | null;
  alias?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

// --- MODAL BRUTALISTA ---
function DetailModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-0 m-auto w-[92%] max-w-lg h-fit bg-[#0c001a] p-8 md:p-12 z-[101] rounded-[3rem] shadow-[0_0_50px_rgba(147,51,234,0.3)] text-center border border-purple-500/30"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-purple-500/50 hover:text-purple-400 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="flex justify-center mb-4 text-purple-500">
               <Zap size={24} fill="currentColor" />
            </div>
            <h3 className="text-5xl font-black italic text-white mb-8 tracking-tighter uppercase">{title}</h3>
            <div className="text-purple-100/70 font-medium leading-relaxed">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- BOTÓN DE COPIAR ---
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="group w-full py-5 bg-white/5 border border-purple-500/20 rounded-2xl hover:bg-purple-600/10 hover:border-purple-500/50 transition-all flex flex-col items-center gap-1">
      <span className="text-[10px] text-purple-400 font-black uppercase tracking-[0.3em] mb-1">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-white font-mono font-bold text-lg tracking-tight">{text}</span>
        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-purple-500/40 group-hover:text-purple-400" />}
      </div>
    </button>
  );
}

export function Details({ dressCode, dressDescription, cbu, alias, bankName, holderName }: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-40 bg-[#0c001a] overflow-hidden">

      {/* --- FONDO CON GRID REJILLA --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#9333ea 1px, transparent 1px), linear-gradient(90deg, #9333ea 1px, transparent 1px)`,
            backgroundSize: '45px 45px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-6xl md:text-9xl font-black italic text-white leading-none uppercase tracking-tighter">
              The <span className="text-purple-600">Info</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
               <div className="h-[2px] w-12 bg-purple-600" />
               <p className="text-purple-400 tracking-[0.6em] text-[10px] md:text-xs uppercase font-black italic">Detalles del Evento</p>
               <div className="h-[2px] w-12 bg-purple-600" />
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-32">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("dress")}
              className="flex flex-col items-center gap-6 group"
            >
              <div className="w-32 h-32 rounded-3xl border-2 border-purple-500/20 flex items-center justify-center bg-black shadow-2xl shadow-purple-900/40 group-hover:border-purple-500 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Shirt className="w-12 h-12 text-white stroke-[1.5px] relative z-10" />
              </div>
              <span className="text-white tracking-[0.5em] text-xs uppercase font-black italic">Dress Code</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("gift")}
              className="flex flex-col items-center gap-6 group"
            >
              <div className="w-32 h-32 rounded-3xl border-2 border-purple-500/20 flex items-center justify-center bg-black shadow-2xl shadow-purple-900/40 group-hover:border-purple-500 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Gift className="w-12 h-12 text-white stroke-[1.5px] relative z-10" />
              </div>
              <span className="text-white tracking-[0.5em] text-xs uppercase font-black italic">Regalos</span>
            </motion.button>
          </div>
      </div>

      {/* --- MODALES (Dress & Gift) --- */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <p className="text-lg text-purple-100/60 uppercase tracking-widest mb-6 font-mono font-bold">// Estilo de la noche</p>
        <div className="my-8 inline-block px-10 py-4 bg-purple-600 text-white rounded-full shadow-[0_0_30px_rgba(147,51,234,0.5)]">
          <strong className="font-black italic tracking-tighter text-4xl block uppercase leading-none">
            {dressCode || "Elegante"}
          </strong>
        </div>
        <p className="mt-6 text-sm italic text-purple-200/50 px-6 font-medium leading-relaxed">{dressDescription || "Tu mejor outfit para brillar conmigo."}</p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="mb-10 text-purple-100/70 font-medium italic">"Tu presencia es mi regalo preferido, pero si querés ayudarme con mi viaje o mis sueños..."</p>
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-[2rem] border border-purple-500/10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-purple-500 mb-2 font-black">Titular</p>
            <p className="text-white font-black italic text-3xl uppercase tracking-tighter">{holderName || "Luz Jazmín"}</p>
          </div>
          <CopyButton label="Alias" text={alias || "LUZ.JAZMIN.XV"} />
          <CopyButton label="CBU / CVU" text={cbu || "0000003100000000000000"} />
          <div className="pt-4 flex items-center justify-center gap-2">
             <p className="text-[11px] font-black text-white tracking-[0.5em] uppercase">{bankName || "Cuenta Bancaria"}</p>
          </div>
        </div>
      </DetailModal>
      
    </section>
  );
}