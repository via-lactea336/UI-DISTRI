import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { UserResponseDTO } from "../types";

import toast from "react-hot-toast";

const UsuariosPage: React.FC = () => {
  const { userResponseDTO, loading } = useAuth();
  const [usuarios, setUsuarios] = useState<UserResponseDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la lista de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = (await userService.getUsuarios()) as UserResponseDTO[];
        setUsuarios(data || []);
        toast.success("Usuarios cargados correctamente");
      } catch (error) {
        console.error("Error fetching usuarios:", error);
        toast.error("Error al cargar los usuarios");
      }
    };

    if (userResponseDTO) {
      fetchUsuarios();
    }
  }, [userResponseDTO]);

  if (loading)
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );

  if (String(userResponseDTO.rolId) !== "2") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <h1 className="text-6xl font-bold text-[var(--color-primary)] mt-4">
        Página de Usuarios
      </h1>
      <p className="text-xl text-[var(--color-text)] mt-2">
        Aquí puedes ver todos los usuarios disponibles.
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <h2 className="text-2xl font-semibold mt-6">Lista de Usuarios</h2>
      <div className="overflow-x-auto mt-6 w-full max-w-4xl">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 font-semibold text-lg">Nombre</th>
              <th className="px-4 py-2 font-semibold text-lg">Email</th>
              <th className="px-4 py-2 font-semibold text-lg">Dirección</th>
              <th className="px-4 py-2 font-semibold text-lg">Número</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.usuarioId} className="border-t">
                  <td className="px-4 py-2">{usuario.nombre}</td>
                  <td className="px-4 py-2">{usuario.email}</td>
                  <td className="px-4 py-2">{usuario.direccion}</td>
                  <td className="px-4 py-2">{usuario.telefono}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosPage;
