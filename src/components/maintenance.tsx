import React from 'react';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl border border-gray-200 p-8 md:p-12 bg-white shadow-sm rounded-lg">
        {/* Tu logo o nombre con la fuente elegante */}
        <h1 className="font-pinyon text-6xl text-[#33aba1] mb-4">
          MendoClick
        </h1>
        
        <h2 className="font-montserrat text-2xl font-bold text-gray-800 uppercase tracking-widest mb-6">
          Próximamente
        </h2>
        
        <div className="w-20 h-1 bg-[#33aba1] mx-auto mb-8"></div>
        
        <p className="font-cormorant text-2xl text-gray-600 italic mb-8">
          "Estamos perfeccionando cada detalle para que tus celebraciones comiencen con un click inolvidable."
        </p>
        
        <div className="space-y-4">
          <p className="font-montserrat text-sm text-gray-400 uppercase">
            Mendoza, Argentina
          </p>
          <div className="flex justify-center space-x-4">
            {/* Si querés poner tu Instagram o contacto */}
            <span className="text-[#33aba1] font-bold">#ProntoOnline</span>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-gray-400 font-montserrat text-xs uppercase tracking-tighter">
        &copy; {new Date().getFullYear()} MendoClick - Invitaciones Digitales
      </footer>
    </div>
  );
};

export default Maintenance;