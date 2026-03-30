"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiKey, FiX, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ESTADOS PARA EL MODAL DE SEGURIDAD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [masterCode, setMasterCode] = useState("");
  const [modalError, setModalError] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales incorrectas o sin permisos");
      setLoading(false);
    } else {
      localStorage.setItem("manager_session", "active");
      router.push("/manager/dashboard");
      router.refresh();
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterCode === "MENDO_2026_PRO") {
      setIsModalOpen(false);
      router.push("/register");
    } else {
      setModalError(true);
      setTimeout(() => setModalError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-6 font-sans text-zinc-900 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-zinc-200 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 text-rose-500 rounded-2xl mb-4 shadow-lg">
            <FiShield size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
            Manager<span className="text-rose-600 font-black tracking-normal"> Auth</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2">
            Solo personal autorizado
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] bg-rose-50 text-rose-600 p-3 rounded-xl font-black uppercase tracking-widest text-center">
              {error}
            </motion.p>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="email" 
                placeholder="mario@mendoclick.com"
                className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Contraseña</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl py-4 pl-12 pr-12 transition-all outline-none font-bold text-sm text-black shadow-inner"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-zinc-950 text-white font-black uppercase py-5 rounded-[1.8rem] hover:bg-rose-600 transition-all shadow-xl tracking-[0.2em] text-[12px] mt-4 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Entrar al Panel"}
          </motion.button>
        </form>

        {/* --- LINK AL REGISTRO CON MODAL --- */}
        <div className="mt-8 text-center pt-6 border-t border-zinc-50">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-rose-500 transition-colors"
          >
            ¿No tienes cuenta? <span className="underline decoration-zinc-200 underline-offset-4">Regístrate</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">
            &copy; 2026 MendoClick Control
          </p>
        </div>
      </motion.div>

      {/* --- MODAL DE SEGURIDAD --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-[350px] bg-white rounded-[2rem] p-8 shadow-3xl text-center"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900"
              >
                <FiX size={20} />
              </button>

              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiKey size={28} />
              </div>

              <h2 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Acceso Restringido</h2>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8 leading-relaxed">
                Ingresa el código maestro para habilitar el registro de nuevos managers.
              </p>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="relative">
                  <input 
                    type="password"
                    autoFocus
                    placeholder="CÓDIGO DE SEGURIDAD"
                    className={`w-full bg-zinc-50 border-2 ${modalError ? 'border-rose-500 animate-shake' : 'border-transparent focus:border-zinc-950'} rounded-2xl py-4 px-6 text-center font-black tracking-[0.3em] outline-none transition-all`}
                    onChange={(e) => setMasterCode(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-zinc-950 text-white font-black uppercase py-4 rounded-2xl hover:bg-rose-600 transition-all flex items-center justify-center gap-2 text-[10px] tracking-widest"
                >
                  Verificar y Continuar <FiArrowRight />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}
