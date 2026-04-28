"use client";

import React, { useState } from "react";
import { Heart, User, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [cargando, setCargando] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cargando) return;
    setCargando(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);

      await Swal.fire({
        title: "¡Bienvenido!",
        text: "Entrando al panel de control...",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[2rem]' }
      });

      // Redirección directa al dashboard del cliente
      window.location.replace("/admin");
      
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonColor: "#ec4899"
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-zinc-900/50 border border-pink-500/20 p-8 rounded-[2.5rem] backdrop-blur-xl">
        <div className="flex flex-col items-center mb-10">
          <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
          <h1 className="text-white text-3xl font-serif italic mt-4 text-center">Panel Cliente</h1>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-zinc-800 rounded-full py-3 px-6 text-white outline-none focus:border-pink-500"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-zinc-800 rounded-full py-3 px-6 text-white outline-none focus:border-pink-500"
          />
          <button type="submit" disabled={cargando} className="w-full bg-pink-600 py-4 rounded-full text-white font-bold transition-transform hover:scale-105 disabled:opacity-50">
            {cargando ? <Loader2 className="animate-spin mx-auto" /> : "INGRESAR"}
          </button>
        </form>
      </div>
    </div>
  );
}