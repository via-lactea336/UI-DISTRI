import React from "react";
import { FileText, Image } from "lucide-react";

interface Step3Props {
  formData: {
    bio: string;
    imgPerfil: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
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
