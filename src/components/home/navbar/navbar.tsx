"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/20 backdrop-blur-md border-b border-black/5">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black italic shadow-lg text-white">M</div>
          <span className="text-lg font-black uppercase italic tracking-tighter text-zinc-900">MENDO<span className="text-red-600">CLICK</span></span>
        </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-zinc-900"><FiMenu /></button>
        <div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
           <a href="#modelos" className="hover:text-red-600 transition">Modelos</a>
           <a href="#experiencia" className="hover:text-red-600 transition">Tecnología</a>
           <Link href="https://wa.me/tu-numero" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-zinc-900 transition-all font-bold tracking-widest">CONTACTO</Link>
        </div>
      </div>
    </nav>
  );
};