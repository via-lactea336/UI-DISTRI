import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Error401Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <AlertTriangle className="text-[var(--color-primary)]" size={64} />
      <h1 className="text-6xl font-bold text-[var(--color-secondary)] mt-4">
        401
      </h1>
      <p className="text-xl text-[var(--color-text)] mt-2">
        Acceso no autorizado
      </p>
      <p className="text-md text-[var(--color-text)] mt-2">
        No tienes permiso para ver esta página.
      </p>
     
    </div>
  );
};

export default Error401Page;
