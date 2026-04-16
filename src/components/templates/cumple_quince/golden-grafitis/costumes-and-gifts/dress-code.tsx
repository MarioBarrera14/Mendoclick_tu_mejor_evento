"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { Copy, X, CheckCircle2 } from "lucide-react";

interface WeddingDetailsProps {
  config: {
    dressCode?: string | null;
    dressDescription?: string | null;
    cbu?: string | null;
    alias?: string | null;
    bankName?: string | null;
    holderName?: string | null;
  };
}

const buttonBase = "relative text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 rounded-full shadow-lg bg-[#5ba394] hover:bg-[#4d8a7d]";

function DetailModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  
  // BLOQUEO DE SCROLL ROBUSTO (HTML + BODY)
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
          {/* Overlay: touch-none evita scroll táctil en el fondo */}
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm touch-none"
          />
          
          {/* Contenido del Modal: touch-auto permite interacción dentro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white/30 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl text-center border border-white/40 z-10 touch-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-black hover:scale-110 transition-transform">
              <X className="w-6 h-6 stroke-[3px]" />
            </button>
            <h3 className="font-['Permanent_Marker',_cursive] text-4xl text-black mb-6 uppercase tracking-tighter">
              {title}
            </h3>
            <div className="text-black font-medium">{children}</div>
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
    <button onClick={handleCopy} className="w-full bg-white/40 border border-white/20 p-3 rounded-xl mb-3 transition-all hover:bg-white/60">
      <div className="flex flex-col items-center">
        <span className="text-[9px] text-black/60 uppercase font-black mb-1">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-black text-sm">{text}</span>
          {copied ? <CheckCircle2 className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-black/40" />}
        </div>
      </div>
    </button>
  );
}

export default function WeddingDetailsSection({ config }: WeddingDetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative py-12 w-full flex items-center justify-center bg-[url('/images/img-grafitis/mural.jpg')] bg-cover bg-center px-4 overflow-hidden">
      
      {/* SEPARADOR GRAFITERO SUPERIOR */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div 
          className="w-full h-[60px] md:h-[180px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" 
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-6 items-stretch justify-center font-['Permanent_Marker',_cursive]">
        
        {/* BLOQUE DRESS CODE */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex-1 bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center border border-white/30"
        >
          <div className="mb-4 w-14 h-14 relative">
            <Image src="/images/img-grafitis/percha.png" alt="Icon Dress" fill className="object-contain" />
          </div>
          <h2 className="text-3xl md:text-4xl text-black mb-3 uppercase tracking-tighter">
            Dress Code
          </h2>
          <p className="text-black text-xs md:text-sm font-medium mb-6 flex-grow font-sans uppercase text-balance">
            {config.dressCode || "Elegante Sport"}
          </p>
          <button onClick={() => setActiveModal("dress")} className={buttonBase}>
            VER DETALLES
          </button>
        </motion.div>

        {/* BLOQUE REGALOS */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex-1 bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center border border-white/30"
        >
          <div className="mb-4 w-14 h-14 relative">
            <Image src="/images/img-grafitis/regalos.png" alt="Icon Gift" fill className="object-contain" />
          </div>
          <h2 className="text-3xl md:text-4xl text-black mb-3 uppercase tracking-tighter">
            Regalos
          </h2>
          <p className="text-black text-xs md:text-sm font-medium mb-6 flex-grow font-sans uppercase text-balance">
            Nuestro mejor regalo es tu presencia, pero si deseás colaborar podés hacerlo aquí.
          </p>
          <div className="flex gap-2 w-full justify-center">
            <button onClick={() => setActiveModal("gift")} className={buttonBase}>
              CBU / ALIAS
            </button>
          </div>
        </motion.div>

      </div>

      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code">
        <p className="text-black font-sans font-bold text-sm uppercase leading-relaxed">
          {config.dressDescription || "Vestimenta formal/elegante para disfrutar la noche."}
        </p>
      </DetailModal>

      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos">
        <div className="space-y-3 font-sans">
          <div className="bg-white/40 p-3 rounded-xl mb-4 border border-white/20">
            <p className="text-[9px] uppercase text-black/60 font-black mb-1 text-center tracking-widest">Titular de la cuenta</p>
            <p className="text-black font-bold text-base leading-tight text-center uppercase">{config.holderName || "Novios"}</p>
          </div>
          <CopyButton label="CBU/CVU" text={config.cbu || "000000000000000000000"} />
          <CopyButton label="Alias de cuenta" text={config.alias || "ALIAS.PENDIENTE"} />
          {config.bankName && (
            <p className="text-[10px] text-black/80 font-black uppercase pt-2 text-center tracking-widest">
              Banco: {config.bankName}
            </p>
          )}
        </div>
      </DetailModal>

      {/* SEPARADOR GRAFITERO INFERIOR */}
      <div className="absolute bottom-0 rotate-180 left-0 w-full z-20 pointer-events-none translate-y-[-1px]">
        <div 
          className="w-full h-[60px] md:h-[160px] bg-[#e0f2f1] [mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:url(/images/img-grafitis/graffiti-separador-2a.png)] [-webkit-mask-size:100%_100%]" 
        />
      </div>
    </section>
  );
}