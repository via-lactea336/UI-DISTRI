import React, { useState } from "react";
import { useCalificaciones } from "../../hooks/useCalificaciones";
import { CalificacionDetalle, PublicacionConUsuario } from "../../types";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

type Props = {
  publicacion: PublicacionConUsuario;
  onNewCalificacion: (newDetalle: CalificacionDetalle) => void;
};

const CreateCalificacionForm = ({ publicacion, onNewCalificacion }: Props) => {
  const { createCalificacionDetalle } = useCalificaciones();
  const [loading, setLoading] = useState(false);
  const { userResponseDTO } = useAuth();
  console.log(userResponseDTO);
  const [formData, setFormData] = useState({
    clienteId: userResponseDTO.idClienteTrabajador,
    calificacion: 0,
    comentario: "",
    publicacionId: publicacion.publicacionId,
    calificacionId: publicacion.calificacion.calificacionId,
    fecha: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState<string | null>(null);

  const handleDetalleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.calificacion === 0) {
      setError("La calificación es requerida.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newDetalle = await createCalificacionDetalle(formData);
      onNewCalificacion(newDetalle);
      // Reset form
      setFormData({
        ...formData,
        calificacion: 0,
        comentario: "",
      });
    } catch (error) {
      console.error("Error creating calificacion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Califica tu experiencia
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label
            htmlFor={`calificacion`}
            className="block mb-2 text-sm font-medium"
          ></label>
          <div className="flex justify-start space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, calificacion: star })}
                className={`text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full p-1 ${
                  star <= formData.calificacion
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                aria-label={`Calificar ${star} estrellas`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor={`comentario`}
            className="block mb-2 text-sm font-medium"
          ></label>
          <textarea
            id={`comentario`}
            name="comentario"
            required
            value={formData.comentario}
            onChange={(e) => handleDetalleChange(e)}
            className="mt-1 p-4 block w-full rounded-lg border-2 border-gray-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            rows={4}
            placeholder="Cuéntanos más sobre tu experiencia..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="py-2 mt-4 px-4 bg-gray-900 text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-offset-2"
      >
        {loading ? "Enviando..." : "Enviar calificación"}
      </button>
    </form>
  );
};

export default CreateCalificacionForm;
