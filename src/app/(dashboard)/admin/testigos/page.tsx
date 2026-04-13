"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      Swal.fire({ title: "¡SINCRONIZADO!", icon: "success", confirmButtonColor: "#dc2626" });
      await fetchData(); // Recargamos para tener los IDs reales
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
      confirmButtonText: "SÍ, ELIMINAR"
    });

    if (result.isConfirmed) {
      // Si el testigo ya existe en la DB (tiene ID), lo borramos de verdad
      if (witness.id) {
        await deleteWitnessAction(witness.id);
      }
      
      // Limpiamos la tarjeta en el estado local
      const newWitnesses = [...witnesses];
      newWitnesses[index] = { id: null, nombre: "", rol: witness.rol, imageUrl: "" };
      setWitnesses(newWitnesses);
      
      Swal.fire("Eliminado", "El integrante ha sido removido.", "success");
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
      Swal.fire("Error", "No se pudo subir", "error");
    } finally {
      setLoading(null);
    }
  };

  if (isInitialLoading) return <div className="h-48 flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-4 font-sans text-black">
      <header className="flex justify-between items-center mb-6 border-b-2 border-zinc-200 pb-2">
        <h1 className="text-xl font-black uppercase italic tracking-tighter">Corte <span className="text-red-600">de Honor</span></h1>
        <button onClick={handleSincronizar} disabled={isSaving} className="bg-black text-white px-5 py-2 rounded-lg font-bold text-[9px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 shadow-md">
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SINCRONIZAR
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {witnesses.map((witness, index) => (
          <motion.div key={index} className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-sm hover:border-red-200 transition-all group relative">
            
            {/* BOTÓN ELIMINAR REAL */}
            {(witness.nombre || witness.imageUrl) && (
              <button 
                onClick={() => handleDelete(index)}
                className="absolute top-4 right-4 text-zinc-300 hover:text-red-600 transition-colors z-20"
              >
                <Trash2 size={16} />
              </button>
            )}

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-100 bg-zinc-50 flex items-center justify-center cursor-pointer" onClick={() => fileInputRefs.current[index]?.click()}>
                  {loading === `witness-${index}` ? <Loader2 className="animate-spin text-red-600" size={32} /> : witness.imageUrl ? <img src={witness.imageUrl} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center text-zinc-300"><User size={32} /><span className="text-[8px] font-black uppercase mt-1">Foto</span></div>}
                </div>
                <input type="file" ref={el => { fileInputRefs.current[index] = el }} className="hidden" accept="image/*" onChange={(e) => handleFileChange(index, e)} />
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-2 rounded-full text-white border-2 border-white pointer-events-none shadow-lg"><Camera size={14} /></div>
              </div>

              <div className="w-full space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">{witness.rol}</label>
                <input type="text" value={witness.nombre} onChange={(e) => { const newW = [...witnesses]; newW[index].nombre = e.target.value; setWitnesses(newW); }} placeholder="NOMBRE..." className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:border-red-500 outline-none text-xs font-bold text-black" />
                <div className="flex items-center gap-1.5 mt-2 ml-1">
                  <div className={`w-2 h-2 rounded-full ${witness.imageUrl && witness.nombre.trim() !== "" ? 'bg-green-500' : 'bg-red-600 animate-pulse'}`} />
                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">{witness.imageUrl && witness.nombre.trim() !== "" ? "Listo" : "Incompleto"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}