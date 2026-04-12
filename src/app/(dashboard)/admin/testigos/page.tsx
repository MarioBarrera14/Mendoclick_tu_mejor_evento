"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, Save, Loader2, X, CheckCircle2, Eraser } from 'lucide-react';
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface Witness {
  id?: string;
  nombre: string;
  rol: string; 
  imageUrl: string;
}

interface WitnessFormProps {
  initialData?: Witness[];
  userId?: string; 
  onSave?: (data: Witness[]) => Promise<any>;
}

export default function WitnessForm({ initialData = [], userId, onSave }: WitnessFormProps) {
  const { data: session, update } = useSession();
  const [witnesses, setWitnesses] = useState<Witness[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const defaultRoles = [
    "Madrina de la Novia", "Padrino de la Novia", 
    "Madrina del Novio", "Padrino del Novio"
  ];

  // 1. CARGA DE DATOS CORREGIDA: Quitamos el 'initialized.current' para que
  // si Next.js tarda en traer la data, el componente se actualice apenas llegue.
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const merged = defaultRoles.map(rol => {
        const found = initialData.find(d => d.rol === rol);
        return found ? found : { nombre: "", rol, imageUrl: "" };
      });
      setWitnesses(merged);
      setIsInitialLoading(false);
    } else if (isInitialLoading) {
      // Si no hay data inicial, cargamos el esquema vacío
      setWitnesses(defaultRoles.map(rol => ({ nombre: "", rol, imageUrl: "" })));
      setIsInitialLoading(false);
    }
  }, [initialData]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Error en la subida");
    const data = await res.json();
    return data.url; 
  };

  const handleFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(`witness-${index}`);
      const url = await uploadFile(file);
      const newWitnesses = [...witnesses];
      newWitnesses[index] = { ...newWitnesses[index], imageUrl: url };
      setWitnesses(newWitnesses);
    } catch (err) {
      Swal.fire("Error", "No se pudo subir la imagen", "error");
    } finally {
      setLoading(null);
    }
  };

  const removePhoto = (index: number) => {
    const newWitnesses = [...witnesses];
    newWitnesses[index].imageUrl = "";
    setWitnesses(newWitnesses);
    if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = "";
  };

  // BOTÓN PARA BORRAR TODO (VACIAR)
  const handleLimpiarTodo = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR CORTE?',
      text: "Se borrarán todos los nombres y fotos de esta sección.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'SÍ, LIMPIAR'
    });

    if (confirm.isConfirmed) {
      setWitnesses(defaultRoles.map(rol => ({ nombre: "", rol, imageUrl: "" })));
      Swal.fire("Limpio", "No te olvides de Sincronizar para guardar los cambios.", "info");
    }
  };

  const handleNameChange = (index: number, value: string) => {
    const newWitnesses = [...witnesses];
    newWitnesses[index].nombre = value;
    setWitnesses(newWitnesses);
  };

  const handleSincronizar = async () => {
    const finalUserId = userId || (session?.user as any)?.id;
    if (!finalUserId) return Swal.fire("Error", "No se detectó sesión", "error");

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/witnesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: finalUserId, witnesses }),
      });

      if (!response.ok) throw new Error("Error");

      if (onSave) await onSave(witnesses);
      await update();

      Swal.fire({
        title: "¡HECHO!",
        text: "Corte de Honor sincronizada.",
        icon: "success",
        confirmButtonColor: "#dc2626"
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isInitialLoading) return (
    <div className="h-48 flex items-center justify-center">
      <Loader2 className="animate-spin text-red-600" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-4 font-sans text-black">
      <header className="flex justify-between items-center mb-6 border-b-2 border-zinc-200 pb-2">
        <h1 className="text-xl font-black uppercase italic tracking-tighter">
          Corte <span className="text-red-600">de Honor</span>
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={handleLimpiarTodo}
            className="bg-zinc-200 text-zinc-600 px-4 py-2 rounded-lg font-bold text-[9px] tracking-widest flex items-center gap-2 hover:bg-red-100 transition-all"
          >
            <Eraser size={14} /> LIMPIAR TODO
          </button>
          <button 
            onClick={handleSincronizar} 
            disabled={isSaving || loading !== null} 
            className="bg-black text-white px-5 py-2 rounded-lg font-bold text-[9px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 shadow-md"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
            SINCRONIZAR DATOS
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {witnesses.map((witness, index) => (
          <motion.div 
            key={index} 
            className="p-5 rounded-3xl bg-white border-2 border-zinc-200 shadow-sm hover:border-red-200 transition-all group relative"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-100 shadow-inner bg-zinc-50 group-hover:border-red-500/20 transition-all flex items-center justify-center cursor-pointer" 
                  onClick={() => fileInputRefs.current[index]?.click()}
                >
                  {loading === `witness-${index}` ? (
                    <Loader2 className="animate-spin text-red-600" size={32} />
                  ) : witness.imageUrl ? (
                    <img src={witness.imageUrl} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <div className="flex flex-col items-center text-zinc-300">
                      <User size={32} />
                      <span className="text-[8px] font-black uppercase mt-1">Subir Foto</span>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {witness.imageUrl && !loading && (
                    <motion.button 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removePhoto(index); }} 
                      className="absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full border-2 border-white shadow-md hover:bg-black z-30"
                    >
                      <X size={12} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-2 rounded-full text-white border-2 border-white pointer-events-none shadow-lg">
                  <Camera size={14} />
                </div>
                
                <input 
                  type="file" 
                  ref={el => { fileInputRefs.current[index] = el }} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(index, e)} 
                />
              </div>

              <div className="w-full space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">
                  {witness.rol}
                </label>
                <input 
                  type="text" 
                  value={witness.nombre} 
                  onChange={(e) => handleNameChange(index, e.target.value)} 
                  placeholder="NOMBRE DEL TESTIGO..." 
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:border-red-500 outline-none text-xs font-bold text-black" 
                />
                
                <div className="flex items-center gap-1.5 mt-2 ml-1">
                  <div className={`w-2 h-2 rounded-full ${witness.imageUrl && witness.nombre.trim() !== "" ? 'bg-green-500' : 'bg-red-600 animate-pulse'}`} />
                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                    {witness.imageUrl && witness.nombre.trim() !== "" ? "Listo" : "Incompleto"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-zinc-900 p-3 rounded-xl border-l-4 border-red-600 flex justify-between items-center shadow-lg">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">
          MendoClick Witness Manager <span className="text-red-600">v2.5</span>
        </p>
        <CheckCircle2 size={14} className="text-red-600" />
      </div>
    </div>
  );
}