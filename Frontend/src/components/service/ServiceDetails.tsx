import React from "react";
import { Star } from "lucide-react";
import { PublicacionConCalificacion } from "../../types";
import CreateCalificacionForm from "../calificaciones/CreateCalificacionForm";

interface ServiceDetailsProps {
  uniquePublicacion: PublicacionConCalificacion;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  uniquePublicacion,
}) => {
  return (
    <section className="flex flex-col">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        <img
          src={uniquePublicacion.imagen}
          alt={uniquePublicacion.descripcion}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col w-2/4">
          <div className="">
            <h1 className="text-3xl font-semibold text-neutral-800">
              {uniquePublicacion.titulo}
            </h1>
            <div className="flex items-center mb-4 gap-2 py-2">
              <Star className="text-yellow-400 mr-1" size={24} />
              <span className="text-lg font-medium">
                {uniquePublicacion.calificacion.calificacionGeneral.toFixed(2)}
              </span>
              <span className="text-neutral-500">
                ({uniquePublicacion.calificacion.calificacionGeneral} reviews)
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Sobre el servicio</h2>
            <p className="text-lg mb-6">{uniquePublicacion.descripcion}</p>
            <p className="text-lg mb-6">
              <strong>Precio:</strong>{" "}
              {uniquePublicacion.precio.toLocaleString("es-PY")} Gs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
