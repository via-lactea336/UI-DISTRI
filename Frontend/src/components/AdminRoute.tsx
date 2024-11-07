import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string; // Por ejemplo, 2 para admin
  }
  
  
  const AdminRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { userResponseDTO, isAuth, loading } = useAuth();
    const location = useLocation(); 
    console.log("userResponseDTO en AdminRoute:", userResponseDTO);

    console.log(userResponseDTO.rolId);
    // Mientras se está cargando, puedes mostrar un indicador de carga
    if (loading) return <div>Loading...</div>;
    console.log(userResponseDTO);

  if (!isAuth) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" state={{ from: location }} />;
  }
    // Verifica si el usuario está autenticado y tiene el rol de administrador
    if (String(userResponseDTO.rolId) !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si el usuario es administrador, permite el acceso al contenido
    return <>{children}</>;
};

export default AdminRoute;