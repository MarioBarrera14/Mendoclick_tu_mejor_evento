"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, Loader2, Save, ListChecks, AlertTriangle } from "lucide-react";
import { getItinerary, createItineraryItem, deleteItineraryItem } from "@/actions/intinery.action";
import Swal from "sweetalert2";

export default function ItineraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newTime, setNewTime] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const LIMITE_ITEMS = 8;
  const reachedLimit = items.length >= LIMITE_ITEMS;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getItinerary();
    setItems(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // VALIDACIÓN DE LÍMITE
    if (reachedLimit) {
      Swal.fire({
        title: "LÍMITE ALCANZADO",
        text: "El itinerario permite un máximo de 8 momentos para mantener el diseño.",
        icon: "warning",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    if (!newTime || !newTitle || isSaving) return;

    setIsSaving(true);
    const result = await createItineraryItem({ time: newTime, title: newTitle });
    
    if (result.success) {
      setItems([...items, result.item]);
      setNewTime("");
      setNewTitle("");
      Swal.fire({ title: "¡PUNTO AGREGADO!", icon: "success", confirmButtonColor: "#dc2626", timer: 1500 });
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "¿ELIMINAR MOMENTO?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "SÍ, ELIMINAR"
    });

    if (confirm.isConfirmed) {
      const result = await deleteItineraryItem(id);
      if (result.success) {
        setItems(items.filter(i => i.id !== id));
      }
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      <header className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Timeline <span className="text-red-600">Event</span>
          </h1>
        </div>
        <div className="bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200">
            <p className="text-[9px] font-black text-zinc-500 uppercase">Capacidad</p>
            <p className={`text-lg font-black leading-none ${reachedLimit ? 'text-red-600' : 'text-black'}`}>
                {items.length} / {LIMITE_ITEMS}
            </p>
        </div>
      </header>

      {/* FORMULARIO DE AGREGAR */}
      <section className={`p-5 rounded-3xl border transition-all ${reachedLimit ? 'bg-zinc-50 border-zinc-200 opacity-60' : 'bg-white border-zinc-200 shadow-sm' } mb-8`}>
        <h2 className="text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest flex items-center gap-2">
            {reachedLimit ? <AlertTriangle size={14} className="text-amber-500" /> : <Plus size={14} className="text-red-600" />} 
            {reachedLimit ? "Límite de itinerario alcanzado" : "Nuevo Punto en el Itinerario"}
        </h2>
        
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-32">
            <input 
              type="text" value={newTime} onChange={(e) => setNewTime(e.target.value)}
              placeholder="21:00"
              disabled={reachedLimit}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-sm font-black outline-none focus:border-red-500 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex-1">
            <input 
              type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              placeholder={reachedLimit ? "BORRÁ UN ITEM PARA AGREGAR OTRO..." : "EJ: RECEPCIÓN / CENA / BRINDIS..."}
              disabled={reachedLimit}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-sm font-black uppercase outline-none focus:border-red-500 disabled:cursor-not-allowed"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSaving || !newTime || !newTitle || reachedLimit}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg disabled:opacity-30 disabled:hover:bg-black"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} AGREGAR
          </button>
        </form>
      </section>

      {/* LISTADO DE MOMENTOS */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500 w-24">Hora</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500">Actividad</th>
              <th className="px-6 py-4 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.length === 0 ? (
                <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-zinc-400 font-bold uppercase text-xs italic tracking-widest">
                        El itinerario está vacío
                    </td>
                </tr>
            ) : (
                items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="px-6 py-4 font-black text-red-600 text-sm">{item.time}</td>
                    <td className="px-6 py-4 font-black text-sm uppercase italic tracking-tighter">{item.title}</td>
                    <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-zinc-300 hover:text-red-600 transition-colors p-2">
                        <Trash2 size={16}/>
                    </button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      
      <footer className="mt-6 flex items-center gap-3 opacity-40">
        <ListChecks size={16} />
        <p className="text-[8px] font-black uppercase tracking-[0.3em]">MendoClick Smart Timeline Engine</p>
      </footer>
    </div>
  );
}