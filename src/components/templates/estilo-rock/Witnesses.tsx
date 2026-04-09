"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Testigo {
  nombre: string;
  rol: string;
  imgUrl: string;
}

const testigos: Testigo[] = [
  { 
    nombre: "Juan Fernandez", 
    rol: "HERMANO DEL NOVIO", 
    imgUrl: "/img_boda/testigo1.jpg" 
  },
  { 
    nombre: "Marcela García Ruiz", 
    rol: "MEJOR AMIGA DE LA NOVIA", 
    imgUrl: "/img_boda/testigo2.jpg" 
  },
  { 
    nombre: "Andrea Blanco", 
    rol: "MEJOR AMIGA DE LA PAREJA", 
    imgUrl: "/img_boda/testigo3.jpg" 
  },
  { 
    nombre: "Pablo Martínez", 
    rol: "MEJOR AMIGO DEL NOVIO", 
    imgUrl: "/img_boda/testigo4.jpg" 
  },
];

export default function SeccionTestigos() {
  return (
    <section className="relative py-20 bg-[#33aba1] min-h-screen overflow-hidden flex flex-col justify-center font-serif">
      {/* Fondo de puntos blancos con Tailwind (Sin style inline) */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle,white_2.5px,transparent_2.5px)] bg-[size:30px_30px]" 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-10 relative">
          <div className="flex justify-center mb-1">
             <div className="relative w-16 h-8">
               <Image 
                 src="/img-rock/anteojos.png" 
                 alt="Anteojos retro" 
                 fill
                 className="object-contain"
               />
             </div>
          </div>
          {/* Título en Rojo con Sombra Profunda */}
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#b43c3c] [text-shadow:4px_4px_0px_#f4e9d8] uppercase leading-none">
            Los Testigos
          </h2>
        </div>

        {/* Contenedor Único de Testigos */}
        <div className="relative max-w-6xl mx-auto group">
          
          {/* Sombra de capa beige */}
          <div className="absolute inset-0 bg-[#f4e9d8] translate-x-2 translate-y-2 rounded-sm border border-black/10 z-0" />

          {/* Bloque Principal Blanco */}
          <div className="relative z-10 bg-white border-[2px] border-black flex flex-col md:flex-row items-stretch shadow-md overflow-hidden 
                          before:absolute before:top-0 before:left-[10%] before:right-[10%] before:h-[2px] before:bg-[#d4af37] before:z-20 
                          after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2px] after:bg-[#d4af37] after:z-20">
            
            {testigos.map((testigo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex-1 p-6 flex flex-col items-center text-center border-black ${
                    index !== testigos.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                }`}
              >
                
                {/* Línea de separación Amarilla vertical para desktop */}
                {index !== testigos.length - 1 && (
                  <div className="hidden md:block absolute top-[10%] bottom-[10%] right-[-1px] w-[2px] bg-[#d4af37] z-10" />
                )}
                
                {/* Línea amarilla horizontal para móvil */}
                {index !== testigos.length - 1 && (
                  <div className="md:hidden absolute left-[15%] right-[15%] bottom-[-1px] h-[2px] bg-[#d4af37] z-10" />
                )}

                {/* Foto Circular con Next/Image */}
                <div className="relative mb-6 mt-1 flex-shrink-0">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-dashed border-[#b43c3c] p-1.5 shadow-inner relative overflow-hidden">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image 
                        src={testigo.imgUrl} 
                        alt={testigo.nombre} 
                        fill
                        className="object-cover filter grayscale-[15%]"
                      />
                    </div>
                  </div>
                </div>

                {/* Texto del Testigo */}
                <div className="mt-auto pt-2 flex-grow flex flex-col justify-center">
                  <h4 className="text-[#b43c3c] font-black italic text-lg md:text-xl leading-tight uppercase tracking-tighter font-serif">
                    {testigo.nombre}
                  </h4>
                  {/* Divisor sutil */}
                  <div className="h-[1px] w-10 bg-[#b43c3c]/20 mx-auto my-1.5" />
                  <p className="text-[#b43c3c] font-bold text-[9px] md:text-[10px] tracking-widest uppercase opacity-80 font-sans">
                    {testigo.rol}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}