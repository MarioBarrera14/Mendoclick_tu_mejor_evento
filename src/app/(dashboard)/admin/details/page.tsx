"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Gift, Shirt, Pencil, Loader2, CreditCard, User, Eye, X, Copy, Check } from "lucide-react";
import { updateEventDetails } from "@/app/api/admin/details/route";
import Swal from "sweetalert2";

// --- COMPONENTE MODAL DE VISTA PREVIA (ESTILO INVITACIÓN) ---
function PreviewModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 m-auto w-[90%] max-w-sm h-fit bg-white p-8 z-[101] rounded-[2rem] border-b-8 border-red-600 shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-300 hover:text-red-600 transition-colors"><X size={20} /></button>
            <h3 className="text-2xl font-black uppercase italic text-black mb-6 tracking-tighter">{title}</h3>
            <div className="text-zinc-800">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DetailsConfigPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activePreview, setActivePreview] = useState<"dress" | "gift" | null>(null);

  // Estados inicializados siempre VACÍOS
  const [dressCode, setDressCode] = useState("");
  const [dressDescription, setDressDescription] = useState("");
  const [cbu, setCbu] = useState("");
  const [alias, setAlias] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleSave = async () => {
    if (!dressCode && !cbu) {
        Swal.fire("Atención", "Completa al menos los campos principales antes de publicar", "info");
        return;
    }

    setIsSaving(true);
    try {
        const result = await updateEventDetails({ dressCode, dressDescription, cbu, alias, bankName, holderName });
        if (result.success) {
          Swal.fire({
            title: "¡PUBLICADO!",
            text: "La información de la invitación ha sido actualizada",
            icon: "success",
            confirmButtonColor: "#dc2626",
            customClass: { popup: 'rounded-3xl border-b-4 border-red-600' }
          });
        }
    } catch (error) {
        Swal.fire("Error", "No se pudieron guardar los cambios", "error");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      
      {/* HEADER COMPACTO MENDOCLICK */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Event <span className="text-red-600">Details</span></h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} PUBLICAR CAMBIOS
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD DRESS CODE */}
        <section className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase text-zinc-800 mb-6 border-b pb-2">
            <Shirt size={14} className="text-red-600"/> Estilo de Vestimenta
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-zinc-600 uppercase mb-1 block">Código</label>
              <input 
                type="text" 
                placeholder="EJ: ELEGANTE SPORT, GALA, FORMAL..." 
                value={dressCode} 
                onChange={(e) => setDressCode(e.target.value)} 
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 font-bold text-black outline-none focus:border-red-500 transition-all uppercase placeholder:text-zinc-400 placeholder:font-normal" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-600 uppercase mb-1 block">Sugerencia (Texto corto)</label>
              <textarea 
                placeholder="EJ: EVITAR EL COLOR BLANCO / TRAER ROPA PARA LA ALBERCA..." 
                value={dressDescription} 
                onChange={(e) => setDressDescription(e.target.value)} 
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 font-bold text-black outline-none focus:border-red-500 transition-all h-24 resize-none placeholder:text-zinc-400 placeholder:font-normal text-sm" 
              />
            </div>
          </div>
        </section>

        {/* CARD REGALOS - NEGRA */}
        <section className="bg-zinc-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full" />
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase text-red-500 mb-6 border-b border-white/10 pb-2 relative z-10">
            <CreditCard size={14} /> Datos Bancarios
          </h2>
          <div className="space-y-4 relative z-10">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">Titular de Cuenta</label>
              <input 
                type="text" 
                placeholder="NOMBRE COMPLETO DEL DUEÑO DE LA CUENTA"
                value={holderName} 
                onChange={(e) => setHolderName(e.target.value)} 
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500 uppercase placeholder:text-zinc-600 placeholder:font-normal" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">Alias MP</label>
                <input 
                    type="text" 
                    placeholder="EJ: MI.EVENTO.BANC"
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500 placeholder:text-zinc-600 placeholder:font-normal" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">Banco</label>
                <input 
                    type="text" 
                    placeholder="EJ: GALICIA, SANTANDER, BNA..."
                    value={bankName} 
                    onChange={(e) => setBankName(e.target.value)} 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500 uppercase placeholder:text-zinc-600 placeholder:font-normal" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">CBU / CVU (22 dígitos)</label>
              <input 
                type="text" 
                placeholder="00000031000..."
                value={cbu} 
                onChange={(e) => setCbu(e.target.value)} 
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-xs font-mono text-red-400 font-bold outline-none focus:border-red-500 placeholder:text-zinc-600 placeholder:font-normal" 
              />
            </div>
          </div>
        </section>
      </div>

      {/* SECCIÓN VISTA PREVIA COMPACTA */}
      <div className="mt-12 bg-zinc-50 rounded-[3rem] p-10 border border-zinc-200 text-center shadow-inner">
        <div className="flex items-center justify-center gap-2 mb-8">
           <span className="h-[1px] w-12 bg-zinc-300"></span>
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2"><Eye size={14}/> Test Live View</span>
           <span className="h-[1px] w-12 bg-zinc-300"></span>
        </div>
        
        <div className="flex justify-center gap-8">
          <button onClick={() => setActivePreview("dress")} className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 group-hover:text-red-500 transition-all">
              <Shirt size={24} />
            </div>
            <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-black">Dress Code</span>
          </button>

          <button onClick={() => setActivePreview("gift")} className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 group-hover:text-red-500 transition-all">
              <Gift size={24} />
            </div>
            <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-black">Regalos</span>
          </button>
        </div>

        {/* MODAL DE DRESS CODE */}
        <PreviewModal isOpen={activePreview === "dress"} onClose={() => setActivePreview(null)} title="DRESS CODE">
          <p className="text-xl font-bold uppercase italic tracking-tighter text-red-600 mb-2">{dressCode || "VISTA PREVIA"}</p>
          <p className="text-sm italic text-zinc-500 leading-tight">"{dressDescription || "Aquí aparecerá la sugerencia que escribas arriba."}"</p>
        </PreviewModal>

        {/* MODAL DE REGALOS */}
        <PreviewModal isOpen={activePreview === "gift"} onClose={() => setActivePreview(null)} title="REGALOS">
          <p className="text-sm font-bold mb-4 italic text-zinc-500">Si deseas realizar un presente:</p>
          <div className="space-y-2 text-left">
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Titular</p>
              <p className="font-bold text-sm uppercase">{holderName || "NOMBRE DEL TITULAR"}</p>
            </div>
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Alias</p>
              <p className="font-bold text-sm">{alias || "TU.ALIAS.AQUÍ"}</p>
            </div>
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">CBU</p>
              <p className="font-mono text-[10px] font-bold break-all text-red-600">{cbu || "0000000000000000000000"}</p>
            </div>
          </div>
        </PreviewModal>

      </div>
    </div>
  );
}