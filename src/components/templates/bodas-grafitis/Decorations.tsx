"use client";

import { motion } from "framer-motion";

export function FlowerDecoration({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pétalos florales elegantes */}
      <g opacity="0.6" stroke="currentColor" strokeWidth="0.5">
        {/* Pétalo superior */}
        <path d="M50 10 Q55 25 50 40 Q45 25 50 10" />
        {/* Pétalo inferior */}
        <path d="M50 90 Q55 75 50 60 Q45 75 50 90" />
        {/* Pétalo izquierdo */}
        <path d="M10 50 Q25 55 40 50 Q25 45 10 50" />
        {/* Pétalo derecho */}
        <path d="M90 50 Q75 55 60 50 Q75 45 90 50" />
        {/* Pétalos diagonales */}
        <path d="M22 22 Q35 30 42 42 Q30 35 22 22" />
        <path d="M78 22 Q65 30 58 42 Q70 35 78 22" />
        <path d="M22 78 Q35 70 42 58 Q30 65 22 78" />
        <path d="M78 78 Q65 70 58 58 Q70 65 78 78" />
        {/* Centro */}
        <circle cx="50" cy="50" r="8" />
        <circle cx="50" cy="50" r="4" />
      </g>
    </motion.svg>
  );
}

export function LeafDecoration({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${className}`}
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" stroke="currentColor" strokeWidth="0.5">
        {/* Rama izquierda */}
        <path d="M30 15 Q20 10 5 15" />
        <path d="M15 15 Q12 10 10 5" />
        <path d="M20 14 Q18 8 15 3" />
        <path d="M25 13 Q24 7 22 2" />
        {/* Rama derecha */}
        <path d="M30 15 Q40 10 55 15" />
        <path d="M45 15 Q48 10 50 5" />
        <path d="M40 14 Q42 8 45 3" />
        <path d="M35 13 Q36 7 38 2" />
      </g>
    </motion.svg>
  );
}

export function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <div className="h-[1px] w-12 bg-gradient-to-l from-white/30 to-transparent" />
      <svg
        className="w-3 h-3 text-white/40"
        viewBox="0 0 10 10"
        fill="currentColor"
      >
        <polygon points="5,0 10,5 5,10 0,5" />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-r from-white/30 to-transparent" />
    </motion.div>
  );
}

export function StarDecoration({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: -45 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </motion.svg>
  );
}
