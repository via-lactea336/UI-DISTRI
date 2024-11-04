import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">ServiciosRápidos</h3>
            <p className="text-sm">Encuentra profesionales confiables para tus emergencias y necesidades del hogar.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="text-sm">
              <li className="mb-2"><a href="/servicios" className="hover:text-blue-400">Buscar Servicios</a></li>
              <li className="mb-2"><a href="/propuestas" className="hover:text-blue-400">Propuestas</a></li>
              <li className="mb-2"><a href="/perfil" className="hover:text-blue-400">Mi Perfil</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-sm mb-2">Email: info@serviciosrapidos.com</p>
            <p className="text-sm mb-2">Teléfono: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400"><Facebook /></a>
              <a href="#" className="text-white hover:text-blue-400"><Twitter /></a>
              <a href="#" className="text-white hover:text-blue-400"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 ServiciosRápidos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;