import React, { useEffect, useState } from "react";
import { publicacionesService } from "../../services/publicaciones.service";
import { categoriasService } from "../../services/categorias.service"; // Import the categoriasService
import type { Publicacion } from "../../types";
import SkeletonLoader from "./SkeletonLoader"; // Import the SkeletonLoader component
import { Link } from "react-router-dom";

interface PublicacionConCategoria extends Publicacion {
  nombreCategoria: string;
}

const PopularServices: React.FC = () => {
  const [p, setP] = useState<PublicacionConCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await publicacionesService.getPublicaciones();
        const publicacionesWithCategoria = await Promise.all(
          data.content.slice(0, 5).map(async (publicacion) => {
            const categoria = await categoriasService.getCategoria(
              publicacion.categoriaId
            );
            return {
              ...publicacion,
              nombreCategoria: categoria.nombreCategoria,
            };
          })
        );
        setP(publicacionesWithCategoria);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Servicios populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {p.map((publicacion) => (
          <Link
            to={`/servicio/${publicacion.publicacionId}`}
            key={publicacion.publicacionId}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-md mb-2">
              <img
                src={publicacion.imagen}
                alt={publicacion.titulo}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              <span className="text-sm text-white bg-[var(--color-primary)] rounded-full py-1 px-3 absolute top-2 right-4">
                {publicacion.nombreCategoria}
              </span>
            </div>
            <h3 className="font-semibold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
              {publicacion.titulo}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularServices;
