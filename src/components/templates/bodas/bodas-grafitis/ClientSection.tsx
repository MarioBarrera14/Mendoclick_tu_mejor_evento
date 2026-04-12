"use client";

import dynamic from 'next/dynamic';

// Cargamos de forma dinámica y sin SSR para que Next.js 
// no intente validar estos componentes en el ciclo del servidor
const RSVP = dynamic(() => import("./RSVP").then(mod => mod.RSVP), { 
  ssr: false,
  loading: () => <div className="h-20" /> // Espacio reservado
});

const MusicSuggestion = dynamic(() => import("./").then(mod => mod.MusicSuggestion), { 
  ssr: false 
});

export function ClientSection() {
  return (
    <>
      <MusicSuggestion eventId={''} />
      <RSVP config={{
        heroImage: '',
        eventDate: '',
        confirmDate: ''
      }} />
    </>
  );
}