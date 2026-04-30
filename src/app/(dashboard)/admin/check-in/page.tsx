"use client";

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode, TicketCheck, Info } from 'lucide-react';

// --- COMPONENTE DEL GENERADOR (Optimizado para Mobile) ---
const QRGenerator = ({ eventId, eventName }: { eventId: string; eventName?: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR-CHECKIN-${eventName?.toUpperCase() || 'MENDOCLICK'}.png`;
      link.click();
    }
  };

const checkInURL = `https://mendoclick.com.ar/check-in/${eventId}`;
  // Ejemplo con la IP 192.168.1.15
//const checkInURL = `http://192.168.249.37/admin/check-in/${eventId}`;
  return (
    <div className="flex flex-col items-center p-6 md:p-8 bg-white border-2 border-zinc-100 rounded-[2rem] shadow-sm w-full max-w-sm mx-auto lg:mx-0">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <QrCode className="h-4 w-4 md:h-5 md:w-5" />
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">QR Dinámico</span>
      </div>

      <div 
        ref={qrRef} 
        className="p-3 md:p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-inner mb-6 w-full flex justify-center"
      >
        <QRCodeCanvas 
          value={checkInURL} 
          size={200} // Un poco más pequeño para asegurar que entre en cualquier mobile
          level={"H"} 
          includeMargin={false}
          className="rounded-lg max-w-full h-auto"
        />
      </div>

      <button 
        onClick={downloadQR}
        className="w-full flex items-center justify-center gap-3 bg-zinc-950 text-white py-4 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-zinc-200"
      >
        <Download size={14} />
        Descargar para imprimir
      </button>
    </div>
  );
};

// --- PÁGINA DEL DASHBOARD ---
export default function CheckInPage() {
  const { data: session } = useSession();
  const eventId = session?.user?.id; 
  const eventName = session?.user?.name || "Evento";

  return (
    <div className="p-4 md:p-10 min-h-screen bg-zinc-50/50">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Adaptable */}
        <header className="mb-8 md:mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <div className="bg-zinc-950 p-2 rounded-xl">
              <TicketCheck className="text-red-600 h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-zinc-950 italic">
              Gestión de <span className="text-red-600">Acceso</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-wider">
            MendoClick Management / Panel de Control
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Columna QR */}
          <div className="lg:col-span-1 order-1">
            {eventId ? (
              <QRGenerator eventId={eventId} eventName={eventName} />
            ) : (
              <div className="p-10 bg-white border-2 border-dashed border-zinc-200 rounded-[2rem] text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-32 w-32 bg-zinc-100 rounded-xl mb-4"></div>
                  <p className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">Sincronizando...</p>
                </div>
              </div>
            )}
          </div>

          {/* Columna Instrucciones */}
          <div className="lg:col-span-2 space-y-6 order-2">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-zinc-100 shadow-sm relative overflow-hidden">
              {/* Icono de fondo solo visible en desktop para no ensuciar el mobile */}
              <div className="absolute top-0 right-0 p-4 opacity-5 hidden md:block">
                <Info size={120} />
              </div>
              
              <h2 className="text-xs font-black uppercase tracking-widest text-red-600 mb-6 flex items-center gap-2 justify-center md:justify-start">
                Instrucciones de uso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-[10px] font-black">01</span>
                    <div>
                      <p className="text-[10px] font-black uppercase mb-1 text-zinc-950">Impresión</p>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">
                        Imprimí este código en un tamaño visible (mínimo 10x10cm) y colocalo en la entrada.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-[10px] font-black">02</span>
                    <div>
                      <p className="text-[10px] font-black uppercase mb-1 text-zinc-950">Escaneo</p>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">
                        El personal escanea el código con cualquier smartphone para ver el listado.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-[10px] font-black">03</span>
                    <div>
                      <p className="text-[10px] font-black uppercase mb-1 text-zinc-950">Check-In</p>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">
                        Confirmá asistencia y consultá el número de mesa asignado al instante.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                       <p className="text-[9px] font-black uppercase italic leading-tight text-red-600">
                         Aviso: No compartas este QR con invitados. Es exclusivo para el personal.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-zinc-950 p-5 md:p-6 rounded-2xl flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-zinc-500 text-[8px] font-black uppercase tracking-[0.3em]">Status</span>
                  <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-tight">Servidor de Check-in Activo</span>
               </div>
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}