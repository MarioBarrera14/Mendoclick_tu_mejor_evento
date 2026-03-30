"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { eventConfig as localConfig } from "@/data/event-config";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  eventName?: string | null;
}

export const Navbar = ({ eventName }: NavbarProps) => {
  const router = useRouter();
  const { status } = useSession();

  // PRIORIDAD: 
  // 1. Nombre que viene de la base de datos (eventName)
  // 2. Nombre del archivo localConfig (fallback)
  // 3. Texto genérico por si fallan ambos
  const displayName = eventName || localConfig.personal.nombre || "Mis XV";

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 py-2.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* NOMBRE DINÁMICO */}
        <Link href="/" className="group">
          <h1 className="text-white text-xl font-serif italic tracking-widest transition-colors group-hover:text-pink-300">
            {displayName}
          </h1>
       <span className="block text-[9px] uppercase tracking-[0.3em] font-sans not-italic text-rose-400">
            ¡Mis XV años!
          </span>
        </Link>

        {/* CONTENEDOR DE ACCESO */}
        <div className="flex items-center gap-6"> 
          
          {/* 1. LOGIN - SOLO SI NO ESTÁ AUTENTICADO */}
          {status === "unauthenticated" && (
            <div className="flex flex-col items-center gap-0.5 animate-in fade-in duration-500">
              <button 
                onClick={() => router.push("/client-login")}
                className="group relative flex items-center justify-center w-10 h-10 
                           bg-white/5 border border-white/10 hover:border-indigo-400/50
                           rounded-full text-white transition-all duration-300
                           hover:bg-indigo-400/10 hover:scale-110 active:scale-95"
              >
                <Users className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              </button>
              <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                Ingresar
              </span>
            </div>
          )}

          {/* 2. DASHBOARD Y LOGOUT - SOLO SI ESTÁ AUTENTICADO */}
          {status === "authenticated" && (
            <>
              <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-4 duration-500">
                <button 
                  onClick={() => router.push("/admin/count")}
                  className="group relative flex items-center justify-center w-10 h-10 
                             bg-white/5 border border-white/10 hover:border-pink-400/50
                             rounded-full text-white transition-all duration-300
                             hover:bg-pink-400/10 hover:scale-110 active:scale-95"
                >
                  <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-pink-400 transition-colors" />
                </button>
                <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                  Admin
                </span>
              </div>

              <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-2 duration-500">
                <button 
                  onClick={() => signOut()}
                  className="group relative flex items-center justify-center w-10 h-10 
                             bg-white/5 border border-white/10 hover:border-red-400/50
                             rounded-full text-white transition-all duration-300
                             hover:bg-red-400/10 hover:scale-110 active:scale-95"
                >
                  <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" />
                </button>
                <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                  Salir
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};