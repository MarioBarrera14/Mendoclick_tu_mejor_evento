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

  const floatTransition: Transition = {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <section className="relative py-12 bg-[#e0f2f1] overflow-hidden mt-[-1px]">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO MÁS COMPACTO */}
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
            Los Testigos
          </h2>
        </motion.div>

        {/* GRILLA DE TESTIGOS CON TAMAÑO REDUCIDO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {witnesses.map((witness, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Imagen Circular más chica */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image 
                    src={witness.image} 
                    alt={witness.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>

              {/* Nombre reducido */}
              <h3 className="font-['Permanent_Marker',_cursive] text-xl md:text-2xl text-[#5ca394] mb-1">
                {witness.name}
              </h3>
              
              {/* Rol reducido */}
              <p className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-gray-400">
                {witness.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}