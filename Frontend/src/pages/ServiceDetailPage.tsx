import React from "react";
import usePublicaciones from "../hooks/usePublicaciones";
import ServiceComments from "../components/service/ServiceComments";
import ServiceDetails from "../components/service/ServiceDetails";
import CreateCalificacionForm from "../components/calificaciones/CreateCalificacionForm";
import { CalificacionDetalle } from "../types";
import SkeletonLayout from "../components/SkeletonLayout";
import Error404Page from "./Error404Page";

const ServiceDetailPage: React.FC = () => {
  const { uniquePublicacion, setUniquePublicacion, loading } = usePublicaciones(
    "",
    0
  );

  if (loading) {
    return <SkeletonLayout />;
  }

  if (!uniquePublicacion) {
    return <Error404Page />;
  }

  const onNewCalificacion = (newDetalle: CalificacionDetalle) => {
    setUniquePublicacion({
      ...uniquePublicacion,
      calificacion: {
        ...uniquePublicacion.calificacion,
        detalles: [newDetalle, ...uniquePublicacion.calificacion.detalles],
      },
    });
  };

  return (
    <div className="container mx-auto px-4">
      <ServiceDetails uniquePublicacion={uniquePublicacion} />
      <CreateCalificacionForm
        publicacion={uniquePublicacion}
        onNewCalificacion={onNewCalificacion}
      />

      <ServiceComments detalles={uniquePublicacion.calificacion.detalles} />
    </div>
  );
};

export default ServiceDetailPage;
