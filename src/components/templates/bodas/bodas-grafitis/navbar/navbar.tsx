"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, RefreshCw } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
  isDemo?: boolean;
  plan?: string; // <--- AGREGADO: Esto elimina el error en page.tsx
}

export const Navbar = ({ eventName, isDemo = false, plan = "CLASSIC" }: NavbarProps) => {
  const router = useRouter();
  const { data: session, status } = useSession(); 

  const displayName = eventName || localConfig.personal.nombres || "Nuestra Boda";

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-xl border-b border-white/20 py-2 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="group">
          <h1 className="font-['Permanent_Marker',_cursive] text-black text-xl md:text-2xl uppercase tracking-tighter leading-none transition-transform group-hover:scale-105">
            {displayName}
          </h1>
          <span className="block text-[8px] uppercase tracking-[0.4em] font-sans text-black/60 font-black italic leading-none mt-1">
            Urban Wedding
          </span>
        </Link>

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
              {/* Ocultamos opciones de Login/Admin si el plan es CLASSIC */}
              {plan !== "CLASSIC" && (
                <>
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

                  {status === "authenticated" && (
                    <>
                      <div className="flex flex-col items-center gap-0.5">
                        <button 
                          onClick={() => router.push("/admin")} 
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
                          onClick={() => {
                            const currentSlug = session?.user?.slug;
                            const redirectPath = currentSlug ? `/invit/${currentSlug}` : "/";
                            signOut({ callbackUrl: redirectPath });
                          }}
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};