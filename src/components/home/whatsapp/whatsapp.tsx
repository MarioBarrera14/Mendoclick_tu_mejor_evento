"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber: string = "549261000000"; 
  const message: string = "Hola MendoClick! Quería consultar por una invitación digital...";

  const handleClick = (): void => {
    const url: string = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    // Ajustado para ser más discreto en mobile (bottom-4 right-4)
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 1 
        }}
        className="relative group flex flex-col items-end"
      >
        <div className="relative">
          {/* Badge de Notificación - Más pequeño en mobile (w-4 h-4) */}
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
            className="absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-red-600 text-white text-[8px] md:text-[10px] font-black rounded-full flex items-center justify-center z-20 shadow-lg border-2 border-white"
          >
            1
          </motion.span>

          {/* Círculos de Pulsación */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse z-0" />

          {/* El Botón Principal - Achicado de w-14 a w-12 en mobile */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-[14px] md:rounded-[22px] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(20,160,80,0.5)] transition-all duration-300 overflow-hidden z-10"
          >
            {/* Brillo superior */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-white/10 z-10 rounded-t-[14px] md:rounded-t-[22px]" />
            
            {/* Icono más pequeño en mobile (text-xl) */}
            <FaWhatsapp className="text-xl md:text-3xl relative z-20" />
            
            {/* Efecto Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] z-10" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};