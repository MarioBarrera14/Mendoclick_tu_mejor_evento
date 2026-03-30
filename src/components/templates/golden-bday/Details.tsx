"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift } from "lucide-react";
import { useState } from "react";

interface DetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  cbu?: string | null;
  alias?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

// --- MODAL ESTILIZADO (Estilo Galería) ---
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
            className="fixed inset-0 bg-[#5d4037]/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-[92%] max-w-lg h-fit bg-[#fdfdfd] p-8 md:p-12 z-[101] rounded-[2.5rem] shadow-2xl text-center border border-[#B87321]/20"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#B87321]/40 hover:text-[#B87321] transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-4xl font-serif italic text-[#5d4037] mb-8 tracking-tight">{title}</h3>
            <div className="text-[#5d4037]/80 font-medium leading-relaxed">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- BOTÓN DE COPIAR (Estilo Ocre) ---
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="flex flex-col items-center gap-1 group w-full py-4 bg-white/40 backdrop-blur-sm border border-[#B87321]/10 rounded-2xl hover:border-[#B87321]/40 transition-all">
      <span className="text-[9px] text-[#B87321]/60 uppercase tracking-widest font-bold">{label} (Toca para copiar)</span>
      <div className="flex items-center gap-3">
        <span className="text-[#5d4037] font-bold tracking-tight text-lg">{text}</span>
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[#B87321]/30" />}
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
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-32 bg-[#fdfaf1]">
      
      {/* CAPA DE DEGRADADO RADIAL (Igual al Hero) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(153, 45, 45, 0) 50%, rgba(217, 119, 6, 0.25) 100%)"
        }}
      />

      {/* CAPA DE DEGRADADO LINEAL INFERIOR (Igual al Hero) */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(116, 73, 17, 0.2) 0%, rgba(69, 39, 0, 0) 100%)"
        }}
      />

      <div className="container mx-auto px-6 relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="font-serif italic text-5xl md:text-7xl text-[#5d4037] mb-3 tracking-tight">Detalles</p>
            <p className="text-[#B87321] tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold">información importante</p>
            <div className="w-12 h-[1px] bg-[#B87321] mx-auto mt-6 opacity-40" />
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-24">
            <motion.button
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("dress")}
              className="flex flex-col items-center gap-5 group"
            >
              <div className="w-28 h-28 rounded-full border border-[#B87321]/20 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-xl shadow-[#B87321]/5 group-hover:border-[#B87321] transition-all duration-500">
                <Shirt className="w-10 h-10 text-[#B87321] stroke-[1px]" />
              </div>
              <span className="text-[#5d4037] tracking-[0.4em] text-[11px] uppercase font-bold">Dress Code</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal("gift")}
              className="flex flex-col items-center gap-5 group"
            >
              <div className="w-28 h-28 rounded-full border border-[#B87321]/20 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-xl shadow-[#B87321]/5 group-hover:border-[#B87321] transition-all duration-500">
                <Gift className="w-10 h-10 text-[#B87321] stroke-[1px]" />
              </div>
              <span className="text-[#5d4037] tracking-[0.4em] text-[11px] uppercase font-bold">Regalos</span>
            </motion.button>
          </div>
      </div>

      {/* --- MODALES --- */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <p className="text-xl text-[#5d4037]">Para esta noche mágica, <br />el estilo es:</p>
        <div className="my-6 inline-block px-8 py-3 bg-[#fdfaf1] rounded-full border border-[#B87321]/20">
          <strong className="text-[#B87321] font-serif italic tracking-[0.1em] text-3xl block capitalize">
            {dressCode || "Elegante"}
          </strong>
        </div>
        <p className="mt-4 text-sm italic text-[#5d4037]/60 px-6">{dressDescription}</p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <p className="mb-8 italic text-[#5d4037]/80 text-lg">Tu presencia es mi mayor alegría. Pero si deseas hacerme un presente, podés usar estos datos:</p>
        <div className="space-y-4">
          <div className="bg-[#fdfaf1] p-5 rounded-2xl border border-[#B87321]/5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#B87321] mb-2 font-bold">Titular de la cuenta</p>
            <p className="text-[#5d4037] font-serif italic text-2xl">{holderName || "Luz Jazmín"}</p>
          </div>
          <CopyButton label="CBU / CVU" text={cbu || ""} />
          <CopyButton label="Alias" text={alias || ""} />
          <p className="text-[10px] font-bold text-[#B87321]/60 mt-6 tracking-[0.4em] uppercase">{bankName}</p>
        </div>
      </DetailModal>
{/* --- SVG INFERIOR AL RAZ --- */}
<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50 transform translate-y-[1px]">
  <svg 
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none" 
    className="relative block w-full h-12 md:h-28"
    /* rotate(180deg) lo voltea para que la parte recta quede abajo y la curva arriba */
    style={{ transform: 'rotate(180deg)' }}
  >
    <path 
      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
      fill="#fdfaf1" // El color de fondo de la sección
    />
  </svg>
</div>
    </section>
  );
}