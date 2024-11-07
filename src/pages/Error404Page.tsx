import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Error404Page: React.FC = () => {
  return (
    <div className=" flex flex-col items-center justify-center pt-6">
      <AlertTriangle className="text-[var(--color-primary)]" size={64} />
      <h1 className="text-6xl font-bold text-[var(--color-secondary)] mt-4">
        404
      </h1>
      <p className="text-xl text-[var(--color-text)] mt-2">
        Página no encontrada
      </p>
      <Link to="/" className="btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error404Page;
