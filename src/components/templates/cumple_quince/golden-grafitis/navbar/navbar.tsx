"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, LayoutDashboard, Edit3, LogOut, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { globalQuinceConfig as localConfig } from "@/data/event-config-bodas";

interface NavbarProps {
  eventName?: string | null;
  plan?: string;
  isDemo?: boolean;
}

export function Navbar({ eventName, plan = "CLASSIC", isDemo = false }: NavbarProps) {
  // --- REGLA DE ORO: En demo no renderizamos el Navbar real ---
  if (isDemo) return null;

  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const displayName = eventName || localConfig.personal.nombre || "Mis 15 Años";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardRedirect = () => {
    if (session?.user?.role === "ADMIN") {
      router.push("/manager/dashboard");
    } else {
      router.push("/admin");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/30 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo / Nombre Estilo Graffiti */}
        <Link href="/" className="group">
          <h1 className={`font-['Permanent_Marker',_cursive] text-2xl md:text-3xl transition-colors uppercase tracking-tighter ${
            scrolled ? "text-black" : "text-white"
          }`}>
            {displayName}
          </h1>
          <span className={`block text-[8px] uppercase tracking-[0.4em] font-sans font-black italic leading-none mt-1 ${
            scrolled ? "text-black/60" : "text-white/60"
          }`}>
            Urban Event
          </span>
        </Link>

        {/* Acciones del Navbar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {status === "unauthenticated" ? (
              <div className="flex flex-col items-center gap-0.5">
                <button
                  onClick={() => router.push("/client-login")}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110 shadow-lg border-2 ${
                    scrolled 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-black border-white"
                  }`}
                >
                  <LogIn size={18} />
                </button>
                <span className={`text-[7px] uppercase tracking-widest font-bold font-sans ${
                  scrolled ? "text-black/60" : "text-white/60"
                }`}>
                  Acceso
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Dashboard / Edit */}
                <div className="flex flex-col items-center gap-0.5">
                  <button 
                    onClick={handleDashboardRedirect}
                    className="flex items-center justify-center w-10 h-10 bg-[#5ba394] text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    {session?.user?.role === "ADMIN" ? <LayoutDashboard size={18} /> : <Edit3 size={18} />}
                  </button>
                  <span className={`text-[7px] uppercase tracking-widest font-bold font-sans ${
                    scrolled ? "text-black/60" : "text-white/60"
                  }`}>
                    Panel
                  </span>
                </div>
                
                {/* Logout */}
                <div className="flex flex-col items-center gap-0.5">
                  <button 
                    onClick={() => signOut()}
                    className="flex items-center justify-center w-10 h-10 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    <LogOut size={18} />
                  </button>
                  <span className="text-[7px] uppercase tracking-widest font-bold text-rose-500 font-sans">
                    Salir
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}