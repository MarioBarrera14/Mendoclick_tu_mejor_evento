"use client";

import { useState, useEffect } from "react";
import { 
  Save, Heart, Loader2, MapPin, Clock, 
  Church, PartyPopper, Trash2, Hourglass, Globe
} from "lucide-react";
import { getLogisticaConfig, updateLogisticaConfig } from "@/actions/logistica.actions"; 
import Swal from 'sweetalert2';

export default function CountConfigPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- ESTADOS ---
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");  
  const [isWedding, setIsWedding] = useState(false);
  
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

  useEffect(() => {
    async function fetchData() {
      try {
        const config = await getLogisticaConfig();
        if (config) {
          const bodaTemplates = ["DEMO4", "DEMO5", "DEMO6"];
          const userTemplate = (config as any).user?.templateId || "";
          const rawName = config.eventName || "";
          
          const checkWedding = bodaTemplates.includes(userTemplate) || rawName.includes("&");
          setIsWedding(checkWedding);

          if (rawName.includes("&")) {
            const parts = rawName.split("&");
            setFirstName(parts[0]?.trim() || "");
            setLastName(parts[1]?.trim() || "");
          } else {
            setFirstName(rawName);
            setLastName("");
          }

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
        console.error("Error al cargar logística:", error); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const fullNameForDB = isWedding && lastName.trim() ? `${firstName.trim()} & ${lastName.trim()}` : firstName.trim();
    try {
      const res = await updateLogisticaConfig({
        eventName: fullNameForDB, eventDate, eventTime, venueName, venueAddress, mapLink,
        churchName, churchAddress, churchMapLink, churchDate, churchTime
      });
      if (res.success) {
        Swal.fire({ 
          title: "¡PUBLICADO!", 
          text: "Cambios en la nube", 
          icon: "success", 
          confirmButtonColor: "#000", 
          customClass: { popup: 'rounded-[2rem]' } 
        });
      }
    } catch (e) { 
      Swal.fire("Error", "No se pudo sincronizar", "error"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const handleClear = () => {
    Swal.fire({
      title: '¿RESETEAR?',
      text: "Se borrarán todos los datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'BORRAR',
      confirmButtonColor: '#dc2626',
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSaving(true);
        try {
          setFirstName(""); setLastName(""); setEventDate(""); setEventTime("");
          setVenueName(""); setVenueAddress(""); setMapLink("");
          setChurchName(""); setChurchAddress(""); setChurchMapLink("");
          setChurchDate(""); setChurchTime("");
          await updateLogisticaConfig({
            eventName: "", eventDate: "", eventTime: "", venueName: "", venueAddress: "", mapLink: "",
            churchName: "", churchAddress: "", churchMapLink: "", churchDate: "", churchTime: ""
          });
          Swal.fire("Limpio", "Reseteado", "success");
        } finally { setIsSaving(false); }
      }
    });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-50">
      <Loader2 className="animate-spin text-red-600 mb-2" size={30} />
      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 italic">MendoClick Studio</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-3 md:p-8 font-sans text-black pb-24">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER RESPONSIVE */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-l-4 border-red-600 pl-4 md:pl-6">
          <div>
            <h1 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
              Configuración de <span className="text-red-600">Logística</span>
            </h1>
            <p className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Sincronizado con VPS</p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={handleClear} disabled={isSaving} className="flex-1 sm:flex-none flex justify-center p-3 rounded-2xl bg-white border border-zinc-200 text-zinc-400">
              <Trash2 size={20} />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex-[3] sm:flex-none bg-zinc-950 text-white px-5 py-3 rounded-2xl font-black text-[10px] md:text-[11px] uppercase flex items-center justify-center gap-2 shadow-xl">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} GUARDAR
            </button>
          </div>
        </header>

        <div className="space-y-4 md:space-y-6">
          
          {/* SECCIÓN 0: CUENTA REGRESIVA */}
          <section className="bg-zinc-900 text-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-zinc-800">
            <div className="absolute -top-4 -right-4 p-6 opacity-10 hidden sm:block">
              <Hourglass size={80} />
            </div>
            <h2 className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-6">
               <Clock size={14}/> 00. Cuenta Regresiva
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-zinc-500 ml-1">Fecha Evento</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl md:rounded-2xl p-4 text-xs md:text-sm font-black text-white outline-none focus:border-red-600 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-zinc-500 ml-1">Hora Evento</label>
                <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl md:rounded-2xl p-4 text-xs md:text-sm font-black text-white outline-none focus:border-red-600 transition-all" />
              </div>
            </div>
          </section>

          {/* SECCIÓN 1: PROTAGONISTAS */}
          <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-200 shadow-sm relative overflow-hidden">
            <h2 className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
               <Heart size={14} className="text-red-600"/> 01. Protagonistas
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-full">
                <label className="text-[8px] md:text-[9px] font-black text-zinc-400 uppercase mb-2 block ml-1">{isWedding ? "Persona 1" : "Nombre"}</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value.toUpperCase())} className="w-full bg-zinc-50 border border-zinc-200 focus:border-red-600 rounded-xl md:rounded-2xl p-4 text-lg md:text-xl font-black uppercase text-center outline-none transition-all shadow-sm" placeholder="NOMBRE" />
              </div>

              {isWedding && (
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-black text-zinc-200 italic">&</span>
                </div>
              )}

              {isWedding && (
                <div className="w-full">
                  <label className="text-[8px] md:text-[9px] font-black text-zinc-400 uppercase mb-2 block ml-1">Persona 2</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value.toUpperCase())} className="w-full bg-zinc-50 border border-zinc-200 focus:border-red-600 rounded-xl md:rounded-2xl p-4 text-lg md:text-xl font-black uppercase text-center outline-none transition-all shadow-sm" placeholder="NOMBRE" />
                </div>
              )}
            </div>
          </section>

          {/* SECCIÓN 2: CEREMONIA */}
          {isWedding && (
            <section className="bg-white p-5 md:p-8 rounded-[2rem] border border-zinc-200 shadow-sm">
              <h2 className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-[0.3em]">
                <Church size={16} className="text-zinc-900" /> 02. Ceremonia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <input type="text" placeholder="IGLESIA / LUGAR" value={churchName} onChange={(e) => setChurchName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-[11px] font-black outline-none focus:border-zinc-900" />
                  <input type="text" placeholder="DIRECCIÓN" value={churchAddress} onChange={(e) => setChurchAddress(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-[11px] font-black outline-none focus:border-zinc-900" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={churchDate} onChange={(e) => setChurchDate(e.target.value)} className="w-full border border-zinc-200 rounded-xl p-4 text-[10px] font-black bg-zinc-50" />
                    <input type="time" value={churchTime} onChange={(e) => setChurchTime(e.target.value)} className="w-full border border-zinc-200 rounded-xl p-4 text-[10px] font-black bg-zinc-50" />
                  </div>
                  <div className="relative">
                    <Globe size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="url" placeholder="LINK GOOGLE MAPS" value={churchMapLink} onChange={(e) => setChurchMapLink(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 pl-10 text-[9px] font-mono outline-none focus:border-zinc-900" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN 3: FIESTA */}
          <section className="bg-white p-5 md:p-8 rounded-[2rem] border border-zinc-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-[0.3em]">
              <PartyPopper size={16} className="text-red-600" /> {isWedding ? "03. Fiesta" : "02. Fiesta"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4">
                <input type="text" placeholder="NOMBRE DEL SALÓN" value={venueName} onChange={(e) => setVenueName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-[11px] font-black outline-none focus:border-red-600" />
                <input type="text" placeholder="DIRECCIÓN DEL SALÓN" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-[11px] font-black outline-none focus:border-red-600" />
              </div>
              <div className="space-y-3">
                 <div className="relative">
                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />
                    <input type="url" placeholder="LINK GOOGLE MAPS" value={mapLink} onChange={(e) => setMapLink(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 pl-10 text-[9px] font-mono outline-none focus:border-red-600" />
                  </div>
                  <p className="text-[7px] md:text-[8px] text-zinc-400 px-2 italic uppercase leading-tight">Copia el link completo desde la app de Google Maps.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}