"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiMail, FiLink, FiLayout, FiPlusCircle, FiGlobe, FiLock, 
  FiHome, FiLayout as FiDashboard, FiCheckCircle, FiAlertCircle,
  FiStar, FiHeart, FiZap, FiPackage, FiAward // FiAward reemplaza a FiCrown
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
    { id: "DELUXE", name: "Deluxe Pro", icon: FiAward, color: "text-rose-500" }, // Cambiado a FiAward
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
        setMessage({ type: "success", text: `¡Cliente ${formData.slug} (${formData.planLevel}) creado con éxito!` });
        setFormData({ ...formData, email: "", password: "", slug: "", templateId: templates[category][0].id, planLevel: "CLASSIC" });
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
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3 mb-8">
          <Link href="/manager/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-rose-600 transition-all shadow-md">
            <FiDashboard size={14} /> Panel Control
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-zinc-100 transition-all shadow-sm">
            <FiHome size={14} /> Ver Web
          </Link>
        </motion.div>
        
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
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-zinc-200">
              {message.text && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-wider ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {message.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">Tipo de Evento</label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-100 rounded-2xl border-2 border-zinc-200/50">
                    <button type="button" onClick={() => handleCategoryChange("15_AÑOS")} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${category === "15_AÑOS" ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-500 hover:bg-zinc-200"}`}>
                      <FiStar size={14} className={category === "15_AÑOS" ? "text-rose-500" : ""} /> 15 Años
                    </button>
                    <button type="button" onClick={() => handleCategoryChange("BODAS")} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${category === "BODAS" ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-500 hover:bg-zinc-200"}`}>
                      <FiHeart size={14} className={category === "BODAS" ? "text-rose-500" : ""} /> Bodas
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1">Plan de Suscripción</label>
                  <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-100 rounded-2xl border-2 border-zinc-200/50">
                    {planOptions.map((plan) => (
                      <button key={plan.id} type="button" onClick={() => setFormData({ ...formData, planLevel: plan.id })} className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${formData.planLevel === plan.id ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-400 hover:bg-zinc-200"}`}>
                        <plan.icon size={16} className={formData.planLevel === plan.id ? plan.color : ""} />
                        {plan.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1"><FiMail className="text-rose-600" /> Email</label>
                    <input type="email" value={formData.email} placeholder="cliente@correo.com" className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm shadow-inner" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1"><FiLock className="text-rose-600" /> Password</label>
                    <input type="text" value={formData.password} placeholder="Clave inicial" className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm shadow-inner" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1"><FiLink className="text-rose-600" /> Slug Link</label>
                  <input type="text" value={formData.slug} placeholder="nombre-del-evento" className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-bold text-sm shadow-inner" onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 ml-1"><FiLayout className="text-rose-600" /> Template</label>
                  <select value={formData.templateId} className="w-full bg-zinc-100 border-2 border-transparent focus:border-zinc-900 focus:bg-white rounded-2xl p-4 transition-all outline-none font-black text-sm cursor-pointer shadow-inner" onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}>
                    {templates[category].map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className={`w-full text-white font-black uppercase py-5 rounded-[1.8rem] transition-all shadow-2xl flex items-center justify-center gap-3 tracking-[0.2em] text-[13px] ${loading ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-950 hover:bg-rose-600"}`}>
                  {loading ? "Habilitando..." : <><FiPlusCircle size={20} /> Crear y habilitar cliente</>}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-950 rounded-[2.5rem] p-8 text-white shadow-2xl border border-zinc-800">
              <h3 className="text-lg font-black italic uppercase mb-6 tracking-tighter border-b border-zinc-800 pb-2">Resumen</h3>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-900 rounded-2xl border border-rose-500/30">
                  <p className="text-rose-500 text-[10px] font-black italic uppercase">Categoría</p>
                  <p className="text-white text-xs mt-1 uppercase font-bold">{category.replace('_', ' ')}</p>
                </div>
                <div className="p-4 bg-zinc-900 rounded-2xl border border-rose-500/30">
                  <p className="text-rose-500 text-[10px] font-black italic uppercase">Plan</p>
                  <p className="text-white text-xs mt-1 uppercase font-bold">{formData.planLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}