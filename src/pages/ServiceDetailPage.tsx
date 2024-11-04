import React from "react";
import usePublicaciones from "../hooks/usePublicaciones";
import ServiceComments from "../components/service/ServiceComments";
import ServiceDetails from "../components/service/ServiceDetails";
import CreateCalificacionForm from "../components/calificaciones/CreateCalificacionForm";

const ServiceDetailPage: React.FC = () => {
  const { uniquePublicacion, loading } = usePublicaciones("", 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!uniquePublicacion) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ServiceDetails uniquePublicacion={uniquePublicacion} />
      <CreateCalificacionForm publicacion={uniquePublicacion} />

      <ServiceComments detalles={uniquePublicacion.calificacion.detalles} />
    </div>
  );
};

export default ServiceDetailPage;
