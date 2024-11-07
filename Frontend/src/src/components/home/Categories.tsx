import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { categoriasService } from "../../services/categorias.service";
import type { Categoria, PaginatedResponse } from "../../types";
import { Link } from "react-router-dom";

// Skeleton component
const Skeleton = () => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md animate-pulse">
    <span className="bg-gray-300 h-6 w-3/4 rounded"></span>
    <span className="bg-gray-300 h-6 w-6 rounded"></span>
  </div>
);

const Categories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response: PaginatedResponse<Categoria> =
          await categoriasService.getCategorias();
        setCategorias(response.content);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Explora por categoría</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : categorias.map((categoria) => (
              <Link
                to={`/servicios?nombreCategoria=${categoria.nombreCategoria}&page=0`}
                key={categoria.categoriaId}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-[var(--color-primary)] transition-colors"
              >
                <span className="font-semibold">
                  {categoria.nombreCategoria}
                </span>
                <ChevronRight
                  className="text-[var(--color-primary)]"
                  size={20}
                />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default Categories;
