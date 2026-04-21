"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ImagePlus, Upload, Play, X, CheckCircle2, Loader2, FileAudio, Save, Eraser } from "lucide-react";
import { getGalleryConfig, updateGalleryConfig } from "@/actions/gallery.actions"; 
import Swal from "sweetalert2";

export default function GestionGaleria() {
  const [fotoPrincipal, setFotoPrincipal] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string>("Sin archivo");
  const [carrusel, setCarrusel] = useState<(string | null)[]>(Array(6).fill(null));
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const mainInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const carruselRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isGalleryEmpty = useMemo(() => {
    return !fotoPrincipal && !videoFile && !musicFile && carrusel.every(img => img === null);
  }, [fotoPrincipal, videoFile, musicFile, carrusel]);

  const isVideo = (url: string | null) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes("video/upload");
  };

  useEffect(() => {
    async function loadData() {
      try {
        const config = await getGalleryConfig();
        if (config) {
          setFotoPrincipal(config.heroImage || null);
          setVideoFile(config.videoUrl || null);
          setMusicFile(config.musicUrl || null);
          if (config.musicUrl) setMusicName("Archivo cargado ✨");
          
          const parsed = typeof config.carruselImages === 'string' 
            ? JSON.parse(config.carruselImages) 
            : config.carruselImages;

          if (Array.isArray(parsed)) {
            const completeCarrusel = [...parsed, ...Array(6).fill(null)].slice(0, 6);
            setCarrusel(completeCarrusel);
          }
        }
      } catch (e) { 
        console.error("Error cargando configuración:", e); 
      } finally {
        setIsInitialLoading(false);
      }
    }
    loadData();
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Error en el servidor");
    const data = await res.json();
    return data.url; 
  };

  const handlePublicar = async () => {
    setIsSaving(true);
    const carruselLimpio = carrusel.filter(img => img !== null);
    const result = await updateGalleryConfig({
      heroImage: fotoPrincipal, 
      videoUrl: videoFile,
      musicUrl: musicFile, 
      carruselImages: carruselLimpio
    });

    if (result.success) {
      Swal.fire({ title: "¡HECHO!", text: "Galería actualizada.", icon: "success", confirmButtonColor: "#dc2626" });
    } else {
      Swal.fire("Error", "No se pudo sincronizar.", "error");
    }
    setIsSaving(false);
  };

  const handleLimpiarTodo = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR TODO?',
      text: "Se borrarán todas las referencias.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'SÍ, BORRAR'
    });

    if (confirm.isConfirmed) {
      setIsSaving(true);
      const result = await updateGalleryConfig({
        heroImage: null, videoUrl: null, musicUrl: null, carruselImages: []
      });
      if (result.success) {
        setFotoPrincipal(null); setVideoFile(null); setMusicFile(null);
        setMusicName("Sin archivo"); setCarrusel(Array(6).fill(null));
        Swal.fire("Eliminado", "Galería limpia.", "success");
      }
      setIsSaving(false);
    }
  };

  if (isInitialLoading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-3 md:p-6 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Responsive */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b-2 border-zinc-200 pb-4">
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">Media <span className="text-red-600">Gallery</span></h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handleLimpiarTodo} 
              disabled={isGalleryEmpty || isSaving}
              className="flex-1 sm:flex-none justify-center bg-zinc-200 text-zinc-600 px-4 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-100 disabled:opacity-30 transition-all"
            >
              <Eraser size={16} /> LIMPIAR
            </button>
            <button 
              onClick={handlePublicar} 
              disabled={isSaving} 
              className="flex-1 sm:flex-none justify-center bg-black text-white px-5 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 shadow-md"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} PUBLICAR
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lado Izquierdo: Portada y Música */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
              <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">
                <ImagePlus size={16} className="text-red-600"/> 01. Portada Principal
              </p>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 border-2 border-dashed border-zinc-300">
                <div onClick={() => mainInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors">
                  {loading === "main" ? <Loader2 className="animate-spin text-red-600" /> : fotoPrincipal ? <img src={fotoPrincipal} className="w-full h-full object-cover" alt="Portada" /> : <Upload size={32} className="text-zinc-300" />}
                </div>
                {fotoPrincipal && <button onClick={() => setFotoPrincipal(null)} className="absolute top-3 right-3 p-2 bg-black/80 text-white rounded-full hover:bg-red-600"><X size={14}/></button>}
              </div>
              <input type="file" ref={mainInputRef} className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setLoading("main"); uploadFile(file).then(url => setFotoPrincipal(url)).finally(() => setLoading(null)); }
              }} />
            </section>
            
            <section className="bg-zinc-950 p-5 rounded-[2rem] text-white shadow-xl border-b-4 border-red-600">
              <p className="text-[11px] font-black uppercase text-red-500 mb-3 tracking-widest">02. Música de Fondo</p>
              <div onClick={() => musicInputRef.current?.click()} className="p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all flex items-center gap-3">
                {loading === "music" ? <Loader2 className="animate-spin text-red-500 mx-auto" size={20} /> : (
                  <>
                    <div className="p-2 bg-red-600/20 rounded-lg"><FileAudio size={20} className="text-red-500" /></div>
                    <span className="text-xs font-bold truncate flex-1 tracking-tight">{musicName}</span>
                    {musicFile && <X onClick={(e) => { e.stopPropagation(); setMusicFile(null); setMusicName("Sin archivo"); }} size={18} className="text-zinc-500 hover:text-white" />}
                  </>
                )}
              </div>
              <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setLoading("music"); setMusicName(file.name); uploadFile(file).then(url => setMusicFile(url)).finally(() => setLoading(null)); }
              }} />
            </section>
          </div>

          {/* Lado Derecho: Video y Carrusel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Video Hero */}
              <section className="bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
                <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">
                  <Play size={16} className="text-red-600"/> 03. Video Hero
                </p>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border-2 border-zinc-900">
                  <div onClick={() => videoInputRef.current?.click()} className="w-full h-full flex items-center justify-center cursor-pointer">
                    {loading === "video-main" ? <Loader2 className="animate-spin text-red-600" /> : videoFile ? <video src={videoFile} className="w-full h-full object-cover" autoPlay muted loop /> : <div className="text-center"><Play className="text-red-600/20 mx-auto mb-2" size={48} fill="currentColor" /><p className="text-[9px] text-zinc-500 font-bold uppercase">Subir Video</p></div>}
                  </div>
                  {videoFile && <button onClick={() => setVideoFile(null)} className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-red-600"><X size={14}/></button>}
                </div>
                <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { setLoading("video-main"); uploadFile(file).then(url => setVideoFile(url)).finally(() => setLoading(null)); }
                }} />
              </section>

              {/* Carrusel */}
              <section className="bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
                <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">
                  <Upload size={16} className="text-red-600"/> 04. Carrusel (6 Fotos)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {carrusel.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <div onClick={() => carruselRefs.current[index]?.click()} className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all flex items-center justify-center cursor-pointer ${url ? 'border-zinc-200 shadow-sm' : 'border-dashed border-zinc-300 bg-zinc-50 hover:bg-white hover:border-red-400'}`}>
                        {loading === `carrusel-${index}` ? <Loader2 className="animate-spin text-red-600" size={18} /> : url ? (
                          isVideo(url) ? <video src={url} className="w-full h-full object-cover" muted loop autoPlay /> : <img src={url} className="w-full h-full object-cover" alt={`C-${index}`} />
                        ) : <Upload size={18} className="text-zinc-300" />}
                      </div>
                      {url && <button onClick={(e) => { e.stopPropagation(); setCarrusel(prev => { const n = [...prev]; n[index] = null; return n; }); }} className="absolute -top-1.5 -right-1.5 p-1.5 bg-black text-white rounded-full hover:bg-red-600 z-10 shadow-lg"><X size={10}/></button>}
                      <input type="file" ref={el => { carruselRefs.current[index] = el }} className="hidden" accept="image/*,video/*" onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           setLoading(`carrusel-${index}`);
                           uploadFile(file).then(url => { setCarrusel(prev => { const n = [...prev]; n[index] = url; return n; }); }).finally(() => setLoading(null));
                         }
                      }} />
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}