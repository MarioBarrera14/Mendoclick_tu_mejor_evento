"use client";

import { motion, Transition } from "framer-motion";
import Image from "next/image";

// Definimos la interfaz para los testigos
interface Witness {
  name: string;
  role: string;
  image: string;
}

export function Witnesses() {
  const witnesses: Witness[] = [
    { name: "Juan Fernandez", role: "Hermano del Novio", image: "/img_boda/testigo1.jpg" },
    { name: "Marcela García", role: "Mejor Amiga de la Novia", image: "/img_boda/testigo2.jpg" },
    { name: "Andrea Blanco", role: "Mejor Amiga de la Pareja", image: "/img_boda/testigo3.jpg" },
    { name: "Pablo Martinez", role: "Mejor Amigo del Novio", image: "/img_boda/testigo4.jpg" },
  ];

  // Tipamos la transición para que TypeScript la acepte correctamente
  const floatTransition: Transition = {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <section className="relative py-24 bg-[#F9FAF7] overflow-hidden mt-[-1px]">

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO CON ELEGANCE-5 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#000000] tracking-tight">
            Los Testigos
          </h2>
        </motion.div>

        {/* GRILLA DE TESTIGOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {witnesses.map((witness, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  ...floatTransition,
                  delay: index * 0.7,
                }}
                className="flex flex-col items-center w-full"
              >
                {/* Imagen Circular */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-[#94A994]/20 scale-110 group-hover:scale-125 transition-transform duration-700" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-md ring-4 ring-white">
                    <Image 
                      src={witness.image} 
                      alt={witness.name} 
                      fill 
                      sizes="(max-width: 768px) 112px, 128px"
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
                </div>

                {/* Texto */}
                <h3 className="text-lg md:text-xl font-serif italic text-[#000000] mb-1 group-hover:text-[#000000] transition-colors duration-500">
                  {witness.name}
                </h3>
                <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-[#000000]/40 leading-tight">
                  {witness.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}