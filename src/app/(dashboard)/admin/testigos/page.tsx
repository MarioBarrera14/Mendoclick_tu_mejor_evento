"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, Loader2, Trash2 } from 'lucide-react';
import Swal from "sweetalert2";
import { updateWitnesses, getWitnesses, deleteWitnessAction } from "@/actions/witness.actions";

export default function WitnessForm() {
  const [witnesses, setWitnesses] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const defaultRoles = ["Madrina de la Novia", "Padrino de la Novia", "Madrina del Novio", "Padrino del Novio"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getWitnesses();
    const merged = defaultRoles.map(rol => {
      const found = data.find((d: any) => d.rol === rol);
      return found ? found : { id: null, nombre: "", rol, imageUrl: "" };
    });
    setWitnesses(merged);
    setIsInitialLoading(false);
  };

  const handleSincronizar = async () => {
    setIsSaving(true);
    const result = await updateWitnesses(witnesses);
    if (result.success) {
      Swal.fire({ 
        title: "¡SINCRONIZADO!", 
        icon: "success", 
        confirmButtonColor: "#dc2626",
        customClass: { popup: 'rounded-[2rem]' }
      });
      await fetchData();
    }
    setIsSaving(false);
  };

  const handleDelete = async (index: number) => {
    const witness = witnesses[index];
    const result = await Swal.fire({
      title: "¿ELIMINAR?",
      text: "Se borrarán los datos de este integrante.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "SÍ, ELIMINAR",
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      if (witness.id) await deleteWitnessAction(witness.id);
      const newWitnesses = [...witnesses];
      newWitnesses[index] = { id: null, nombre: "", rol: witness.rol, imageUrl: "" };
      setWitnesses(newWitnesses);
      Swal.fire("Eliminado", "Removido con éxito.", "success");
    }
  };

  const handleFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(`witness-${index}`);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      const newWitnesses = [...witnesses];
      newWitnesses[index].imageUrl = data.url;
      setWitnesses(newWitnesses);
    } catch (err) {
      Swal.fire("Error", "Fallo al subir imagen", "error");
    } finally {
      setLoading(null);
    }
  };

  if (isInitialLoading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-3">
      <Loader2 className="animate-spin text-red-600" size={32} />
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cargando Corte...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6 font-sans text-black pb-20">
      
      {/* Header adaptable */}
      <header className="flex flex-row justify-between items-center mb-8 border-b-2 border-zinc-200 pb-4">
        <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-none">
          Corte <span className="text-red-600">de Honor</span>
        </h1>
        <button 
          onClick={handleSincronizar} 
          disabled={isSaving} 
          className="bg-black text-white px-4 md:px-6 py-2.5 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 active:scale-95 transition-all shadow-lg disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span className="hidden sm:inline">SINCRONIZAR</span>
          <span className="sm:hidden">GUARDAR</span>
        </button>
      </header>

      {/* Grid: 1 columna en mobile, 2 en tablets, 4 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {witnesses.map((witness, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-[2.5rem] bg-white border-2 border-zinc-100 shadow-sm hover:border-red-100 transition-all group relative"
          >
            
            {/* Botón Eliminar */}
            {(witness.nombre || witness.imageUrl) && (
              <button 
                onClick={() => handleDelete(index)}
                className="absolute top-5 right-5 text-zinc-300 hover:text-red-600 transition-colors z-20 p-1"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="flex flex-col items-center space-y-5">
              {/* Avatar circular con trigger de cámara */}
              <div className="relative">
                <div 
                  className="w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-50 bg-zinc-100 flex items-center justify-center cursor-pointer shadow-inner" 
                  onClick={() => fileInputRefs.current[index]?.click()}
                >
                  {loading === `witness-${index}` ? (
                    <Loader2 className="animate-spin text-red-600" size={32} />
                  ) : witness.imageUrl ? (
                    <img src={witness.imageUrl} className="w-full h-full object-cover" alt={witness.rol} />
                  ) : (
                    <div className="flex flex-col items-center text-zinc-300">
                      <User size={36} />
                      <span className="text-[9px] font-black uppercase mt-1">Subir Foto</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={el => { fileInputRefs.current[index] = el }} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(index, e)} 
                />
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-2.5 rounded-full text-white border-4 border-white pointer-events-none shadow-xl">
                  <Camera size={14} />
                </div>
              </div>

              {/* Inputs y Status */}
              <div className="w-full space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 block ml-1">
                  {witness.rol}
                </label>
                <input 
                  type="text" 
                  value={witness.nombre} 
                  onChange={(e) => { 
                    const newW = [...witnesses]; 
                    newW[index].nombre = e.target.value.toUpperCase(); 
                    setWitnesses(newW); 
                  }} 
                  placeholder="NOMBRE COMPLETO" 
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-red-500 outline-none text-xs font-black text-black placeholder:text-zinc-300 transition-all" 
                />
                
                <div className="flex items-center gap-2 mt-2 ml-1">
                  <div className={`w-2 h-2 rounded-full ${witness.imageUrl && witness.nombre.trim() !== "" ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-600 animate-pulse'}`} />
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
                    {witness.imageUrl && witness.nombre.trim() !== "" ? "Ficha Completa" : "Datos Pendientes"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-10 flex items-center justify-center opacity-30 gap-2">
        <User size={14} />
        <p className="text-[8px] font-black uppercase tracking-[0.3em]">MendoClick Court Management System</p>
      </footer>
    </div>
  );
}