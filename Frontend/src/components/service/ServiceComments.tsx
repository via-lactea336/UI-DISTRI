import { MessageSquare } from "lucide-react"; // Import MessageSquare icon
import {
  CalificacionDetalle,
  CalificacionDetalleWithUser,
  PaginatedResponse,
} from "../../types";
import { useEffect, useState } from "react";
import { clientesService } from "../../services/clientes.service";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { calificacionesService } from "../../services/calificaciones.service"; // Import calificacionesService
import toast from "react-hot-toast";
import CommentCard from "./CommentCard";
import CommentCardSkeleton from "./CommentCardSkeleton";

interface ServiceCommentsProps {
  detallesPaginados: PaginatedResponse<CalificacionDetalle>;
  commentLoading: boolean;
}

const ServiceComments: React.FC<ServiceCommentsProps> = ({
  detallesPaginados,
  commentLoading,
}) => {
  const [detallesWithClientName, setDetallesWithClientName] = useState<
    CalificacionDetalleWithUser[]
  >([]);
  const { userResponseDTO } = useAuth();
  const detalles = detallesPaginados.content;

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

  const handleSave = async (
    detalle: CalificacionDetalleWithUser,
    editedComentario: string,
    editedCalificacion: number
  ) => {
    try {
      const updatedDetalle = await calificacionesService.updateDetalle(
        detalle.calificacionDetalleId,
        {
          ...detalle,
          comentario: editedComentario,
          calificacion: editedCalificacion,
        }
      );
      setDetallesWithClientName((prevDetalles) =>
        prevDetalles.map((d) =>
          d.calificacionDetalleId === updatedDetalle.calificacionDetalleId
            ? {
                ...d,
                comentario: editedComentario,
                calificacion: editedCalificacion,
              }
            : d
        )
      );
      toast.success("Comentario actualizado");
    } catch (error) {
      console.error("Error updating detalle:", error);
      toast.error("Error actualizando comentario");
    }
  };

  const handleDelete = async (detalleId: number) => {
    try {
      await calificacionesService.deleteDetalle(detalleId);
      setDetallesWithClientName((prevDetalles) =>
        prevDetalles.filter((d) => d.calificacionDetalleId !== detalleId)
      );
      toast.success("Comentario eliminado");
    } catch (error) {
      console.error("Error deleting detalle:", error);
      toast.error("Error eliminando comentario");
    }
  };

  if (commentLoading) {
    return <CommentCardSkeleton />;
  }

  return (
    <div className="max-w-3xl mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-[var(--primary)]" />
        Comentarios y Valoraciones
      </h2>

      <div className="space-y-6">
        {detallesWithClientName?.map((detalle, index) => (
          <CommentCard
            key={index}
            detalle={detalle}
            userResponseDTO={userResponseDTO}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceComments;
