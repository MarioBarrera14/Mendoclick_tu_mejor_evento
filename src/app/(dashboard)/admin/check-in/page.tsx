"use client";

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode, TicketCheck, Info } from 'lucide-react';

// --- ESTE ES EL COMPONENTE DEL GENERADOR ---
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

  // La URL que el recepcionista escaneará en el salón
  const checkInURL = `https://mendoclick.com.ar/admin/check-in/${eventId}`;

  return (
    <div className="flex flex-col items-center p-8 bg-white border-2 border-zinc-100 rounded-3xl shadow-sm w-full max-w-sm mx-auto lg:mx-0">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <QrCode className="h-5 w-5" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">QR Dinámico</span>
      </div>

      <div 
        ref={qrRef} 
        className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-inner mb-6"
      >
        <QRCodeCanvas 
          value={checkInURL} 
          size={220}
          level={"H"} 
          includeMargin={false}
          className="rounded-lg"
        />
      </div>

      <button 
        onClick={downloadQR}
        className="w-full flex items-center justify-center gap-3 bg-zinc-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-zinc-200"
      >
        <Download size={16} />
        Descargar para imprimir
      </button>
    </div>
  );
};

// --- ESTA ES LA PÁGINA DEL DASHBOARD QUE EXPORTA POR DEFECTO ---
export default function CheckInPage() {
  const { data: session } = useSession();

  // Usamos el ID o el Slug para generar la URL única del evento
  const eventId = session?.user?.id; 
  const eventName = session?.user?.name || "Evento";

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-zinc-50/50">
      <div className="max-w-5xl mx-auto">
        
        {/* Header con el estilo MendoClick */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-zinc-950 p-2 rounded-xl">
              <TicketCheck className="text-red-600 h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-950 italic">
              Gestión de <span className="text-red-600">Acceso</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider ml-1">
            MendoClick Management / Panel de Control
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: El QR */}
          <div className="lg:col-span-1">
            {eventId ? (
              <QRGenerator eventId={eventId} eventName={eventName} />
            ) : (
              <div className="p-12 bg-white border-2 border-dashed border-zinc-200 rounded-3xl text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-40 w-40 bg-zinc-100 rounded-xl mb-4"></div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Sincronizando...</p>
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información y Guía */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border-2 border-zinc-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Info size={120} />
              </div>
              
              <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6 flex items-center gap-2">
                Instrucciones de uso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-xs font-black">01</span>
                    <div>
                      <p className="text-[11px] font-black uppercase mb-1 text-zinc-950">Impresión</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                        Imprimí este código en un tamaño visible (mínimo 10x10cm) y colocalo en la entrada del salón.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-xs font-black">02</span>
                    <div>
                      <p className="text-[11px] font-black uppercase mb-1 text-zinc-950">Escaneo</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                        El personal de recepción escanea el código con cualquier smartphone para ver el listado.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 flex items-center justify-center text-xs font-black">03</span>
                    <div>
                      <p className="text-[11px] font-black uppercase mb-1 text-zinc-950">Check-In</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                        Se podrá buscar por familia, confirmar asistencia y ver el número de mesa asignado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-red-600">
                    <div className="p-3 bg-red-50 rounded-2xl w-full border border-red-100">
                       <p className="text-[10px] font-black uppercase italic leading-tight">
                         Aviso: No compartas este QR con invitados. Es exclusivo para el personal del evento.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner decorativo inferior */}
            <div className="bg-zinc-950 p-6 rounded-3xl flex items-center justify-between group cursor-default">
               <div className="flex flex-col">
                  <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em]">Status</span>
                  <span className="text-white text-xs font-bold uppercase">Servidor de Check-in Activo</span>
               </div>
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}