"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, LayoutDashboard, Edit3, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { globalBodaConfig as localConfig } from "@/data/event-config-bodas";

interface NavbarProps {
  eventName?: string | null;
  plan?: string;
  isDemo?: boolean;
}

export function Navbar({ eventName, plan = "CLASSIC", isDemo = false }: NavbarProps) {
  // --- ESTA ES LA LÓGICA QUE FALTABA ---
  // Si es demo, no renderizamos absolutamente nada
  if (isDemo) return null;

  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const displayName = eventName || localConfig.personal.nombres || "Nuestra Boda";

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
        scrolled ? "bg-[#649a8d]/50 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo / Nombre */}
        <Link href="/" className="group">
          <h1 className={`font-['Permanent_Marker',_cursive] text-2xl md:text-3xl transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}>
            {displayName}
          </h1>
          <span className={`block text-[8px] uppercase tracking-[0.4em] font-sans font-black italic leading-none mt-1 ${
            scrolled ? "text-black/60" : "text-white/60"
          }`}>
            Urban Wedding
          </span>
        </Link>

        {/* Acciones del Navbar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {status === "unauthenticated" ? (
              <Link
                href="/client-login"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                  scrolled 
                    ? "border-black text-black hover:bg-black hover:text-white" 
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                <LogIn size={14} />
                Acceso
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDashboardRedirect}
                  className="flex items-center justify-center w-10 h-10 bg-[#5ba394] text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  {session?.user?.role === "ADMIN" ? <LayoutDashboard size={18} /> : <Edit3 size={18} />}
                </button>
                
                <button 
                  onClick={() => signOut()}
                  className="flex items-center justify-center w-10 h-10 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}