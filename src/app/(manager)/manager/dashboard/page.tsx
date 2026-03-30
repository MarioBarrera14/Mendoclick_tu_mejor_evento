"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Globe, PlusCircle, ArrowUpRight, Activity, Home } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-10 bg-[#fcfcfc] min-h-screen text-zinc-900 overflow-x-hidden">
      
      {/* HEADER RESPONSIVE CON BOTÓN HOME */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div className="flex flex-col gap-4">
          {/* BOTÓN VOLVER A LA WEB PRINCIPAL */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 self-start bg-white border border-zinc-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm"
          >
            <Home size={14} className="text-rose-500" />
            Página Principal
          </Link>

          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
              Mendo<span className="text-rose-500 font-black">Click</span> <span className="text-zinc-400 block md:inline text-2xl md:text-5xl">Control</span>
            </h1>
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mt-3 flex items-center gap-2">
              <Activity size={12} className="text-rose-500" /> Panel de Administración Global
            </p>
          </div>
        </div>
        
        <div className="flex self-start md:self-center">
          <div className="bg-white border border-zinc-100 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Servidor Online</span>
          </div>
        </div>
      </header>

      {/* GRILLA PRINCIPAL RESPONSIVA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 font-sans">
        
        {/* CARD GRANDE: BIENVENIDA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-8 bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl"
        >
          <div className="relative z-10 max-w-md">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-tight mb-4 md:mb-6 text-white">
              ¿Listo para crear <br /> <span className="text-rose-500">magia digital?</span>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light mb-8 md:mb-10 leading-relaxed tracking-wide">
              Gestiona tus clientes y personaliza las invitaciones desde un solo lugar.
            </p>
            <Link 
              href="/manager/nuevo" 
              className="inline-flex w-full md:w-auto justify-center items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all duration-500 shadow-xl"
            >
              <PlusCircle size={18} /> Nueva Invitación
            </Link>
          </div>
          
          <PlusCircle 
            className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 text-white/[0.03] group-hover:text-rose-500/[0.05] transition-colors duration-700 -rotate-12 w-40 h-40 md:w-60 md:h-60" 
          />
        </motion.div>

        {/* CARD: TOTAL CLIENTES */}
        <Link href="/manager/clientes" className="col-span-1 md:col-span-4 block group">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-zinc-100 shadow-xl flex flex-col justify-between transition-all"
          >
            <div className="flex justify-between items-start mb-4 md:mb-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-50 rounded-xl md:rounded-[1.2rem] flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                <Users size={24} />
              </div>
              <ArrowUpRight size={20} className="text-zinc-300 group-hover:text-rose-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter text-zinc-900 leading-none">24</h3>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">Clientes Registrados</p>
            </div>
          </motion.div>
        </Link>

        {/* CARD: SITIOS ACTIVOS */}
        <Link href="/manager/sitios" className="col-span-1 md:col-span-4 block group">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="h-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-zinc-100 shadow-xl flex flex-col justify-between transition-all"
          >
            <div className="flex justify-between items-start mb-4 md:mb-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-100 rounded-xl md:rounded-[1.2rem] flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                <Globe size={24} />
              </div>
              <div className="text-[8px] md:text-[10px] font-bold text-green-500 bg-green-50 px-2 md:px-3 py-1 rounded-full uppercase tracking-tighter">
                +12% mes
              </div>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter text-zinc-900 leading-none">18</h3>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">Invitaciones Activas</p>
            </div>
          </motion.div>
        </Link>

        {/* CARD: EXPLORAR CATÁLOGO */}
        <Link href="/manager/sitios" className="col-span-1 md:col-span-8 block">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.99 }}
            className="bg-rose-500 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-rose-200 flex items-center justify-between overflow-hidden relative group cursor-pointer"
          >
            <div className="relative z-10">
              <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-none text-white">Explorar <br /> Catálogo</h4>
              <p className="text-white/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-4">Ver diseños 2026</p>
            </div>
            <ArrowUpRight className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 text-white/10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 w-24 h-24 md:w-32 md:h-32" />
          </motion.div>
        </Link>

      </div>
    </div>
  );
}