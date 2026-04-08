"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, RefreshCw } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { bodaTemplateConfig as localConfig } from "@/data/event-config-bodas";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export const Navbar = ({ eventName, isDemo = false }: { eventName?: string | null; isDemo?: boolean }) => {
  const router = useRouter();
  const { status } = useSession();
  const displayName = eventName || localConfig.personal.nombre || "Nuestra Boda";

  const handleRefresh = () => window.location.reload();

  const retro3DStyle = {
    textShadow: "1.5px 1.5px 0px #33aba1, 3px 3px 0px rgba(0,0,0,0.2)",
  };

  return (
    <nav className="fixed top-0 w-full z-50 py-2 md:py-3 px-2 md:px-4 flex justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between">
        
        {/* BANNER COMPACTO */}
        <div className="relative z-10 flex flex-col items-center">
          <Link 
            href="/" 
            className="group relative bg-[#a02133]/60 backdrop-blur-sm px-3 py-1 md:px-8 md:py-2 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-all"
          >
            <span 
              className="text-sm md:text-xl font-black italic uppercase tracking-tighter text-white"
              style={retro3DStyle}
            >
              {displayName}
            </span>
          </Link>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {isDemo ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRefresh}
              className="p-2 bg-[#a02133]/60 text-white rounded shadow-md border-b-2 border-[#7a1927] hover:bg-[#a02133]/80 transition-all"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          ) : (
            <div className="flex gap-1.5 md:gap-2">
              {status === "unauthenticated" && (
                <button 
                  onClick={() => router.push("/client-login")}
                  className="p-2 bg-[#a02133]/60 text-white rounded shadow-md border-b-2 border-[#7a1927] transition-all"
                >
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}

              {status === "authenticated" && (
                <>
                  <button 
                    onClick={() => router.push("/admin/count")}
                    className="p-2 bg-[#a02133]/60 text-white rounded shadow-md border-b-2 border-[#7a1927]"
                  >
                    <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button 
                    onClick={() => signOut()}
                    className="p-2 bg-rose-700/60 text-white rounded shadow-md border-b-2 border-rose-900"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};