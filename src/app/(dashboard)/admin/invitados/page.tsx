"use client";

import { useState, useEffect } from "react";
import { 
  TicketPlus, Copy, Trash2, Loader2, Save, LogIn, 
  LogOut, Users, Plus, Minus, UserPlus 
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function GestionInvitados() {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [cupos, setCupos] = useState(1);
  const [listaInvitados, setListaInvitados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session?.user?.slug) {
      fetch(`/api/guests?slug=${session.user.slug}`)
        .then((res) => res.json())
        .then((data) => { if (Array.isArray(data)) setListaInvitados(data); })
        .catch((err) => console.error(err));
    }
  }, [session]);

  const asignarMesa = async (id: string, mesa: string) => {
    try {
      const response = await fetch(`/api/guests?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesa }),
      });
      if (response.ok) {
        setListaInvitados(listaInvitados.map(inv => inv.id === id ? { ...inv, mesa } : inv));
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1000 });
        Toast.fire({ icon: 'success', title: mesa ? `Mesa ${mesa} asignada` : 'Mesa quitada', background: '#000', color: '#fff' });
      }
    } catch (error) { console.error(error); }
  };

  // --- LÓGICA DE CONTADORES ---
  const stats = {
    // Total de personas invitadas sumando todos los cupos
    totalInvitados: listaInvitados.reduce((acc, inv) => acc + (inv.cupos || 0), 0),
    // Personas que ya hicieron Check-In
    presentes: listaInvitados.filter(inv => inv.checkIn).reduce((acc, inv) => acc + (inv.confirmados || inv.cupos), 0),
    // Invitaciones enviadas (tickets únicos)
    totalTickets: listaInvitados.length
  };

  const generarCodigo = (nom: string) => {
    const prefijo = nom.trim().substring(0, 3).toUpperCase();
    return `${prefijo}${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || cargando) return;
    setCargando(true);
    const codigo = generarCodigo(nombre);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), cupos, codigo }),
      });
      if (res.ok) {
        const nuevo = await res.json();
        setListaInvitados([nuevo, ...listaInvitados]);
        setNombre(""); 
        setCupos(1);
        Swal.fire({ icon: 'success', title: 'Invitado agregado', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
      }
    } catch (error) { console.error(error); } finally { setCargando(false); }
  };

  const eliminarInvitado = async (id: string) => {
    const result = await Swal.fire({ 
        title: "¿Eliminar invitado?", 
        text: "Esta acción no se puede deshacer",
        icon: "warning", 
        showCancelButton: true, 
        confirmButtonColor: "#dc2626", 
        cancelButtonColor: "#000", 
        confirmButtonText: "SÍ, ELIMINAR" 
    });
    if (result.isConfirmed) {
      const res = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
    }
  };

  const copiarAlPortapapeles = (txt: string) => {
    navigator.clipboard.writeText(txt);
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1000 });
    Toast.fire({ icon: 'success', title: 'Código copiado', background: '#000', color: '#fff' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-6 font-sans text-zinc-900 bg-white min-h-screen">
      
      {/* HEADER ESTILO DASHBOARD */}
      <header className="mb-6 flex flex-col lg:flex-row justify-between items-center bg-zinc-950 p-5 rounded-3xl text-white gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 w-2 h-12 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter leading-none flex items-center gap-2">
              MENDOCLICK <span className="text-red-600 tracking-normal not-italic font-light">|</span> <span className="text-zinc-400">GUESTS</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mt-1">Gestión de Accesos & Cupos</p>
          </div>
        </div>

        <div className="flex gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar">
          <StatCompact label="CAPACIDAD TOTAL" value={stats.totalInvitados} icon={<Users size={16}/>} />
          <StatCompact label="EN EL EVENTO" value={stats.presentes} color="text-emerald-400" icon={<LogIn size={16}/>} />
          <StatCompact label="TICKETS" value={stats.totalTickets} color="text-red-500" icon={<TicketPlus size={16}/>} />
        </div>
      </header>

      {/* FORMULARIO DE ALTA */}
      <section className="bg-zinc-50 p-4 rounded-3xl mb-8 border border-zinc-200 shadow-sm">
        <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <input 
              type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
              placeholder="NOMBRE DEL INVITADO O FAMILIA..."
              className="w-full bg-white border-2 border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold uppercase outline-none focus:border-red-600 transition-all shadow-inner"
            />
          </div>
          
          <div className="md:col-span-3 flex items-center bg-white border-2 border-zinc-200 rounded-2xl px-2 shadow-inner">
            <span className="pl-3 text-[10px] font-black text-zinc-400 uppercase mr-auto">CUPOS:</span>
            <select 
              value={cupos} onChange={(e) => setCupos(parseInt(e.target.value))}
              className="w-full bg-transparent py-4 text-center font-black text-sm outline-none cursor-pointer appearance-none"
            >
              {[...Array(50)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1} {i+1 === 1 ? 'PERSONA' : 'PERSONAS'}</option>
              ))}
            </select>
            <UserPlus size={18} className="mr-3 text-zinc-300" />
          </div>

          <button 
            type="submit" disabled={cargando || !nombre}
            className="md:col-span-2 bg-red-600 text-white py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-black transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg shadow-red-100"
          >
            {cargando ? <Loader2 className="animate-spin size-5" /> : <><Plus size={18}/> AGREGAR</>}
          </button>
        </form>
      </section>

      {/* TABLA DE INVITADOS */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950 text-white">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Invitado</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center">Cupos</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center">Mesa</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center">Código Acceso</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {listaInvitados.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-black text-sm uppercase italic text-zinc-900">{inv.nombre}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[11px] font-black">
                        {inv.cupos} PERS
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={inv.mesa || ""}
                      onChange={(e) => asignarMesa(inv.id, e.target.value)}
                      className={`bg-white border-2 ${inv.mesa ? 'border-red-600 text-red-600' : 'border-zinc-200 text-zinc-400'} text-[11px] font-black rounded-xl px-3 py-1.5 outline-none transition-all focus:ring-2 ring-red-100`}
                    >
                      <option value="">S/N</option>
                      {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>MESA {i+1}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`mx-auto w-3 h-3 rounded-full ${inv.checkIn ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-100' : 'bg-zinc-300'}`} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => copiarAlPortapapeles(inv.codigo)} 
                      className="text-[11px] font-mono font-bold bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all flex items-center gap-3 mx-auto shadow-md active:scale-95"
                    >
                      {inv.codigo} <Copy size={12} className="opacity-60" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-300 hover:text-red-600 transition-all p-2"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden divide-y divide-zinc-100">
          {listaInvitados.map((inv) => (
            <div key={inv.id} className="p-5 flex flex-col gap-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                    <p className="font-black text-sm uppercase italic leading-none mb-1">{inv.nombre}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${inv.checkIn ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">{inv.cupos} PERSONAS</span>
                    </div>
                </div>
                <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-300 active:text-red-600 p-1"><Trash2 size={20}/></button>
              </div>

              <div className="flex items-center gap-2">
                  <button 
                    onClick={() => copiarAlPortapapeles(inv.codigo)}
                    className="flex-1 flex items-center justify-center gap-3 text-[12px] font-mono font-bold bg-zinc-950 text-white py-3 rounded-2xl active:bg-red-600 transition-all"
                  >
                    {inv.codigo} <Copy size={14} />
                  </button>
                  <select
                    value={inv.mesa || ""}
                    onChange={(e) => asignarMesa(inv.id, e.target.value)}
                    className={`flex-1 bg-zinc-50 border-2 ${inv.mesa ? 'border-red-600 text-red-600 font-bold' : 'border-zinc-200 text-zinc-400'} text-[11px] rounded-2xl py-3 px-2 text-center outline-none`}
                  >
                    <option value="">ASIGNAR MESA</option>
                    {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>MESA {i+1}</option>)}
                  </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCompact({ label, value, color = "text-white", icon }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-3 rounded-2xl flex items-center gap-4 min-w-[140px] flex-1 lg:flex-none backdrop-blur-sm">
      <div className={`p-2 rounded-lg bg-zinc-800 ${color} bg-opacity-10`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-[8px] font-black text-zinc-500 uppercase leading-none mb-1 tracking-widest">{label}</p>
        <p className={`text-xl font-black leading-none ${color}`}>{value}</p>
      </div>
    </div>
  );
}