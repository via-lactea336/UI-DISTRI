import React, { useState } from "react";
import { PublicacionConUsuario } from "../../types";
import RenderStars from "./RenderStars";
import { contratoService } from "../../services/contratos.service";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface ServiceDetailsProps {
  uniquePublicacion: PublicacionConUsuario;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  uniquePublicacion,
}) => {
  const { userResponseDTO } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const contratoData = {
        publicacionId: uniquePublicacion.publicacionId,
        clienteId: userResponseDTO.idClienteTrabajador,
        trabajadorId: uniquePublicacion.trabajadorId,
        fechaContrato: new Date().toISOString(),
        estadoId: 3,
        precio: uniquePublicacion.precio,
        createdAt: new Date().toISOString(),
      };

      const response = await contratoService.createContrato(contratoData);
      console.log("Contrato creado con éxito:", response);
      toast.success("Contrato creado con éxito");
    } catch (error) {
      console.error("Error al crear el contrato:", error);
      toast.error("Error al crear el contrato");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container mx-auto px-4 pb-8 flex justify-between items-center">
      <div className="flex justify-between items-start ">
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-neutral-800">
              {uniquePublicacion.titulo}
            </h1>
            <span className="text-lg font-semibold px-3 py-1 bg-gray-200 rounded-full">
              {uniquePublicacion.precio.toLocaleString("es-PY")} Gs.
            </span>
          </div>
          <div className="flex items-center gap-2 py-1">
            <RenderStars
              rating={uniquePublicacion.calificacion.calificacionGeneral}
            />
            <span className="text-muted-foreground">
              {uniquePublicacion.calificacion.calificacionGeneral.toFixed(2)}
            </span>
          </div>
          <span className="text-lg font-medium">
            Por {uniquePublicacion.user.nombre}
          </span>
          <div className="px-0 space-y-6 mt-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Sobre el servicio</h2>
              <p className="text-gray-600">{uniquePublicacion.descripcion}</p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-primary-dark)] transition duration-300"
          >
            {loading ? "Cargando..." : "Contratar"}
          </button>
        </div>
      </div>
      <div className="">
        <img
          src={uniquePublicacion.imagen}
          alt={uniquePublicacion.descripcion}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default ServiceDetails;
