"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift } from "lucide-react";
import { useState } from "react";
import { FlowerDecoration, LeafDecoration, DiamondDivider } from "./Decorations";

interface DetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  cbu?: string | null;
  alias?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

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
        className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] border border-white/10 rounded-[40%]"
      />
    </div>
  );
}

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
            className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white p-6 md:p-12 z-[101] rounded-[2.5rem] shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-5 right-5 text-black/20 hover:text-black transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl md:text-4xl font-serif italic text-black mb-4 md:mb-6 tracking-tight">{title}</h3>
            <div className="text-black/70 font-light text-sm md:text-base leading-relaxed">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="flex flex-col items-center gap-1 group w-full py-3 border border-black/5 rounded-2xl hover:bg-black/5 transition-all">
      <span className="text-[9px] md:text-[10px] text-black/40 uppercase tracking-widest font-medium font-sans">{label}</span>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-black font-semibold tracking-tight text-sm md:text-base break-all px-2">{text}</span>
        {copied ? <Check className="w-4 h-4 text-green-600 shrink-0" /> : <Copy className="w-4 h-4 text-black/20 shrink-0" />}
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
    <section className="relative bg-black pt-40 pb-40 md:pt-60 md:pb-60 overflow-visible">
      
      {/* --- DIVISOR SUPERIOR (Blanco a Negro) --- */}
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] scale-y-[1.02] origin-top">
          <path d="M0,0 H1200 V60 L1150,45 L1100,65 L1050,50 L1000,70 L950,55 L900,75 L850,60 L800,80 L750,65 L700,85 L650,70 L600,90 L550,75 L500,95 L450,80 L400,100 L350,85 L300,105 L250,90 L200,110 L150,95 L100,115 L50,100 L0,120 Z" fill="#fcfcfc"></path>
        </svg>
      </div>

      <AnimatedWaves />

      <FlowerDecoration className="absolute -top-5 -left-5 w-32 h-32 md:w-40 md:h-40 text-white/10 rotate-45 pointer-events-none" />
      <FlowerDecoration className="absolute -bottom-10 -right-5 w-48 h-48 md:w-64 md:h-64 text-white/5 -rotate-12 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20 flex flex-col items-center"
          >
            <p className="font-serif italic text-4xl md:text-6xl text-white mb-2 tracking-tight">Te cuento</p>
            <DiamondDivider className="mb-3 md:mb-4 opacity-50 text-white w-24 md:w-auto" />
            <p className="text-white/60 tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-xs uppercase font-light font-sans">todos los detalles</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 md:gap-20">
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("dress")}
              className="flex flex-col items-center gap-3 md:gap-4 group relative"
            >
              <LeafDecoration className="absolute -top-3 text-white/20 w-10 h-5 md:w-12 md:h-6 group-hover:text-white/40 transition-colors" />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
                <Shirt className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1px]" />
              </div>
              <span className="text-white tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase font-light font-sans">Dress Code</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("gift")}
              className="flex flex-col items-center gap-3 md:gap-4 group relative"
            >
              <LeafDecoration className="absolute -top-3 text-white/20 w-10 h-5 md:w-12 md:h-6 group-hover:text-white/40 transition-colors scale-x-[-1]" />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
                <Gift className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1px]" />
              </div>
              <span className="text-white tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase font-light font-sans">Regalos</span>
            </motion.button>
          </div>
      </div>

      {/* --- DIVISOR INFERIOR (CORREGIDO: Negro a Blanco) --- */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] scale-y-[1.02] origin-bottom">
          {/* Este path dibuja el blanco desde ABAJO hacia ARRIBA con los picos invertidos */}
          <path d="M0,120 H1200 V60 L1150,75 L1100,55 L1050,70 L1000,50 L950,65 L900,45 L850,60 L800,40 L750,55 L700,35 L650,50 L600,30 L550,45 L500,25 L450,40 L400,20 L350,35 L300,15 L250,30 L200,10 L150,25 L100,5 L50,20 L0,0 Z" fill="#fcfcfc"></path>
        </svg>
      </div>

      {/* MODALES */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <FlowerDecoration className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-black/10" />
        <p className="text-base md:text-lg text-neutral-800 font-sans italic">Para esta noche mágica, el estilo es <br />
          <strong className="text-black font-semibold uppercase tracking-widest text-lg md:text-xl block mt-1 md:mt-2 italic font-serif">
            {dressCode || "Elegante"}
          </strong>
        </p>
        <p className="mt-3 md:mt-4 text-xs md:text-sm italic text-black/60 leading-relaxed font-sans">{dressDescription}</p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="mb-4 md:mb-6 italic text-neutral-600 leading-relaxed text-sm md:text-base font-sans italic">Tu presencia es nuestra mayor alegría. Pero si deseas hacernos un presente, puedes usar estos datos:</p>
        <DiamondDivider className="mb-4 md:mb-6 text-black/20 w-20 mx-auto" />
        <div className="space-y-2 md:space-y-3 text-left">
          <div className="bg-black/5 p-3 md:p-4 rounded-2xl text-center">
            <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-1 font-sans font-bold">Titular</p>
            <p className="text-black font-semibold text-base md:text-lg leading-tight font-sans italic">{holderName || "Flor y Santi"}</p>
          </div>
          <CopyButton label="CBU/CVU" text={cbu || "000000000000000000000"} />
          <CopyButton label="Alias" text={alias || "boda.flor.santi"} />
          <p className="text-[10px] text-center italic text-black/40 mt-3 tracking-widest uppercase font-sans font-bold">{bankName || "Santander"}</p>
        </div>
      </DetailModal>

    </section>
  );
}