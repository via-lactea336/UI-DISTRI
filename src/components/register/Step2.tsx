import React from "react";
import { Phone, MapPin } from "lucide-react";

interface Step2Props {
  formData: {
    telefono: string;
    direccion: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-[var(--color-text)]"
        >
          Teléfono <span className="text-red-500 text-lg">*</span>
        </label>
        <div className="mt-1 relative">
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            value={formData.telefono}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="+34 123 456 789"
          />
          <Phone
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="direccion"
          className="block text-sm font-medium text-[var(--color-text)]"
        >
          Dirección <span className="text-red-500 text-lg">*</span>
        </label>
        <div className="mt-1 relative">
          <input
            id="direccion"
            name="direccion"
            type="text"
            required
            value={formData.direccion}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="Calle Principal 123, Madrid"
          />
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
