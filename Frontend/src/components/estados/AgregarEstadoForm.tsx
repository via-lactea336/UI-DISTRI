import React, { useState } from "react";
import { estadosService } from "../../services/estados.service";

interface AgregarEstadoPageProps {
  closeModal: () => void; // Recibir la función para cerrar el modal
}

const AgregarEstadoPage: React.FC<AgregarEstadoPageProps> = ({ closeModal }) => {
  const [nombreEstado, setNombreEstado] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreEstado) {
      setError("El nombre del estado es obligatorio.");
      return;
    }

    try {
      const newEstado = { nombreEstado };
      await estadosService.createEstado(newEstado); // Llama al servicio para crear el estado
      closeModal(); // Cierra el modal
    } catch (error) {
      setError("Error al crear el estado.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Crear Nuevo Estado</h2>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full mt-4">
        <div className="mb-4">
          <label
            htmlFor="nombreEstado"
            className="block text-xl font-medium text-[var(--color-text)]"
          >
            Nombre del Estado
          </label>
          <input
            type="text"
            id="nombreEstado"
            value={nombreEstado}
            onChange={(e) => setNombreEstado(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Ingrese el nombre del estado"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar Estado
        </button>
      </form>

      <button
        onClick={closeModal}
        className="mt-4 w-full text-gray-500 hover:text-gray-700"
      >
        Cancelar
      </button>
    </div>
  );
};

export default AgregarEstadoPage;
