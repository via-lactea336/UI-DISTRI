import React from "react";
import { FileText, Image, ChevronDown } from "lucide-react"; // Import ChevronDown
import { Event } from "../../types";
interface Step3Props {
  formData: {
    bio: string;
    imgPerfil: string;
    tipoUsuario: "cliente" | "trabajador";
    nombreTrabajo?: string;
    descripcionTrabajo?: string;
  };
  handleChange: (e: Event) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="userType"
          className="block text-sm font-medium text-[var(--color-text)]"
        >
          Quieres registrarte como:{" "}
        </label>
        <div className="mt-1 relative">
          <select
            id="userType"
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          >
            <option value="cliente">Cliente</option>
            <option value="trabajador">Trabajador</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      {formData.tipoUsuario === "trabajador" && (
        <>
          <div>
            <label
              htmlFor="nombreTrabajo"
              className="block text-sm font-medium text-[var(--color-text)]"
            >
              Nombre del Trabajo <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                id="nombreTrabajo"
                name="nombreTrabajo"
                type="text"
                required
                value={formData.nombreTrabajo || ""}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                placeholder="Nombre del trabajo"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="descripcionTrabajo"
              className="block text-sm font-medium text-[var(--color-text)]"
            >
              Descripción del Trabajo <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <textarea
                id="descripcionTrabajo"
                name="descripcionTrabajo"
                required
                rows={4}
                value={formData.descripcionTrabajo || ""}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                placeholder="Describe tu trabajo..."
              ></textarea>
            </div>
          </div>
        </>
      )}
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-[var(--color-text)]"
        >
          Biografía <span className="text-gray-400 text-sm">(Opcional)</span>
        </label>
        <div className="mt-1 relative">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="Cuéntanos sobre ti..."
          ></textarea>
          <FileText
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="imgPerfil"
          className="block text-sm font-medium text-[var(--color-text)]"
        >
          Imagen de Perfil{" "}
          <span className="text-gray-400 text-md">(Opcional)</span>
        </label>
        <div className="mt-1 relative">
          <input
            id="imgPerfil"
            name="imgPerfil"
            type="text"
            value={formData.imgPerfil}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="URL de tu imagen de perfil"
          />
          <Image
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
