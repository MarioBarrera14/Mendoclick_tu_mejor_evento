"use client";

import { motion } from "framer-motion";

export function EventDetails() {
  const sectionData = [
    {
      title: "Ceremonia",
      icon: "/img-rock/anillos-rock.png",
      image: "/img-rock/iglesia.png",
      time: "12 de septiembre de 2026 a las 20:00hs",
      location: '"Parroquia Natividad del Señor", Av. Eugenia Tapia de Cruz 524, Escobar, Bs. As.',
    },
    {
      title: "Celebración",
      icon: "/img-rock/copas-rock.png",
      image: "/img-rock/event.png",
      time: "12 de septiembre de 2026 a las 21:00hs",
      location: '"Estancia La Soñada del Pilar", Sor Teresa y Cabo de Hornos, Pilar, Bs. As.',
    },
  ];

  const strokeAndRotateClass = "[webkit-text-stroke:_1.5px_white] drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)] -rotate-2 antialiased";
  const zebraClass = "absolute left-0 w-full h-6 z-20 bg-[length:50px_100%] bg-[linear-gradient(115deg,#a02133_25%,transparent_25%,transparent_50%,#a02133_50%,#a02133_75%,transparent_75%,transparent_100%)]";
  const buttonBase = "relative bg-[#a02133] text-white px-5 py-2 text-[9px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 group";
  const buttonBorder = "after:content-[''] after:absolute after:inset-0 after:border after:border-black after:translate-x-1 after:translate-y-1 after:-z-10 after:transition-transform hover:after:translate-x-0 hover:after:translate-y-0";

  return (
    <section className="relative bg-[#33aba1] py-16 px-4 flex flex-col items-center overflow-hidden font-sans">
      
      {/* ZEBRA SUPERIOR */}
      <div className={`${zebraClass} top-0`} />

      {/* --- ADORNOS --- */}
      <img 
        src="/img-rock/adorno1.png" 
        alt="adorno" 
        className="absolute top-8 left-4 w-20 md:w-32 z-0 opacity-50" 
      />
      <img 
        src="/img-rock/adorno1.png" 
        alt="adorno" 
        className="absolute bottom-8 right-4 w-20 md:w-32 z-0 opacity-50" 
      />

      {/* Contenedor Principal - Más compacto en altura */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start z-10 mt-6">
        {sectionData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center text-white"
          >
            {/* Icono más pequeño */}
            <div className="mb-3">
               <img src={item.icon} alt="icon" className="w-16 h-16 object-contain drop-shadow-md" />
            </div>

            {/* Título un poco más chico */}
            <h2 className={`text-3xl md:text-4xl font-black italic font-sans text-[#a02133] mb-4 tracking-tight capitalize ${strokeAndRotateClass}`}>
              {item.title}
            </h2>

            {/* Imagen reducida */}
            <div className="relative p-1 border-2 border-dashed border-[#a02133] rounded-sm mb-5 bg-transparent">
              <div className="overflow-hidden w-full aspect-[16/9] md:w-[320px]">
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>

            {/* Información condensada */}
            <div className="space-y-3 max-w-[280px]">
              <div>
                <h3 className="font-black text-[10px] tracking-[0.2em] text-white/90 mb-0.5">DIA Y HORARIO</h3>
                <p className="font-bold text-sm">{item.time}</p>
              </div>

              <div>
                <h3 className="font-black text-[10px] tracking-[0.2em] text-white/90 mb-0.5">LUGAR</h3>
                <p className="font-bold text-sm leading-snug">{item.location}</p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-6 w-full justify-center">
              <button className={`${buttonBase} ${buttonBorder} rotate-1 hover:rotate-0`}>
                <span>📍</span>COMO LLEGAR
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Imagen del Auto reducida para evitar scroll excesivo */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 z-10"
      >
        <img 
          src="/img-rock/auto-rock.png" 
          alt="Auto Retro" 
          className="w-56 md:w-[380px] object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
        />
      </motion.div>

      {/* ZEBRA INFERIOR */}
      <div className={`${zebraClass} bottom-0`} />
    </section>
  );
}