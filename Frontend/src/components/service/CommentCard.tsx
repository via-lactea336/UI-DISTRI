import { Star, Edit2, Save, X, Trash2, Loader } from "lucide-react"; // Import icons
import { CalificacionDetalleWithUser, UserResponseDTO } from "../../types";
import { useState } from "react";
import { missingImage } from "../../constants";

interface CommentCardProps {
  detalle: CalificacionDetalleWithUser;
  userResponseDTO: UserResponseDTO;
  onSave: (
    detalle: CalificacionDetalleWithUser,
    editedComentario: string,
    editedCalificacion: number
  ) => Promise<void>;
  onDelete: (detalleId: number) => Promise<void>;
}

const CommentCard: React.FC<CommentCardProps> = ({
  detalle,
  userResponseDTO,
  onSave,
  onDelete,
}) => {
  const [editingDetalleId, setEditingDetalleId] = useState<number | null>(null);
  const [editedComentario, setEditedComentario] = useState<string>("");
  const [editedCalificacion, setEditedCalificacion] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = () => {
    setEditingDetalleId(detalle.calificacionDetalleId);
    setEditedComentario(detalle.comentario);
    setEditedCalificacion(detalle.calificacion);
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(detalle, editedComentario, editedCalificacion);
    setEditingDetalleId(null);
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingDetalleId(null);
    setEditedComentario("");
    setEditedCalificacion(0);
  };

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(detalle.calificacionDetalleId);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
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
                    className={`w-4 h-4 cursor-pointer ${
                      i <
                      (editingDetalleId === detalle.calificacionDetalleId
                        ? editedCalificacion
                        : detalle.calificacion)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }`}
                    onClick={() => {
                      if (editingDetalleId === detalle.calificacionDetalleId) {
                        setEditedCalificacion(i + 1);
                      }
                    }}
                  />
                ))}
                <span className="text-sm font-medium text-gray-600 ml-1">
                  (
                  {editedCalificacion > 0
                    ? editedCalificacion
                    : detalle.calificacion}
                  /5)
                </span>
              </div>
              <time className="text-sm text-gray-500">{detalle.fecha}</time>
            </div>
          </div>
          {userResponseDTO.tipoUsuario === "cliente" &&
            userResponseDTO.idClienteTrabajador === detalle.clienteId && (
              <div className="flex items-center gap-2">
                {editingDetalleId === detalle.calificacionDetalleId ? (
                  <>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleEdit}
                      disabled={loading}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
        </div>

        <div className="mt-4">
          {editingDetalleId === detalle.calificacionDetalleId ? (
            <textarea
              className="w-full p-2 border rounded"
              value={editedComentario}
              onChange={(e) => setEditedComentario(e.target.value)}
              disabled={loading}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {detalle.comentario}
            </p>
          )}
        </div>

        <div className="mt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="">{detalle.usuario.nombre}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
