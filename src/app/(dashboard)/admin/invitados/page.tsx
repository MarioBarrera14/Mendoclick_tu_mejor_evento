"use client";

import { useEffect, useState } from "react";
import { 
  TicketPlus, Copy, Trash2, Loader2, 
  CheckCircle2, XCircle, MapPin, LogIn 
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface Guest {
  id: string;
  nombre: string;
  cupos: number;
  confirmados: number;
  codigo: string;
  status: string;
  mesa: string;
  asistio: boolean;
}

export default function GestionInvitados() {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [cupos, setCupos] = useState(1);
  const [listaInvitados, setListaInvitados] = useState<Guest[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session?.user?.slug) {
      fetch(`/api/guests?slug=${session.user.slug}`)
        .then((res) => res.json())
        .then((data) => { if (Array.isArray(data)) setListaInvitados(data); })
        .catch((err) => console.error(err));
    }
  }, [session]);

  const cambiarMesa = async (id: string, mesa: string) => {
    try {
      const res = await fetch("/api/guests", {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, mesa }),
      });
      if (res.ok) {
        setListaInvitados(listaInvitados.map(inv => inv.id === id ? { ...inv, mesa } : inv));
        const Toast = Swal.mixin({ 
          toast: true, 
          position: 'top-end', 
          showConfirmButton: false, 
          timer: 1500,
          background: '#000',
          color: '#fff' 
        });
        Toast.fire({ icon: 'success', title: `Mesa ${mesa} asignada` });
      }
    } catch (error) { console.error(error); }
  };

  const getEstadoInfo = (inv: Guest) => {
    if (inv.status === "CONFIRMED") {
      return { label: "WEB OK", color: "bg-emerald-50 border-emerald-100 text-emerald-600", dot: "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" };
    }
    if (inv.status === "CANCELLED") {
      return { label: "BAJA", color: "bg-red-50 border-red-100 text-red-600", dot: "bg-red-600" };
    }
    return { label: "PENDIENTE", color: "bg-zinc-50 border-zinc-200 text-zinc-400", dot: "bg-zinc-300" };
  };

  const getAccesoInfo = (asistio: boolean) => {
    if (asistio) return { label: "ADENTRO", color: "bg-blue-50 border-blue-100 text-blue-600", dot: "bg-blue-500 animate-pulse" };
    return { label: "NO INGRESÓ", color: "bg-zinc-50 border-transparent text-zinc-300", dot: "bg-zinc-200" };
  };

  const stats = {
    totalTickets: listaInvitados.length,
    totalConfirmados: listaInvitados.reduce((acc, inv) => acc + (inv.confirmados || 0), 0),
    noAsistiran: listaInvitados.filter(inv => inv.status === "CANCELLED").length,
    yaIngresaron: listaInvitados.filter(inv => inv.asistio).length 
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
        body: JSON.stringify({ nombre: nombre.trim(), cupos, codigo, status: "PENDING", confirmados: 0, mesa: "A Designar" }),
      });
      if (res.ok) {
        const nuevo = await res.json();
        setListaInvitados([nuevo, ...listaInvitados]);
        setNombre(""); setCupos(1);
      }
    } finally { setCargando(false); }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    Swal.fire({ toast: true, position: 'top-end', timer: 1000, showConfirmButton: false, icon: 'success', title: 'Copiado', background: '#000', color: '#fff' });
  };

  const eliminarInvitado = async (id: string) => {
    const result = await Swal.fire({ title: "¿ELIMINAR?", icon: "warning", showCancelButton: true, confirmButtonColor: "#dc2626", confirmButtonText: "BORRAR" });
    if (result.isConfirmed) {
      const res = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 md:p-6 font-sans text-zinc-900 bg-white min-h-screen pb-20">
      
      {/* HEADER */}
      <header className="mb-6 bg-zinc-950 p-5 md:p-8 rounded-[2rem] text-white shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 w-1.5 h-8 rounded-full" />
            <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">
              MENDOCLICK <span className="text-red-600">PRO</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 md:flex md:flex-row gap-2 w-full lg:w-auto">
            <StatCompact label="PARES" value={stats.totalTickets} color="text-white" icon={<TicketPlus size={14}/>} />
            <StatCompact label="WEB CONF" value={stats.totalConfirmados} color="text-emerald-400" icon={<CheckCircle2 size={14}/>} />
            <StatCompact label="EN SALÓN" value={stats.yaIngresaron} color="text-blue-400" icon={<LogIn size={14}/>} />
            <StatCompact label="BAJAS" value={stats.noAsistiran} color="text-red-500" icon={<XCircle size={14}/>} />
          </div>
        </div>
      </header>

      {/* FORMULARIO */}
      <section className="bg-zinc-50 p-4 rounded-[2rem] mb-6 border border-zinc-200">
        <form onSubmit={handleGuardar} className="flex flex-col md:grid md:grid-cols-12 gap-3">
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="NOMBRE DEL INVITADO..." 
            className="md:col-span-7 bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-black uppercase outline-none focus:border-red-600 shadow-sm" 
          />
          <div className="flex gap-2 md:col-span-5 h-14 md:h-auto">
            <div className="flex-1 relative flex items-center bg-white border border-zinc-200 rounded-2xl px-4 hover:border-red-600 transition-colors">
              <span className="text-[8px] font-black text-zinc-400 uppercase absolute left-4 top-2">CUPOS:</span>
              <select 
                value={cupos} 
                onChange={(e) => setCupos(parseInt(e.target.value))} 
                className="w-full h-full bg-transparent pt-3 font-black outline-none text-sm appearance-none cursor-pointer"
              >
                {[...Array(20)].map((_, i) => <option key={i+1} value={i+1} className="text-black bg-white">{i+1}</option>)}
              </select>
            </div>
            <button 
              type="submit" 
              disabled={cargando} 
              className="flex-[1.5] bg-red-600 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase px-4 active:scale-95 transition-all"
            >
              {cargando ? <Loader2 className="animate-spin mx-auto" /> : "CREAR PASE"}
            </button>
          </div>
        </form>
      </section>

      {/* LISTADO */}
      <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest italic">
              <tr>
                <th className="px-6 py-5">Invitado / Código</th>
                <th className="px-6 py-5 text-center">Confirmados</th>
                <th className="px-6 py-5 text-center">Mesa</th>
                <th className="px-6 py-5 text-center">Estado Web</th>
                <th className="px-6 py-5 text-center">Acceso Salón</th>
                <th className="px-6 py-5 pr-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {listaInvitados.map((inv) => (
                <DesktopRow key={inv.id} inv={inv} getEstadoInfo={getEstadoInfo} getAccesoInfo={getAccesoInfo} copiar={copiarCodigo} eliminar={eliminarInvitado} cambiarMesa={cambiarMesa} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-zinc-100">
          {listaInvitados.map((inv) => (
            <MobileCard key={inv.id} inv={inv} getEstadoInfo={getEstadoInfo} getAccesoInfo={getAccesoInfo} copiar={copiarCodigo} eliminar={eliminarInvitado} cambiarMesa={cambiarMesa} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCompact({ label, value, color, icon }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-2xl flex items-center gap-3 flex-1 md:flex-none">
      <div className={`${color}`}>{icon}</div>
      <div className="flex flex-col">
        <p className="text-[7px] font-black text-zinc-500 uppercase leading-none mb-1">{label}</p>
        <p className={`text-xs md:text-sm font-black leading-none ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function MobileCard({ inv, getEstadoInfo, getAccesoInfo, copiar, eliminar, cambiarMesa }: any) {
  const infoWeb = getEstadoInfo(inv);
  const infoAcceso = getAccesoInfo(inv.asistio);
  return (
    <div className={`p-5 flex flex-col gap-4 ${inv.status === "CANCELLED" ? 'grayscale opacity-60 bg-zinc-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-black text-sm uppercase italic tracking-tight text-zinc-900">{inv.nombre}</p>
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => copiar(inv.codigo)} 
              className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-red-600 bg-red-50 px-2 py-1.5 rounded-lg border border-red-100"
            >
              <Copy size={10} /> {inv.codigo}
            </button>
            <span className="text-[9px] font-black text-zinc-500 bg-zinc-100 px-2 py-1.5 rounded-lg">
              CUPOS: {inv.confirmados || 0}/{inv.cupos}
            </span>
          </div>
        </div>
        <button onClick={() => eliminar(inv.id)} className="text-zinc-300 p-1"><Trash2 size={16}/></button>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex gap-2">
          <Badge info={infoWeb} />
          <Badge info={infoAcceso} />
        </div>
        
        {/* FIX VISIBILIDAD MESA MOBILE */}
        <div className="flex items-center bg-zinc-950 text-white rounded-xl px-3 py-1.5 border border-zinc-800 shadow-lg">
          <MapPin size={10} className="text-red-500 mr-2" />
          <select 
            value={inv.mesa || "A Designar"} 
            onChange={(e) => cambiarMesa(inv.id, e.target.value)} 
            className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer text-white"
          >
            <option value="A Designar" className="bg-white text-black font-sans">S/N</option>
            {[...Array(50)].map((_, i) => (
              <option key={i+1} value={(i+1).toString()} className="bg-white text-black font-sans">
                MESA {i+1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function DesktopRow({ inv, getEstadoInfo, getAccesoInfo, copiar, eliminar, cambiarMesa }: any) {
  const infoWeb = getEstadoInfo(inv);
  const infoAcceso = getAccesoInfo(inv.asistio);
  return (
    <tr className={`hover:bg-zinc-50 transition-colors ${inv.status === "CANCELLED" ? 'grayscale opacity-50' : ''}`}>
      <td className="px-6 py-4">
        <p className="font-black text-sm uppercase italic">{inv.nombre}</p>
        <button onClick={() => copiar(inv.codigo)} className="mt-1 flex items-center gap-2 text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg w-fit border border-red-100"><Copy size={12} /> {inv.codigo}</button>
      </td>
      <td className="px-6 py-4 text-center font-black text-xs text-zinc-400">
        <span className="text-zinc-900">{inv.confirmados || 0}</span> / {inv.cupos}
      </td>
      <td className="px-6 py-4 text-center">
        {/* FIX VISIBILIDAD MESA DESKTOP */}
        <div className="flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-1.5 mx-auto w-fit">
          <MapPin size={12} className="text-red-600 mr-2" />
          <select 
            value={inv.mesa || "A Designar"} 
            onChange={(e) => cambiarMesa(inv.id, e.target.value)} 
            className="bg-transparent text-[11px] font-black uppercase outline-none cursor-pointer text-zinc-900"
          >
            <option value="A Designar" className="bg-white text-black">S/N</option>
            {[...Array(50)].map((_, i) => (
              <option key={i+1} value={(i+1).toString()} className="bg-white text-black">
                MESA {i+1}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="px-6 py-4 text-center"><Badge info={infoWeb} /></td>
      <td className="px-6 py-4 text-center"><Badge info={infoAcceso} /></td>
      <td className="px-6 py-4 text-right pr-8">
        <button onClick={() => eliminar(inv.id)} className="text-zinc-300 hover:text-red-600 p-2 transition-colors">
          <Trash2 size={20}/>
        </button>
      </td>
    </tr>
  );
}

function Badge({ info }: any) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-black text-[8px] md:text-[9px] uppercase ${info.color}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${info.dot}`} />
      {info.label}
    </div>
  );
}