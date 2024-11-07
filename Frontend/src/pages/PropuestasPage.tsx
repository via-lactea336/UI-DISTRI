import React, { useState } from 'react';
import { Clock, DollarSign, ThumbsUp, ThumbsDown } from 'lucide-react';

const propuestasIniciales = [
  { id: 1, servicio: 'Reparación de grifo', proveedor: 'Juan Pérez', precio: 80, tiempo: '2 horas', estado: 'pendiente' },
  { id: 2, servicio: 'Instalación eléctrica', proveedor: 'María González', precio: 150, tiempo: '3 horas', estado: 'aceptada' },
  { id: 3, servicio: 'Pintura de habitación', proveedor: 'Carlos Rodríguez', precio: 200, tiempo: '5 horas', estado: 'rechazada' },
  { id: 4, servicio: 'Limpieza de alfombras', proveedor: 'Ana Martínez', precio: 100, tiempo: '4 horas', estado: 'pendiente' },
];

const PropuestasPage: React.FC = () => {
  const [propuestas, setPropuestas] = useState(propuestasIniciales);

  const handleAccept = (id: number) => {
    setPropuestas(propuestas.map(p => p.id === id ? {...p, estado: 'aceptada'} : p));
  };

  const handleReject = (id: number) => {
    setPropuestas(propuestas.map(p => p.id === id ? {...p, estado: 'rechazada'} : p));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-secondary)]">Mis Propuestas</h1>
      <div className="space-y-6">
        {propuestas.map((propuesta) => (
          <div key={propuesta.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[var(--color-secondary)]">{propuesta.servicio}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                propuesta.estado === 'aceptada' ? 'bg-green-100 text-green-800' :
                propuesta.estado === 'rechazada' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {propuesta.estado.charAt(0).toUpperCase() + propuesta.estado.slice(1)}
              </span>
            </div>
            <p className="text-[var(--color-text)] mb-4">Proveedor: {propuesta.proveedor}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <DollarSign className="text-[var(--color-primary)] mr-1" size={20} />
                <span className="font-semibold">${propuesta.precio}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-[var(--color-primary)] mr-1" size={20} />
                <span>{propuesta.tiempo}</span>
              </div>
            </div>
            {propuesta.estado === 'pendiente' && (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAccept(propuesta.id)}
                  className="flex-1 bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center"
                >
                  <ThumbsUp size={20} className="mr-2" />
                  Aceptar
                </button>
                <button
                  onClick={() => handleReject(propuesta.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <ThumbsDown size={20} className="mr-2" />
                  Rechazar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropuestasPage;