import React, { useState } from "react";
import usePublicaciones from "../hooks/usePublicaciones";
import ServiceComments from "../components/service/ServiceComments";
import ServiceDetails from "../components/service/ServiceDetails";
import CreateCalificacionForm from "../components/calificaciones/CreateCalificacionForm";
import { CalificacionDetalle } from "../types";
import SkeletonLayout from "../components/SkeletonLayout";
import Error404Page from "./Error404Page";
import Pagination from "../components/Pagination";

const ServiceDetailPage: React.FC = () => {
  const { uniquePublicacion, setUniquePublicacion, loading, getComentarios } =
    usePublicaciones("", 0);

  const [commentLoading, setCommentLoading] = useState(false);

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
        detallesPaginados: {
          ...uniquePublicacion.calificacion.detallesPaginados,
          content: [
            newDetalle,
            ...uniquePublicacion.calificacion.detallesPaginados.content.slice(
              0,
              2
            ),
          ],
        },
      },
    });
  };

  const handlePageChange = async (page: number) => {
    try {
      setCommentLoading(true);
      const { calificacion } = await getComentarios(
        uniquePublicacion.publicacionId,
        uniquePublicacion.trabajadorId,
        page
      );
      setUniquePublicacion({
        ...uniquePublicacion,
        calificacion,
      });
    } catch (error) {
      console.error(error);
    } finally {
      if (!loading) {
        setCommentLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <ServiceDetails uniquePublicacion={uniquePublicacion} />
      <CreateCalificacionForm
        publicacion={uniquePublicacion}
        onNewCalificacion={onNewCalificacion}
      />
      <ServiceComments
        detallesPaginados={uniquePublicacion.calificacion.detallesPaginados}
        commentLoading={commentLoading}
      />
      <Pagination
        totalPages={uniquePublicacion.calificacion.detallesPaginados.totalPages}
        currentPage={uniquePublicacion.calificacion.detallesPaginados.number}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ServiceDetailPage;
