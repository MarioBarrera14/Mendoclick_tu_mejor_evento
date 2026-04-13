"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Pencil, ExternalLink, Search, UserPlus, 
  Home, LayoutDashboard, Loader2, AlertCircle, CheckCircle2, X 
} from "lucide-react";
import Link from "next/link";
import { getClients, deleteClientAction, updateClientAction } from "@/lib/actions"; 

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);

  const loadClientes = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({ type: "error", msg: "Error al conectar con la base de datos" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClientes(); }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateClientAction(editingClient.id, editingClient);
    if (result.success) {
      setIsEditModalOpen(false);
      setStatus({ type: "success", msg: "Cliente actualizado con éxito" });
      loadClientes(); 
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    }
  };

  const eliminarCliente = async (id: string, nombre: string) => {
    if (confirm(`¿ELIMINAR A ${nombre.toUpperCase()}?`)) {
      const result = await deleteClientAction(id);
      if (result.success) {
        setClientes(prev => prev.filter(c => c.id !== id));
        setStatus({ type: "success", msg: "Cliente eliminado" });
      }
    }
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre?.toLowerCase().includes(search.toLowerCase()) || 
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.slug?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Actualizando Mendoclick...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-10 bg-[#f4f4f5] min-h-screen text-zinc-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* BOTONES DE NAVEGACIÓN AGREGADOS */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Link 
            href="/manager/dashboard" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-rose-600 transition-all shadow-md"
          >
            <LayoutDashboard size={14} />
            Panel Control
          </Link>

          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-zinc-100 transition-all shadow-sm"
          >
            <Home size={14} />
            Ver Web
          </Link>
        </motion.div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 border-l-4 border-rose-500 pl-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Gestión de <span className="text-rose-500">Clientes</span>
            </h1>
            {status.msg && (
              <p className="mt-2 text-[10px] font-black uppercase text-green-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> {status.msg}
              </p>
            )}
          </div>
          <Link href="/manager/nuevo" className="inline-flex items-center gap-2 bg-zinc-950 text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase hover:bg-rose-600 transition-all shadow-xl">
            <UserPlus size={16} /> NUEVO CLIENTE
          </Link>
        </div>

        {/* BUSCADOR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 mb-8 flex items-center gap-4">
          <Search className="text-zinc-400" size={18} />
          <input 
            type="text" placeholder="BUSCAR POR NOMBRE, EMAIL O LINK..."
            className="w-full bg-transparent outline-none font-bold text-xs uppercase text-zinc-600"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLA DESKTOP */}
        <div className="hidden md:block bg-white rounded-[2rem] shadow-xl border border-zinc-100 overflow-hidden text-black">
          <table className="w-full text-left">
            <thead className="bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <tr>
                <th className="px-8 py-5">Info Cliente</th>
                <th className="px-6 py-5">Link</th>
                <th className="px-6 py-5 text-center">Template</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-black uppercase italic text-sm">{cliente.nombre}</p>
                    <p className="text-[10px] text-zinc-400 font-black">{cliente.email}</p>
                  </td>
                  <td className="px-6 py-6 font-mono text-[10px] text-zinc-500 italic">/{cliente.slug}</td>
                  <td className="px-6 py-6 text-center text-[9px] font-black uppercase">{cliente.templateId}</td>
                  <td className="px-8 py-6 text-right flex justify-end gap-2">
                    <Link href={`/inv/${cliente.slug}`} target="_blank" className="p-2.5 bg-zinc-100 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"><ExternalLink size={16} /></Link>
                    <button onClick={() => { setEditingClient(cliente); setIsEditModalOpen(true); }} className="p-2.5 bg-zinc-100 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"><Pencil size={16} /></button>
                    <button onClick={() => eliminarCliente(cliente.id, cliente.nombre)} className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL DE EDICIÓN */}
        <AnimatePresence>
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative text-black">
                <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900"><X size={20}/></button>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Editar <span className="text-rose-600">Cliente</span></h2>
                
                <form onSubmit={handleUpdate} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Email</label>
                    <input type="email" value={editingClient.email} className="w-full bg-zinc-100 p-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-rose-500" onChange={(e) => setEditingClient({...editingClient, email: e.target.value})} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Slug (Link de URL)</label>
                    <input 
                      type="text" 
                      value={editingClient.slug} 
                      className="w-full bg-zinc-100 p-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-rose-500" 
                      onChange={(e) => {
                        const newSlug = e.target.value.toLowerCase().replace(/\s+/g, '-');
                        setEditingClient({
                          ...editingClient, 
                          slug: newSlug,
                          nombre: newSlug.toUpperCase().replace(/-/g, ' ') 
                        });
                      }} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Plantilla</label>
                    <select value={editingClient.templateId} className="w-full bg-zinc-100 p-4 rounded-2xl font-black text-sm outline-none cursor-pointer" onChange={(e) => setEditingClient({...editingClient, templateId: e.target.value})}>
                      <option value="DEMO1">Champagne 15</option>
                      <option value="DEMO2">Neon Party 15</option>
                      <option value="DEMO3">Graffiti Urbano 15</option>
                      <option value="DEMO4">Graffiti Uban Bodas</option>
                      <option value="DEMO5">Golden Noir Bodas</option>
                      <option value="DEMO6">Retro Viniyl Bodas</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-zinc-900 text-white font-black uppercase py-5 rounded-[1.8rem] hover:bg-rose-600 transition-all shadow-lg tracking-widest text-xs mt-4">
                    Guardar Cambios
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}