import React, { useState } from "react";
import { useCalificaciones } from "../../hooks/useCalificaciones";
import { PublicacionConCalificacion } from "../../types";
import { Star } from "lucide-react";

type Props = {
  publicacion: PublicacionConCalificacion;
};

const CreateCalificacionForm = ({ publicacion }: Props) => {
  const { createCalificacionDetalle } = useCalificaciones();
  const [formData, setFormData] = useState({
    clienteId: 1,
    calificacion: 0,
    comentario: "",
    publicacionId: publicacion.publicacionId,
    calificacionId: publicacion.calificacion.calificacionId,
    fecha: new Date().toISOString().split("T")[0],
  });

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
    try {
      await createCalificacionDetalle(formData);
      // Reset form
      setFormData({
        ...formData,
        calificacion: 0,
        comentario: "",
      });
    } catch (error) {
      console.error("Error creating calificacion:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Califica tu experiencia</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor={`calificacion`}
            className="block mb-2 text-sm font-medium"
          >
            Calificación
          </label>
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
          >
            Comentario
          </label>
          <textarea
            id={`comentario`}
            name="comentario"
            value={formData.comentario}
            onChange={(e) => handleDetalleChange(e)}
            className="mt-1 p-4 block w-full rounded-md border-gray-800 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]sm:text-sm"
            rows={4}
            placeholder="Cuéntanos más sobre tu experiencia..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 px-4 bg-[var(--color-primary)] text-white font-semibold rounded-md shadow-sm hover:[var(--color-secondary)]focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
      >
        Enviar calificación
      </button>
    </form>
  );
};

export default CreateCalificacionForm;
