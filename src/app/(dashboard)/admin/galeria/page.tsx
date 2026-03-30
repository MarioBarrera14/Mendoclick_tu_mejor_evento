"use client";

import { useState, useRef, useEffect } from "react";
import { ImagePlus, Upload, Play, X, CheckCircle2, Loader2, Eraser, FileAudio } from "lucide-react";
import { getEventConfig, updateEventDetails } from "@/app/api/admin/galeria/route";
import Swal from "sweetalert2";

export default function GestionGaleria() {
  const [fotoPrincipal, setFotoPrincipal] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string>("Sin archivo seleccionado");
  const [carrusel, setCarrusel] = useState<(string | null)[]>([null, null, null, null, null]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const mainInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  // Inicializamos el array de refs
  const carruselRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isVideo = (url: string | null) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes("video/upload");
  };

  useEffect(() => {
    async function loadData() {
      const config = await getEventConfig();
      if (config) {
        setFotoPrincipal(config.heroImage);
        setVideoFile(config.videoUrl);
        setMusicFile(config.musicUrl);
        if (config.musicUrl) setMusicName("Archivo guardado en la nube");
        if (config.carruselImages) {
          try {
            const parsed = JSON.parse(config.carruselImages);
            if (Array.isArray(parsed)) {
              // Rellenamos con null si el array de la DB tiene menos de 5 elementos
              const completeCarrusel = [...parsed, ...Array(5).fill(null)].slice(0, 5);
              setCarrusel(completeCarrusel);
            }
          } catch (e) { console.error("Error carrusel", e); }
        }
      }
      setIsInitialLoading(false);
    }
    loadData();
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Error al subir");
    const data = await res.json();
    return data.url; 
  };

  const handleCarruselFile = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(`carrusel-${index}`);
      const url = await uploadFile(file);
      
      // Actualización inmutable del array
      setCarrusel(prev => {
        const nuevo = [...prev];
        nuevo[index] = url;
        return nuevo;
      });
      
      // Limpiamos el input para permitir subir el mismo archivo si se borra
      e.target.value = "";
    } catch (err) { 
      Swal.fire("Error", "No se pudo subir la imagen", "error");
    } finally { 
      setLoading(null); 
    }
  };

  const handlePublicar = async () => {
    setIsSaving(true);
    const result = await updateEventDetails({
      heroImage: fotoPrincipal || "",
      videoUrl: videoFile || "",
      musicUrl: musicFile || "",
      carruselImages: JSON.stringify(carrusel)
    });

    if (result.success) {
      Swal.fire({
        title: "¡Todo listo!",
        text: "Cambios publicados con éxito ✨",
        icon: "success",
        confirmButtonColor: "#18181b",
        customClass: { popup: 'rounded-[2.5rem]' }
      });
    }
    setIsSaving(false);
  };

  const handleLimpiarTodo = async () => {
    const result = await Swal.fire({
      title: "¿Vaciar multimedia?",
      text: "Esto eliminará la portada, el video, la música y el carrusel. No se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#18181b",
      confirmButtonText: "Sí, borrar todo",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      setFotoPrincipal(null);
      setVideoFile(null);
      setMusicFile(null);
      setMusicName("Sin archivo seleccionado");
      setCarrusel([null, null, null, null, null]);
      
      await updateEventDetails({
        heroImage: "",
        videoUrl: "",
        musicUrl: "",
        carruselImages: JSON.stringify([null, null, null, null, null])
      });
      Swal.fire({ title: "Reseteado", icon: "success", timer: 1500, showConfirmButton: false });
    }
  };

  if (isInitialLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-zinc-300" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-10">
        <div>
          <h1 className="text-5xl font-serif italic text-zinc-900 tracking-tight">Galería & Multimedia</h1>
          <p className="text-zinc-400 text-sm mt-3 font-medium uppercase tracking-widest">Personaliza el impacto visual de tu evento</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleLimpiarTodo} className="group flex items-center gap-2 px-5 py-5 rounded-[1.5rem] border border-zinc-200 text-zinc-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all active:scale-95">
            <Eraser size={18} />
            <span className="text-[10px] font-black tracking-widest uppercase">Limpiar</span>
          </button>
          <button onClick={handlePublicar} disabled={isSaving} className="bg-zinc-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-bold tracking-[0.2em] flex items-center gap-3 shadow-2xl transition-all active:scale-95 disabled:opacity-50">
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />} 
            {isSaving ? "GUARDANDO..." : "PUBLICAR CAMBIOS"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* COLUMNA IZQUIERDA (Portada y Música) */}
        <div className="md:col-span-4 space-y-8">
          {/* Portada */}
          <section className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-100/50">
            <h2 className="text-[12px] font-black uppercase tracking-tighter text-zinc-400 mb-6 flex items-center gap-2">01. Portada del Evento</h2>
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden group">
              <div onClick={() => mainInputRef.current?.click()} className="w-full h-full bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-all">
                {loading === "main" ? <Loader2 className="animate-spin text-indigo-500" /> : fotoPrincipal ? <img src={fotoPrincipal} className="w-full h-full object-cover" alt="Portada" /> : <ImagePlus className="text-zinc-300" size={40} />}
              </div>
              {fotoPrincipal && <button onClick={() => setFotoPrincipal(null)} className="absolute top-4 right-4 p-3 bg-white/90 rounded-full text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all"><X size={18}/></button>}
            </div>
            <input type="file" ref={mainInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setLoading("main");
                uploadFile(file).then(url => setFotoPrincipal(url)).finally(() => setLoading(null));
              }
            }} />
          </section>

          {/* Música */}
          <section className="bg-zinc-900 p-8 rounded-[3rem] text-white shadow-2xl">
            <h2 className="text-[12px] font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">02. Música de Fondo</h2>
            <div onClick={() => musicInputRef.current?.click()} className="group relative p-6 bg-white/5 border border-white/10 rounded-3xl cursor-pointer hover:bg-white/10 transition-all border-dashed">
              {loading === "music" ? (
                <div className="flex flex-col items-center gap-2 py-4"><Loader2 className="animate-spin text-indigo-400" /><p className="text-[10px] text-zinc-500 uppercase">Subiendo...</p></div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${musicFile ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}><FileAudio size={24} className={musicFile ? "animate-pulse" : ""} /></div>
                  <div className="flex-1 min-w-0"><p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Archivo MP3</p><p className="text-sm font-medium truncate text-zinc-300">{musicName}</p></div>
                  {musicFile && <X onClick={(e) => { e.stopPropagation(); setMusicFile(null); setMusicName("Sin archivo seleccionado"); }} size={18} className="text-zinc-600 hover:text-rose-400 cursor-pointer" />}
                </div>
              )}
            </div>
            <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setLoading("music");
                setMusicName(file.name);
                uploadFile(file).then(url => setMusicFile(url)).catch(() => setMusicName("Error al subir")).finally(() => setLoading(null));
              }
            }} />
          </section>
        </div>

        {/* COLUMNA DERECHA (Video y Carrusel) */}
        <div className="md:col-span-8 space-y-8">
          {/* Video */}
          <section className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-100/50">
            <h2 className="text-[12px] font-black uppercase tracking-tighter text-zinc-400 mb-8 flex items-center gap-2">03. Video Destacado</h2>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900">
              <div onClick={() => videoInputRef.current?.click()} className="w-full h-full flex items-center justify-center cursor-pointer group">
                {loading === "video-main" ? <Loader2 className="animate-spin text-indigo-400" size={40} /> : videoFile ? <video src={videoFile} className="w-full h-full object-cover" autoPlay muted loop /> : <div className="text-center"><div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl text-white"><Play fill="currentColor" size={32} /></div><p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Click para subir video</p></div>}
              </div>
              {videoFile && <button onClick={() => setVideoFile(null)} className="absolute top-6 right-6 p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-rose-600 transition-all"><X size={20}/></button>}
            </div>
            <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setLoading("video-main");
                uploadFile(file).then(url => setVideoFile(url)).finally(() => setLoading(null));
              }
            }} />
          </section>

          {/* Galería de Momentos (FOTOS CAROUSEL) */}
          <section className="bg-zinc-50/50 p-8 rounded-[3rem] border border-zinc-100">
            <h2 className="text-[12px] font-black uppercase tracking-tighter text-zinc-400 mb-8">04. Galería de Momentos</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {carrusel.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <div 
                    onClick={() => carruselRefs.current[index]?.click()} 
                    className={`w-full h-full rounded-3xl overflow-hidden border-2 transition-all flex items-center justify-center cursor-pointer ${url ? 'border-white shadow-lg' : 'border-dashed border-zinc-200 bg-white hover:border-indigo-300'}`}
                  >
                    {loading === `carrusel-${index}` ? (
                      <Loader2 className="animate-spin text-indigo-500" size={20} />
                    ) : url ? (
                      isVideo(url) ? <video src={url} className="w-full h-full object-cover" muted loop autoPlay /> : <img src={url} className="w-full h-full object-cover" alt={`Momento ${index + 1}`} />
                    ) : (
                      <Upload size={20} className="text-zinc-300" />
                    )}
                  </div>
                  {url && (
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setCarrusel(prev => {
                          const n = [...prev];
                          n[index] = null;
                          return n;
                        });
                      }} 
                      className="absolute -top-2 -right-2 p-2 bg-white rounded-full text-rose-500 shadow-md hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <X size={12}/>
                    </button>
                  )}
                  <input 
                    type="file" 
                    ref={el => { carruselRefs.current[index] = el }} 
                    className="hidden" 
                    accept="image/*,video/*" 
                    onChange={(e) => handleCarruselFile(index, e)} 
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}