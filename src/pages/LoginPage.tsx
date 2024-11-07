import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, sessionExpired, setSessionExpired } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem("loginFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (sessionExpired) {
      toast("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      setSessionExpired(false);
    }
  }, [sessionExpired, setSessionExpired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (rememberMe) {
        localStorage.setItem("loginFormData", JSON.stringify(formData));
      } else {
        localStorage.removeItem("loginFormData");
      }
      await login(formData);
      navigate("/perfil");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-[var(--color-primary)]" />
          <h2 className="mt-6 text-3xl font-bold text-[var(--color-secondary)]">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text)]">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text)]"
              >
                Correo Electrónico
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-text)]"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="contrasena"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.contrasena}
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[var(--color-text)]"
              >
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary flex justify-center items-center"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <Loader2 className="mr-2 animate-spin" size={20} />
            ) : (
              <LogIn className="mr-2" size={20} />
            )}
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
