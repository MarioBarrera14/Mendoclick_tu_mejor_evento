"use client";

import { useState, useEffect } from "react";
import { 
  TicketPlus, Copy, Trash2, Loader2, 
  CheckCircle2, XCircle, AlertCircle 
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface Invitado {
  id: string;
  nombre: string;
  codigo: string;
  cupos: number;
  confirmados: number | null;
  checkIn: boolean;
  mesa: string | null;
}

export default function GestionInvitados() {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [cupos, setCupos] = useState(1);
  const [listaInvitados, setListaInvitados] = useState<Invitado[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session?.user?.slug) {
      fetch(`/api/guests?slug=${session.user.slug}`)
        .then((res) => res.json())
        .then((data) => { 
          if (Array.isArray(data)) {
            const formattedData = data.map(inv => ({
              ...inv,
              // Si la DB trae 0 o un numero, lo dejamos, si no null
              confirmados: (inv.confirmados === null || inv.confirmados === undefined) ? null : Number(inv.confirmados),
              checkIn: Boolean(inv.checkIn)
            }));
            setListaInvitados(formattedData); 
          } 
        })
        .catch((err) => console.error(err));
    }
  }, [session]);

  // --- LÓGICA DE ESTADOS PURA ---
  const getEstadoInfo = (inv: Invitado) => {
    // 1. Si es estrictamente null, es un pase nuevo sin tocar
    if (inv.confirmados === null) {
      return { label: "PENDIENTE", color: "bg-zinc-50 border-zinc-200 text-zinc-400", dot: "bg-zinc-400" };
    }
    // 2. Si el invitado puso 0, es BAJA
    if (inv.confirmados === 0) {
      return { label: "BAJA", color: "bg-red-100 border-red-200 text-red-700", dot: "bg-red-600" };
    }
    // 3. Si es mayor a 0, está CONFIRMADO
    return { label: "CONFIRMADO", color: "bg-emerald-50 border-emerald-100 text-emerald-600", dot: "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" };
  };

  const stats = {
    totalTickets: listaInvitados.length,
    totalConfirmados: listaInvitados.reduce((acc, inv) => acc + (inv.confirmados || 0), 0),
    noAsistiran: listaInvitados.filter(inv => inv.confirmados === 0).length,
    pendientes: listaInvitados.filter(inv => inv.confirmados === null).length
  };

  const asignarMesa = async (id: string, mesa: string) => {
    try {
      const response = await fetch(`/api/guests?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesa }),
      });
      if (response.ok) {
        setListaInvitados(listaInvitados.map(inv => inv.id === id ? { ...inv, mesa } : inv));
      }
    } catch (error) { console.error(error); }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1000 });
    Toast.fire({ icon: 'success', title: 'Copiado', background: '#000', color: '#fff' });
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || cargando) return;
    setCargando(true);
    const codigo = `${nombre.trim().substring(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CLAVE: Enviamos confirmados como NULL para que sea PENDIENTE
        body: JSON.stringify({ nombre: nombre.trim(), cupos, codigo, checkIn: false, confirmados: null }),
      });
      if (res.ok) {
        const nuevo = await res.json();
        // Forzamos que el nuevo en la lista tambien tenga null para evitar el bug visual
        setListaInvitados([{ ...nuevo, confirmados: null }, ...listaInvitados]);
        setNombre(""); setCupos(1);
      }
    } catch (error) { console.error(error); } finally { setCargando(false); }
  };

  const eliminarInvitado = async (id: string) => {
    const result = await Swal.fire({ 
        title: "¿BORRAR?", icon: "warning", showCancelButton: true, 
        confirmButtonColor: "#dc2626", cancelButtonColor: "#000", confirmButtonText: "ELIMINAR"
    });
    if (result.isConfirmed) {
      const res = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-6 font-sans text-zinc-900 bg-white min-h-screen">
      
      {/* HEADER DASHBOARD */}
      <header className="mb-6 flex flex-col lg:flex-row justify-between items-center bg-zinc-950 p-6 rounded-[2rem] text-white gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 w-2 h-10 rounded-full" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">MENDOCLICK <span className="text-red-600">PRO</span></h1>
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
          <StatCompact label="TICKETS" value={stats.totalTickets} color="text-white" icon={<TicketPlus size={16}/>} />
          <StatCompact label="ASISTENTES" value={stats.totalConfirmados} color="text-emerald-400" icon={<CheckCircle2 size={16}/>} />
          <StatCompact label="BAJAS" value={stats.noAsistiran} color="text-red-500" icon={<XCircle size={16}/>} />
          <StatCompact label="PENDIENTES" value={stats.pendientes} color="text-zinc-400" icon={<AlertCircle size={16}/>} />
        </div>
      </header>

      {/* FORMULARIO */}
      <section className="bg-zinc-50 p-4 rounded-3xl mb-8 border border-zinc-200 shadow-sm">
        <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <input 
            type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
            placeholder="NOMBRE DEL INVITADO..."
            className="md:col-span-7 bg-white border-2 border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold uppercase outline-none focus:border-red-600 shadow-sm"
          />
          <div className="md:col-span-3 flex items-center bg-white border-2 border-zinc-200 rounded-2xl px-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase mr-auto tracking-tighter">CUPOS:</span>
            <select value={cupos} onChange={(e) => setCupos(parseInt(e.target.value))} className="bg-transparent py-4 font-black outline-none cursor-pointer">
              {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <button type="submit" disabled={cargando} className="md:col-span-2 bg-red-600 text-white rounded-2xl font-black text-[11px] hover:bg-black transition-all shadow-lg">
            {cargando ? <Loader2 className="animate-spin mx-auto" /> : "GENERAR PASE"}
          </button>
        </form>
      </section>

      {/* TABLA DE INVITADOS */}
      <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-xl overflow-hidden">
        <table className="w-full text-left hidden md:table">
          <thead>
            <tr className="bg-zinc-950 text-white">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Invitado / Código</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center">Confirmados</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center">Estado</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center">Mesa</th>
              <th className="px-6 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {listaInvitados.map((inv) => {
              const info = getEstadoInfo(inv);
              const esBaja = info.label === "BAJA";
              const esPendiente = info.label === "PENDIENTE";

              return (
                <tr key={inv.id} className={`hover:bg-zinc-50/50 transition-colors ${esBaja ? 'bg-red-50/40 grayscale opacity-70' : ''}`}>
                  <td className="px-6 py-4">
                    <p className={`font-black text-sm uppercase italic ${esBaja ? 'line-through text-red-900' : 'text-zinc-900'}`}>{inv.nombre}</p>
                    <button onClick={() => copiarCodigo(inv.codigo)} className="mt-2 flex items-center gap-2 text-[11px] font-mono font-bold text-red-600 hover:text-black transition-colors bg-red-50 px-2 py-1 rounded-lg w-fit shadow-sm">
                      <Copy size={12} /> {inv.codigo}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-xs">
                    <span className={info.label === "CONFIRMADO" ? 'text-emerald-600' : esBaja ? 'text-red-600' : 'text-zinc-400'}>
                        {esPendiente ? '-' : (inv.confirmados ?? 0)} 
                    </span>
                    <span className="text-zinc-300 mx-1">/</span>
                    <span className="text-zinc-500">{inv.cupos}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-black text-[10px] uppercase ${info.color}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${info.dot}`} />
                      {info.label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      disabled={esBaja || esPendiente}
                      value={inv.mesa || ""}
                      onChange={(e) => asignarMesa(inv.id, e.target.value)}
                      className={`bg-white border-2 border-zinc-100 text-[11px] font-black rounded-xl px-3 py-1.5 outline-none focus:border-red-600 transition-all ${esBaja || esPendiente ? 'opacity-20 pointer-events-none' : ''}`}
                    >
                      <option value="">--</option>
                      {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>M{i+1}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right pr-8">
                    <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-300 hover:text-red-600 transition-all p-2"><Trash2 size={18}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCompact({ label, value, color = "text-white", icon }: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl flex items-center gap-3 min-w-[120px] shadow-inner text-nowrap">
      <div className={`${color} opacity-80`}>{icon}</div>
      <div className="flex flex-col">
        <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-base font-black leading-none ${color}`}>{value}</p>
      </div>
    </div>
  );
}