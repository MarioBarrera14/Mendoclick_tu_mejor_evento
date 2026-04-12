"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Copy, X, CheckCircle2, Ticket } from "lucide-react";
import SeparadorEntrePaginas from './separadordepaaginas';
// 1. Interfaz unificada con tu Prisma Schema
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

// Definición de colores para reutilizar
const colorRoja = "#b02a30";
const colorCeleste = "#33aba1";

const buttonBase = "relative text-white px-8 py-3 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 group z-10";
const buttonBorder = "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:translate-x-1.5 after:translate-y-1.5 after:-z-10 after:transition-transform hover:after:translate-x-0 hover:after:translate-y-0";

// MODAL ACTUALIZADO: Recibe el color de la sombra como prop
function DetailModal({ isOpen, onClose, title, children, shadowColor }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; shadowColor: string }) {
  // Bloqueo de scroll al abrir modal
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
            className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-[#fdfcf0] p-8 md:p-12 z-[101] border-4 border-black text-center"
            // APLICACIÓN DINÁMICA DE LA SOMBRA
            style={{ boxShadow: `12px 12px 0px 0px ${shadowColor}` }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform">
              <X className="w-8 h-8 stroke-[3px]" />
            </button>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-6 italic">
              {title}
            </h3>
            <div className="text-black font-medium leading-relaxed">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// COPYBUTTON ACTUALIZADO: Recibe el color de la sombra como prop
function CopyButton({ text, label, shadowColor }: { text: string; label: string; shadowColor: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy} 
      className={`${buttonBase} ${buttonBorder} bg-white !text-black w-full mb-5 group`}
    >
      {/* APLICACIÓN DINÁMICA DE LA SOMBRA EN EL AFTER */}
      <div className="absolute inset-0 border-2 border-black translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
           style={{ boxShadow: `4px 4px 0px 0px ${shadowColor}` }}></div>
      <div className="flex flex-col items-center relative z-10">
        <span className="text-[10px] text-black/60 uppercase tracking-widest font-black leading-none mb-1">
          {label}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight">{text}</span>
          {copied ? <CheckCircle2 className="w-4 h-4 text-green-600 stroke-[3px]" /> : <Copy className="w-4 h-4 text-black/40" />}
        </div>
      </div>
    </button>
  );
}

export default function WeddingDetailsSection({ config }: WeddingDetailsProps) {
  const [activeModal, setActiveModal] = useState<"dress" | "gift" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cardBaseStyles = "relative bg-[#fdfcf0] border-2 border-black p-8 md:p-10 flex-1 flex flex-col";

  const getCardVariants = (rotateVal: number, delayVal: number): Variants => ({
    offscreen: { opacity: 0, y: 20 },
    onscreen: { 
      opacity: 1, 
      y: [0, -15, 0],
      rotate: rotateVal,
      transition: {
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delayVal },
        opacity: { duration: 0.5 }
      }
    },
    hover: { scale: 1.05, rotate: rotateVal * 2.5, transition: { duration: 0.3 } }
  });

  if (!mounted) return null;

  return (
    <>
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#1a1a1a] py-20 px-4 md:px-10 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 max-w-6xl w-full items-stretch">
        
        {/* TARJETA REGALOS - SOMBRA ROJA */}
        <motion.div 
          variants={getCardVariants(-1.5, 0)}
          initial="offscreen" whileInView="onscreen" whileHover="hover" viewport={{ once: true, amount: 0.1 }}
          className={`${cardBaseStyles} border-[#b02a30]`}
          style={{ boxShadow: `10px 10px 0px 0px ${colorRoja}` }}
        >
          <h2 className="text-center text-[#b02a30] text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic">
            Regalos
          </h2>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6">
              <Image src="/img-rock/gift-rockabilly.png" alt="Regalo" fill className="object-contain" />
            </div>
            <p className="text-center text-gray-800 font-bold text-lg leading-tight mb-4 uppercase tracking-tighter">
              Nuestro mejor regalo es tu presencia, pero si deseás colaborar...
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setActiveModal("gift")} 
              className={`${buttonBase} bg-[#b02a30] w-full sm:w-auto group`}
            >
              <div className="absolute inset-0 border-2 border-black translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                   style={{ boxShadow: `4px 4px 0px 0px ${colorRoja}` }}></div>
              <Ticket className="w-5 h-5 rotate-12 relative z-10" /> <span className="relative z-10">Cuenta Bancaria</span>
            </button>
          </div>
        </motion.div>

        {/* TARJETA DRESS CODE - SOMBRA CELESTE */}
        <motion.div 
          variants={getCardVariants(1.5, 0.5)}
          initial="offscreen" whileInView="onscreen" whileHover="hover" viewport={{ once: true, amount: 0.1 }}
          className={`${cardBaseStyles} border-[#4fb0a2]`}
          style={{ boxShadow: `10px 10px 0px 0px ${colorCeleste}` }}
        >
          <h2 className="text-center text-[#4fb0a2] text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic">
            Dress Code
          </h2>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative w-full h-48 mb-4">
              <Image src="/img-rock/dress-rockabilly.png" alt="Dress Code" fill className="object-contain" />
            </div>
            <p className="text-center text-gray-800 font-bold text-lg uppercase tracking-tighter italic">
              Estilo <span className="text-[#4fb0a2]">Rockabilly & Pin-up</span>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setActiveModal("dress")} 
              className={`${buttonBase} bg-[#4fb0a2] w-full sm:w-auto group`}
            >
              <div className="absolute inset-0 border-2 border-black translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                   style={{ boxShadow: `4px 4px 0px 0px ${colorCeleste}` }}></div>
              <span className="relative z-10">Ver Detalles</span>
            </button>
          </div>
        </motion.div>

      </div>

      {/* MODAL DRESS CODE - SOMBRA CELESTE */}
      <DetailModal isOpen={activeModal === "dress"} onClose={() => setActiveModal(null)} title="Dress Code" shadowColor={colorCeleste}>
        <p className="text-xl mb-4 text-black">
          Para esta noche de rock, el estilo es: <br />
          <strong className="text-[#4fb0a2] font-black text-3xl block mt-2 uppercase italic">
            {config.dressCode || "Rockabilly"}
          </strong>
        </p>
        <p className="text-lg italic text-black/80 border-t-2 border-black/10 pt-4">
          {config.dressDescription || "¡Saca tus cueros, tus mejores faldas de vuelo y mucho fijador!"}
        </p>
      </DetailModal>

      {/* MODAL REGALOS - SOMBRA ROJA */}
      <DetailModal isOpen={activeModal === "gift"} onClose={() => setActiveModal(null)} title="Regalos" shadowColor={colorRoja}>
        <p className="mb-6 font-bold italic text-black text-center uppercase tracking-tighter">
          Si deseas colaborar con nosotros, aquí tienes los datos:
        </p>
        <div className="space-y-4">
          <motion.div 
            animate={{ rotate: -1 }} 
            className="bg-[#b02a30] p-4 border-2 border-black mb-8"
            style={{ boxShadow: `4px 4px 0px 0px ${colorRoja}` }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 mb-1 font-bold text-center">Titular</p>
            <p className="text-white font-black text-xl uppercase italic text-center leading-tight">
              {config.holderName || "Novios"}
            </p>
          </motion.div>
          
          <div className="space-y-6">
            <CopyButton label="CBU/CVU" text={config.cbu || "00000000000000000"} shadowColor={colorRoja} />
            <CopyButton label="Alias" text={config.alias || "ALIAS.PENDIENTE"} shadowColor={colorRoja} />
          </div>

          {config.bankName && (
            <p className="text-xs text-center font-black uppercase tracking-widest text-black/60 mt-4 border-t-2 border-black/5 pt-4">
              {config.bankName}
            </p>
          )}
        </div>
      </DetailModal>
    </section>
        <SeparadorEntrePaginas />
        </>
  );
}