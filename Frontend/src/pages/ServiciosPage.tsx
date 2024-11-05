import React, { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import NoResults from "../components/NoResults";
import usePublicaciones from "../hooks/usePublicaciones";
import useDebounce from "../hooks/useDebounce";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Skeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 animate-pulse">
    <div className="bg-gray-300 h-48 w-full mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2 w-3/4"></div>
    <div className="h-6 bg-gray-300 mb-4 w-1/2"></div>
    <div className="h-6 bg-gray-300 mb-2 w-1/4"></div>
    <div className="h-6 bg-gray-300 w-1/4"></div>
  </div>
);

const ServiciosPage: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState("precio");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const location = useLocation();
  const navigate = useNavigate();
  const { publicaciones, loading, totalPages } = usePublicaciones(
    debouncedSearchQuery,
    currentPage
  );

  const sortedPublicaciones = useMemo(() => {
    return [...publicaciones].sort((a, b) => {
      if (sortCriteria === "precio") {
        return a.precio - b.precio;
      } else if (sortCriteria === "calificacion") {
        return (
          b.calificacion.calificacionGeneral -
          a.calificacion.calificacionGeneral
        );
      }
      return 0;
    });
  }, [publicaciones, sortCriteria]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (debouncedSearchQuery) {
      params.set("query", debouncedSearchQuery);
    } else {
      params.delete("query");
    }
    params.set("page", currentPage.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [debouncedSearchQuery, location.search, navigate, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Servicios disponibles</h1>
      <div className="mb-8 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar por nombre o tipo de servicio"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="precio">Ordenar por precio</option>
          <option value="calificacion">Ordenar por calificación</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} />)
        ) : sortedPublicaciones.length === 0 ? (
          <div className="col-span-4">
            <NoResults />
          </div>
        ) : (
          sortedPublicaciones.map((publicacion) => (
            <Link
              to={`/servicio/${publicacion.publicacionId}`}
              key={publicacion.publicacionId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={publicacion.imagen}
                alt={publicacion.descripcion}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {publicacion.titulo}
                    </h2>
                    <p className="text-[var(--color-text)]">
                      {publicacion.descripcion}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" size={24} />
                    <span className="font-semibold mr-2">
                      {publicacion.calificacion.calificacionGeneral.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">
                    {publicacion.precio.toLocaleString("es-PY") + " Gs."}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ServiciosPage;
