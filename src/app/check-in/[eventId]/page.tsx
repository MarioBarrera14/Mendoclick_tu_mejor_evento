"use client";

import { use, useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function GuestCheckIn({ params }: { params: Promise<{ eventId: string }> }) {
  /** * DESEMPAQUETADO DE PARAMS (Next.js 15)
   * Usamos 'use' para obtener el eventId de la promesa de forma segura.
   */
  const { eventId } = use(params); 

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestData, setGuestData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckIn = async () => {
    setStatus('loading');
    setErrorMessage("");
    
    try {
      const res = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), eventId }),
      });

      const data = await res.json();

      if (res.ok) {
        setGuestData(data);
        setStatus('success');
      } else {
        // Capturamos errores personalizados desde tu API
        setErrorMessage(data.error || "Código incorrecto o no encontrado");
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div 
              key="step-1" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter">
                  Mendo<span className="text-red-600">Click</span>
                </h1>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                  Check-in de Invitados
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 ml-4 mb-2 block tracking-widest">
                    Ingresá tu código personal
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 h-5 w-5" />
                    <input 
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="EJ: ASD5567"
                      className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-2xl py-4 pl-12 pr-4 text-white font-black outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleCheckIn}
                  disabled={code.length < 4 || status === 'loading'}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-900/20 active:scale-95"
                >
                  {status === 'loading' ? "Verificando..." : "Confirmar Ingreso"}
                </button>
                
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                  >
                    <AlertTriangle className="text-red-500 h-5 w-5" />
                    <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest leading-relaxed">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step-2" 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-500 h-10 w-10" />
              </div>
              
              <h2 className="text-xl font-black uppercase tracking-tight mb-2 italic">¡Bienvenido/a!</h2>
              <p className="text-zinc-400 text-sm font-medium mb-8">
                {guestData?.name}, tu ingreso ha sido confirmado.
              </p>

              <div className="bg-zinc-800 border-2 border-zinc-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-white/5">
                  <MapPin size={120} />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                  Tu Mesa Asignada
                </span>
                <span className="text-6xl font-black text-red-600 italic tracking-tighter">
                    #{guestData?.mesa}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                Disfrutá de la fiesta.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}