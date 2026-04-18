"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/20 backdrop-blur-md border-b border-black/5">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black italic shadow-lg text-white">M</div>
          <span className="text-lg font-black uppercase italic tracking-tighter text-zinc-900">
            MENDO<span className="text-red-600">CLICK</span>
          </span>
        </Link>

        {/* BOTONES DE NAVEGACIÓN (DESKTOP) */}
        <div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
          <a href="#modelos" className="hover:text-red-600 transition">Modelos</a>
          <a href="#experiencia" className="hover:text-red-600 transition">Tecnología</a>
          
          <div className="flex items-center gap-4 border-l border-zinc-200 pl-8">
            {status === "authenticated" ? (
              <>
                {/* BOTÓN PANEL SI ESTÁ LOGUEADO */}
                <Link 
                  href="/manager/clientes/" 
                  className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 rounded-xl hover:bg-rose-500 transition-all font-black tracking-widest text-[10px] shadow-md"
                >
                  <FiLayout size={14} />
                  PANEL
                </Link>

                {/* BOTÓN SALIDA (LOGOUT) */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-all font-black tracking-widest text-[10px]"
                >
                  <FiLogOut size={14} />
                  SALIR
                </button>
              </>
            ) : (
              /* BOTÓN LOGIN SI NO ESTÁ LOGUEADO */
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-5 py-2 rounded-xl hover:bg-zinc-200 transition-all font-black tracking-widest text-[10px]"
              >
                <FiUser size={14} />
                LOGIN
              </Link>
            )}
            
            <Link 
              href="https://wa.me/tu-numero" 
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-zinc-900 transition-all font-bold tracking-widest text-[10px]"
            >
              CONTACTO
            </Link>
          </div>
        </div>

        {/* MENÚ MOBILE */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-zinc-900">
          <FiMenu />
        </button>
      </div>

      {/* DESPLEGABLE MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest shadow-xl">
           <a href="#modelos" onClick={() => setIsMenuOpen(false)}>Modelos</a>
           <a href="#experiencia" onClick={() => setIsMenuOpen(false)}>Tecnología</a>
           <hr className="border-zinc-100" />
           {status === "authenticated" ? (
             <>
               <Link href="/manager/clientes/" onClick={() => setIsMenuOpen(false)} className="text-zinc-900">Mi Panel</Link>
               <button onClick={() => signOut()} className="text-red-600 text-left">Cerrar Sesión</button>
             </>
           ) : (
             <Link href="/login" onClick={() => setIsMenuOpen(false)}>Acceso Clientes</Link>
           )}
        </div>
      )}
    </nav>
  );
};