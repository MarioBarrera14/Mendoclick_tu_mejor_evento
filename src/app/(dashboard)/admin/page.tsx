"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCheck, Loader2, User, Utensils, MessageSquareHeart } from "lucide-react"; 
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  nombre: string;
  dietary: string;
  message: string;
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
      try {
        const response = await fetch(`/api/guests?slug=${session.user.slug}`);
        const invitados = await response.json();
        
        // Filtramos por confirmados y ordenamos para que el último llegue arriba
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
    fetchMessages();
  }, [session]);

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
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-zinc-400 font-black uppercase text-[10px] tracking-[0.2em]">
            Esperando confirmaciones...
          </div>
        ) : (
          <div className="relative z-10 space-y-5">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-start"
              >
                <div className="relative max-w-[95%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-zinc-300">
                  <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    <User size={12} className="text-red-600" />
                    <p className="text-xs font-black text-black uppercase italic tracking-tight leading-none">
                      {msg.nombre}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Burbuja Menú */}
                    <div className="flex items-start gap-2 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                      <Utensils size={14} className="text-[#5ba394]" />
                      <p className="text-black text-xs font-bold uppercase leading-tight">
                        {msg.dietary || "MENÚ STANDARD"}
                      </p>
                    </div>

                    {/* Burbuja Mensaje Lindo */}
                    {msg.message && (
                      <div className="flex items-start gap-2 bg-red-50 p-2 rounded-xl border border-red-100">
                        <MessageSquareHeart size={14} className="text-red-600 mt-0.5" />
                        <p className="text-black text-[11px] font-bold italic uppercase leading-tight">
                          "{msg.message}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-zinc-50">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                      Invitación Confirmada
                    </span>
                    <CheckCheck size={14} className="text-red-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}