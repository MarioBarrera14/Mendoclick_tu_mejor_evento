"use client";

import { useState, useEffect } from "react";
import { 
  Save, Heart, Loader2, MapPin, Calendar, Clock, Church, PartyPopper, Trash2 
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
      } catch (error) { console.error(error); } finally { setLoading(false); }
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
        Swal.fire({ title: "¡Hecho!", text: "Logística actualizada", icon: "success", confirmButtonColor: "#dc2626", customClass: { popup: 'rounded-2xl' } });
      }
    } catch (e) { Swal.fire("Error", "No se pudo guardar", "error"); } finally { setIsSaving(false); }
  };

  const handleClear = () => {
    Swal.fire({
      title: '¿BORRAR TODO?',
      text: "Se vaciará el formulario y la base de datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SÍ, BORRAR',
      confirmButtonColor: '#dc2626',
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
          Swal.fire("Eliminado", "Base de datos limpia.", "success");
        } catch (e) { Swal.fire("Error", "Fallo al borrar", "error"); } finally { setIsSaving(false); }
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
    /* CAMBIO: h-fit en lugar de min-h-screen y pb-4 en lugar de pb-10 */
    <div className="h-fit bg-zinc-50 p-3 md:p-6 font-sans text-black pb-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER COMPACTO */}
        <header className="flex flex-row justify-between items-center mb-6 border-b pb-4 border-zinc-200">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-none">
              {isWedding ? "Wedding" : "Event"} <span className="text-red-600">Logistics</span>
            </h1>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleClear} disabled={isSaving} className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-600 transition-all shadow-sm">
              <Trash2 size={18} />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="bg-black text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} PUBLICAR
            </button>
          </div>
        </header>

        <div className="space-y-4">
          
          {/* SECCIÓN NOMBRES */}
          <section className="bg-white p-5 md:p-8 rounded-3xl border border-zinc-200 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${isWedding ? 'bg-red-600' : 'bg-rose-400'}`} />
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full">
                <label className="text-[8px] font-black text-zinc-400 uppercase mb-1 block ml-1">{isWedding ? "Novia / Novio 1" : "Protagonista"}</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value.toUpperCase())} className="w-full bg-zinc-50 border border-zinc-200 focus:border-red-600 rounded-xl p-3 text-lg font-black uppercase text-center outline-none transition-all" placeholder="NOMBRE" />
              </div>

              {isWedding && (
                <div className="flex flex-col items-center">
                  <Heart size={30} className="text-red-600 fill-red-600 animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-300">&</span>
                </div>
              )}

              {isWedding && (
                <div className="w-full">
                  <label className="text-[8px] font-black text-zinc-400 uppercase mb-1 block ml-1">Novio / Novio 2</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value.toUpperCase())} className="w-full bg-zinc-50 border border-zinc-200 focus:border-red-600 rounded-xl p-3 text-lg font-black uppercase text-center outline-none transition-all" placeholder="NOMBRE" />
                </div>
              )}
            </div>
          </section>

          {/* CEREMONIA E IGLESIA */}
          {isWedding && (
            <section className="bg-white p-5 rounded-2xl border border-zinc-200">
              <h2 className="flex items-center gap-2 text-[9px] font-black uppercase text-zinc-400 mb-4 tracking-widest">
                <Church size={14} className="text-zinc-900" /> 02. Ceremonia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <input type="text" placeholder="LUGAR" value={churchName} onChange={(e) => setChurchName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-xs font-bold outline-none" />
                  <input type="text" placeholder="DIRECCIÓN" value={churchAddress} onChange={(e) => setChurchAddress(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-xs font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={churchDate} onChange={(e) => setChurchDate(e.target.value)} className="w-full border border-zinc-100 rounded-lg p-2.5 text-xs font-bold" />
                    <input type="time" value={churchTime} onChange={(e) => setChurchTime(e.target.value)} className="w-full border border-zinc-100 rounded-lg p-2.5 text-xs font-bold" />
                  </div>
                  <input type="url" placeholder="MAPS URL" value={churchMapLink} onChange={(e) => setChurchMapLink(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-[10px] font-mono" />
                </div>
              </div>
            </section>
          )}

          {/* FIESTA / SALÓN */}
          <section className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[9px] font-black uppercase text-zinc-400 mb-4 tracking-widest">
              <PartyPopper size={14} className="text-red-600" /> {isWedding ? "03. Fiesta" : "02. Fiesta"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <input type="text" placeholder="SALÓN" value={venueName} onChange={(e) => setVenueName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-xs font-bold outline-none focus:border-red-500" />
                <input type="text" placeholder="DIRECCIÓN" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-xs font-bold outline-none" />
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border border-zinc-100 rounded-lg p-2.5 text-xs font-bold" />
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border border-zinc-100 rounded-lg p-2.5 text-xs font-bold" />
                </div>
                <input type="url" placeholder="MAPS URL" value={mapLink} onChange={(e) => setMapLink(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-[10px] font-mono focus:border-red-500" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}