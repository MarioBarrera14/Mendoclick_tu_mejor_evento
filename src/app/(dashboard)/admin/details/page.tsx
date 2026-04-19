"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Gift, Shirt, Loader2, CreditCard, 
  Eye, X, Trash2 
} from "lucide-react";
// Importamos las acciones independientes
import { getEventDetails, updateEventDetails } from "@/actions/details.action";
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
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activePreview, setActivePreview] = useState<"dress" | "gift" | null>(null);

  // Estados de los campos
  const [dressCode, setDressCode] = useState("");
  const [dressDescription, setDressDescription] = useState("");
  const [cbu, setCbu] = useState("");
  const [alias, setAlias] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");

  // 1. CARGA DE DATOS INICIAL (Sincronizado con Prisma)
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
        console.error("Error cargando detalles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. GUARDAR CAMBIOS
  const handleSave = async () => {
    setIsSaving(true);
    try {
        const result = await updateEventDetails({ 
          dressCode, dressDescription, cbu, alias, bankName, holderName 
        });
        
        if (result.success) {
          Swal.fire({
            title: "¡PUBLICADO!",
            text: "La información ha sido actualizada en la invitación.",
            icon: "success",
            confirmButtonColor: "#dc2626",
            customClass: { popup: 'rounded-3xl border-b-4 border-red-600' }
          });
        }
    } catch (error) {
        Swal.fire("Error", "No se pudieron guardar los cambios.", "error");
    } finally {
        setIsSaving(false);
    }
  };

  // 3. LIMPIAR TODO (Borrando de la DB con NULL)
  const handleClear = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR SECCIÓN?',
      text: "Se borrará el Dress Code y los datos bancarios de forma permanente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#18181b',
      confirmButtonText: 'SÍ, BORRAR TODO',
      cancelButtonText: 'CANCELAR',
      customClass: { popup: 'rounded-[2rem] border-b-8 border-red-600 shadow-2xl' }
    });

    if (confirm.isConfirmed) {
      setIsSaving(true);
      const resetData = {
        dressCode: null, dressDescription: null,
        cbu: null, alias: null, bankName: null, holderName: null
      };
      
      try {
        const result = await updateEventDetails(resetData);
        if (result.success) {
          setDressCode(""); setDressDescription("");
          setCbu(""); setAlias(""); setBankName(""); setHolderName("");
          Swal.fire("Eliminado", "La base de datos ha sido limpiada.", "success");
        }
      } catch (e) {
        Swal.fire("Error", "No se pudo limpiar la sección.", "error");
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-zinc-50">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      
      {/* HEADER COMPACTO */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Event <span className="text-red-600">Details</span></h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleClear} disabled={isSaving} className="p-3 rounded-xl bg-white border-2 border-zinc-200 text-zinc-400 hover:text-red-600 transition-colors">
            <Trash2 size={20} />
          </button>
          <button onClick={handleSave} disabled={isSaving} className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} PUBLICAR CAMBIOS
          </button>
        </div>
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
                placeholder="EJ: ELEGANTE SPORT, GALA, CASUAL..." 
                value={dressCode} 
                onChange={(e) => setDressCode(e.target.value)} 
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 font-bold outline-none focus:border-red-500 transition-all uppercase" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-600 uppercase mb-1 block">Sugerencia (Texto corto)</label>
              <textarea 
                placeholder="EJ: POR FAVOR, EVITAR EL COLOR BLANCO Y TRAER ROPA CÓMODA PARA EL FINAL..." 
                value={dressDescription} 
                onChange={(e) => setDressDescription(e.target.value)} 
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 font-bold outline-none focus:border-red-500 h-24 resize-none text-sm" 
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
                placeholder="EJ: MARIO JAVIER ARIEL"
                value={holderName} 
                onChange={(e) => setHolderName(e.target.value)} 
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500 uppercase" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">Alias MP / Banco</label>
                <input 
                    type="text" 
                    placeholder="EJ: MENDOCLICK.MP"
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">Banco</label>
                <input 
                    type="text" 
                    placeholder="EJ: MERCADO PAGO, GALICIA, NACIÓN..."
                    value={bankName} 
                    onChange={(e) => setBankName(e.target.value)} 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm font-bold text-white outline-none focus:border-red-500 uppercase" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase mb-1 block">CBU / CVU (22 dígitos)</label>
              <input 
                type="text" 
                placeholder="EJ: 0000003100012345678901"
                value={cbu} 
                onChange={(e) => setCbu(e.target.value)} 
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-xs font-mono text-red-400 font-bold outline-none focus:border-red-500" 
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
            <div className="w-16 h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 transition-all">
              <Shirt size={24} />
            </div>
            <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-black">Dress Code</span>
          </button>

          <button onClick={() => setActivePreview("gift")} className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center group-hover:border-red-500 transition-all">
              <Gift size={24} />
            </div>
            <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-black">Regalos</span>
          </button>
        </div>

        <PreviewModal isOpen={activePreview === "dress"} onClose={() => setActivePreview(null)} title="DRESS CODE">
          <p className="text-xl font-bold uppercase italic tracking-tighter text-red-600 mb-2">{dressCode || "VISTA PREVIA"}</p>
          <p className="text-sm italic text-zinc-500 leading-tight">"{dressDescription || "Sugerencia aquí."}"</p>
        </PreviewModal>

        <PreviewModal isOpen={activePreview === "gift"} onClose={() => setActivePreview(null)} title="REGALOS">
          <div className="space-y-2 text-left">
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Titular</p>
              <p className="font-bold text-sm uppercase">{holderName || "---"}</p>
            </div>
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Alias</p>
              <p className="font-bold text-sm">{alias || "---"}</p>
            </div>
            <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200">
              <p className="text-[8px] font-black text-zinc-400 uppercase">CBU</p>
              <p className="font-mono text-[10px] font-bold break-all text-red-600">{cbu || "---"}</p>
            </div>
          </div>
        </PreviewModal>
      </div>
    </div>
  );
}