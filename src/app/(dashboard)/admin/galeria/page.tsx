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
          if (config.carruselImages) {
            const parsed = JSON.parse(config.carruselImages);
            if (Array.isArray(parsed)) {
              const completeCarrusel = [...parsed, ...Array(6).fill(null)].slice(0, 6);
              setCarrusel(completeCarrusel);
            }
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
      carruselImages: JSON.stringify(carruselLimpio)
    });

    if (result.success) {
      Swal.fire({ title: "¡HECHO!", text: "Galería actualizada con éxito.", icon: "success", confirmButtonColor: "#dc2626" });
    } else {
      Swal.fire("Error", "No se pudo sincronizar.", "error");
    }
    setIsSaving(false);
  };

  const handleLimpiarTodo = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR TODO?',
      text: "Se borrarán todas las referencias multimedia.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'SÍ, BORRAR TODO'
    });

    if (confirm.isConfirmed) {
      setIsSaving(true);
      const result = await updateGalleryConfig({
        heroImage: null, videoUrl: null, musicUrl: null, carruselImages: "[]"
      });
      
      if (result.success) {
        setFotoPrincipal(null); setVideoFile(null); setMusicFile(null);
        setMusicName("Sin archivo"); setCarrusel(Array(6).fill(null));
        Swal.fire("Eliminado", "La galería se ha limpiado.", "success");
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
    <div className="min-h-screen bg-zinc-50 p-2 md:p-4 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-4 border-b-2 border-zinc-200 pb-2">
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Media <span className="text-red-600">Gallery</span></h1>
          <div className="flex gap-2">
            <button 
              onClick={handleLimpiarTodo} 
              disabled={isGalleryEmpty || isSaving}
              className="bg-zinc-200 text-zinc-600 px-4 py-2 rounded-lg font-bold text-[9px] tracking-widest flex items-center gap-2 hover:bg-red-100 disabled:opacity-30 transition-all"
            >
              <Eraser size={14} /> LIMPIAR TODO
            </button>
            <button 
              onClick={handlePublicar} 
              disabled={isSaving} 
              className="bg-black text-white px-5 py-2 rounded-lg font-bold text-[9px] tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 shadow-md"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} PUBLICAR CAMBIOS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* COLUMNA IZQUIERDA: PORTADA Y MÚSICA */}
          <div className="lg:col-span-3 space-y-4">
            <section className="bg-white p-4 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest flex items-center gap-2">
                <ImagePlus size={14} className="text-red-600"/> 01. Portada
              </p>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 border-2 border-dashed border-zinc-400">
                <div onClick={() => mainInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors">
                  {loading === "main" ? <Loader2 className="animate-spin text-red-600" /> : fotoPrincipal ? <img src={fotoPrincipal} className="w-full h-full object-cover" alt="Portada" /> : <Upload size={28} className="text-zinc-400" />}
                </div>
                {fotoPrincipal && <button onClick={() => setFotoPrincipal(null)} className="absolute top-2 right-2 p-1.5 bg-black text-white rounded-full hover:bg-red-600 transition-colors"><X size={12}/></button>}
              </div>
              <input type="file" ref={mainInputRef} className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setLoading("main"); uploadFile(file).then(url => setFotoPrincipal(url)).catch(() => Swal.fire("Error", "No se pudo subir la imagen", "error")).finally(() => setLoading(null)); }
              }} />
            </section>
            
            <section className="bg-zinc-950 p-4 rounded-2xl text-white shadow-xl border-b-4 border-red-600">
              <p className="text-[10px] font-black uppercase text-red-500 mb-2 tracking-widest">02. Música</p>
              <div onClick={() => musicInputRef.current?.click()} className="p-3 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition-all flex items-center gap-3">
                {loading === "music" ? <Loader2 className="animate-spin text-red-500 mx-auto" size={16} /> : (
                  <>
                    <FileAudio size={18} className={musicFile ? "text-red-600" : "text-zinc-600"} />
                    <span className="text-xs font-bold truncate flex-1">{musicName}</span>
                    {musicFile && <X onClick={(e) => { e.stopPropagation(); setMusicFile(null); setMusicName("Sin archivo"); }} size={16} className="text-zinc-600 hover:text-red-500" />}
                  </>
                )}
              </div>
              <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setLoading("music"); setMusicName(file.name); uploadFile(file).then(url => setMusicFile(url)).catch(() => setMusicName("Error al subir")).finally(() => setLoading(null)); }
              }} />
            </section>
          </div>

          {/* COLUMNA DERECHA: VIDEO Y CARRUSEL */}
          <div className="lg:col-span-9 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <section className="bg-white p-4 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest flex items-center gap-2">
                  <Play size={14} className="text-red-600"/> 03. Video Hero
                </p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border-2 border-zinc-800">
                  <div onClick={() => videoInputRef.current?.click()} className="w-full h-full flex items-center justify-center cursor-pointer">
                    {loading === "video-main" ? <Loader2 className="animate-spin text-red-600" /> : videoFile ? <video src={videoFile} className="w-full h-full object-cover" autoPlay muted loop /> : <Play className="text-red-600/40" size={40} fill="currentColor" />}
                  </div>
                  {videoFile && <button onClick={() => setVideoFile(null)} className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-red-600 transition-all"><X size={14}/></button>}
                </div>
                <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { setLoading("video-main"); uploadFile(file).then(url => setVideoFile(url)).catch(() => Swal.fire("Error", "No se pudo subir el video", "error")).finally(() => setLoading(null)); }
                }} />
              </section>

              <section className="bg-white p-4 rounded-2xl border-2 border-zinc-300 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest flex items-center gap-2">
                  <Upload size={14} className="text-red-600"/> 04. Carrusel de Fotos
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {carrusel.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <div onClick={() => carruselRefs.current[index]?.click()} className={`w-full h-full rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center cursor-pointer ${url ? 'border-zinc-300 shadow-md' : 'border-dashed border-zinc-400 bg-zinc-50 hover:bg-white hover:border-red-400'}`}>
                        {loading === `carrusel-${index}` ? <Loader2 className="animate-spin text-red-600" size={16} /> : url ? (
                          isVideo(url) ? <video src={url} className="w-full h-full object-cover" muted loop autoPlay /> : <img src={url} className="w-full h-full object-cover" alt={`Carrusel ${index}`} />
                        ) : <Upload size={14} className="text-zinc-300" />}
                      </div>
                      {url && <button onClick={(e) => { e.stopPropagation(); setCarrusel(prev => { const n = [...prev]; n[index] = null; return n; }); }} className="absolute -top-1 -right-1 p-1 bg-black text-white rounded-full hover:bg-red-600 transition-all z-10"><X size={8}/></button>}
                      <input type="file" ref={el => { carruselRefs.current[index] = el }} className="hidden" accept="image/*,video/*" onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           setLoading(`carrusel-${index}`);
                           uploadFile(file).then(url => { setCarrusel(prev => { const n = [...prev]; n[index] = url; return n; }); }).catch(() => Swal.fire("Error", "Subida fallida", "error")).finally(() => setLoading(null));
                         }
                      }} />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="bg-zinc-900 p-3 rounded-xl border-l-4 border-red-600 flex justify-between items-center shadow-lg">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">MendoClick Multimedia <span className="text-red-600">v2.1</span></p>
              <CheckCircle2 size={14} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}