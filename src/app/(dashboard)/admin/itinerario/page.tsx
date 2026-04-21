"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, Loader2, Save, ListChecks, AlertTriangle } from "lucide-react";
import { getItinerary, createItineraryItem, deleteItineraryItem } from "@/actions/itinerary.actions";
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
    if (reachedLimit) {
      Swal.fire({
        title: "LÍMITE ALCANZADO",
        text: "Máximo 8 momentos para mantener el diseño.",
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
      Swal.fire({ title: "¡AGREGADO!", icon: "success", confirmButtonColor: "#dc2626", timer: 1500, showConfirmButton: false });
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "¿ELIMINAR?",
      text: "Se borrará este momento.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "SÍ, BORRAR"
    });
    if (confirm.isConfirmed) {
      const result = await deleteItineraryItem(id);
      if (result.success) setItems(items.filter(i => i.id !== id));
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 className="animate-spin text-red-600" />
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cargando Itinerario</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans text-black pb-20">
      
      {/* HEADER ADAPTATIVO */}
      <header className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-4">
        <div>
          <p className="text-red-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
            Timeline <span className="text-red-600">Event</span>
          </h1>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-zinc-200 text-right">
            <p className="text-[8px] font-black text-zinc-500 uppercase">Capacidad</p>
            <p className={`text-sm md:text-lg font-black leading-none ${reachedLimit ? 'text-red-600' : 'text-black'}`}>
                {items.length} / {LIMITE_ITEMS}
            </p>
        </div>
      </header>

      {/* FORMULARIO: Apilado en mobile, fila en desktop */}
      <section className={`p-5 rounded-[2rem] border transition-all ${reachedLimit ? 'bg-zinc-50 border-zinc-200 opacity-60' : 'bg-white border-zinc-200 shadow-sm' } mb-8`}>
        <h2 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest flex items-center gap-2">
            {reachedLimit ? <AlertTriangle size={14} className="text-amber-500" /> : <Plus size={14} className="text-red-600" />} 
            {reachedLimit ? "Límite alcanzado" : "Nuevo Punto en Itinerario"}
        </h2>
        
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-32">
            <input 
              type="text" value={newTime} onChange={(e) => setNewTime(e.target.value)}
              placeholder="Hora (21:00)"
              disabled={reachedLimit}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 md:p-3 text-sm font-black outline-none focus:border-red-500"
            />
          </div>
          <div className="flex-1">
            <input 
              type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              placeholder={reachedLimit ? "LÍMITE ALCANZADO" : "EJ: RECEPCIÓN / CENA..."}
              disabled={reachedLimit}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 md:p-3 text-sm font-black uppercase outline-none focus:border-red-500"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSaving || !newTime || !newTitle || reachedLimit}
            className="bg-black text-white px-8 py-4 md:py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-30"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} AGREGAR
          </button>
        </form>
      </section>

      {/* LISTADO: Cards en mobile / Tabla en Desktop */}
      <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden">
        {/* Vista Mobile (Cards) */}
        <div className="block md:hidden divide-y divide-zinc-100">
          {items.length === 0 ? (
             <div className="p-10 text-center text-zinc-400 font-bold uppercase text-[10px] italic tracking-widest">
                Itinerario vacío
             </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="p-5 flex items-center justify-between group active:bg-zinc-50">
                <div className="flex flex-col gap-1">
                  <span className="text-red-600 font-black text-sm">{item.time} hs</span>
                  <span className="font-black text-xs uppercase italic tracking-tighter text-zinc-800">{item.title}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-zinc-300 active:text-red-600 p-2">
                  <Trash2 size={18}/>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Vista Desktop (Tabla) */}
        <table className="hidden md:table w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500 w-24">Hora</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500">Actividad</th>
              <th className="px-6 py-4 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                <td className="px-6 py-4 font-black text-red-600 text-sm">{item.time}</td>
                <td className="px-6 py-4 font-black text-sm uppercase italic tracking-tighter">{item.title}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-zinc-300 hover:text-red-600 transition-colors p-2">
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer className="mt-8 flex items-center justify-center md:justify-start gap-3 opacity-30">
        <ListChecks size={14} />
        <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em]">MendoClick Smart Timeline Engine</p>
      </footer>
    </div>
  );
}