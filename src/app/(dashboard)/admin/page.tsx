"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCheck, Loader2, User, Utensils, MessageSquareHeart, Eraser } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  nombre: string;
  dietary: string;
  message: string;
  status: string;
  codigo: string;
  confirmados: number; // <--- AGREGADO: Fundamental para no resetear el cupo
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
      
      // Traemos todos los confirmados (tengan o no mensaje para tener la data lista)
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
      // REPARACIÓN CLAVE: Mandamos el status y los confirmados actuales 
      // para que la API no aplique el valor por defecto (0).
      const response = await fetch(`/api/guests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          codigo: msg.codigo, 
          message: "",               // Solo vaciamos el texto
          status: msg.status,        // Mantenemos "CONFIRMED"
          confirmados: msg.confirmados // Mantenemos el cupo original (ej: 1, 2, 5)
        }),
      });

      if (response.ok) {
        // Actualizamos localmente: el mensaje desaparece de la vista pero el objeto sigue vivo
        setMessages((prev) => 
          prev.map((m) => (m.id === msg.id ? { ...m, message: "" } : m))
        );
      } else {
        alert("Error al limpiar en el servidor.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setClearingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 font-sans text-black">
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none"> Live <span className="text-red-600">Feed</span> </h1>
        </div>
        <div className="bg-zinc-950 p-3 rounded-2xl text-red-600 shadow-xl">
          <MessageSquare size={20} />
        </div>
      </header>

      <div className="space-y-4 bg-zinc-50 p-4 rounded-[2rem] min-h-[500px] border-2 border-zinc-200 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <h2 className="text-9xl font-black -rotate-12 uppercase">Mendo<br/>Click</h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-3">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        ) : (
          <div className="relative z-10 space-y-5">
            <AnimatePresence>
              {messages.map((msg, index) => (
                // Solo mostramos la tarjeta si tiene un mensaje escrito
                msg.message && msg.message.trim() !== "" && (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-start group"
                  >
                    <div className="relative max-w-[95%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-zinc-300">
                      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                      
                      <div className="flex justify-between items-start gap-10 mb-2">
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-red-600" />
                          <p className="text-xs font-black text-black uppercase italic tracking-tight leading-none">
                            {msg.nombre} 
                            <span className="ml-2 text-[9px] text-zinc-400">({msg.confirmados} pers.)</span>
                          </p>
                        </div>

                        <button 
                          onClick={() => handleClearMessage(msg)}
                          disabled={clearingId === msg.id}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-zinc-900"
                        >
                          {clearingId === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Eraser size={14} />}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 bg-red-50 p-2 rounded-xl border border-red-100">
                          <MessageSquareHeart size={14} className="text-red-600 mt-0.5" />
                          <p className="text-black text-[11px] font-bold italic uppercase leading-tight">
                            "{msg.message}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-zinc-50">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                          Mensaje del invitado
                        </span>
                        <CheckCheck size={14} className="text-red-600" />
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}