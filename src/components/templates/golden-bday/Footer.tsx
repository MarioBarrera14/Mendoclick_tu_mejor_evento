"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { MessageCircle, ArrowUpRight, Instagram } from "lucide-react";

export function Footer() {
  const { contacto, footer } = eventConfig;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacto.whatsappNumero.replace(/\+/g, "")}&text=${encodeURIComponent(contacto.whatsappMensaje)}`;

  return (
    // Cambiamos el fondo a un degradado que combine con el tono crema oscuro del Hero
<footer className="relative bg-gradient-to-r from-[#F5DEC4] to-[#FDF8F3] pt-32 pb-12 overflow-hidden">      
      {/* Resplandor decorativo en tono oro suave */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B87321]/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* Texto en el marrón ocre de tu tipografía "Birthday" */}
            <span className="text-[#5d4037] tracking-[0.6em] text-[10px] uppercase font-bold block mb-4">
              Hablemos
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#5d4037] tracking-tight">
              ¿Tenés alguna duda?
            </h2>
            {/* Línea divisoria en oro sólido */}
            <div className="w-12 h-[2px] bg-[#B87321] mx-auto mt-6" />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 mb-24">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              // Botón con el dorado intenso de los globos
              className="group flex items-center gap-4 px-12 py-5 bg-[#B87321] text-white rounded-full transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(184,115,33,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(184,115,33,0.6)]"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span className="tracking-[0.2em] text-[11px] uppercase font-black">Consultar Ahora</span>
            </motion.a>

            <motion.a
              href="https://www.yendoinvitaciones.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "#5d4037", color: "#fff" }}
              // Borde en el color de la fuente principal
              className="group flex items-center gap-4 px-12 py-5 border border-[#5d4037]/30 text-[#5d4037] rounded-full transition-all duration-500"
            >
              <span className="tracking-[0.2em] text-[11px] uppercase font-medium">Más Diseños</span>
              <ArrowUpRight className="w-4 h-4 text-[#B87321] group-hover:text-white transition-colors" />
            </motion.a>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12 border-t border-[#5d4037]/10 pt-16">
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              {contacto.instagram && (
                <a
                  href={`https://www.instagram.com/${contacto.instagram.replace("@", "")}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[#5d4037]/60 hover:text-[#B87321] transition-all text-[11px] tracking-[0.3em] uppercase"
                >
                  <div className="p-2 rounded-full border border-[#B87321]/30 group-hover:bg-[#B87321] group-hover:text-white transition-all">
                    <Instagram className="w-4 h-4 stroke-[1.5px]" />
                  </div>
                  {contacto.instagram}
                </a>
              )}
            </div>

            <div className="order-1 md:order-2">
              <span className="text-3xl md:text-5xl text-[#5d4037] font-serif italic tracking-tighter block">
                {footer.marca}
              </span>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-[1px] w-4 bg-[#B87321]" />
                <p className="text-[10px] text-[#B87321] tracking-[0.5em] uppercase font-bold">
                  Digital Studio
                </p>
                <div className="h-[1px] w-4 bg-[#B87321]" />
              </div>
            </div>

            <div className="order-3 text-center md:text-right">
              <p className="text-[10px] text-[#5d4037]/40 uppercase leading-relaxed tracking-[0.2em] whitespace-pre-line font-medium">
                {footer.descripcion}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Marca de agua de fondo en el dorado muy suave */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[18vw] font-serif italic text-[#B87321]/[0.05] select-none pointer-events-none whitespace-nowrap">
        {footer.marca}
      </div>
    </footer>
  );
}