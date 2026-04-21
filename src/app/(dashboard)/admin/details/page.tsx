"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Gift, Shirt, Loader2, CreditCard, 
  Eye, X, Trash2 
} from "lucide-react";
import { getEventDetails, updateEventDetails } from "@/actions/details.action";
import Swal from "sweetalert2";

// --- COMPONENTE MODAL DE VISTA PREVIA ---
function PreviewModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-[92%] max-w-sm h-fit bg-white p-6 md:p-8 z-[101] rounded-[2.5rem] border-b-8 border-red-600 shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute top-5 right-5 text-zinc-300 hover:text-red-600 transition-colors"><X size={24} /></button>
            <h3 className="text-xl md:text-2xl font-black uppercase italic text-black mb-6 tracking-tighter">{title}</h3>
            <div className="text-zinc-800">{children}</div>
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

  const [dressCode, setDressCode] = useState("");
  const [dressDescription, setDressDescription] = useState("");
  const [cbu, setCbu] = useState("");
  const [alias, setAlias] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getEventDetails();
        if (data) {
          setDressCode(data.dressCode || "");
          setDressDescription(data.dressDescription || "");
          setCbu(data.cbu || "");
          setAlias(data.alias || "");
          setBankName(data.bankName || "");
          setHolderName(data.holderName || "");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
        const result = await updateEventDetails({ 
          dressCode, dressDescription, cbu, alias, bankName, holderName 
        });
        if (result.success) {
          Swal.fire({
            title: "¡PUBLICADO!",
            text: "Cambios sincronizados.",
            icon: "success",
            confirmButtonColor: "#dc2626",
            customClass: { popup: 'rounded-[2rem] border-b-4 border-red-600' }
          });
        }
    } finally {
        setIsSaving(false);
    }
  };

  const handleClear = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR?',
      text: "Se borrarán los datos bancarios y de vestimenta.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'BORRAR TODO',
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (confirm.isConfirmed) {
      setIsSaving(true);
      try {
        const result = await updateEventDetails({
          dressCode: null, dressDescription: null, cbu: null, alias: null, bankName: null, holderName: null
        });
        if (result.success) {
          setDressCode(""); setDressDescription(""); setCbu(""); setAlias(""); setBankName(""); setHolderName("");
          Swal.fire("Limpio", "Base de datos actualizada.", "success");
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-50 gap-3">
      <Loader2 className="animate-spin text-red-600" size={32} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Cargando Detalles</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6 font-sans text-black pb-20">
      
      {/* HEADER ADAPTABLE */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">Event <span className="text-red-600">Details</span></h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={handleClear} disabled={isSaving} className="flex-1 sm:flex-none p-3 rounded-2xl bg-white border border-zinc-200 text-zinc-400">
            <Trash2 size={20} />
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex-[4] sm:flex-none bg-zinc-950 text-white px-5 py-3 rounded-2xl font-black text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} PUBLICAR
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* DRESS CODE */}
        <section className="bg-white p-6 rounded-[2rem] border-2 border-zinc-100 shadow-sm">
          <h2 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-800 mb-6 border-b pb-2">
            <Shirt size={14} className="text-red-600"/> 01. Vestimenta
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase mb-1.5 block ml-1">Código de Vestimenta</label>
              <input 
                type="text" 
                placeholder="EJ: ELEGANTE SPORT" 
                value={dressCode} 
                onChange={(e) => setDressCode(e.target.value.toUpperCase())} 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-black outline-none focus:border-red-600 transition-all uppercase" 
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase mb-1.5 block ml-1">Aclaración Adicional</label>
              <textarea 
                placeholder="EJ: EVITAR EL COLOR BLANCO..." 
                value={dressDescription} 
                onChange={(e) => setDressDescription(e.target.value)} 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-bold outline-none focus:border-red-600 h-24 resize-none" 
              />
            </div>
          </div>
        </section>

        {/* REGALOS */}
        <section className="bg-zinc-950 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden border-b-4 border-red-600">
          <h2 className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 mb-6 border-b border-white/5 pb-2 relative z-10">
            <CreditCard size={14} /> 02. Datos Bancarios
          </h2>
          <div className="space-y-4 relative z-10">
            <div>
              <label className="text-[8px] font-black text-zinc-500 uppercase mb-1.5 block ml-1">Titular de Cuenta</label>
              <input 
                type="text" 
                placeholder="NOMBRE COMPLETO"
                value={holderName} 
                onChange={(e) => setHolderName(e.target.value.toUpperCase())} 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-black text-white outline-none focus:border-red-500" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] font-black text-zinc-500 uppercase mb-1.5 block ml-1">Alias</label>
                <input 
                    type="text" 
                    placeholder="ALIAS.EJEMPLO"
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-black text-white outline-none focus:border-red-500" 
                />
              </div>
              <div>
                <label className="text-[8px] font-black text-zinc-500 uppercase mb-1.5 block ml-1">Banco / Entidad</label>
                <input 
                    type="text" 
                    placeholder="EJ: MERCADO PAGO"
                    value={bankName} 
                    onChange={(e) => setBankName(e.target.value.toUpperCase())} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-black text-white outline-none focus:border-red-500" 
                />
              </div>
            </div>
            <div>
              <label className="text-[8px] font-black text-zinc-500 uppercase mb-1.5 block ml-1">CBU / CVU</label>
              <input 
                type="text" 
                placeholder="22 DÍGITOS"
                value={cbu} 
                onChange={(e) => setCbu(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[10px] font-mono text-red-500 font-black outline-none focus:border-red-500" 
              />
            </div>
          </div>
        </section>
      </div>

      {/* VISTA PREVIA MOBILE COMPACTA */}
      <div className="mt-8 bg-zinc-50 rounded-[2.5rem] p-6 md:p-10 border-2 border-dashed border-zinc-200 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 italic">
              <Eye size={14}/> Test Live View
            </span>
        </div>
        
        <div className="flex justify-center gap-10">
          <button onClick={() => setActivePreview("dress")} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 group-active:scale-90 transition-all shadow-sm">
              <Shirt size={20} />
            </div>
            <span className="text-[8px] font-black uppercase text-zinc-400">Dress</span>
          </button>

          <button onClick={() => setActivePreview("gift")} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 group-active:scale-90 transition-all shadow-sm">
              <Gift size={20} />
            </div>
            <span className="text-[8px] font-black uppercase text-zinc-400">Gifts</span>
          </button>
        </div>

        <PreviewModal isOpen={activePreview === "dress"} onClose={() => setActivePreview(null)} title="DRESS CODE">
          <p className="text-lg font-black uppercase italic tracking-tighter text-red-600 mb-2">{dressCode || "VISTA PREVIA"}</p>
          <p className="text-xs font-bold text-zinc-500 leading-tight">"{dressDescription || "Tu sugerencia aquí."}"</p>
        </PreviewModal>

        <PreviewModal isOpen={activePreview === "gift"} onClose={() => setActivePreview(null)} title="REGALOS">
          <div className="space-y-3 text-left">
            {[
              { label: "Titular", val: holderName },
              { label: "Alias", val: alias },
              { label: "CBU", val: cbu, mono: true }
            ].map((d, i) => (
              <div key={i} className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 shadow-inner">
                <p className="text-[7px] font-black text-zinc-400 uppercase mb-0.5">{d.label}</p>
                <p className={`font-black text-[10px] uppercase ${d.mono ? 'font-mono text-red-600 break-all' : ''}`}>
                  {d.val || "---"}
                </p>
              </div>
            ))}
          </div>
        </PreviewModal>
      </div>

      <footer className="mt-8 flex items-center justify-center gap-3 opacity-20">
        <CreditCard size={12} />
        <p className="text-[7px] font-black uppercase tracking-[0.4em]">MendoClick Financial & Style Core</p>
      </footer>
    </div>
  );
}