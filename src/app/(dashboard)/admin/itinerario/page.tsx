"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Clock,
  Plus,
  Save,
  ListChecks,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { updateItinerary, getItinerary } from "@/actions/itinerary-actions";

interface ItineraryItem {
  id: string;
  order: number;
  time: string;
  title: string;
}

export default function ItineraryPage() {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const [isPending, startTransition] = useTransition();

  const generateId = () => `temp-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItinerary();
      if (!data || data.length === 0) {
        setItems([{ id: generateId(), order: 0, time: "", title: "" }]);
      } else {
        setItems(data);
      }
      setIsDirty(false);
    };
    fetchData();
  }, []);

  const canSave = useMemo(() => {
    return isDirty && items.length > 0;
  }, [isDirty, items]);

  const handleAddItem = () => {
    if (items.length >= 8) {
      setStatus({ type: "error", msg: "MÁXIMO 8 ELEMENTOS" });
      setTimeout(() => setStatus({ type: null, msg: "" }), 3000);
      return;
    }
    setItems([...items, { id: generateId(), order: items.length, time: "", title: "" }]);
    setIsDirty(true);
  };

  const handleUpdateItem = (id: string, updatedData: Partial<ItineraryItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
    setIsDirty(true);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    if (updatedItems.length === 0) {
      setItems([{ id: generateId(), order: 0, time: "", title: "" }]);
    } else {
      setItems(updatedItems);
    }
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave || isPending) return;

    const cleanItems = items.filter((item) => item.time.trim() !== "" || item.title.trim() !== "");

    startTransition(async () => {
      const result = await updateItinerary(cleanItems);
      if (result?.success) {
        setStatus({ type: "success", msg: "¡Sincronizado!" });
        setIsDirty(false);
        setTimeout(() => setStatus({ type: null, msg: "" }), 3000);
      } else {
        setStatus({ type: "error", msg: "Error al guardar" });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      
      {/* HEADER COMPACTO MENDOCLICK */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Timeline <span className="text-red-600">Event</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
            <AnimatePresence>
                {status.msg && (
                    <motion.span 
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}
                    >
                        {status.msg}
                    </motion.span>
                )}
            </AnimatePresence>
            <button 
                onClick={handleSubmit} 
                disabled={!canSave || isPending}
                className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-30"
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                {isPending ? "GUARDANDO..." : "GUARDAR"}
            </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between mb-2 px-4">
             <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cronología de la fiesta</label>
             <span className="text-[10px] font-black text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{items.length} / 8</span>
          </div>

          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div 
                key={item.id} 
                layout 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-2 items-center bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm hover:border-red-100 transition-all group"
              >
                {/* INDICADOR DE ORDEN */}
                <div className="hidden md:flex w-8 h-8 items-center justify-center bg-zinc-950 text-red-600 rounded-xl font-black italic text-xs">
                    {index + 1}
                </div>

                {/* HORA */}
                <div className="relative w-28">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" size={14} />
                  <input 
                    type="text" 
                    value={item.time} 
                    onChange={(e) => handleUpdateItem(item.id, { time: e.target.value })} 
                    placeholder="21:00"
                    className="w-full pl-8 pr-2 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-black text-black text-sm outline-none focus:border-red-500 transition-all" 
                  />
                </div>

                {/* ACTIVIDAD */}
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })} 
                    placeholder="ESCRIBE LA ACTIVIDAD AQUÍ..."
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-black text-sm outline-none focus:border-red-500 transition-all placeholder:text-zinc-300" 
                  />
                </div>

                {/* ACCIONES */}
                <div className="flex gap-1">
                  <button 
                    type="button" 
                    onClick={handleAddItem} 
                    title="Agregar debajo"
                    className="p-2.5 bg-zinc-100 text-zinc-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Plus size={18} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteItem(item.id)} 
                    title="Eliminar"
                    className="p-2.5 bg-zinc-100 text-zinc-400 rounded-xl hover:bg-black hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* FOOTER INFO */}
          <div className="flex flex-col items-center pt-6 space-y-4">
            {!isDirty && items.length > 0 && (
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-500" /> Itinerario sincronizado
              </p>
            )}
            
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                    <ListChecks size={16} className="text-red-600" />
                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                        El orden se ajusta automáticamente según la posición en la lista.
                    </p>
                </div>
                <p className="hidden md:block text-[8px] font-black uppercase italic text-zinc-400">MendoClick Management</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}