import React from "react";
import { SearchX } from "lucide-react";

const NoResults: React.FC = () => {
  return (
    <div className="text-center py-8">
      <SearchX className="mx-auto mb-4 text-[var(--color-primary)]" size={48} />
      <h2 className="text-2xl font-semibold mb-2 text-[var(--color-secondary)]">
        No se encontraron resultados
      </h2>
      <p className="text-[var(--color-text)] mb-4">
        Intenta ajustar tu búsqueda.
      </p>
    </div>
  );
};

export default NoResults;
