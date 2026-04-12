"use client";

import { motion, Transition } from "framer-motion";
import Image from "next/image";

// 1. Interface conectada a tu Schema de Prisma
interface WitnessItem {
  id: string;
  nombre: string;
  rol: string;
  imageUrl?: string | null;
}

interface WitnessesProps {
  items: WitnessItem[];
}

export function Witnesses({ items }: WitnessesProps) {
  // Si no hay testigos cargados, no renderizamos la sección
  if (!items || items.length === 0) return null;

  const floatTransition: Transition = {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <section className="relative py-12 bg-[#e0f2f1] overflow-hidden mt-[-1px]">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO COMPACTO */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-2">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={floatTransition}
              className="relative w-16 h-16"
            >
              <Image 
                src="/images/img-grafitis/testigos.png" 
                alt="Decoración pluma" 
                fill
                className="object-contain" 
              />
            </motion.div>
          </div>
          <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-black uppercase tracking-tighter">
            Especiales
          </h2>
        </motion.div>

        {/* GRILLA DE TESTIGOS DINÁMICA */}
        <div className={`grid grid-cols-2 ${items.length > 2 ? 'md:grid-cols-4' : 'md:flex md:justify-center'} gap-6 md:gap-8 max-w-5xl mx-auto`}>
          {items.map((witness, index) => (
            <motion.div
              key={witness.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col items-center text-center group ${items.length <= 2 ? 'md:min-w-[200px]' : ''}`}
            >
              {/* Imagen Circular Dinámica */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image 
                    src={witness.imageUrl || "/img_boda/placeholder-user.jpg"} 
                    alt={witness.nombre} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>

              {/* Nombre desde DB */}
              <h3 className="font-['Permanent_Marker',_cursive] text-xl md:text-2xl text-[#5ca394] mb-1 leading-tight">
                {witness.nombre}
              </h3>
              
              {/* Rol desde DB */}
              <p className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-gray-400">
                {witness.rol}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}