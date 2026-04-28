"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiUser, FiLogOut, FiLayout, FiX } from 'react-icons/fi';
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { status } = useSession(); // Solo usamos status para evitar errores de data no definida

  // --- EFECTO DE SCROLL ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textShadow = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md py-2 border-b border-zinc-200 shadow-sm" 
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-zinc-900 text-[#33aba1] rounded-xl flex items-center justify-center font-black italic shadow-lg group-hover:scale-105 transition-all">
            M
          </div>
          <div className="flex flex-col justify-center leading-none">
            <span className={`text-lg md:text-xl font-black uppercase italic tracking-tighter text-zinc-900 ${textShadow}`}>
              MENDO<span className="text-[#33aba1]">CLICK</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400 -mt-0.5">
              Invitaciones digitales
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-800">
          <a href="#modelos" onClick={(e) => scrollToSection(e, 'modelos')} className="hover:text-[#33aba1] transition-colors relative group">
            Modelos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#33aba1] transition-all group-hover:w-full"></span>
          </a>
          <a href="#tecnologia" onClick={(e) => scrollToSection(e, 'tecnologia')} className="hover:text-[#33aba1] transition-colors relative group">
            Tecnología
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#33aba1] transition-all group-hover:w-full"></span>
          </a>
          
          <div className="flex items-center gap-4 border-l border-zinc-200 pl-8">
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/manager/dashboard" 
                  className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl hover:bg-rose-600 transition-all shadow-md text-[9px]"
                >
                  <FiLayout size={14} />
                  PANEL
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1.5 text-zinc-500 hover:text-rose-600 transition-all font-black text-[9px]"
                >
                  <FiLogOut size={14} />
                  SALIR
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-white text-zinc-900 px-4 py-2.5 rounded-xl hover:bg-zinc-50 transition-all border border-zinc-200 shadow-sm text-[9px]"
              >
                <FiUser size={14} className="text-[#33aba1]" />
                ACCESO
              </Link>
            )}
            
            <Link 
              href="https://wa.me/549261000000" 
              className="bg-[#33aba1] text-white px-6 py-2.5 rounded-full hover:bg-zinc-900 transition-all shadow-lg text-[9px] font-black"
            >
              CONTACTO
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-2xl text-zinc-900 p-2 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU (Sin dependencias externas complejas) */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest">
          <a href="#modelos" onClick={(e) => scrollToSection(e, 'modelos')} className="py-3 border-b border-zinc-50 flex justify-between">
            Modelos <span className="text-[#33aba1]">→</span>
          </a>
          <a href="#tecnologia" onClick={(e) => scrollToSection(e, 'tecnologia')} className="py-3 border-b border-zinc-50 flex justify-between">
            Tecnología <span className="text-[#33aba1]">→</span>
          </a>
          
          <div className="flex flex-col gap-3 pt-2">
            {status === "authenticated" ? (
              <>
                <Link href="/manager/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-2xl">
                  <FiLayout /> PANEL CONTROL
                </Link>
                <button onClick={() => signOut()} className="text-rose-600 font-black py-2">
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-zinc-100 py-4 rounded-2xl border border-zinc-200">
                <FiUser /> ACCESO PRIVADO
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};