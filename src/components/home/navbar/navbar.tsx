"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiUser, FiLogOut, FiLayout, FiX } from 'react-icons/fi';
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  // Sombras para resaltar el texto sobre fondos complejos
  const textShadow = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]";
  // --- FUNCIÓN DE SCROLL PROFESIONAL ---
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Evita que el # aparezca en la URL
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-lg border-b border-black/5 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Isotipo (La M) */}
          <div className="w-8 h-8 bg-[#33aba1] rounded-lg flex items-center justify-center font-black italic shadow-md text-white group-hover:rotate-3 transition-transform shrink-0">
            M
          </div>
          
          {/* Contenedor de Textos */}
          <div className="flex flex-col justify-center leading-none">
            <span className={`text-base md:text-lg font-black uppercase italic tracking-tighter text-zinc-900 ${textShadow}`}>
              MENDO<span className="text-[#33aba1]">CLICK</span>
            </span>
            
            {/* Eslogan Compacto */}
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400 -mt-0.5">
              Invitaciones digitales
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className={`hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-800 ${textShadow}`}>
          <a href="#modelos" 
           onClick={(e) => scrollToSection(e, 'modelos')}
          className="hover:text-[#33aba1] transition-colors">Modelos</a>
          <a href="#experiencia"
           onClick={(e) => scrollToSection(e, 'experiencia')} className="hover:text-[#33aba1] transition-colors">Tecnología</a>
          
          <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
            {status === "authenticated" ? (
              <>
                <Link 
                  href="/manager/clientes/" 
                  className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-[#33aba1] transition-all shadow-md active:scale-95"
                >
                  <FiLayout size={14} />
                  PANEL
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-all"
                >
                  <FiLogOut size={14} />
                  SALIR
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all border border-zinc-200"
              >
                <FiUser size={14} />
                LOGIN
              </Link>
            )}
            
            <Link 
              href="https://wa.me/tu-numero" 
              className="bg-[#33aba1] text-white px-5 py-2 rounded-full hover:bg-zinc-900 transition-all shadow-lg shadow-[#33aba1]/20 active:scale-95 text-center min-w-[110px]"
            >
              CONTACTO
            </Link>
          </div>
        </div>

        {/* BOTÓN HAMBURGUESA MOBILE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-2xl text-zinc-900 p-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MOBILE */}
      <div className={`
        lg:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-100 shadow-2xl transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}
      `}>
        <div className="flex flex-col p-6 gap-5 text-[11px] font-black uppercase tracking-widest text-zinc-800">
          <a href="#modelos" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-zinc-50">
            Modelos <span className="text-[#33aba1] opacity-50">→</span>
          </a>
          <a href="#experiencia" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-zinc-50">
            Tecnología <span className="text-[#33aba1] opacity-50">→</span>
          </a>
          
          <div className="flex flex-col gap-3 mt-2">
            {status === "authenticated" ? (
              <>
                <Link 
                  href="/manager/clientes/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 rounded-xl shadow-lg"
                >
                  <FiLayout /> MI PANEL
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 text-red-600 py-2 font-black"
                >
                  <FiLogOut /> CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-zinc-100 py-3 rounded-xl border border-zinc-200"
              >
                <FiUser /> ACCESO CLIENTES
              </Link>
            )}
            
            <Link 
              href="https://wa.me/tu-numero" 
              className="bg-[#33aba1] text-white py-4 rounded-xl text-center shadow-lg shadow-[#33aba1]/20 mt-2"
            >
              CONTACTAR POR WHATSAPP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};