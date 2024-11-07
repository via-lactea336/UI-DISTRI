import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const Error500Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-light)]">
      <AlertCircle className="text-[var(--color-primary)]" size={64} />
      <h1 className="text-6xl font-bold text-[var(--color-secondary)] mt-4">
        500
      </h1>
      <p className="text-xl text-[var(--color-text)] mt-2">
        Error interno del servidor
      </p>
      <Link to="/" className="btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error500Page;
