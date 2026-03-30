"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface LocationProps {
  venueName?: string | null;
  venueAddress?: string | null;
  mapLink?: string | null;
}

export function Location({ venueName, venueAddress, mapLink }: LocationProps) {
  const name = venueName || "Howard Johnson";
  const address = venueAddress || "RP11 km 400, Cariló, Provincia de Buenos Aires";
  const link = mapLink || "https://maps.google.com";

  // Componente interno para el SVG Animado
  // Nota: Se cambió L 0,400 por L 0,0 para que el relleno suba en lugar de bajar
 const AnimatedWave = ({ className, flip }: { className?: string; flip?: boolean }) => {
  // Definimos los colores basados en tu radial-gradient para que todo coincida
  const colorPrimario = "184, 116, 33"; // El naranja/oro de tu fondo
  const colorSecundario = "160, 119, 69"; // El tono más oscuro de tu fondo

  return (
    <svg 
      width="100%" 
      height="120px" 
      viewBox="0 0 1440 390" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`transition duration-300 ease-in-out ${className}`}
      preserveAspectRatio="none"
    >
      <style>{`
        .path-wave {
          animation: pathAnim 10s linear infinite;
        }
        @keyframes pathAnim {
          0%, 100% { d: path("M 0,${flip ? 400 : 0} L 0,150 C 47,135 95,121 145,124 C 194,126 247,147 294,144 C 340,140 381,113 434,104 C 486,94 550,102 595,125 C 639,147 666,186 711,190 C 755,193 819,163 874,134 C 928,104 974,77 1012,97 C 1049,116 1078,183 1125,180 C 1171,176 1236,103 1292,87 C 1347,70 1393,110 1440,150 L 1440,${flip ? 400 : 0} L 0,${flip ? 400 : 0} Z"); }
          25% { d: path("M 0,${flip ? 400 : 0} L 0,150 C 51,118 102,86 146,98 C 189,109 224,163 268,186 C 311,208 364,200 415,206 C 465,211 515,229 564,197 C 612,164 660,82 715,81 C 769,79 830,160 884,166 C 937,171 983,102 1022,94 C 1060,85 1092,138 1140,151 C 1187,163 1251,136 1304,130 C 1356,123 1398,136 1440,150 L 1440,${flip ? 400 : 0} L 0,${flip ? 400 : 0} Z"); }
          50% { d: path("M 0,${flip ? 400 : 0} L 0,150 C 55,131 110,112 164,106 C 217,99 268,104 308,113 C 347,121 374,134 416,132 C 457,129 514,110 575,130 C 635,149 699,208 742,207 C 784,205 806,145 852,129 C 897,112 968,141 1023,153 C 1077,164 1116,159 1157,158 C 1197,156 1241,156 1289,156 C 1336,155 1388,152 1440,150 L 1440,${flip ? 400 : 0} L 0,${flip ? 400 : 0} Z"); }
          75% { d: path("M 0,${flip ? 400 : 0} L 0,150 C 40,180 81,211 132,217 C 182,222 243,202 290,173 C 336,143 370,103 410,103 C 449,102 495,140 549,158 C 602,175 662,173 721,149 C 779,124 835,78 876,89 C 916,99 941,166 991,179 C 1040,191 1112,148 1163,123 C 1213,97 1240,88 1283,96 C 1325,103 1382,126 1440,150 L 1440,${flip ? 400 : 0} L 0,${flip ? 400 : 0} Z"); }
        }
      `}</style>
      <defs>
        <linearGradient id={`waveGradient-${flip}`} x1="0%" y1="0%" x2="0%" y2="100%">
          {/* Si es flip (abajo), el color fuerte va arriba. Si no es flip (arriba), el color fuerte va abajo. */}
          <stop offset="0%" stopColor={`rgb(${flip ? colorSecundario : colorPrimario})`} stopOpacity={flip ? "0.6" : "0"} />
          <stop offset="100%" stopColor={`rgb(${flip ? colorPrimario : colorSecundario})`} stopOpacity={flip ? "0" : "0.6"} />
        </linearGradient>
      </defs>
      <path 
        fill={`url(#waveGradient-${flip})`} 
        className="path-wave"
        d={`M 0,${flip ? 400 : 0} L 0,150 Z`} 
      />
    </svg>
  );
};
  return (
    <section className="relative py-32 bg-[#fdfaf1]">
      

      {/* --- CAPA DE DEGRADADO RADIAL --- */}
      <div 
        className=" inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(216, 191, 162, 0.16) 40%, rgba(160, 119, 69, 0.4) 100%)"
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.6em] text-[#B87321] uppercase font-bold mb-4 block italic">
              Ubicación
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic text-[#5d4037] mb-6 tracking-tight">
              La Celebración
            </h2>
            <div className="w-24 h-[1px] bg-[#B87321]/30 mx-auto" />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-[3.5rem] p-10 md:p-20 border border-[#B87321]/10 shadow-[0_20px_50px_-20px_rgba(184,115,33,0.15)] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B87321]/5 rounded-bl-full -mr-16 -mt-16" />

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-[#B87321]/20 shadow-sm mb-10 text-[#B87321]">
              <MapPin size={38} strokeWidth={1.2} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-4xl md:text-5xl font-serif italic text-[#5d4037] mb-6 uppercase tracking-tighter">
                {name}
              </h3>
              <p className="text-[#5d4037]/70 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed italic">
                {address}
              </p>

              <div className="flex flex-col items-center justify-center gap-6">
                <motion.a 
                  href={link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#B87321] text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_15px_30px_-10px_rgba(184,115,33,0.4)] hover:shadow-[#B87321]/60"
                >
                  <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
                  Abrir Mapa
                  <ExternalLink size={14} className="opacity-50" />
                </motion.a>
                <p className="text-[9px] text-[#B87321]/60 uppercase tracking-[0.4em] font-bold">
                  ¡Te esperamos puntualmente!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* SVG Animado Inferior - Mirando hacia abajo */}
      
   <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50 transform translate-y-[99%]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[80px] md:h-[150px]"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#fdfaf1" // <--- Aquí está el truco: color exacto del fondo de la galería
          ></path>
        </svg>
        </div>
    </section>
  );
}