"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, Sparkles } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { eventConfig as localConfig } from "@/data/event-config";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
}

export const Navbar = ({ eventName }: NavbarProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const displayName = eventName || localConfig.personal.nombre;

  return (
    <nav className="fixed -top-4 w-full z-[100] py-6 px-6 pointer-events-none">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-amber-200/40 rounded-[2rem] px-8 py-3 flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(184,115,33,0.15)] pointer-events-auto"
      >
        
        {/* LOGO - ESTILO ORO PULIDO */}
        <Link href="/" className="group flex flex-col">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Sparkles size={18} className="text-amber-500 fill-amber-500/20" />
            </motion.div>
            <h1 className="text-amber-950 text-2xl font-serif italic tracking-tight transition-all group-hover:tracking-wider">
              {displayName}
            </h1>
          </div>
          <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-amber-800/50 mt-0.5 ml-7">
            Mi Cumpleaños
          </span>
        </Link>

        {/* ACCIONES */}
        <div className="flex items-center gap-5"> 
          
          {/* LOGIN */}
          {status === "unauthenticated" && (
            <button 
              onClick={() => router.push("/client-login")}
              className="group flex items-center gap-3 bg-amber-50 border border-amber-200 hover:border-amber-500 rounded-2xl px-4 py-2 transition-all duration-500"
            >
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest hidden md:block group-hover:scale-105 transition-transform">
                Acceder
              </span>
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
            </button>
          )}

          {/* AUTHENTICATED */}
          {status === "authenticated" && (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push("/admin")}
                className="group flex items-center gap-3 bg-amber-900 text-white rounded-2xl px-5 py-2 hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/20"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Panel</span>
                <LayoutDashboard size={16} />
              </button>

              <div className="w-[1px] h-6 bg-amber-200" />

              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="group p-2.5 text-red-800 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};