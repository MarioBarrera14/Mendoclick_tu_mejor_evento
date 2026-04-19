"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiUser, FiKey } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions"; // Apuntando al nuevo lugar// Importamos la acción

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    masterCode: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await registerUser(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      alert("¡Usuario creado con éxito! Ahora puedes loguearte.");
      router.push("/manager/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-6 font-sans text-zinc-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-zinc-200"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 text-rose-500 rounded-2xl mb-4 shadow-lg">
            <FiShield size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
            Manager<span className="text-rose-600 font-black tracking-normal"> Create</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2">
            Registro de administrador oculto
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] bg-rose-50 text-rose-600 p-3 rounded-xl font-black uppercase tracking-widest text-center">
              {error}
            </motion.p>
          )}

          {/* NOMBRE */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Nombre Completo</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Mario..."
                className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="email" 
                placeholder="mario@mendoclick.com"
                className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Contraseña</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl py-4 pl-12 pr-12 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* CÓDIGO MAESTRO */}
          <div className="space-y-1 pt-2 border-t border-zinc-100">
            <label className="text-[10px] font-black uppercase tracking-widest text-rose-500 ml-2 italic">Código Maestro de Seguridad</label>
            <div className="relative">
              <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
              <input 
                type="password" 
                placeholder="Código Secreto"
                className="w-full bg-rose-50/50 border-2 border-rose-100 focus:border-rose-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setFormData({...formData, masterCode: e.target.value})}
                required
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-zinc-950 text-white font-black uppercase py-5 rounded-[1.8rem] hover:bg-rose-600 transition-all shadow-xl tracking-[0.2em] text-[12px] mt-4 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Crear Usuario Admin"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}