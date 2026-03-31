"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut, Zap, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { eventConfig as localConfig } from "@/data/event-config";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface NavbarProps {
  eventName?: string | null;
  isDemo?: boolean; // Prop para controlar el modo demostración
}

export const Navbar = ({ eventName, isDemo = false }: NavbarProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const displayName = eventName || localConfig.personal.nombre;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full z-[100] px-2 sm:px-4 py-3">

      {/* CONTENEDOR FLOTANTE */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          max-w-4xl
          mx-auto
          bg-black/40
          backdrop-blur-2xl
          border border-white/10
          rounded-[1.5rem]
          px-3 sm:px-5
          py-2
          flex
          items-center
          justify-between
          gap-2
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
        "
      >

        {/* LOGO / NOMBRE */}
        <Link
          href="/"
          className="group flex flex-col leading-none max-w-[55%]"
        >
          <div className="flex items-center gap-1">
            <Zap
              size={14}
              className="text-purple-500 fill-purple-500 animate-pulse"
            />
            <h1
              className="
                text-white
                text-sm
                sm:text-lg
                font-black
                italic
                uppercase
                truncate
                group-hover:text-purple-400
              "
            >
              {displayName}
            </h1>
          </div>
          <span
            className="
              text-[6px]
              sm:text-[8px]
              uppercase
              tracking-[0.4em]
              font-black
              text-purple-500/60
              italic
            "
          >
            // XV Celebration
          </span>
        </Link>

        {/* ÁREA DE BOTONES / CONTROLES */}
        <div className="flex items-center gap-2 sm:gap-3">

          {isDemo ? (
            /* --- BOTÓN DE REINICIO (SÓLO EN MODO DEMO) --- */
            <button
              onClick={handleRefresh}
              className="
                flex items-center gap-2
                bg-purple-600/10
                border border-purple-500/20
                rounded-xl
                px-3
                py-1.5
                text-purple-400
                hover:bg-purple-600
                hover:text-white
                transition-all
                group
              "
            >
              <span className="text-[9px] font-black uppercase italic hidden sm:block">
                Reiniciar Demo
              </span>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <RefreshCw size={14} />
              </motion.div>
            </button>
          ) : (
            /* --- LÓGICA NORMAL (LOGIN / ADMIN) --- */
            <>
              {status === "unauthenticated" && (
                <button
                  onClick={() => router.push("/client-login")}
                  className="
                    flex items-center gap-2
                    bg-white/5
                    border border-white/10
                    rounded-xl
                    px-3
                    py-1.5
                    hover:bg-purple-600
                    transition
                  "
                >
                  <span className="text-[9px] font-black uppercase italic">
                    Entrar
                  </span>
                  <div className="w-7 h-7 flex items-center justify-center bg-purple-600/20 rounded-lg">
                    <Users size={14} />
                  </div>
                </button>
              )}

              {status === "authenticated" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push("/admin")}
                    className="
                      flex items-center gap-2
                      bg-white/5
                      border border-white/10
                      rounded-xl
                      px-3
                      py-1.5
                      hover:bg-white
                      hover:text-black
                      transition
                    "
                  >
                    <span className="text-[9px] hidden sm:block font-black uppercase italic">
                      Dashboard
                    </span>
                    <LayoutDashboard size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const currentSlug = session?.user?.slug;
                      const redirectPath = currentSlug ? `/invit/${currentSlug}` : "/";
                      signOut({ callbackUrl: redirectPath });
                    }}
                    className="
                      w-9 h-9
                      flex items-center justify-center
                      bg-red-600/10
                      border border-red-500/20
                      rounded-xl
                      hover:bg-red-600
                      hover:text-white
                      transition
                    "
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </motion.div>

      {/* GRADIENTE DE FONDO SUPERIOR */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent -z-10" />

    </nav>
  );
};