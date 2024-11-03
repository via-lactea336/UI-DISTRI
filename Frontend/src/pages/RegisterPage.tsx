import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Step1 from "../components/register/Step1";
import Step2 from "../components/register/Step2";
import Step3 from "../components/register/Step3";
import ProgressIndicator from "../components/register/ProgressIndicator";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
    bio: "",
    imgPerfil: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      await register({
        nombre: formData.nombre,
        email: formData.email,
        contrasena: formData.contrasena,
        telefono: formData.telefono,
        direccion: formData.direccion,
        bio: formData.bio,
        imgPerfil: formData.imgPerfil,
        activo: true,
        rolId: "1",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (
        !formData.nombre ||
        !formData.email ||
        !formData.contrasena ||
        !formData.confirmPassword
      ) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }
    } else if (step === 2) {
      if (!formData.telefono || !formData.direccion) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-[var(--color-primary)]" />
          <h2 className="mt-6 text-3xl font-bold text-[var(--color-secondary)]">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text)]">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <ProgressIndicator step={step} />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 && (
            <Step1 formData={formData} handleChange={handleChange} />
          )}
          {step === 2 && (
            <Step2 formData={formData} handleChange={handleChange} />
          )}
          {step === 3 && (
            <Step3 formData={formData} handleChange={handleChange} />
          )}
          <div
            className={`flex ${step < 2 ? "justify-end" : "justify-between"}`}
          >
            {step > 1 && (
              <a href="#" onClick={prevStep} className="btn-secondary">
                Anterior
              </a>
            )}
            {step < 3 ? (
              <a href="#" onClick={nextStep} className="btn-primary">
                Siguiente
              </a>
            ) : (
              <button type="submit" className="btn-primary">
                Crear Cuenta
              </button>
            )}
          </div>
          <div className="text-sm text-center text-[var(--color-text)]">
            Al registrarte, aceptas nuestros{" "}
            <a
              href="#"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Términos y Condiciones
            </a>{" "}
            y{" "}
            <a
              href="#"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Política de Privacidad
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
