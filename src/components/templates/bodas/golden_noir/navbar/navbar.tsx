"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, RefreshCw } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
  isDemo?: boolean; 
}

export const Navbar = ({ eventName, isDemo = false }: NavbarProps) => {
  const router = useRouter();
  const { status } = useSession();

  // --- FUNCIÓN DE REPARACIÓN DE TEXTO ---
  // Convierte "PEDRO Y MARTA" -> "Pedro Y Marta" para que la fuente no se deforme
  const formatDisplayName = (text: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const rawName = eventName || "Nuestra Boda";
  const displayName = formatDisplayName(rawName);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 py-2.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRANDING REPARADO */}
        <Link href="/" className="group overflow-visible">
          <h1 
            className="text-white text-2xl md:text-3xl font-script tracking-normal transition-colors group-hover:text-pink-300 normal-case leading-none"
            style={{ textTransform: 'none' }}
          >
            {displayName}
          </h1>
          <span className="block text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-rose-400 mt-1">
            ¡Nuestra Boda!
          </span>
        </Link>

        <div className="flex items-center gap-6"> 
          
          {isDemo ? (
            <div className="flex flex-col items-center gap-0.5 animate-in fade-in zoom-in duration-500">
              <motion.button 
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={handleRefresh}
                className="group relative flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:border-pink-400/50 rounded-full text-white transition-all duration-300 hover:bg-pink-400/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
              >
                <RefreshCw className="w-4 h-4 text-zinc-400 group-hover:text-pink-400 transition-colors" />
              </motion.button>
              <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">Reiniciar</span>
            </div>
          ) : (
            <>
              {status === "unauthenticated" && (
                <div className="flex flex-col items-center gap-0.5 animate-in fade-in duration-500">
                  <button 
                    onClick={() => router.push("/client-login")}
                    className="group relative flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:border-indigo-400/50 rounded-full text-white transition-all duration-300 hover:bg-indigo-400/10 hover:scale-110 active:scale-95"
                  >
                    <Users className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                  </button>
                  <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">Ingresar</span>
                </div>
              )}

              {status === "authenticated" && (
                <>
                  <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-4 duration-500">
                    <button 
                      onClick={() => router.push("/admin/count")}
                      className="group relative flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:border-pink-400/50 rounded-full text-white transition-all duration-300 hover:bg-pink-400/10 hover:scale-110 active:scale-95"
                    >
                      <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-pink-400 transition-colors" />
                    </button>
                    <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">Admin</span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 animate-in slide-in-from-right-2 duration-500">
                    <button 
                      onClick={() => signOut()}
                      className="group relative flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:border-red-400/50 rounded-full text-white transition-all duration-300 hover:bg-red-400/10 hover:scale-110 active:scale-95"
                    >
                      <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" />
                    </button>
                    <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-zinc-500">Salir</span>
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