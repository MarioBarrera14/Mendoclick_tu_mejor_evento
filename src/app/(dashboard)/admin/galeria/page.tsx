"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ImagePlus, Upload, Play, X, Loader2, FileAudio, Save, Eraser, Lock } from "lucide-react";
import { getGalleryConfig, updateGalleryConfig } from "@/actions/gallery.actions"; 
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";

export default function GestionGaleria() {
  const { data: session } = useSession();
  const planLevel = (session?.user as any)?.planLevel || "CLASSIC";

  const [fotoPrincipal, setFotoPrincipal] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string>("Sin archivo");
  const [carrusel, setCarrusel] = useState<(string | null)[]>(Array(6).fill(null));
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // ===========================================================
  // PERMISOS ACTUALIZADOS: PREMIUM Y DELUXE TIENEN TODO LIBRE
  // ===========================================================
  const hasFullAccess = planLevel === "PREMIUM" || planLevel === "DELUXE";
  
  const canUploadMusic = hasFullAccess;
  const canUploadCarrusel = hasFullAccess;
  const canUploadVideo = hasFullAccess; // <--- AHORA TAMBIÉN PREMIUM

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

  const validateAndUpload = async (file: File, type: 'image' | 'video' | 'audio') => {
    if (type === 'image' && file.type === 'image/gif') {
      Swal.fire("Formato Incorrecto", "No se permiten GIFs.", "warning");
      return null;
    }
    const maxSize = type === 'video' ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire("Archivo muy pesado", `El límite es de ${maxSize / (1024 * 1024)}MB.`, "error");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      return data.url;
    } catch (error) {
      return null;
    }
  };

  const handlePublicar = async () => {
    setIsSaving(true);
    const carruselLimpio = carrusel.filter(img => img !== null);
    const result = await updateGalleryConfig({
      heroImage: fotoPrincipal, 
      videoUrl: canUploadVideo ? videoFile : null,
      musicUrl: canUploadMusic ? musicFile : null,
      carruselImages: canUploadCarrusel ? carruselLimpio : []
    });

    if (result.success) {
      Swal.fire({ title: "¡ACTUALIZADO!", text: "Los cambios ya están en tu invitación.", icon: "success", confirmButtonColor: "#dc2626" });
    }
    setIsSaving(false);
  };

  const handleLimpiarTodo = async () => {
    const confirm = await Swal.fire({
      title: '¿VACIAR GALERÍA?',
      text: "Se borrarán todas las fotos, videos y música configurados.",
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
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b-2 border-zinc-200 pb-4">
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">Media <span className="text-red-600">Gallery</span></h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handleLimpiarTodo} 
              disabled={isGalleryEmpty || isSaving}
              className="flex-1 sm:flex-none justify-center bg-zinc-200 text-zinc-600 px-4 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-100 disabled:opacity-30 transition-all shadow-sm"
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
          <div className="lg:col-span-4 space-y-6">
            {/* 01. PORTADA */}
            <section className="bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
              <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">
                <ImagePlus size={16} className="text-red-600"/> 01. Portada Principal
              </p>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 border-2 border-dashed border-zinc-300 cursor-pointer group" onClick={() => mainInputRef.current?.click()}>
                {loading === "main" ? <Loader2 className="animate-spin mx-auto mt-20 text-red-600" /> : fotoPrincipal ? <img src={fotoPrincipal} className="w-full h-full object-cover" alt="Hero" /> : <div className="flex flex-col items-center justify-center h-full gap-2"><Upload size={32} className="text-zinc-300 group-hover:text-red-600 transition-colors" /><span className="text-[10px] text-zinc-400 font-bold uppercase">Subir Imagen</span></div>}
                <input type="file" ref={mainInputRef} className="hidden" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) { setLoading("main"); const url = await validateAndUpload(file, 'image'); if (url) setFotoPrincipal(url); setLoading(null); }
                }} />
              </div>
              {fotoPrincipal && <button onClick={() => setFotoPrincipal(null)} className="absolute top-16 right-8 p-2 bg-black/80 text-white rounded-full hover:bg-red-600 shadow-xl transition-all"><X size={14}/></button>}
            </section>

            {/* 02. MÚSICA */}
            <section className={cn("bg-zinc-950 p-5 rounded-[2rem] text-white shadow-xl relative", !canUploadMusic && "opacity-60")}>
              <p className="text-[11px] font-black uppercase text-red-500 mb-3 tracking-widest">02. Música de Fondo</p>
              <div onClick={() => canUploadMusic && musicInputRef.current?.click()} className={cn("p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3", canUploadMusic ? "cursor-pointer hover:bg-white/10" : "cursor-not-allowed")}>
                {!canUploadMusic ? <div className="flex gap-2 text-zinc-500 text-[10px] uppercase font-bold"><Lock size={14}/> Bloqueado en Classic</div> : <><FileAudio size={20} className="text-red-500" /> <span className="text-xs truncate font-medium">{musicName}</span></>}
              </div>
              <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" onChange={async (e) => {
                 const file = e.target.files?.[0];
                 if (file && canUploadMusic) { setLoading("music"); const url = await validateAndUpload(file, 'audio'); if (url) { setMusicFile(url); setMusicName(file.name); } setLoading(null); }
              }} />
            </section>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 03. VIDEO HERO */}
            <section className={cn("bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative", !canUploadVideo && "bg-zinc-100")}>
               <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">03. Video Hero {!canUploadVideo && <Lock size={12}/>}</p>
               <div onClick={() => canUploadVideo && videoInputRef.current?.click()} className={cn("relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center", canUploadVideo ? "cursor-pointer" : "cursor-not-allowed")}>
                  {!canUploadVideo ? <div className="text-center text-white/40 text-[8px] font-bold uppercase tracking-widest"><Lock className="mx-auto mb-2" size={24}/> Solo Premium / Deluxe</div> : videoFile ? <video src={videoFile} className="w-full h-full object-cover" autoPlay muted loop /> : <Play size={32} className="text-white/20"/>}
               </div>
               <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={async (e) => {
                 const file = e.target.files?.[0];
                 if (file && canUploadVideo) { setLoading("video-main"); const url = await validateAndUpload(file, 'video'); if (url) setVideoFile(url); setLoading(null); }
               }} />
            </section>

            {/* 04. CARRUSEL */}
            <section className={cn("bg-white p-5 rounded-[2rem] border-2 border-zinc-200 shadow-sm relative", !canUploadCarrusel && "bg-zinc-100")}>
               <p className="text-[11px] font-black uppercase text-zinc-500 mb-3 tracking-widest flex items-center gap-2">04. Galería {!canUploadCarrusel && <Lock size={12}/>}</p>
               <div className="grid grid-cols-3 gap-2">
                  {carrusel.map((url, i) => (
                    <div key={i} className="relative aspect-square">
                      <div 
                        onClick={() => canUploadCarrusel && carruselRefs.current[i]?.click()} 
                        className={cn("w-full h-full rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all", !canUploadCarrusel ? "bg-zinc-200 cursor-not-allowed" : "border-dashed border-zinc-300 cursor-pointer bg-zinc-50 hover:bg-white")}
                      >
                        {!canUploadCarrusel ? <Lock size={12} className="text-zinc-400"/> : loading === `carrusel-${i}` ? <Loader2 size={14} className="animate-spin text-red-600"/> : url ? (
                           isVideo(url) ? <video src={url} className="w-full h-full object-cover" muted autoPlay loop /> : <img src={url} className="w-full h-full object-cover" alt="item" />
                        ) : <Upload size={14} className="text-zinc-300" />}
                      </div>
                      <input 
                        type="file" 
                        ref={el => { if (el) carruselRefs.current[i] = el }} 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file && canUploadCarrusel) { 
                            setLoading(`carrusel-${i}`);
                            const url = await validateAndUpload(file, file.type.startsWith('video') ? 'video' : 'image'); 
                            if (url) setCarrusel(prev => { const n = [...prev]; n[i] = url; return n; }); 
                            setLoading(null);
                          }
                        }} 
                      />
                      {url && canUploadCarrusel && <button onClick={(e) => { e.stopPropagation(); setCarrusel(prev => { const n = [...prev]; n[i] = null; return n; }); }} className="absolute -top-1 -right-1 p-1 bg-black text-white rounded-full hover:bg-red-600 transition-colors z-10"><X size={10}/></button>}
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}