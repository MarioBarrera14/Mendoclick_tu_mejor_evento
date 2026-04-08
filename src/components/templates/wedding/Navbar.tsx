"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, RefreshCw } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { bodaTemplateConfig as localConfig } from "@/data/event-config-bodas";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
  isDemo?: boolean;
}

export const Navbar = ({ eventName, isDemo = false }: NavbarProps) => {
  const router = useRouter();
  const { status } = useSession();

  const displayName = eventName || localConfig.personal.nombre || "Nuestra Boda";

  const handleRefresh = () => {
    window.location.reload();
  };

  // Estilo para el sombreado blanco sutil que resalta las letras
  const textShadowStyle = {
    textShadow: "0px 1px 4px rgba(255, 255, 255, 0.8), 0px 0px 10px rgba(255, 255, 255, 0.5)"
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#94A994]/40 backdrop-blur-md border-b border-white/20 py-2.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* NOMBRE DINÁMICO CON SOMBREADO */}
        <Link href="/" className="group">
          <h1 
            style={textShadowStyle}
            className="text-[#4B664B] text-xl font-serif italic tracking-widest transition-colors group-hover:text-[#2D3E2D]"
          >
            {displayName}
          </h1>
          <span 
            style={{ textShadow: "0px 1px 2px white" }}
            className="block text-[9px] uppercase tracking-[0.3em] font-sans not-italic text-[#4B664B] font-bold"
          >
            ¡Nuestra Boda!
          </span>
        </Link>

        {/* CONTENEDOR DE ACCESO */}
        <div className="flex items-center gap-6"> 
          
          {isDemo ? (
            <div className="flex flex-col items-center gap-0.5 animate-in fade-in zoom-in duration-500">
              <motion.button 
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                className="group relative flex items-center justify-center w-10 h-10 
                           bg-white/20 border border-white/40 rounded-full text-[#4B664B] 
                           transition-all duration-300 hover:bg-white/40 shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-[#4B664B] group-hover:rotate-12 transition-transform" />
              </motion.button>
              <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-[#4B664B]">
                Reiniciar
              </span>
            </div>
          ) : (
            <>
              {/* LOGIN */}
              {status === "unauthenticated" && (
                <div className="flex flex-col items-center gap-0.5 animate-in fade-in duration-500">
                  <button 
                    onClick={() => router.push("/client-login")}
                    className="group relative flex items-center justify-center w-10 h-10 
                               bg-white/20 border border-white/40 rounded-full text-[#4B664B] 
                               transition-all duration-300 hover:bg-white/40 hover:scale-110 shadow-sm"
                  >
                    <Users className="w-4 h-4 text-[#4B664B]" />
                  </button>
                  <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-[#4B664B]">
                    Ingresar
                  </span>
                </div>
              )}

              {/* DASHBOARD Y LOGOUT */}
              {status === "authenticated" && (
                <>
                  <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-4 duration-500">
                    <button 
                      onClick={() => router.push("/admin/count")}
                      className="group relative flex items-center justify-center w-10 h-10 
                                 bg-white/20 border border-white/40 rounded-full text-[#4B664B] 
                                 transition-all duration-300 hover:bg-white/40 shadow-sm"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#4B664B]" />
                    </button>
                    <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-[#4B664B]">
                      Admin
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-2 duration-500">
                    <button 
                      onClick={() => signOut()}
                      className="group relative flex items-center justify-center w-10 h-10 
                                 bg-rose-500/10 border border-rose-500/20 rounded-full 
                                 text-rose-600 transition-all duration-300 hover:bg-rose-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                    <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-rose-600">
                      Salir
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};