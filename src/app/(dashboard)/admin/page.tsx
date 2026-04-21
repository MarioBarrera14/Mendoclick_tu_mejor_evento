"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCheck, Loader2, User, MessageSquareHeart, Eraser } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  nombre: string;
  dietary: string;
  message: string;
  status: string;
  codigo: string;
  confirmados: number;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearingId, setClearingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!session?.user?.slug) return;
    try {
      const response = await fetch(`/api/guests?slug=${session.user.slug}`);
      const invitados = await response.json();
      
      const confirmados = invitados
        .filter((inv: any) => inv.status === "CONFIRMED")
        .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); 

      setMessages(confirmados);
    } catch (error) { 
      console.error("Error cargando mensajes:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [session]);

  const handleClearMessage = async (msg: Message) => {
    if (!confirm(`¿Querés borrar el texto del mensaje de ${msg.nombre}?`)) return;
    
    setClearingId(msg.id);
    try {
      const response = await fetch(`/api/guests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          codigo: msg.codigo, 
          message: "", 
          status: msg.status,
          confirmados: msg.confirmados 
        }),
      });

      if (response.ok) {
        setMessages((prev) => 
          prev.map((m) => (m.id === msg.id ? { ...m, message: "" } : m))
        );
      }
    } finally {
      setClearingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-3 md:p-6 font-sans text-black pb-20">
      
      {/* HEADER ADAPTABLE */}
<header className="flex justify-between items-center mb-6 border-b pb-4 px-1">
  <div>
    <p className="text-red-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest">MendoClick Admin</p>
    <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
      Live <span className="text-red-600">Feed</span>
    </h1>
  </div>
  <div className="bg-zinc-950 p-2.5 md:p-3 rounded-2xl text-red-600 shadow-xl">
    {/* Corregido: Usamos className para el responsive */}
    <MessageSquare className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
  </div>
</header>

      {/* CONTENEDOR DE CHAT */}
      <div className="space-y-4 bg-zinc-50 p-3 md:p-5 rounded-[2rem] min-h-[500px] border-2 border-zinc-200 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <h2 className="text-7xl md:text-9xl font-black -rotate-12 uppercase text-center leading-none">Mendo<br/>Click</h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-3">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        ) : (
          <div className="relative z-10 space-y-5">
            <AnimatePresence>
              {messages.map((msg) => (
                msg.message && msg.message.trim() !== "" && (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-start"
                  >
                    {/* BURBUJA DE MENSAJE */}
                    <div className="relative w-full max-w-[98%] md:max-w-[90%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-zinc-200">
                      {/* Triangulito del chat */}
                      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                      
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-red-600" />
                          <p className="text-[10px] md:text-xs font-black text-black uppercase italic tracking-tight leading-none truncate">
                            {msg.nombre} 
                            <span className="ml-1.5 text-[8px] md:text-[9px] text-zinc-400 not-italic font-bold">
                               ({msg.confirmados} PERS.)
                            </span>
                          </p>
                        </div>

                        {/* Botón borrar: Siempre visible en mobile para UX táctil */}
                        <button 
                          onClick={() => handleClearMessage(msg)}
                          disabled={clearingId === msg.id}
                          className="p-1.5 bg-zinc-50 md:bg-transparent md:opacity-0 group-hover:opacity-100 transition-all rounded-lg text-zinc-400 active:text-red-600 active:bg-red-50"
                        >
                          {clearingId === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Eraser size={14} />}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 bg-red-50 p-3 rounded-xl border border-red-100/50">
                          <MessageSquareHeart size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-black text-[11px] md:text-xs font-black italic uppercase leading-tight tracking-tight">
                            "{msg.message}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-zinc-50">
                        <span className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                          Confirmado
                        </span>
                        <CheckCheck size={14} className="text-red-600" />
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {messages.filter(m => m.message && m.message.trim() !== "").length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-300">
                    <MessageSquareHeart size={40} className="mb-2 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sin mensajes nuevos</p>
                </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 flex items-center justify-center gap-3 opacity-20">
        <MessageSquare size={12} />
        <p className="text-[7px] font-black uppercase tracking-[0.3em]">MendoClick Real-time Guest Feed</p>
      </footer>
    </div>
  );
}