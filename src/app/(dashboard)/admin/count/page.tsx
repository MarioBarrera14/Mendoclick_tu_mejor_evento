"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Calendar, Clock, User, MapPin, Link as LinkIcon, Home, Loader2, Trash2 } from "lucide-react";
// Importación de tus Server Actions
import { getEventConfig, updateEventConfig } from "@/app/api/admin/count/route";

// --- IMPORTACIÓN DE SWEETALERT2 ---
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface TimeLeft {
  days: number; hours: number; mins: number; secs: number;
}

export default function CountConfigPage() {
  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Estados de los campos (Inicializados vacíos para recibir la data de la DB)
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventName, setEventName] = useState<string>(""); 
  const [venueName, setVenueName] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [mapLink, setMapLink] = useState<string>("");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Utilidad de Alerta Estilizada
  const showNotification = (title: string, text: string, icon: 'success' | 'error') => {
    MySwal.fire({
      title: <span className="font-serif italic text-2xl">{title}</span>,
      html: <p className="text-zinc-500 text-sm">{text}</p>,
      icon: icon,
      iconColor: icon === 'success' ? '#10b981' : '#ef4444',
      confirmButtonText: 'ENTENDIDO',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-[2rem] bg-white border border-zinc-100 shadow-2xl',
        confirmButton: 'bg-zinc-900 text-white px-8 py-3 rounded-full font-bold text-xs hover:scale-105 transition-all outline-none mt-4',
      }
    });
  };

  // --- FUNCIÓN PARA LIMPIAR TODO ---
  const handleClear = () => {
    MySwal.fire({
      title: <span className="font-serif italic text-2xl">¿Limpiar campos?</span>,
      text: "Se borrarán los textos escritos en el formulario.",
      icon: 'warning',
      iconColor: '#f59e0b',
      showCancelButton: true,
      confirmButtonText: 'SÍ, LIMPIAR',
      cancelButtonText: 'CANCELAR',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-[2rem] bg-white border border-zinc-100 shadow-2xl',
        confirmButton: 'bg-red-500 text-white px-8 py-3 rounded-full font-bold text-xs hover:scale-105 transition-all outline-none mx-2',
        cancelButton: 'bg-zinc-200 text-zinc-600 px-8 py-3 rounded-full font-bold text-xs hover:scale-105 transition-all outline-none mx-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setEventName("");
        setEventDate("");
        setEventTime("");
        setVenueName("");
        setVenueAddress("");
        setMapLink("");
      }
    });
  };

  // 1. CARGAR DATOS DE LA BASE DE DATOS AL MONTAR
  useEffect(() => {
    async function fetchData() {
      try {
        const config = await getEventConfig();
        if (config) {
          setEventDate(config.eventDate || "2026-12-19");
          setEventTime(config.eventTime || "21:00");
          setEventName(config.eventName || "Luz Jazmín"); 
          setVenueName(config.venueName || "Howard Johnson");
          setVenueAddress(config.venueAddress || "RP11 km 400, Cariló");
          setMapLink(config.mapLink || "");
        }
      } catch (error) {
        console.error("Error cargando configuración:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. LÓGICA DEL CONTADOR
  useEffect(() => {
    if (!eventDate || !eventTime) return;

    const timer = setInterval(() => {
      const target = new Date(`${eventDate}T${eventTime}:00`);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

  // 3. GUARDAR EN LA BASE DE DATOS
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateEventConfig({
        eventName,
        eventDate,
        eventTime,
        venueName,
        venueAddress,
        mapLink,
      });

      if (result.success) {
        showNotification("¡Éxito!", "Configuración guardada en la base de datos 🎉", "success");
      } else {
        showNotification("¡Ups!", "No se pudo guardar la configuración.", "error");
      }
    } catch (error) {
      showNotification("Error", "Ocurrió un fallo en la conexión.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-serif italic font-bold text-zinc-900 dark:text-white">Panel de Control</h1>
        <p className="text-zinc-500 text-sm">Personaliza los detalles de tu invitación</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-zinc-100 dark:border-slate-900 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <User className="h-3 w-3" /> Nombre de la Agasajada
              </label>
              <input 
                type="text" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <Calendar className="h-3 w-3" /> Fecha
              </label>
              <input 
                type="date" 
                value={eventDate} 
                onChange={(e) => setEventDate(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <Clock className="h-3 w-3" /> Hora
              </label>
              <input 
                type="time" 
                value={eventTime} 
                onChange={(e) => setEventTime(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <Home className="h-3 w-3" /> Nombre del Salón
              </label>
              <input 
                type="text" 
                value={venueName} 
                onChange={(e) => setVenueName(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <MapPin className="h-3 w-3" /> Dirección (Texto)
              </label>
              <input 
                type="text" 
                value={venueAddress} 
                onChange={(e) => setVenueAddress(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                <LinkIcon className="h-3 w-3" /> Link de Google Maps
              </label>
              <input 
                type="url" 
                placeholder="https://goo.gl/maps/..." 
                value={mapLink} 
                onChange={(e) => setMapLink(e.target.value)} 
                className="w-full bg-zinc-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-zinc-900 dark:text-white outline-none font-medium focus:ring-2 focus:ring-zinc-200" 
              />
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex-[3] bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {isSaving ? "GUARDANDO..." : "GUARDAR EN BASE DE DATOS"}
            </button>

            <button 
              onClick={handleClear}
              title="Limpiar campos"
              className="flex-1 bg-zinc-100 dark:bg-slate-800 text-zinc-400 hover:text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center transition-all hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Vista Previa */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-xl flex flex-col items-center text-center space-y-6">
             <div className="space-y-1">
                <h2 className="text-4xl font-serif italic text-zinc-800">{venueName || "Nombre del Salón"}</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold">LA CELEBRACIÓN</p>
             </div>
             <div className="flex items-center gap-4 text-4xl font-serif italic font-bold text-zinc-900">
                {eventTime || "00:00"} HS
             </div>
             <p className="text-zinc-500 font-medium tracking-wide">{venueAddress || "Dirección del evento"}</p>
          </div>

          <div className="bg-zinc-900 text-white p-8 rounded-3xl flex flex-col items-center gap-6">
             <div className="grid grid-cols-4 gap-6 w-full text-center">
                {[
                  { label: 'Días', value: timeLeft.days }, 
                  { label: 'Hrs', value: timeLeft.hours }, 
                  { label: 'Min', value: timeLeft.mins }, 
                  { label: 'Seg', value: timeLeft.secs }
                ].map((unit, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-serif italic font-bold">{unit.value}</span>
                    <span className="text-[8px] uppercase tracking-tighter opacity-50">{unit.label}</span>
                  </div>
                ))}
             </div>
             <div className="w-full border-t border-white/10 pt-4 text-center">
                <p className="text-xl font-serif italic">{eventName || "Nombre"}</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}