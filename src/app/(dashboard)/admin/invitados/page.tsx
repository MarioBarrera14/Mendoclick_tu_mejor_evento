"use client";

import { useState, useEffect } from "react";
import { TicketPlus, Copy, Trash2, Loader2, CheckCircle2, XCircle, Clock, Users, Mail, Utensils } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react"; // <--- IMPORTANTE: Para saber quién es el cliente

export default function GestionInvitados() {
  const { data: session } = useSession(); // Obtenemos el slug y el ID del cliente
  const [apellido, setApellido] = useState("");
  const [cupos, setCupos] = useState(1);
  const [listaInvitados, setListaInvitados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  // 1. CARGAR INVITADOS FILTRADOS POR SLUG
  useEffect(() => {
    if (session?.user?.slug) {
      fetch(`/api/guests?slug=${session.user.slug}`) // <--- Pasamos el slug por URL
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

  const handleClearForm = () => {
    setApellido("");
    setCupos(1);
  };

  // 2. GUARDAR INVITADO VINCULADO AL USUARIO
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apellido || cargando || !session) return;
    
    setCargando(true);
    const nuevoInvitado = {
      apellido: apellido.trim(),
      cupos: cupos,
      codigo: generarCodigo(apellido),
      // No mandamos el userId acá porque la API lo saca de la sesión por seguridad
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
          title: '<span style="font-family: serif; font-style: italic; font-size: 1.5rem;">¡Pase Generado!</span>',
          html: '<p style="color: #71717a; font-size: 0.875rem;">El invitado ha sido añadido a tu lista. ✨</p>',
          icon: "success",
          iconColor: "#10b981",
          showConfirmButton: false,
          timer: 2000,
          customClass: { popup: 'rounded-[2rem] border border-zinc-100 shadow-2xl' }
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo crear el invitado",
        icon: "error",
        confirmButtonColor: "#18181b",
        customClass: { popup: 'rounded-[2rem]' }
      });
    } finally {
      setCargando(false);
    }
  };

  // 3. ELIMINAR INVITADO
  const eliminarInvitado = async (id: string) => {
    const swalEstilo = Swal.mixin({
      customClass: {
        popup: 'rounded-[2rem] border border-zinc-100 shadow-2xl',
        confirmButton: "bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest ml-3",
        cancelButton: "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 px-6 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest"
      },
      buttonsStyling: false
    });

    const result = await swalEstilo.fire({
      title: '<span style="font-family: serif; font-style: italic; font-size: 1.5rem;">¿Eliminar?</span>',
      text: "Se quitará de tu lista de invitados.",
      icon: "warning",
      iconColor: "#f43f5e",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setListaInvitados(listaInvitados.filter((inv) => inv.id !== id));
          swalEstilo.fire({
            title: "Eliminado",
            icon: "success",
            timer: 1000,
            showConfirmButton: false
          });
        }
      } catch (error) {
        swalEstilo.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    const toast = document.createElement('div');
    toast.innerText = `Código ${codigo} copiado`;
    toast.className = "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold z-50 animate-bounce shadow-2xl uppercase tracking-tighter";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100"><CheckCircle2 size={10} /> Confirmado</span>;
      case "CANCELLED":
        return <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100"><XCircle size={10} /> No asiste</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100"><Clock size={10} /> Pendiente</span>;
    }
  };

  return (
    <div className="space-y-8 pb-20 p-4">
      <div className="space-y-6">
        <div className="border-l-4 border-rose-500 pl-4">
          <h1 className="text-3xl font-serif italic font-bold text-zinc-900">Gestión de Invitados</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black mt-1">Control de accesos • /{session?.user?.slug}</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Personas" value={stats.totalPersonas} icon={<Users size={14}/>} />
          <StatCard label="Confirmados" value={stats.confirmados} color="emerald" icon={<CheckCircle2 size={14}/>} />
          <StatCard label="No Asisten" value={stats.inasistencias} color="rose" icon={<XCircle size={14}/>} />
          <StatCard label="Pendientes" value={stats.invitacionesPendientes} color="dark" icon={<Mail size={14}/>} />
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100">
        <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-black">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Familia / Apellido</label>
            <input 
              type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}
              placeholder="Ej: Familia Garcia"
              className="w-full bg-zinc-50 border-none rounded-2xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-black transition-all font-bold text-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Lugares</label>
            <select 
              value={cupos} onChange={(e) => setCupos(parseInt(e.target.value))}
              className="w-full bg-zinc-50 border-none rounded-2xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-black font-bold text-zinc-800 cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Persona' : 'Personas'}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
             <button 
                type="submit" disabled={cargando || !apellido}
                className="flex-[3] bg-zinc-900 hover:bg-black text-white py-3.5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {cargando ? <Loader2 className="animate-spin" size={16} /> : <TicketPlus size={16} />} Generar
              </button>
              <button 
                type="button"
                onClick={handleClearForm}
                className="flex-1 bg-zinc-100 text-zinc-400 hover:text-rose-500 rounded-2xl flex items-center justify-center transition-colors"
              >
                <Trash2 size={18} />
              </button>
          </div>
        </form>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50/50">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Invitado</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">Lugares</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">Estado</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">Código</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {listaInvitados.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="p-6">
                    <span className="font-bold text-zinc-900 uppercase italic">{inv.apellido}</span>
                    {inv.dietary && inv.dietary !== "Ninguna" && (
                      <span className="block text-[9px] text-rose-500 font-black mt-1 uppercase italic flex items-center gap-1">
                        <Utensils size={10} /> {inv.dietary}
                      </span>
                    )}
                  </td>
                  <td className="p-6 text-center font-black text-zinc-400 text-sm">{inv.cupos}</td>
                  <td className="p-6 text-center">{renderStatus(inv.status)}</td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => copiarCodigo(inv.codigo)} 
                      className="inline-flex items-center gap-2 font-mono font-bold bg-zinc-100 text-zinc-900 px-4 py-2 rounded-xl border border-zinc-200 hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      {inv.codigo} <Copy size={12} />
                    </button>
                  </td>
                  <td className="p-6 text-right">
                    <button onClick={() => eliminarInvitado(inv.id)} className="text-zinc-200 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden divide-y divide-zinc-100">
          {listaInvitados.map((inv) => (
            <div key={inv.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-zinc-900 text-lg uppercase italic">{inv.apellido}</p>
                  <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">{inv.cupos} Personas</p>
                </div>
                {renderStatus(inv.status)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => copiarCodigo(inv.codigo)} className="flex-1 bg-zinc-100 py-3 rounded-2xl font-mono text-sm font-black text-zinc-900 border border-zinc-200">
                  {inv.codigo} <Copy size={14} className="inline ml-1 opacity-40"/>
                </button>
                <button onClick={() => eliminarInvitado(inv.id)} className="bg-zinc-100 text-zinc-400 p-3 rounded-2xl border border-zinc-200">
                  <Trash2 size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: any) {
  const styles: any = {
    emerald: "border-emerald-100 text-emerald-600 bg-emerald-50/30",
    rose: "border-rose-100 text-rose-600 bg-rose-50/30",
    dark: "bg-zinc-900 text-white border-transparent",
    default: "bg-white border-zinc-100 text-zinc-900"
  };
  const current = styles[color] || styles.default;
  
  return (
    <div className={`${current} border p-5 rounded-[2rem] shadow-sm flex flex-col justify-between h-full`}>
      <div className="flex items-center gap-2 opacity-50 mb-2">
        {icon}
        <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-2xl font-bold font-sans">{value}</p>
    </div>
  );
}