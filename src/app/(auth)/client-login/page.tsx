"use client";

import React, { useState } from "react";
import { Heart, User, Lock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  
  // 1. Estados para capturar email y password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Función de manejo de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cargando) return;

    setCargando(true);

    try {
      // Usamos el provider "credentials" configurado en NextAuth
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Evitamos redirección automática para manejar errores con Swal
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Login exitoso
      await Swal.fire({
        title: '<span style="font-family: serif; font-style: italic;">¡Hola de nuevo!</span>',
        text: "Iniciando sesión...",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'rounded-[2rem]' }
      });

      router.push("/admin"); // Ajusta a tu ruta de panel de control
      router.refresh();
      
    } catch (error: any) {
      Swal.fire({
        title: "Error de acceso",
        text: "Credenciales incorrectas o usuario no encontrado",
        icon: "error",
        confirmButtonColor: "#18181b",
        customClass: { popup: 'rounded-[2rem]' }
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6">
      <Link 
        href="/" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-zinc-500 hover:text-pink-400 transition-colors flex items-center gap-2 text-xs sm:text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      <div className="w-full max-w-[400px] bg-zinc-900/50 border border-pink-500/20 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <div className="relative">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 fill-pink-500 animate-pulse opacity-20 absolute blur-lg" />
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 fill-pink-500 relative drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-serif italic mt-4 text-center leading-tight">Panel de Invitados</h1>
          <p className="text-zinc-500 text-[8px] sm:text-[10px] uppercase tracking-[0.4em] mt-2 text-center">Luz Jazmín • Mis XV</p>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 ml-4">Correo Electrónico</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400/50" />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-black/40 border border-zinc-800 rounded-full py-3 sm:py-3.5 pl-12 pr-6 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 ml-4">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400/50" />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-zinc-800 rounded-full py-3 sm:py-3.5 pl-12 pr-6 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={cargando}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3.5 sm:py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50"
          >
            {cargando ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>INGRESAR <Heart className="w-4 h-4 fill-white" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}