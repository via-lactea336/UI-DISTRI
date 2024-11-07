import React, { useState, ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { userService } from "../services/user.service";

import toast from "react-hot-toast";

const PerfilPage = () => {
  const { userResponseDTO, isAuth } = useAuth();

  console.log(userResponseDTO)
  // Define el estado del formulario y el estado de edición
  const [formData, setFormData] = useState({
    nombre: userResponseDTO.nombre || "",
    email: userResponseDTO.email || "",
    telefono: userResponseDTO.telefono || "",
    direccion: userResponseDTO.direccion || "",
    bio: userResponseDTO.bio || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Verifica que el usuario esté autenticado
  if (!isAuth) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  // Maneja el cambio en los campos de entrada del formulario
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para guardar los cambios
  const handleSave = async () => {
    try {
      // Utiliza el servicio para actualizar los datos del usuario
      await userService.updateUser(userResponseDTO.usuarioId, formData);
      toast.success("Perfil actualizado con éxito"); // Muestra un toast de éxito
      setIsEditing(false); // Deshabilita el modo edición después de guardar
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil"); // Muestra un toast de error
    }
  };

  // Alterna el estado de edición
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                src="https://unavatar.io/github/mdo"
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                <Camera size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">Mi Perfil</h1>
            <button
              onClick={isEditing ? handleSave : toggleEdit}
              className={`px-4 py-2 rounded-md ${
                isEditing ? "bg-green-500" : "bg-[var(--color-primary)]"
              } text-white font-semibold`}
            >
              {isEditing ? "Guardar cambios" : "Editar perfil"}
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center">
              <User className="text-[var(--color-primary)] mr-3" size={24} />
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="text-lg border rounded-md p-2 w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center">
              <Mail className="text-[var(--color-primary)] mr-3" size={24} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center">
              <Phone className="text-[var(--color-primary)] mr-3" size={24} />
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center">
              <MapPin className="text-[var(--color-primary)] mr-3" size={24} />
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-secondary)]">Sobre mí</h3>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
