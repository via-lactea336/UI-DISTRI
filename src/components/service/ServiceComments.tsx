import { Star, MessageSquare } from "lucide-react";
import { CalificacionDetalle, CalificacionDetalleWithUser } from "../../types";
import { missingImage } from "../../constants";
import { useEffect, useState } from "react";
import { clientesService } from "../../services/clientes.service";

interface ServiceCommentsProps {
  detalles: CalificacionDetalle[];
}

const ServiceComments: React.FC<ServiceCommentsProps> = ({ detalles }) => {
  const [detallesWithClientName, setDetallesWithClientName] = useState<
    CalificacionDetalleWithUser[]
  >([]);

  useEffect(() => {
    const fetchClientNames = async () => {
      const detallesWithClientName = await Promise.all(
        detalles.map(async (detalle) => {
          const response = await clientesService.getUserByClienteId(
            detalle.clienteId
          );
          return {
            ...detalle,
            usuario: response,
          };
        })
      );
      setDetallesWithClientName(detallesWithClientName);
    };

    fetchClientNames();
  }, [detalles]);

  return (
    <div className="max-w-3xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-[var(--primary)]" />
        Comentarios y Valoraciones
      </h2>

      <div className="space-y-6">
        {detallesWithClientName?.map((detalle, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={detalle.usuario.imgPerfil || missingImage}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < detalle.calificacion
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-600 ml-1">
                        ({detalle.calificacion}/5)
                      </span>
                    </div>
                    <time className="text-sm text-gray-500">
                      {detalle.fecha}
                    </time>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">
                  {detalle.comentario}
                </p>
              </div>

              <div className="mt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="hover:text-blue-600 transition-colors duration-200">
                    {detalle.usuario.nombre}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComments;
