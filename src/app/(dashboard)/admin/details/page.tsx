"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Gift, Shirt, Pencil, Loader2, CreditCard, User, Eye, X, Copy, Check } from "lucide-react";
import { getEventConfig, updateEventDetails } from "@/app/api/admin/details/route";
import Swal from "sweetalert2";

// --- COMPONENTE MODAL PARA LA VISTA PREVIA (SIMULA LA INVITACIÓN) ---
function PreviewModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white p-8 md:p-12 z-[101] rounded-[2rem] shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-3xl md:text-4xl font-serif italic text-black mb-8 tracking-tight">{title}</h3>
            <div className="text-black/70 font-light leading-relaxed">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DetailsConfigPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activePreview, setActivePreview] = useState<"dress" | "gift" | null>(null);

  // Estados de los campos
  const [dressCode, setDressCode] = useState<string>("");
  const [dressDescription, setDressDescription] = useState<string>("");
  const [cbu, setCbu] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [holderName, setHolderName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const config = await getEventConfig();
      if (config) {
        setDressCode(config.dressCode || "");
        setDressDescription(config.dressDescription || "");
        setCbu(config.cbu || "");
        setAlias(config.alias || "");
        setBankName(config.bankName || "");
        setHolderName(config.holderName || "");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateEventDetails({
      dressCode, dressDescription, cbu, alias, bankName, holderName,
    });

    if (result.success) {
      Swal.fire({
        title: "¡Todo guardado!",
        text: "Los detalles se actualizaron correctamente.",
        icon: "success",
        confirmButtonColor: "#18181b",
        customClass: { popup: 'rounded-[2rem] border-none shadow-2xl' }
      });
    }
    setIsSaving(false);
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">Cargando detalles...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      
      {/* HEADER DINÁMICO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-zinc-900 rounded-2xl shadow-lg">
              <Pencil className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-serif italic font-bold text-zinc-900 tracking-tight">
              Personalización Final
            </h1>
          </div>
          <p className="text-zinc-500 text-sm ml-1.5 font-medium italic">Define el estilo de tu noche y cómo recibir tus presentes</p>
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="relative group bg-zinc-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-600 transition-all duration-500 disabled:opacity-50 shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          <span className="tracking-widest text-[11px] font-black uppercase">Publicar Cambios</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* CARD VESTIMENTA */}
        <div className="group bg-white p-8 md:p-10 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-50 pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform duration-500">
                <Shirt className="h-6 w-6" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-800">Dress Code</h2>
            </div>
            <span className="text-[10px] font-bold text-rose-300 italic uppercase">Estética</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Código de Vestimenta</label>
              <input 
                type="text" 
                value={dressCode} 
                onChange={(e) => setDressCode(e.target.value)} 
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white p-5 rounded-2xl outline-none transition-all duration-300 font-medium text-zinc-800" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Sugerencia para invitados</label>
              <textarea 
                value={dressDescription} 
                onChange={(e) => setDressDescription(e.target.value)} 
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white p-5 rounded-2xl h-40 resize-none outline-none transition-all duration-300 font-medium text-zinc-800" 
              />
            </div>
          </div>
        </div>

        {/* CARD REGALOS */}
        <div className="group bg-zinc-900 p-8 md:p-10 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          <div className="flex items-center justify-between border-b border-white/5 pb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-white group-hover:bg-indigo-500 transition-colors duration-500">
                <Gift className="h-6 w-6" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Regalos & CBU</h2>
            </div>
            <CreditCard className="text-white/20 h-5 w-5" />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">CBU / CVU (22 dígitos)</label>
              <input 
                type="text" 
                value={cbu} 
                onChange={(e) => setCbu(e.target.value)} 
                className="w-full bg-white/5 border-2 border-transparent focus:border-indigo-500/50 p-5 rounded-2xl font-mono text-sm text-indigo-200 outline-none transition-all" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 text-center block">Alias Mercado Pago</label>
                <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)} className="w-full bg-white/5 border-2 border-transparent focus:border-indigo-500/50 p-5 rounded-2xl outline-none transition-all text-white font-serif italic text-center" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 text-center block">Banco o Institución</label>
                <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full bg-white/5 border-2 border-transparent focus:border-indigo-500/50 p-5 rounded-2xl outline-none transition-all text-white text-center font-bold" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <User size={12} /> Titular de la Cuenta
              </label>
              <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} className="w-full bg-white/5 border-2 border-transparent focus:border-indigo-500/50 p-5 rounded-2xl outline-none transition-all text-white uppercase tracking-widest text-xs font-bold" />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN VISTA PREVIA --- */}
      <div className="space-y-10 pt-10">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-zinc-200" />
          <div className="flex items-center gap-2 text-zinc-400">
            <Eye size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Vista Previa Real</span>
          </div>
          <div className="h-[1px] flex-1 bg-zinc-200" />
        </div>

        <div className="bg-zinc-50 rounded-[4rem] p-16 border border-zinc-200 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden shadow-inner">
          <p className="font-serif italic text-5xl text-zinc-800 mb-12 tracking-tight">Te cuento los detalles</p>
          
          <div className="flex gap-12">
            <button onClick={() => setActivePreview("dress")} className="flex flex-col items-center gap-4 group">
              <div className="w-24 h-24 rounded-full border-2 border-zinc-200 flex items-center justify-center bg-white group-hover:border-rose-400 group-hover:shadow-xl group-hover:shadow-rose-100 transition-all duration-500">
                <Shirt className="text-zinc-400 group-hover:text-rose-500 w-10 h-10 stroke-[1.5px]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400 group-hover:text-zinc-900 transition-colors">Dress Code</span>
            </button>

            <button onClick={() => setActivePreview("gift")} className="flex flex-col items-center gap-4 group">
              <div className="w-24 h-24 rounded-full border-2 border-zinc-200 flex items-center justify-center bg-white group-hover:border-indigo-400 group-hover:shadow-xl group-hover:shadow-indigo-100 transition-all duration-500">
                <Gift className="text-zinc-400 group-hover:text-indigo-500 w-10 h-10 stroke-[1.5px]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400 group-hover:text-zinc-900 transition-colors">Regalos</span>
            </button>
          </div>

          {/* MODALES ESPEJO (Reflejan lo que escribes arriba) */}
          <PreviewModal isOpen={activePreview === "dress"} onClose={() => setActivePreview(null)} title="Dress Code">
             <p className="text-2xl">Para mi gran noche, el estilo es <br/>
             <strong className="block text-black uppercase tracking-[0.2em] mt-3 italic text-3xl font-serif">{dressCode || "Elegante"}</strong></p>
             <p className="mt-6 italic text-black/50 font-medium">"{dressDescription || "Tu presencia es mi mejor regalo"}"</p>
          </PreviewModal>

          <PreviewModal isOpen={activePreview === "gift"} onClose={() => setActivePreview(null)} title="Regalos">
             <p className="mb-8 italic text-lg text-black/60">Si deseas realizarme un presente, <br/> te dejo mis datos bancarios:</p>
             <div className="space-y-4">
                <div className="bg-black/5 p-5 rounded-2xl border border-black/5">
                  <p className="text-[10px] uppercase text-black/40 font-bold mb-1 tracking-widest">Titular de cuenta</p>
                  <p className="font-bold text-black text-xl">{holderName || "Luz Jazmín"}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-[10px] uppercase font-black text-zinc-400">CBU</span>
                    <span className="text-sm font-mono font-bold">{cbu || "00000000000000"}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-[10px] uppercase font-black text-zinc-400">Alias</span>
                    <span className="font-serif italic font-bold">{alias || "SIN.ALIAS.MP"}</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 uppercase tracking-[0.3em] pt-4 font-bold">{bankName || "Banco"}</p>
             </div>
          </PreviewModal>
        </div>
      </div>
    </div>
  );
}