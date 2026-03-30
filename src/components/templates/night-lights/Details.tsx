"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift } from "lucide-react";
import { useState } from "react";
// Importamos las decoraciones (asegúrate de que la ruta sea correcta)
import { FlowerDecoration, LeafDecoration, DiamondDivider } from "./Decorations";

// --- INTERFAZ DE PROPS ---
interface DetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  cbu?: string | null;
  alias?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

// --- COMPONENTE DE ONDAS ANIMADAS CENTRALES ---
function AnimatedWaves() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px] border border-white/10 rounded-[40%]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 270, 180, 90, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border border-white/5 rounded-[45%]"
      />
    </div>
  );
}

// --- COMPONENTE MODAL ---
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white p-8 md:p-12 z-[101] rounded-3xl shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-3xl md:text-4xl font-serif italic text-black mb-6 tracking-tight">{title}</h3>
            <div className="text-black/70 font-light leading-relaxed">{children}</div>
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
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="flex flex-col items-center gap-1 group w-full py-3 border border-black/5 rounded-2xl hover:bg-black/5 transition-all">
      <span className="text-[10px] text-black/40 uppercase tracking-widest font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-black font-semibold tracking-tight">{text}</span>
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-black/20" />}
      </div>
    </button>
  );
}

export function Details({ 
  dressCode, 
  dressDescription, 
  cbu, 
  alias, 
  bankName, 
  holderName 
}: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    <section className="relative bg-black pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden">
      
      {/* 1. ONDAS ANIMADAS EN EL CENTRO (BACKGROUND) */}
      <AnimatedWaves />

      {/* 2. DECORACIONES DE ESQUINA */}
      <FlowerDecoration className="absolute -top-10 -left-10 w-40 h-40 text-white/10 rotate-45 pointer-events-none" />
      <FlowerDecoration className="absolute -bottom-20 -right-10 w-64 h-64 text-white/5 -rotate-12 pointer-events-none" />

      {/* ONDA SUPERIOR ESTÁTICA (DIVISOR) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col items-center"
          >
            <p className="font-serif italic text-4xl md:text-6xl text-white mb-3 tracking-tight">Te cuento</p>
            
            {/* DIAMANTE DIVISOR */}
            <DiamondDivider className="mb-4 opacity-50" />
            
            <p className="text-white/60 tracking-[0.4em] text-[10px] md:text-xs uppercase font-light">todos los detalles</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-20">
            {/* BOTÓN DRESS CODE */}
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("dress")}
              className="flex flex-col items-center gap-4 group relative"
            >
              <LeafDecoration className="absolute -top-4 text-white/20 w-12 h-6 group-hover:text-white/40 transition-colors" />
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
                <Shirt className="w-10 h-10 text-white stroke-[1px]" />
              </div>
              <span className="text-white tracking-[0.4em] text-[10px] uppercase font-light">Dress Code</span>
            </motion.button>

            {/* BOTÓN REGALOS */}
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("gift")}
              className="flex flex-col items-center gap-4 group relative"
            >
              <LeafDecoration className="absolute -top-4 text-white/20 w-12 h-6 group-hover:text-white/40 transition-colors scale-x-[-1]" />
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
                <Gift className="w-10 h-10 text-white stroke-[1px]" />
              </div>
              <span className="text-white tracking-[0.4em] text-[10px] uppercase font-light">Regalos</span>
            </motion.button>
          </div>
      </div>

      {/* ONDA INFERIOR ESTÁTICA */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[120px]"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      {/* MODAL DRESS CODE */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <FlowerDecoration className="w-12 h-12 mx-auto mb-4 text-black/10" />
        <p className="text-lg">Para esta noche mágica, el estilo es <br />
          <strong className="text-black font-semibold uppercase tracking-widest text-xl block mt-2 italic">
            {dressCode || "Elegante"}
          </strong>
        </p>
        <p className="mt-4 text-sm italic text-black/60">{dressDescription}</p>
      </DetailModal>

      {/* MODAL REGALOS */}
      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="mb-6 italic">Tu presencia es mi mayor alegría. Pero si deseas hacerme un presente, podés usar estos datos:</p>
        <DiamondDivider className="mb-6 text-black/20" />
        <div className="space-y-3 text-left">
          <div className="bg-black/5 p-4 rounded-2xl">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">Titular</p>
            <p className="text-black font-semibold text-lg">{holderName || "Luz Jazmín"}</p>
          </div>
          <CopyButton label="CBU/CVU" text={cbu || ""} />
          <CopyButton label="Alias" text={alias || ""} />
          <p className="text-xs text-center italic text-black/40 mt-4 tracking-widest uppercase">{bankName}</p>
        </div>
      </DetailModal>

    </section>
  );
}