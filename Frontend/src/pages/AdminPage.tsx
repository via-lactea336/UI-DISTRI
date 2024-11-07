import React from "react";
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const { userResponseDTO, loading } = useAuth();
  const navigate = useNavigate();  // Usar navigate de react-router-dom

  if (loading) return <div><p>Cargando...</p></div>;

  if (String(userResponseDTO.rolId) !== "2") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <h1 className="text-6xl font-bold text-[var(--color-primary)] mt-4">
        Panel de Administrador
      </h1>
      <p className="text-xl text-[var(--color-text)] mt-2">
        Bienvenido al panel del administrador.
      </p>

      {/* Botón para ir a la página de ver estados */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/estados')}  // Usar el navigate de react-router-dom
        >
          Ver Estados
        </button>
      </div>
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/usuarios')}  // Usar el navigate de react-router-dom
        >
          Ver Usuarios
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
