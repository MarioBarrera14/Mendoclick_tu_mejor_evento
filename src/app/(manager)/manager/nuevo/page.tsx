"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FiMail, FiLink, FiLayout, FiPlusCircle, FiLock, 
  FiHome, FiLayout as FiDashboard, FiCheckCircle, FiAlertCircle,
  FiStar, FiHeart, FiZap, FiPackage, FiAward, FiPhone, FiInfo
} from "react-icons/fi";
import { registerClient } from "@/lib/actions"; 

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [category, setCategory] = useState<"15_AÑOS" | "BODAS">("15_AÑOS");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    slug: "",
    phone: "", 
    templateId: "DEMO1",
    planLevel: "CLASSIC",
    masterCode: "MENDO_2026_PRO",
  });

  const templates = useMemo(() => ({
    "15_AÑOS": [
      { id: "DEMO1", name: "Champagne 15" },
      { id: "DEMO2", name: "Neon Party 15" },
      { id: "DEMO3", name: "Graffiti Urbano 15" },
    ],
    "BODAS": [
      { id: "DEMO4", name: "Graffiti Urban Bodas" },
      { id: "DEMO5", name: "Golden Noir Bodas" },
      { id: "DEMO6", name:  "Retro Vinyl Bodas"},
    ]
  }), []);

  const planOptions = [
    { id: "CLASSIC", name: "Classic", icon: FiPackage, color: "text-blue-500" },
    { id: "PREMIUM", name: "Premium", icon: FiZap, color: "text-amber-500" },
    { id: "DELUXE", name: "Deluxe Pro", icon: FiAward, color: "text-rose-500" },
  ];
    
  const handleCategoryChange = (newCat: "15_AÑOS" | "BODAS") => {
    setCategory(newCat);
    setFormData(prev => ({ ...prev, templateId: templates[newCat][0].id }));
  };

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
        setFormData({ ...formData, email: "", password: "", slug: "", phone: "", templateId: templates[category][0].id, planLevel: "CLASSIC" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-4 md:p-8 font-sans text-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/manager/dashboard" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">
            <FiDashboard size={12} /> Panel Control
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 border border-zinc-200 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">
            <FiHome size={12} /> Ir a Web
          </Link>
        </div>
        
        <header className="mb-8 border-l-4 border-rose-500 pl-4">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
            Nueva<span className="text-rose-600"> Invitación</span>
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Habilitación inmediata de cliente</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-200">
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Evento */}
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => handleCategoryChange("15_AÑOS")} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${category === "15_AÑOS" ? "bg-zinc-900 border-zinc-900 text-white" : "bg-zinc-50 border-transparent text-zinc-400"}`}>
                    <FiStar size={12} /> 15 Años
                  </button>
                  <button type="button" onClick={() => handleCategoryChange("BODAS")} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${category === "BODAS" ? "bg-zinc-900 border-zinc-900 text-white" : "bg-zinc-50 border-transparent text-zinc-400"}`}>
                    <FiHeart size={12} /> Bodas
                  </button>
                </div>

                {/* Planes */}
                <div className="grid grid-cols-3 gap-2">
                  {planOptions.map((plan) => (
                    <button key={plan.id} type="button" onClick={() => setFormData({ ...formData, planLevel: plan.id })} className={`flex flex-col items-center py-2 rounded-xl text-[8px] font-black uppercase border-2 transition-all ${formData.planLevel === plan.id ? "bg-zinc-900 border-zinc-900 text-white shadow-md" : "bg-zinc-50 border-transparent text-zinc-400"}`}>
                      <plan.icon size={14} className={formData.planLevel === plan.id ? plan.color : ""} />
                      {plan.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase ml-1 flex items-center gap-1">Email <FiInfo size={10} className="text-zinc-400"/></label>
                    <input type="email" value={formData.email} placeholder="ejemplo@cliente.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none text-sm font-bold focus:border-zinc-900 transition-all shadow-inner" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase ml-1">Password Inicial</label>
                    <input type="text" value={formData.password} placeholder="Mín. 6 caracteres" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none text-sm font-bold focus:border-zinc-900 transition-all shadow-inner" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                  </div>
                </div>

                {/* WhatsApp Condicional */}
                <AnimatePresence>
                  {formData.planLevel === "CLASSIC" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] font-black uppercase text-green-600 ml-1 flex items-center gap-1">
                          <FiPhone size={10} /> WhatsApp para Confirmaciones
                        </label>
                        <input type="text" value={formData.phone} placeholder="5492612345678 (Sin el +)" className="w-full bg-green-50/50 border border-green-200 rounded-xl p-3 outline-none text-sm font-bold focus:border-green-500 transition-all text-green-900 shadow-inner" onChange={(e) => setFormData({...formData, phone: e.target.value})} required={formData.planLevel === "CLASSIC"} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Link/Slug con prefijo visual */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase ml-1">Enlace de la Invitación</label>
                  <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden focus-within:border-zinc-900 transition-all shadow-inner">
                    <span className="bg-zinc-200 px-3 py-3 text-[10px] font-black text-zinc-500 uppercase">mendoclick.com.ar/invit/</span>
                    <input type="text" value={formData.slug} placeholder="nombre-evento" className="flex-1 bg-transparent p-3 outline-none text-sm font-bold" onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase ml-1">Diseño Seleccionado (Template)</label>
                  <div className="relative">
                    <select value={formData.templateId} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none text-sm font-black cursor-pointer focus:border-zinc-900 transition-all appearance-none shadow-inner" onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}>
                        {templates[category].map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                    <FiLayout className="absolute right-4 top-3.5 text-zinc-400 pointer-events-none" size={14}/>
                  </div>
                </div>

                <button disabled={loading} type="submit" className={`w-full text-white font-black uppercase py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-[11px] tracking-widest ${loading ? "bg-zinc-400" : "bg-zinc-950 hover:bg-rose-600 shadow-lg"}`}>
                  {loading ? "Habilitando..." : <><FiPlusCircle size={16} /> Crear Acceso Cliente</>}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 rounded-3xl p-6 text-white sticky top-4 shadow-xl border border-zinc-800">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-rose-500 border-b border-zinc-800 pb-2 italic">Snapshot</h3>
              <div className="space-y-3">
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-[7px] font-black uppercase mb-1">Plan de servicio</p>
                  <p className="text-[10px] font-bold uppercase flex items-center gap-2">
                    <FiZap size={10} className="text-amber-500"/> {formData.planLevel}
                  </p>
                </div>
                {formData.planLevel === "CLASSIC" && (
                  <div className="bg-zinc-900/80 p-3 rounded-xl border border-green-900/30">
                    <p className="text-green-500 text-[7px] font-black uppercase mb-1">Ruta WhatsApp</p>
                    <p className="text-[10px] font-bold truncate">{formData.phone || 'N/A'}</p>
                  </div>
                )}
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-[7px] font-black uppercase mb-1">URL Final</p>
                  <p className="text-[9px] font-mono text-rose-400 truncate">/invit/{formData.slug || '...'}</p>
                </div>
              </div>
              
              {message.text && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={`mt-6 p-3 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 ${message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                  {message.text}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}