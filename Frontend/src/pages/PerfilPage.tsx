import React, { useState, ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { userService } from "../services/user.service";
import toast from "react-hot-toast";

const PerfilPage = () => {
  const { userResponseDTO, isAuth } = useAuth();

  const [formData, setFormData] = useState({
    nombre: userResponseDTO.nombre || "",
    email: userResponseDTO.email || "",
    telefono: userResponseDTO.telefono || "",
    direccion: userResponseDTO.direccion || "",
    bio: userResponseDTO.bio || "",
    imgPerfil: userResponseDTO.imgPerfil || "", // Agregar imagen de perfil
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Controlar el estado del modal para la URL de la imagen
  const [newImageUrl, setNewImageUrl] = useState(""); // URL de la nueva imagen

  if (!isAuth) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const { nombre, email, telefono, direccion, bio } = formData;

    // Verificar si hay campos vacíos
    if (!nombre || !email || !telefono || !direccion || !bio) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      await userService.updateUser(userResponseDTO.usuarioId, formData);
      toast.success("Perfil actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = () => {
    // Solo permitir cambiar la imagen si está en modo de edición
    if (isEditing) {
      setIsImageModalOpen(true);
    }
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(e.target.value);
  };

  const saveImageUrl = () => {
    // Validar si la URL no está vacía
    if (newImageUrl) {
      setFormData({
        ...formData,
        imgPerfil: newImageUrl, // Actualizar la imagen de perfil con la nueva URL
      });
      setIsImageModalOpen(false); // Cerrar el modal
      toast.success("Imagen de perfil actualizada");
    } else {
      toast.error("Por favor ingresa una URL válida");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                src={formData.imgPerfil || "https://unavatar.io/github/mdo"} // Mostrar imagen desde el estado
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <button
                onClick={handleImageChange}
                className={`absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isEditing} // Deshabilitar el botón si no está en modo de edición
              >
                <Camera size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
              Mi Perfil
            </h1>
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
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-secondary)]">
                Sobre mí
              </h3>
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

      {/* Modal para ingresar URL de la imagen */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Actualizar Imagen de Perfil
            </h3>
            <input
              type="url"
              placeholder="Ingresa la URL de la imagen"
              value={newImageUrl}
              onChange={handleImageUrlChange}
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={saveImageUrl}
                className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
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

export default PerfilPage;
