"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiMail, 
  FiLink, 
  FiLayout, 
  FiPlusCircle, 
  FiGlobe, 
  FiLock, 
  FiArrowRight, 
  FiHome,
  FiLayout as FiDashboard,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

// IMPORTAMOS LA ACCIÓN (Asegurate de que la ruta sea correcta)
import { registerClient } from "@/lib/actions"; 

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    slug: "",
    templateId: "DEMO1",
    masterCode: "MENDO_2026_PRO", // Código por defecto para el Manager
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await registerClient(formData);

      if (result?.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: `¡Cliente ${formData.slug} creado con éxito!` });
        // Opcional: limpiar el formulario después del éxito
        setFormData({ ...formData, email: "", password: "", slug: "" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6 md:p-12 font-sans text-zinc-900">
      <div className="max-w-4xl mx-auto">
        
        {/* NAVEGACIÓN */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Link 
            href="/manager/dashboard" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-rose-600 transition-all shadow-md"
          >
            <FiDashboard size={14} /> Panel Control
          </Link>

          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-zinc-100 transition-all shadow-sm"
          >
            <FiHome size={14} /> Ver Web
          </Link>
        </motion.div>
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-l-4 border-rose-500 pl-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Nueva<span className="text-rose-600 font-black"> Invitación</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">
              Habilitar nuevo acceso de cliente en Mendoclick
            </p>
          </div>
          <div className="bg-zinc-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-800 shadow-lg">
            Manager Mode Active
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 text-black">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-zinc-200"
            >
              {/* MENSAJES DE ESTADO */}
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-wider ${
                    message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
                  {message.text}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* EMAIL */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">
                    <FiMail className="text-rose-600" /> Email del Cliente
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">
                    <FiLock className="text-rose-600" /> Contraseña Temporal
                  </label>
                  <input 
                    type="text" 
                    value={formData.password}
                    placeholder="Clave inicial"
                    className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>

                {/* SLUG */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">
                    <FiLink className="text-rose-600" /> Slug Personalizado (Link)
                  </label>
                  <input 
                    type="text" 
                    value={formData.slug}
                    placeholder="mis-15-de-oli"
                    className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm text-black shadow-inner"
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                    required
                  />
                  <div className="flex items-center gap-3 mt-2 ml-1 p-4 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800">
                    <FiGlobe size={16} className="text-rose-500" />
                    <p className="text-[11px] font-mono text-zinc-300 tracking-tight">
                      URL: <span className="text-white font-black underline underline-offset-4 decoration-rose-500">mendoclick.com/inv/{formData.slug || "..."}</span>
                    </p>
                  </div>
                </div>

                {/* TEMPLATE */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">
                    <FiLayout className="text-rose-600" /> Seleccionar Template
                  </label>
                  <select 
                    value={formData.templateId}
                    className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-black text-sm cursor-pointer shadow-inner text-black"
                    onChange={(e) => setFormData({...formData, templateId: e.target.value})}
                  >
                    <option value="DEMO1">Classic Night (Black & White)</option>
                    <option value="DEMO2">Neon Party (Interactiva)</option>
                    <option value="DEMO3">Golden Luxury (Boda/XV)</option>
                  </select>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit" 
                  className={`w-full text-white font-black uppercase py-5 rounded-[1.8rem] transition-all shadow-2xl flex items-center justify-center gap-3 tracking-[0.2em] text-[13px] ${
                    loading ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-950 hover:bg-rose-600"
                  }`}
                >
                  {loading ? (
                    "Habilitando..."
                  ) : (
                    <>
                      <FiPlusCircle size={20} /> Crear y habilitar cliente
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">
            <div className="bg-zinc-950 rounded-[2.5rem] p-8 text-white shadow-2xl border border-zinc-800">
              <h3 className="text-lg font-black italic uppercase mb-6 tracking-tighter border-b border-zinc-800 pb-2">Reglas del Slug</h3>
              <ul className="space-y-5 text-[11px] text-zinc-400 font-black leading-relaxed tracking-wider uppercase">
                <li className="flex gap-4 items-start"><span className="text-rose-500">01</span> El slug debe ser único por cliente.</li>
                <li className="flex gap-4 items-start"><span className="text-rose-500">02</span> No usar espacios ni tildes.</li>
                <li className="flex gap-4 items-start"><span className="text-rose-500">03</span> El sistema autocompleta con guiones.</li>
              </ul>
            </div>
            
            <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-rose-200 relative overflow-hidden group">
               <div className="relative z-10 font-black italic text-2xl uppercase tracking-tighter leading-none">
                Próximo <br /> Paso
               </div>
               <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] opacity-90 mt-4 leading-relaxed">
                Generar acceso <br /> para WhatsApp
               </p>
               <FiArrowRight size={100} className="absolute bottom-[-20px] right-[-20px] opacity-20 group-hover:translate-x-4 transition-transform duration-500" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}