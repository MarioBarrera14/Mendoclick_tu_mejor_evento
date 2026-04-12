"use client";

import { useState, useEffect } from "react";
import { 
  Save, User, Church, PartyPopper, ChevronRight, 
  Loader2, Trash2, Link as LinkIcon 
} from "lucide-react";
import { getEventConfig, updateEventConfig } from "@/actions/gallery.actions"; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface TimeLeft {
  days: number; hours: number; mins: number; secs: number;
}

export default function CountConfigPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ESTADOS LOGÍSTICOS
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [churchName, setChurchName] = useState("");
  const [churchAddress, setChurchAddress] = useState("");
  const [churchDate, setChurchDate] = useState(""); 
  const [churchTime, setChurchTime] = useState(""); 
  const [churchMapLink, setChurchMapLink] = useState("");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  const showNotification = (title: string, text: string, icon: 'success' | 'error') => {
    MySwal.fire({
      title: <span className="font-sans font-black uppercase text-xl">{title}</span>,
      html: <p className="text-zinc-900 font-bold">{text}</p>,
      icon,
      confirmButtonText: 'OK',
      customClass: {
        popup: 'rounded-3xl border-b-4 border-red-600',
        confirmButton: 'bg-red-600 text-white px-6 py-2 rounded-xl font-bold text-xs',
      }
    });
  };

  // 1. CARGA DE DATOS DESDE LA DB
  useEffect(() => {
    async function fetchData() {
      try {
        const config = await getEventConfig();
        if (config) {
          setEventName(config.eventName || ""); 
          setEventDate(config.eventDate || ""); 
          setEventTime(config.eventTime || "");
          setVenueName(config.venueName || "");
          setVenueAddress(config.venueAddress || ""); 
          setMapLink(config.mapLink || "");
          setChurchName(config.churchName || ""); 
          setChurchAddress(config.churchAddress || "");
          setChurchMapLink(config.churchMapLink || ""); 
          setChurchDate(config.churchDate || "");
          setChurchTime(config.churchTime || "");
        }
      } catch (error) { 
        console.error("Error al cargar datos:", error); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  // 2. LÓGICA DEL CONTADOR (Preview)
  useEffect(() => {
    if (!eventDate || !eventTime) return;
    const timer = setInterval(() => {
      const target = new Date(`${eventDate}T${eventTime}:00`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (86400000)),
          hours: Math.floor((diff / 3600000) % 24),
          mins: Math.floor((diff / 60000) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

  // 3. GUARDAR CAMBIOS
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateEventConfig({
        eventName, eventDate, eventTime, venueName, venueAddress, mapLink,
        churchName, churchAddress, churchMapLink, churchDate, churchTime
      });
      if (res.success) {
        showNotification("¡Listo!", "Logística actualizada con éxito.", "success");
      }
    } catch (e) { 
      showNotification("Error", "No se pudo conectar con el servidor.", "error"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  // 4. ELIMINAR / LIMPIAR TODO (Persistente en DB)
  const handleClear = () => {
    MySwal.fire({
      title: '¿VACIAR LOGÍSTICA?',
      text: "Esto borrará los nombres y lugares de la base de datos permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SÍ, BORRAR TODO',
      confirmButtonColor: '#dc2626',
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-lg mx-2',
        cancelButton: 'bg-zinc-200 px-4 py-2 rounded-lg mx-2'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSaving(true);
        try {
          // Limpiamos UI
          setEventName(""); setEventDate(""); setEventTime("");
          setVenueName(""); setVenueAddress(""); setMapLink("");
          setChurchName(""); setChurchAddress(""); setChurchMapLink("");
          setChurchDate(""); setChurchTime("");

          // Limpiamos DB enviando valores vacíos
          const res = await updateEventConfig({
            eventName: "", eventDate: "", eventTime: "",
            venueName: "", venueAddress: "", mapLink: "",
            churchName: "", churchAddress: "", churchMapLink: "",
            churchDate: "", churchTime: ""
          });

          if (res.success) {
            showNotification("Eliminado", "La logística ha sido borrada.", "success");
          }
        } catch (error) {
          showNotification("Error", "No se pudo borrar la información.", "error");
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-zinc-50"><Loader2 className="animate-spin text-red-600" /></div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans text-black pb-20">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-4 border-b-2 border-zinc-200 pb-2">
          <div>
            <p className="text-red-600 font-black text-[10px] uppercase tracking-widest leading-none mb-1">MendoClick Admin</p>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">Event <span className="text-red-600">Logistics</span></h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handleClear} className="p-2.5 rounded-xl bg-white border-2 border-zinc-200 text-zinc-400 hover:text-red-600 transition-colors shadow-sm">
              <Trash2 size={18} />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all active:scale-95 shadow-xl disabled:opacity-50">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} PUBLICAR CAMBIOS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white p-6 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
              <h2 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest">
                <User size={14} className="text-red-600"/> 01. Información General
              </h2>
              <input 
                type="text" placeholder="NOMBRES (EJ: JULI & MARIO)" value={eventName} onChange={(e) => setEventName(e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 text-xl font-black uppercase outline-none focus:border-red-500 transition-all mb-4" 
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase mb-1 block ml-1">Fecha</label>
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border-2 border-zinc-200 rounded-xl p-3 font-bold outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase mb-1 block ml-1">Hora Inicio</label>
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border-2 border-zinc-200 rounded-xl p-3 font-bold outline-none focus:border-red-500" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-900" />
              <h2 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest">
                <Church size={14} className="text-zinc-900" /> 02. Ceremonia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <input type="text" placeholder="NOMBRE DEL LUGAR" value={churchName} onChange={(e) => setChurchName(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-zinc-900" />
                  <input type="text" placeholder="DIRECCIÓN" value={churchAddress} onChange={(e) => setChurchAddress(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={churchDate} onChange={(e) => setChurchDate(e.target.value)} className="border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none" />
                    <input type="time" value={churchTime} onChange={(e) => setChurchTime(e.target.value)} className="border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none" />
                  </div>
                  <input type="url" placeholder="LINK GOOGLE MAPS" value={churchMapLink} onChange={(e) => setChurchMapLink(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-[10px] font-mono outline-none focus:border-zinc-900" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
              <h2 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest">
                <PartyPopper size={14} className="text-red-600" /> 03. Fiesta
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <input type="text" placeholder="NOMBRE DEL SALÓN" value={venueName} onChange={(e) => setVenueName(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-red-500" />
                  <input type="text" placeholder="DIRECCIÓN" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
                <div className="space-y-3">
                  <input type="url" placeholder="LINK GOOGLE MAPS" value={mapLink} onChange={(e) => setMapLink(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3 text-[10px] font-mono outline-none focus:border-red-500" />
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-4">
              <div className="bg-zinc-950 rounded-[2.5rem] p-8 text-white shadow-2xl border-l-8 border-red-600 relative overflow-hidden">
                <p className="text-[10px] font-black text-red-600 uppercase mb-4 tracking-widest">Live Preview</p>
                <h4 className="text-3xl font-black italic uppercase mb-6 leading-none tracking-tighter truncate">
                  {eventName || "TU NOMBRE"}
                </h4>
                
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {[
                    { l: 'D', v: timeLeft.days }, { l: 'H', v: timeLeft.hours }, 
                    { l: 'M', v: timeLeft.mins }, { l: 'S', v: timeLeft.secs }
                  ].map((u, i) => (
                    <div key={i} className="bg-white/5 rounded-xl py-2 text-center border border-white/10">
                      <span className="block text-xl font-black text-red-600 leading-none">{u.v.toString().padStart(2, "0")}</span>
                      <span className="text-[7px] font-black opacity-30 uppercase">{u.l}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-white/5 rounded-2xl text-zinc-500"><Church size={20}/></div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Ceremonia</p>
                      <p className="text-sm font-bold truncate leading-none">{churchName || "---"}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-red-600/20 rounded-2xl text-red-600"><PartyPopper size={20}/></div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Fiesta</p>
                      <p className="text-sm font-bold truncate leading-none">{venueName || "---"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] italic text-red-600">MendoClick PRO</p>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}