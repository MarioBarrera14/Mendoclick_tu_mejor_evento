"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCheck } from "lucide-react"; 
import { motion } from "framer-motion";
import { useSession } from "next-auth/react"; // <--- Importante para saber quién es el cliente

interface Message {
  id: string;
  apellido: string; 
  dietary: string;
  status: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession(); // Obtenemos la sesión del cliente
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!session?.user?.slug) return; // Si no hay sesión, no pedimos nada

      setLoading(true);
      try {
        // Le pedimos a la API solo los invitados de ESTE slug
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
  }, [session]); // Se ejecuta cuando la sesión está lista

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* HEADER ESTILO WHATSAPP */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 italic font-serif">Panel de Control</h1>
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Invitación: /{session?.user?.slug}
          </p>
        </div>
        <div className="bg-zinc-900 p-3 rounded-2xl text-rose-500 shadow-lg">
          <MessageSquare size={20} />
        </div>
      </div>

      {/* CONTENEDOR DE CHAT */}
      <div className="space-y-4 bg-[#efe7dd] p-4 sm:p-6 rounded-[2.5rem] min-h-[500px] border border-zinc-200 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        {loading ? (
          <div className="flex justify-center items-center h-[400px] text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
            Conectando con Mendoclick...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-zinc-400 font-medium italic">
            Aún no hay confirmaciones para tu evento.
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-start"
            >
              <div className="relative max-w-[90%] bg-white rounded-2xl rounded-tl-none p-4 shadow-md border border-zinc-100">
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                
                <p className="text-[10px] font-black text-rose-500 mb-1 uppercase tracking-wider">
                  {msg.apellido}
                </p>
                
                <p className="text-zinc-800 text-sm font-medium leading-tight mb-2">
                 {msg.dietary || "Sin restricciones alimenticias."}
                </p>

                <div className="flex items-center justify-end gap-1 border-t border-zinc-50 pt-1">
                  <span className="text-[8px] font-black text-zinc-400 uppercase">
                    Confirmado
                  </span>
                  <CheckCheck size={14} className="text-blue-500" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <p className="text-center text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-black italic">
        Mendoclick • Gestión en tiempo real
      </p>
    </div>
  );
}