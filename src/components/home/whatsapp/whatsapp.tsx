"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber: string = "549261000000"; 
  const message: string = "Hola MendoClick! Quería consultar por una invitación digital...";
  const url: string = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 2 // Lo retrasamos un poco más para que no compita con el LCP
        }}
        className="relative group flex flex-col items-end"
      >
        <div className="relative">
          {/* Badge de Notificación */}
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, type: "spring" }}
            className="absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-red-600 text-white text-[8px] md:text-[10px] font-black rounded-full flex items-center justify-center z-20 shadow-lg border-2 border-white pointer-events-none"
          >
            1
          </motion.span>

          {/* Círculos de Pulsación - Optimizado con opacity fija para evitar re-paints constantes */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity z-0" />

          {/* El Botón Principal - Usamos <a> para mejor SEO y Accesibilidad */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp a MendoClick" // FIX CRÍTICO PARA ACCESIBILIDAD
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-[14px] md:rounded-[22px] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(20,160,80,0.5)] transition-all duration-300 overflow-hidden z-10"
          >
            {/* Brillo superior */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-white/10 z-10 rounded-t-[14px] md:rounded-t-[22px]" />
            
            <FaWhatsapp className="text-xl md:text-3xl relative z-20" />
            
            {/* Efecto Shimmer - Solo se activa en hover para ahorrar CPU en mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] z-10" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};