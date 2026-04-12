"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCheck, Loader2, User, Utensils } from "lucide-react"; 
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  apellido: string; 
  dietary: string;
  status: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!session?.user?.slug) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/guests?slug=${session.user.slug}`);
        const invitados = await response.json();
        
        const confirmados = invitados
          .filter((inv: any) => inv.status === "CONFIRMED")
          .reverse(); 

        setMessages(confirmados);
      } catch (error) {
        console.error("Error cargando mensajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [session]);

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 font-sans text-black">
      {/* HEADER COMPACTO MENDOCLICK */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Live <span className="text-red-600">Feed</span>
          </h1>
        </div>
        <div className="bg-zinc-950 p-3 rounded-2xl text-red-600 shadow-xl">
          <MessageSquare size={20} />
        </div>
      </header>

      {/* CONTENEDOR DE CHAT ESTILO DASHBOARD */}
      <div className="space-y-4 bg-zinc-50 p-4 sm:p-6 rounded-[2rem] min-h-[500px] border-2 border-zinc-200 relative overflow-hidden shadow-inner">
        {/* Marca de agua sutil */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <h2 className="text-9xl font-black -rotate-12 uppercase">Mendo<br/>Click</h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-3">
            <Loader2 className="animate-spin text-red-600" size={32} />
            <p className="text-zinc-400 font-black uppercase text-[10px] tracking-widest">Sincronizando pases...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-zinc-400 font-black uppercase text-[10px] tracking-[0.2em] italic">
            Esperando la primera confirmación...
          </div>
        ) : (
          <div className="relative z-10 space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-start"
              >
                <div className="relative max-w-[95%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-zinc-300">
                  {/* Triángulo de chat */}
                  <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    <User size={12} className="text-red-600" />
                    <p className="text-xs font-black text-black uppercase italic tracking-tight">
                      {msg.apellido}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                    <Utensils size={14} className="text-zinc-400 mt-0.5" />
                    <p className="text-zinc-900 text-xs font-bold leading-tight uppercase">
                      {msg.dietary || "Sin restricciones alimenticias."}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-zinc-50">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                      Pase Confirmado
                    </span>
                    <CheckCheck size={14} className="text-red-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-6 flex flex-col items-center gap-2">
        <div className="h-1 w-12 bg-red-600 rounded-full opacity-30" />
        <p className="text-[9px] text-zinc-400 uppercase tracking-[0.4em] font-black italic">
          MendoClick Real-Time Dashboard
        </p>
      </footer>
    </div>
  );
}