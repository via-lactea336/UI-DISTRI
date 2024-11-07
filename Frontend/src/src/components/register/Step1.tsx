import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { validatePassword } from "../../constants";

interface Step1Props {
  formData: {
    nombre: string;
    email: string;
    contrasena: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange }) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const error = validatePassword(value);
    setPasswordError(error);
    handleChange(e);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Nombre Completo <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              placeholder="Juan Pérez"
            />
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Correo Electrónico <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              placeholder="tu@email.com"
            />
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Contraseña <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              id="contrasena"
              name="contrasena"
              type={showPassword ? "text" : "password"}
              required
              value={formData.contrasena}
              onChange={handlePasswordChange}
              className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              placeholder="••••••••"
            />
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Confirmar Contraseña <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              placeholder="••••••••"
            />
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
