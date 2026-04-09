"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Shirt, Gift, Landmark } from "lucide-react";
import { useState } from "react";

interface DetailsProps {
  dressCode?: string | null;
  dressDescription?: string | null;
  cbu?: string | null;
  alias?: string | null;
  bankName?: string | null;
  holderName?: string | null;
}

// Componente de las líneas de velocidad sutiles
const SpeedLinesBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px)`,
        backgroundSize: '8px 100%',
      }}
    />
  </div>
);

function DetailModal({ isOpen, onClose, title, children, icon: Icon }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; icon?: any }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 m-auto w-[90%] max-w-[400px] h-fit bg-white z-[101] rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="relative p-8 pt-12 flex flex-col items-center">
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
              
              {Icon && <Icon className="mb-4 text-[#b5a47a]" size={36} strokeWidth={1.5} />}
              <h3 className="text-xl font-serif italic text-gray-900 tracking-tight border-b border-[#b5a47a]/30 w-full pb-3 text-center">
                {title}
              </h3>
            </div>

            <div className="px-10 pb-10 flex flex-col gap-6">
              {children}
              <button 
                onClick={onClose}
                className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-gray-800 transition-all"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CopyItem({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col text-left group cursor-pointer bg-gray-50 p-3 rounded-xl border border-gray-100" onClick={handleCopy}>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900 text-sm break-all">{value}</span>
        {copied ? <Check className="text-green-600" size={16} /> : <Copy className="text-gray-300" size={16} />}
      </div>
    </div>
  );
}

export function Details({ 
  dressCode, dressDescription, cbu, alias, bankName, holderName 
}: DetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">

      {/* OVERLAY DE LEGIBILIDAD */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

      {/* LÍNEAS DE VELOCIDAD */}
      <SpeedLinesBackground />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20 max-w-4xl mx-auto">
          
          {/* TARJETA 1: DRESS CODE */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.05 }}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => setActiveModal("dress")}
          >
            <div className="relative bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 transition-all aspect-square flex items-center justify-center mb-6">
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 rounded-full" />
              <div className="absolute inset-5 border border-black/80 rounded-full z-10" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white flex flex-col items-center justify-center z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
                <Shirt className="text-[#b5a47a] mb-2" size={32} strokeWidth={1} />
                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Estilo</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-serif italic text-white drop-shadow-sm mb-1 transition-all duration-500 group-hover:drop-shadow-lg">Dress Code</h3>
              <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#b5a47a] drop-shadow-sm">Ver Detalles</p>
            </div>
          </motion.div>

          {/* TARJETA 2: REGALOS */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.05 }}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => setActiveModal("gift")}
          >
            <div className="relative bg-[#fcfaf2] p-3 md:p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 transition-all aspect-square flex items-center justify-center mb-6">
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 rounded-full" />
              <div className="absolute inset-5 border border-black/80 rounded-full z-10" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-[4px] md:border-[6px] border-[#b5a47a] bg-white flex flex-col items-center justify-center z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
                <Gift className="text-[#b5a47a] mb-2" size={32} strokeWidth={1} />
                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Regalos</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-serif italic text-white drop-shadow-md mb-1 transition-all duration-500 group-hover:drop-shadow-lg">Cuentas</h3>
              <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#b5a47a] drop-shadow-sm">Ver Datos</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* MODALES */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code" icon={Shirt}>
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500 italic leading-relaxed">
            Nuestra boda será un evento formal. <br />
            <strong className="text-black font-bold uppercase tracking-[0.2em] block mt-2 text-lg">
              {dressCode || "Elegante"}
            </strong>
          </p>
          <div className="w-8 h-px bg-[#b5a47a]/30 mx-auto" />
          <p className="text-xs text-gray-400 font-light italic leading-snug">
            {dressDescription || "Usa tus mejores prendas para celebrar con nosotros."}
          </p>
        </div>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos" icon={Landmark}>
        <div className="space-y-4">
          <p className="text-xs text-gray-500 text-center italic mb-4">
            Si deseas hacernos un presente, puedes usar estos datos:
          </p>
          <CopyItem label="Titular" value={holderName || "Flor y Santi"} />
          <CopyItem label="CBU / CVU" value={cbu || "0000000000000000000"} />
          <CopyItem label="Alias" value={alias || "boda.flor.santi"} />
          <p className="text-[9px] text-center font-bold text-[#b5a47a] uppercase tracking-[0.3em] pt-2">
            {bankName || "Banco Santander"}
          </p>
        </div>
      </DetailModal>
    </section>
  );
}