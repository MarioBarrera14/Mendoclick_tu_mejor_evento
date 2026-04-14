"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, RefreshCw } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { eventConfig as localConfig } from "@/data/event-config";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
  isDemo?: boolean;
}

export const Navbar = ({ eventName, isDemo = false }: NavbarProps) => {
  const router = useRouter();
  const { status } = useSession();

  const displayName = eventName || localConfig.personal.nombre || "Luz Jazmín";

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    // Navbar con Glassmorphism suave y bordes champagne muy finos
    <nav className="fixed top-0 w-full z-[100] bg-white/40 backdrop-blur-md border-b border-[#b4a178]/20 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRANDING: Coherente con el Hero */}
        <Link href="/" className="group flex flex-col items-start">
          <h1 className="text-gray-800 text-lg md:text-xl font-script italic leading-tight transition-colors group-hover:text-[#b4a178]">
            {displayName}
          </h1>
          <div className="flex items-center gap-1.5 -mt-0.10">
            <div className="h-[0.5px] w-3 bg-[#b4a178]/50" />
            <span className="text-[10px] uppercase tracking-[0.1em] font-sans font-light text-black">
              Mis 15 Años
            </span>
          </div>
        </Link>

        {/* CONTENEDOR DE ACCESO / CONTROL */}
        <div className="flex items-center gap-5"> 
          
          {/* MODO DEMO */}
          {isDemo ? (
            <div className="flex flex-col items-center gap-0.5">
              <motion.button 
                whileHover={{ rotate: 180, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="group flex items-center justify-center w-9 h-9 
                           bg-white border border-gray-200 rounded-full text-gray-400 
                           transition-all duration-300 hover:border-[#b4a178]/40 hover:text-[#b4a178] shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.button>
              <span className="text-[7px] uppercase tracking-widest font-bold text-gray-400">
                Reiniciar
              </span>
            </div>
          ) : (
            <>
              {/* LOGIN */}
              {status === "unauthenticated" && (
                <div className="flex flex-col items-center gap-0.5">
                  <button 
                    onClick={() => router.push("/client-login")}
                    className="group flex items-center justify-center w-9 h-9 
                               bg-white border border-gray-200 rounded-full text-gray-400 
                               transition-all duration-300 hover:border-[#b4a178]/40 hover:text-[#b4a178] shadow-sm"
                  >
                    <Users className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[7px] uppercase tracking-widest font-bold text-gray-400">
                    Invitado
                  </span>
                </div>
              )}

              {/* ADMIN Y LOGOUT */}
              {status === "authenticated" && (
                <>
                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => router.push("/admin/count")}
                      className="group flex items-center justify-center w-9 h-9 
                                 bg-white border border-gray-200 rounded-full text-gray-400 
                                 transition-all duration-300 hover:border-[#b4a178]/40 hover:text-[#b4a178] shadow-sm"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[7px] uppercase tracking-widest font-bold text-gray-400">
                      Panel
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => signOut()}
                      className="group flex items-center justify-center w-9 h-9 
                                 bg-white border border-gray-200 rounded-full text-gray-400 
                                 transition-all duration-300 hover:border-red-200 hover:text-red-400 shadow-sm"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[7px] uppercase tracking-widest font-bold text-gray-400">
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