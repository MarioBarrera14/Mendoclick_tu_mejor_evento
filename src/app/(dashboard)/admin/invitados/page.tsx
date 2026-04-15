"use client";

import { useState, useEffect } from "react";
import { TicketPlus, Copy, Trash2, Loader2, CheckCircle2, XCircle, Clock, Utensils, Save, LogIn, LogOut, Users } from "lucide-react";
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
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1000, timerProgressBar: false });
        Toast.fire({ icon: 'success', title: mesa ? `Mesa ${mesa} OK` : 'Mesa quitada', background: '#000', color: '#fff' });
      }
    } catch (error) { console.error(error); }
  };

  const stats = {
    total: listaInvitados.reduce((acc, inv) => acc + (inv.cupos || 0), 0),
    dentro: listaInvitados.filter(inv => inv.checkIn).reduce((acc, inv) => acc + (inv.confirmados || inv.cupos), 0),
    fuera: listaInvitados.filter(inv => !inv.checkIn).reduce((acc, inv) => acc + (inv.cupos || 0), 0),
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
        setNombre(""); setCupos(1);
      }
    } catch (error) { console.error(error); } finally { setCargando(false); }
  };

  const eliminarInvitado = async (id: string) => {
    const result = await Swal.fire({ title: "¿ELIMINAR?", icon: "warning", showCancelButton: true, confirmButtonColor: "#dc2626", cancelButtonColor: "#000", confirmButtonText: "SÍ, ELIMINAR" });
    if (result.isConfirmed) {
      const res = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
    }
  };

  const copiarAlPortapapeles = (txt: string) => {
    navigator.clipboard.writeText(txt);
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1000 });
    Toast.fire({ icon: 'success', title: 'Copiado', background: '#000', color: '#fff' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-4 font-sans text-zinc-900 bg-white">
      
      {/* HEADER COMPACTO TIPO DASHBOARD */}
      <header className="mb-4 flex flex-col sm:flex-row justify-between items-center bg-black p-4 rounded-2xl text-white gap-4 shadow-lg shadow-zinc-200">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 w-1.5 h-10 rounded-full" />
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter leading-none">MENDOCLICK <span className="text-red-600">CUPOS</span></h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold">Control de Acceso Real-Time</p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <StatCompact label="TOTAL" value={stats.total} icon={<Users size={12}/>} />
          <StatCompact label="DENTRO" value={stats.dentro} color="text-emerald-400" icon={<LogIn size={12}/>} />
          <StatCompact label="FALTAN" value={stats.fuera} color="text-red-500" icon={<LogOut size={12}/>} />
        </div>
      </header>

      {/* FORMULARIO SLIM RESPONSIVE */}
      <section className="bg-zinc-50 p-3 rounded-2xl mb-6 border border-zinc-200">
        <form onSubmit={handleGuardar} className="flex flex-col gap-2">
          <input 
            type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
            placeholder="NOMBRE DEL INVITADO O FAMILIA..."
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-red-600 transition-all shadow-sm"
          />
          <div className="flex flex-row gap-2">
            <select 
              value={cupos} onChange={(e) => setCupos(parseInt(e.target.value))}
              className="flex-1 sm:w-32 bg-white border border-zinc-300 rounded-xl px-3 py-3 text-[11px] font-black outline-none appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 10, 15, 20].map(n => <option key={n} value={n}>{n} {n === 1 ? 'PASE' : 'PASES'}</option>)}
            </select>
            <button 
              type="submit" disabled={cargando || !nombre}
              className="flex-[2] sm:flex-none bg-red-600 text-white px-8 py-3 rounded-xl font-black text-[11px] tracking-widest hover:bg-black transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 shadow-md"
            >
              {cargando ? <Loader2 className="animate-spin size-4" /> : <><Save size={14}/> GENERAR</>}
            </button>
          </div>
        </form>
      </section>

      {/* LISTADO DE ALTA DENSIDAD */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        
        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Invitado</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-center">Pers</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-center">Mesa</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-center">Estado</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-center">Código</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {listaInvitados.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-2.5">
                    <p className="font-black text-xs uppercase italic text-black">{inv.nombre}</p>
                  </td>
                  <td className="px-4 py-2.5 text-center text-[11px] font-black text-zinc-400">{inv.cupos}</td>
                  <td className="px-4 py-2.5 text-center">
                    <select
                      value={inv.mesa || ""}
                      onChange={(e) => asignarMesa(inv.id, e.target.value)}
                      className={`bg-zinc-50 border ${inv.mesa ? 'border-red-600 text-red-600' : 'border-zinc-200 text-zinc-400'} text-[10px] font-black rounded-lg px-2 py-1 outline-none`}
                    >
                      <option value="">--</option>
                      {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>M{i+1}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <div className={`mx-auto w-2 h-2 rounded-full ${inv.checkIn ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-red-600'}`} />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <button 
                      onClick={() => copiarAlPortapapeles(inv.codigo)} 
                      className="text-[10px] font-mono font-bold bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200 hover:bg-black hover:text-white transition-all flex items-center gap-2 mx-auto"
                    >
                      {inv.codigo} <Copy size={10} />
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-right pr-6">
                    <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-300 hover:text-red-600 transition-all"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE SLIM ROWS (CORREGIDO CON COPIA) */}
        <div className="md:hidden divide-y divide-zinc-100">
          {listaInvitados.map((inv) => (
            <div key={inv.id} className="p-3 flex items-center justify-between gap-3 bg-white">
              <div className="flex-1 min-w-0">
                <p className="font-black text-[12px] uppercase italic leading-none truncate mb-1.5">{inv.nombre}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${inv.checkIn ? 'bg-emerald-500 animate-pulse' : 'bg-red-600'}`} />
                  
                  <button 
                    onClick={() => copiarAlPortapapeles(inv.codigo)}
                    className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-zinc-100 px-2 py-1 rounded border border-zinc-200 active:bg-black active:text-white transition-all"
                  >
                    {inv.codigo} <Copy size={10} className="opacity-40" />
                  </button>

                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">{inv.cupos}P</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <select
                    value={inv.mesa || ""}
                    onChange={(e) => asignarMesa(inv.id, e.target.value)}
                    className={`bg-zinc-50 border ${inv.mesa ? 'border-red-600 text-red-600' : 'border-zinc-200 text-zinc-400'} text-[10px] font-black rounded-lg px-2 py-1.5 outline-none`}
                  >
                    <option value="">M?</option>
                    {[...Array(50)].map((_, i) => <option key={i+1} value={i+1}>M{i+1}</option>)}
                  </select>
                  <button onClick={() => eliminarInvitado(inv.id)} className="p-2 text-zinc-300 active:text-red-600"><Trash2 size={18}/></button>
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
    <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl flex items-center gap-2 min-w-fit shadow-inner">
      <span className="text-zinc-500">{icon}</span>
      <div className="flex flex-col">
        <p className="text-[7px] font-black text-zinc-500 uppercase leading-none mb-1 tracking-widest">{label}</p>
        <p className={`text-sm font-black leading-none ${color}`}>{value}</p>
      </div>
    </div>
  );
}