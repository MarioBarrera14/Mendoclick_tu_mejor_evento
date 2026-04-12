"use client";

import { useState, useEffect } from "react";
import { TicketPlus, Copy, Trash2, Loader2, CheckCircle2, XCircle, Clock, Users, Mail, Utensils, Save } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function GestionInvitados() {
  const { data: session } = useSession();
  const [apellido, setApellido] = useState("");
  const [cupos, setCupos] = useState(1);
  const [listaInvitados, setListaInvitados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session?.user?.slug) {
      fetch(`/api/guests?slug=${session.user.slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setListaInvitados(data);
        })
        .catch((err) => console.error("Error cargando invitados:", err));
    }
  }, [session]);

  const stats = {
    totalPersonas: listaInvitados.reduce((acc, inv) => acc + inv.cupos, 0),
    confirmados: listaInvitados
      .filter(inv => inv.status === "CONFIRMED")
      .reduce((acc, inv) => acc + inv.cupos, 0),
    inasistencias: listaInvitados
      .filter(inv => inv.status === "CANCELLED")
      .reduce((acc, inv) => acc + inv.cupos, 0),
    invitacionesPendientes: listaInvitados
      .filter(inv => inv.status === "PENDING" || !inv.status).length
  };

  const generarCodigo = (ape: string) => {
    const prefijo = ape.trim().substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefijo}${randomNum}`;
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apellido || cargando || !session) return;
    
    setCargando(true);
    const nuevoInvitado = {
      apellido: apellido.trim(),
      cupos: cupos,
      codigo: generarCodigo(apellido),
    };

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoInvitado),
      });

      if (response.ok) {
        const guardado = await response.json();
        setListaInvitados([guardado, ...listaInvitados]);
        setApellido("");
        setCupos(1);
        
        Swal.fire({
          title: "¡LISTO!",
          icon: "success",
          confirmButtonColor: "#dc2626",
          customClass: { popup: 'rounded-3xl border-b-4 border-red-600' }
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarInvitado = async (id: string) => {
    const result = await Swal.fire({
      title: "¿ELIMINAR?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#18181b",
      confirmButtonText: "SÍ, ELIMINAR",
      customClass: { popup: 'rounded-3xl border-b-4 border-zinc-950' }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
        }
      } catch (error) { console.error(error); }
    }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: `Código ${codigo} copiado`,
        showConfirmButton: false,
        timer: 1500,
        background: '#18181b',
        color: '#fff'
    });
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <span className="text-[9px] font-black text-emerald-500 uppercase flex items-center gap-1"><CheckCircle2 size={10} /> Confirmado</span>;
      case "CANCELLED":
        return <span className="text-[9px] font-black text-red-500 uppercase flex items-center gap-1"><XCircle size={10} /> No asiste</span>;
      default:
        return <span className="text-[9px] font-black text-zinc-400 uppercase flex items-center gap-1"><Clock size={10} /> Pendiente</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      {/* HEADER COMPACTO */}
      <header className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Mis <span className="text-red-600">Cupos</span>
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-2">
            <MiniStat label="TOTAL" value={stats.totalPersonas} />
            <MiniStat label="CONF" value={stats.confirmados} color="text-emerald-500" />
            <MiniStat label="OFF" value={stats.inasistencias} color="text-red-600" />
            <MiniStat label="PEND" value={stats.invitacionesPendientes} color="text-zinc-400" />
        </div>
      </header>

      {/* FORMULARIO COMPACTO */}
      <section className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm mb-8">
        <h2 className="text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest flex items-center gap-2">
            <TicketPlus size={14} className="text-red-600" /> Nuevo Pase de Invitado
        </h2>
        <form onSubmit={handleGuardar} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input 
              type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}
              placeholder="NOMBRE / FAMILIA..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-sm font-black uppercase text-black outline-none focus:border-red-500 transition-all"
            />
          </div>
          <div className="w-full md:w-40">
            <select 
              value={cupos} onChange={(e) => setCupos(parseInt(e.target.value))}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-sm font-black text-black outline-none focus:border-red-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Lugar' : 'Lugares'}</option>)}
            </select>
          </div>
          <button 
            type="submit" disabled={cargando || !apellido}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-30"
          >
            {cargando ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} GENERAR PASE
          </button>
        </form>
      </section>

      {/* LISTADO */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500">Invitado</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500 text-center">Lugares</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500 text-center">Estado</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-500 text-center">Código</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {listaInvitados.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-black text-sm uppercase italic leading-none">{inv.apellido}</p>
                    {inv.dietary && inv.dietary !== "Ninguna" && (
                      <span className="text-[8px] text-red-600 font-black mt-1 uppercase flex items-center gap-1">
                        <Utensils size={8} /> {inv.dietary}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-zinc-400 text-xs">{inv.cupos}</td>
                  <td className="px-6 py-4 text-center">{renderStatus(inv.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => copiarCodigo(inv.codigo)} 
                      className="group flex items-center gap-2 mx-auto font-mono font-bold text-xs bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-black hover:text-white transition-all"
                    >
                      {inv.codigo} <Copy size={10} className="opacity-40 group-hover:opacity-100" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color = "text-black" }: any) {
    return (
        <div className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl text-center min-w-[70px]">
            <p className="text-[7px] font-black text-zinc-400 uppercase tracking-tighter mb-1">{label}</p>
            <p className={`text-sm font-black leading-none ${color}`}>{value}</p>
        </div>
    );
}