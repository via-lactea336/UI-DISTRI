import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";
import { estadosService } from "../services/estados.service";
import { Estado } from "../types";

import toast from "react-hot-toast";



const EstadosPage: React.FC = () => {
  const { userResponseDTO, loading } = useAuth();
  const [estados, setEstados] = useState<Estado[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false); // Para controlar la apertura del modal
  const [nuevoEstado, setNuevoEstado] = useState<string>(''); // Para capturar el nombre del nuevo estado

  // Función para eliminar un estado
  const deleteEstado = async (estadoId: number) => {
    try {
      await estadosService.deleteEstado(estadoId);
      setEstados(estados.filter((estado) => estado.estadoId !== estadoId));
      toast.success("Estado eliminado con exito"); 
    } catch (error) {
      console.error("Error deleting estado:", error);
      toast.error("Error al eliminar un estado");
    }
  };

  // Función para editar un estado
  const editEstado = (estadoId: number) => {
    // Lógica de edición, por ejemplo, abrir un modal o redirigir
    console.log(`Editando estado con ID: ${estadoId}`);
  };

  // Función para obtener la lista de estados
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await estadosService.getEstados();
        setEstados(data.content || []);
        toast.success("Estados cargados correctamente")
      } catch (error) {
        console.error("Error fetching estados:", error);
        toast.error("Error al cargar los estados")
      }
    };

    if (userResponseDTO && userResponseDTO.rolId === "2") {
      fetchEstados();
    }
  }, [userResponseDTO]);

  // Función para abrir el modal de agregar estado
  const openModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    setNuevoEstado(''); // Limpiar el campo de nuevo estado al cerrar el modal
  };

  // Función para manejar el guardado del nuevo estado
  const handleSaveEstado = async () => {
    if (!nuevoEstado.trim()) {
      setError("El nombre del estado es obligatorio.");
      return;
    }

    try {
      const newEstado = { nombreEstado: nuevoEstado };
      const addedEstado = await estadosService.createEstado(newEstado); // Asegúrate de que `addEstado` esté en el servicio
      setEstados([...estados, addedEstado]); // Añadir el nuevo estado a la lista
      closeModal(); // Cerrar el modal después de agregar el estado
      toast.success("Estado agregado correctamente.")
    } catch (error) {
      console.error("Error adding estado:", error);
      toast.error("Error al crear el estado")
    }
  };

  if (loading) return <div><p>Cargando...</p></div>;

  if (String(userResponseDTO.rolId) !== "2") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    
    <div className="flex flex-col items-center justify-center pt-6">

      <h1 className="text-6xl font-bold text-[var(--color-primary)] mt-4">Página de Estados</h1>
      <p className="text-xl text-[var(--color-text)] mt-2">Aquí puedes ver todos los estados disponibles.</p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <h2 className="text-2xl font-semibold mt-6">Lista de Estados</h2>
      <div className="overflow-x-auto mt-6 w-full max-w-4xl">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 font-semibold text-lg">Estado</th>
              <th className="px-4 py-2 font-semibold text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estados.length > 0 ? (
              estados.map((estado) => (
                <tr key={estado.estadoId} className="border-t">
                  <td className="px-4 py-2">{estado.nombreEstado.trim()}</td>
                  <td className="px-4 py-2 flex space-x-4">
                    <button
                      onClick={() => editEstado(estado.estadoId)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteEstado(estado.estadoId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                  No hay estados disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botón para abrir el modal */}
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={openModal}
        >
          Agregar Estado
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Agregar Nuevo Estado</h2>
            <input
              type="text"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              placeholder="Nombre del Estado"
              className="border border-gray-300 p-2 w-full mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSaveEstado}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadosPage;
