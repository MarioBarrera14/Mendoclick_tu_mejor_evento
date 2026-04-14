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

  const displayName = eventName || localConfig.personal.nombre || "Nuestra Boda";

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    // NAVBAR CON TRANSPARENCIA GLASSMISM (Mismo que tus cards)
    <nav className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-xl border-b border-white/20 py-2 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO / NOMBRE ESTILO GRAFFITI */}
        <Link href="/" className="group">
          <h1 className="font-['Permanent_Marker',_cursive] text-black text-xl md:text-2xl uppercase tracking-tighter leading-none transition-transform group-hover:scale-105">
            {displayName}
          </h1>
          <span className="block text-[8px] uppercase tracking-[0.4em] font-sans text-black/60 font-black italic leading-none mt-1">
          Mis 15
          </span>
        </Link>

        {/* CONTENEDOR DE ACCESO COMPACTO */}
        <div className="flex items-center gap-4"> 
          
          {isDemo ? (
            <div className="flex flex-col items-center gap-0.5">
              <motion.button 
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                className="flex items-center justify-center w-9 h-9 bg-black/10 border border-black/10 rounded-full text-black transition-all hover:bg-black/20 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
              <span className="text-[7px] uppercase tracking-widest font-bold text-black/60">
                Reset
              </span>
            </div>
          ) : (
            <>
              {/* LOGIN */}
              {status === "unauthenticated" && (
                <div className="flex flex-col items-center gap-0.5">
                  <button 
                    onClick={() => router.push("/client-login")}
                    className="flex items-center justify-center w-9 h-9 bg-black text-white rounded-full transition-all hover:scale-110 shadow-lg"
                  >
                    <Users className="w-4 h-4" />
                  </button>
                  <span className="text-[7px] uppercase tracking-widest font-bold text-black/60 font-sans">
                    Login
                  </span>
                </div>
              )}

              {/* DASHBOARD Y LOGOUT */}
              {status === "authenticated" && (
                <>
                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => router.push("/admin/count")}
                      className="flex items-center justify-center w-9 h-9 bg-[#5ba394] text-white rounded-full transition-all hover:scale-110 shadow-lg"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                    </button>
                    <span className="text-[7px] uppercase tracking-widest font-bold text-black/60">
                      Admin
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => signOut()}
                      className="flex items-center justify-center w-9 h-9 bg-rose-500 text-white rounded-full transition-all hover:scale-110 shadow-lg"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                    <span className="text-[7px] uppercase tracking-widest font-bold text-rose-600/70">
                      Out
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