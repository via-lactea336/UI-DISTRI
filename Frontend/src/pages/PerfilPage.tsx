import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Camera } from "lucide-react";

const PerfilPage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: "Ana García",
    email: "ana.garcia@email.com",
    telefono: "+34 123 456 789",
    direccion: "Calle Principal 123, Madrid",
    descripcion:
      "Soy una profesional con más de 10 años de experiencia en servicios de limpieza y organización del hogar.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPerfil((prevPerfil) => ({ ...prevPerfil, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    console.log("Perfil actualizado:", perfil);
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
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
              Mi Perfil
            </h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              <Edit2 size={20} className="mr-2" />
              {editMode ? "Cancelar" : "Editar"}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={perfil.direccion}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    value={perfil.descripcion}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="text-[var(--color-primary)] mr-3" size={24} />
                <span className="text-lg">{perfil.nombre}</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-[var(--color-primary)] mr-3" size={24} />
                <span>{perfil.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-[var(--color-primary)] mr-3" size={24} />
                <span>{perfil.telefono}</span>
              </div>
              <div className="flex items-center">
                <MapPin
                  className="text-[var(--color-primary)] mr-3"
                  size={24}
                />
                <span>{perfil.direccion}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-secondary)]">
                  Sobre mí
                </h3>
                <p className="text-[var(--color-text)]">{perfil.descripcion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
