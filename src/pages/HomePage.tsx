import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, Shield } from "lucide-react";
import Categories from "../components/home/Categories";
import PopularServices from "../components/home/PopularServices";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/servicios?nombreCategoria=${searchQuery}&page=0`);
    }
  };

  return (
    <div className="space-y-16">
      <section className="bg-[var(--color-light)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Encuentra el servicio perfecto para tu hogar
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Busca cualquier servicio..."
                className="w-full py-4 pl-6 pr-12 text-lg rounded-md border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--color-primary)] text-white p-2 rounded-md hover:bg-[var(--color-primary-dark)]"
                onClick={handleSearch}
              >
                <Search size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PopularServices />

      <section className="bg-[var(--color-light)] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            ¿Por qué elegir ServiciosRápidos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star
                className="mx-auto mb-4 text-[var(--color-primary)]"
                size={48}
              />
              <h3 className="text-xl font-semibold mb-2">
                Profesionales calificados
              </h3>
              <p className="text-[var(--color-text)]">
                Expertos verificados y evaluados por la comunidad.
              </p>
            </div>
            <div className="text-center">
              <Clock
                className="mx-auto mb-4 text-[var(--color-primary)]"
                size={48}
              />
              <h3 className="text-xl font-semibold mb-2">Respuesta rápida</h3>
              <p className="text-[var(--color-text)]">
                Obtén propuestas en minutos, no en días.
              </p>
            </div>
            <div className="text-center">
              <Shield
                className="mx-auto mb-4 text-[var(--color-primary)]"
                size={48}
              />
              <h3 className="text-xl font-semibold mb-2">
                Garantía de servicio
              </h3>
              <p className="text-[var(--color-text)]">
                Tu satisfacción está garantizada o te devolvemos tu dinero.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Categories />
    </div>
  );
};

export default HomePage;
