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

const WAVE_PATH = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

function DetailModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white p-8 md:p-12 z-[101] rounded-3xl shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-black/20 hover:text-black/50 transition-colors"><X className="w-6 h-6" /></button>
            <h3 className="text-3xl md:text-4xl font-serif italic text-[#4B664B] mb-6 tracking-tight">{title}</h3>
            <div className="text-[#4B664B]/80 font-light leading-relaxed">{children}</div>
          </motion.div>
        </>
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
    <button onClick={handleCopy} className="flex flex-col items-center gap-1 group w-full py-3 border border-[#4B664B]/10 rounded-2xl hover:bg-[#4B664B]/5 transition-all">
      <span className="text-[10px] text-[#4B664B]/50 uppercase tracking-widest font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[#4B664B] font-semibold tracking-tight">{text || "No disponible"}</span>
        {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4 text-[#4B664B]/30" />}
      </div>
    </button>
  );
}

export function Details({ dressCode, dressDescription, cbu, alias, bankName, holderName }: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    // mt-[-1px] y mb-[-1px] para eliminar gaps
    <section 
      className="relative pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden bg-cover bg-center bg-no-repeat mt-[-1px] mb-[-1px]"
      style={{ backgroundImage: "url('/fondowedin.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#94A994]/50 z-0" />
      
      {/* --- OLAS SUPERIORES --- */}
      <div className="absolute top-[-2px] left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" preserveAspectRatio="none" 
          className="relative block w-[200%] h-[60px] md:h-[100px] scale-y-110"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#F9FAF7" fillOpacity="0.25" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" fillOpacity="0.25" />
        </motion.svg>
        <motion.svg 
          viewBox="0 0 1200 120" preserveAspectRatio="none" 
          className="absolute top-0 left-0 block w-[200%] h-[50px] md:h-[90px] scale-y-110"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#F9FAF7" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md rounded-[3rem] p-10 md:p-20 shadow-xl border border-white/10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 flex flex-col items-center text-center">
            <p className="font-serif italic text-5xl md:text-7xl text-[#4B664B] mb-3 tracking-tight">Te cuento</p>
            <DiamondDivider className="mb-4 text-[#4B664B]/20" />
            <p className="text-[#4B664B]/60 tracking-[0.4em] text-[10px] md:text-xs uppercase font-medium">todos los detalles</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-24">
            <motion.button whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveModal("dress")} className="flex flex-col items-center gap-4 group relative">
              <LeafDecoration className="absolute -top-6 text-[#4B664B]/20 w-12 h-6 group-hover:text-[#4B664B]/40 transition-colors" />
              <div className="w-24 h-24 rounded-full border border-[#4B664B]/20 flex items-center justify-center group-hover:border-[#4B664B]/40 group-hover:bg-[#4B664B]/5 transition-all duration-500 shadow-sm bg-white/50">
                <Shirt className="w-10 h-10 text-[#4B664B] stroke-[1px]" />
              </div>
              <span className="text-[#4B664B] tracking-[0.4em] text-[10px] uppercase font-bold">Dress Code</span>
            </motion.button>

            <motion.button whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveModal("gift")} className="flex flex-col items-center gap-4 group relative">
              <LeafDecoration className="absolute -top-6 text-[#4B664B]/20 w-12 h-6 group-hover:text-[#4B664B]/40 transition-colors scale-x-[-1]" />
              <div className="w-24 h-24 rounded-full border border-[#4B664B]/20 flex items-center justify-center group-hover:border-[#4B664B]/40 group-hover:bg-[#4B664B]/5 transition-all duration-500 shadow-sm bg-white/50">
                <Gift className="w-10 h-10 text-[#4B664B] stroke-[1px]" />
              </div>
              <span className="text-[#4B664B] tracking-[0.4em] text-[10px] uppercase font-bold">Regalos</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- OLAS INFERIORES --- */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0] z-10">
        <motion.svg 
          viewBox="0 0 1200 120" preserveAspectRatio="none" 
          className="relative block w-[200%] h-[70px] md:h-[130px] scale-y-110"
          style={{ rotate: 180 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity="0.3" />
          <path d={WAVE_PATH} x="1200" fill="#ffffff" fillOpacity="0.3" />
        </motion.svg>

        <motion.svg 
          viewBox="0 0 1200 120" preserveAspectRatio="none" 
          className="absolute bottom-0 left-0 block w-[200%] h-[60px] md:h-[110px] scale-y-110"
          style={{ rotate: 180 }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          <path d={WAVE_PATH} fill="#F9FAF7" />
          <path d={WAVE_PATH} x="1200" fill="#F9FAF7" />
        </motion.svg>
      </div>

      {/* MODALES */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <FlowerDecoration className="w-12 h-12 mx-auto mb-4 text-[#4B664B]/10" />
        <p className="text-lg text-[#4B664B]">Para esta noche mágica, el estilo es <br />
          <strong className="text-[#4B664B] font-semibold uppercase tracking-widest text-xl block mt-2 italic">
            {dressCode || "Elegante"}
          </strong>
        </p>
        <p className="mt-4 text-sm italic text-[#4B664B]/70">{dressDescription}</p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="mb-6 italic text-[#4B664B]">Tu presencia es mi alegría. Si deseas hacerme un presente:</p>
        <DiamondDivider className="mb-6 text-[#4B664B]/20" />
        <div className="space-y-3 text-left">
          <div className="bg-[#4B664B]/5 p-4 rounded-2xl border border-[#4B664B]/10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4B664B]/50 mb-1">Titular</p>
            <p className="text-[#4B664B] font-semibold text-lg">{holderName || "Luz Jazmín"}</p>
          </div>
          <CopyButton label="CBU/CVU" text={cbu || ""} />
          <CopyButton label="Alias" text={alias || ""} />
          <p className="text-xs text-center italic text-[#4B664B]/50 mt-4 tracking-widest uppercase">{bankName}</p>
        </div>
      </DetailModal>
    </section>
  );
}