"use client";

import { motion } from "framer-motion";

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
      {/* Fondo de puntos blancos estilo retro (Pattern de image_9.png) 
         He aumentado el tamaño de los puntos de 1.5px a 2.5px para que se noten más.
      */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 2.5px, transparent 2.5px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado con tus Anteojos */}
        <div className="text-center mb-10 relative">
          <div className="flex justify-center mb-1">
             <img 
               src="/img-rock/anteojos.png" 
               alt="Anteojos retro" 
               className="w-16 h-auto object-contain"
             />
          </div>
          {/* Título en Rojo con Sombra Profunda (Estilo image_9.png) */}
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#b43c3c] drop-shadow-[4px_4px_0px_#f4e9d8] uppercase leading-none">
            Los Testigos
          </h2>
        </div>

        {/* Contenedor Único de Testigos (Unido con bordes y sombra beige) */}
        <div className="relative max-w-6xl mx-auto group">
          
          {/* Sombra de capa beige (el recuadro de atrás de image_9.png) */}
          <div className="absolute inset-0 bg-[#f4e9d8] translate-x-2 translate-y-2 rounded-sm border border-black/10 z-0" />

          {/* Bloque Principal Blanco con Borde Negro 
             He añadido el pseudo-elemento ::before y ::after para las líneas amarillas 
             horizontales de arriba y abajo.
          */}
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
                    // Borde inferior en móvil, borde derecho en desktop (excepto el último)
                    index !== testigos.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                }`}
              >
                
                {/* Línea de separación Amarilla (Dorada) vertical para desktop */}
                {index !== testigos.length - 1 && (
                  <div className="hidden md:block absolute top-[10%] bottom-[10%] right-[-1px] w-[2px] bg-[#d4af37] z-10" />
                )}
                
                {/* También una línea amarilla horizontal para móvil */}
                {index !== testigos.length - 1 && (
                  <div className="md:hidden absolute left-[15%] right-[15%] bottom-[-1px] h-[2px] bg-[#d4af37] z-10" />
                )}

                {/* Foto Circular con Borde Punteado Rojo (Bordó) */}
                <div className="relative mb-6 mt-1 flex-shrink-0">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-dashed border-[#b43c3c] p-1.5 overflow-hidden shadow-inner">
                    <img 
                      src={testigo.imgUrl} 
                      alt={testigo.nombre} 
                      className="w-full h-full object-cover rounded-full filter grayscale-[15%]"
                    />
                  </div>
                </div>

                {/* Texto del Testigo */}
                <div className="mt-auto pt-2 flex-grow flex flex-col justify-center">
                  <h4 className="text-[#b43c3c] font-black italic text-lg md:text-xl leading-tight uppercase tracking-tighter">
                    {testigo.nombre}
                  </h4>
                  {/* Divisor sutil */}
                  <div className="h-[1px] w-10 bg-[#b43c3c]/20 mx-auto my-1.5" />
                  <p className="text-[#b43c3c] font-bold text-[9px] md:text-[10px] tracking-widest uppercase opacity-80">
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