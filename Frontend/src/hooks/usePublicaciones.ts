import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { publicacionesService } from "../services/publicaciones.service";
import { calificacionesService } from "../services/calificaciones.service";

import { trabajadorService } from "../services/trabajador.service";
import {
  PublicacionConCalificacion,
  PublicacionConUsuario,
  PublicacionResponse,
} from "../types/index";

const usePublicaciones = (searchQuery: string, currentPage: number) => {
  const [publicaciones, setPublicaciones] = useState<
    PublicacionConCalificacion[]
  >([]);
  const [uniquePublicacion, setUniquePublicacion] =
    useState<PublicacionConUsuario>();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const publicacionId = useParams().id;

  useEffect(() => {
    fetchServicios();
  }, [searchQuery, currentPage, location.search, publicacionId]);

  const fetchServicios = async () => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const nombreCategoria = params.get("nombreCategoria");
    const descripcion = searchQuery || params.get("descripcion");
    const page = currentPage;

    try {
      let data: PublicacionResponse;
      if (publicacionId) {
        await fetchUniquePublicacion(publicacionId);
      } else if (nombreCategoria) {
        data = await publicacionesService.getPublicacionesByCategoriaNombre(
          nombreCategoria,
          page
        );
        await processPublicaciones(data);
      } else if (descripcion) {
        data = await publicacionesService.getPublicacionesByDescripcion(
          descripcion,
          page
        );
        await processPublicaciones(data);
      } else {
        data = await publicacionesService.getPublicaciones(page);
        await processPublicaciones(data);
      }
    } catch (error) {
      console.error("Error fetching publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniquePublicacion = async (publicacionId: string) => {
    const publicacion = await publicacionesService.getPublicacion(
      parseInt(publicacionId)
    );
    const { calificacion, userDto } = await getComentarios(
      publicacion.publicacionId,
      publicacion.trabajadorId
    );
    setUniquePublicacion({
      ...publicacion,
      calificacion: calificacion || { calificacionGeneral: 0 },
      user: userDto,
    });
    setLoading(false);
  };

  const processPublicaciones = async (data: PublicacionResponse) => {
    console.log("Publicaciones de la api", data.content);
    console.log("mis publicaciones", publicaciones);

    const publicacionesConCalificacion = await Promise.all(
      data.content.map(async (publicacion) => {
        let calificacion;

        try {
          calificacion =
            await calificacionesService.getCalificacionByPublicacionId(
              publicacion.publicacionId
            );
        } catch (error) {
          // Si ocurre un error al obtener la calificación, asigna un valor predeterminado
          console.error(
            `Error al obtener la calificación para la publicación ${publicacion.publicacionId}`,
            error
          );
          calificacion = { calificacionGeneral: 0 };
        }

        return {
          ...publicacion,
          calificacion: calificacion,
        };
      })
    );

    // Asegúrate de actualizar el estado con las publicaciones procesadas
    setPublicaciones(publicacionesConCalificacion);
    console.log(
      "Estado publicaciones actualizado",
      publicacionesConCalificacion
    );

    setTotalPages(data.page.totalPages);
  };

  const getComentarios = async (
    publicacionId: number,
    trabajadorId: number,
    page = 0
  ) => {
    const calificacion =
      await calificacionesService.getCalificacionByPublicacionId(
        publicacionId,
        page
      );
    const userDto = await trabajadorService.getUserByTrabajadorId(trabajadorId);
    return { calificacion, userDto };
  };

  const getAllPublicaciones = async (page = 0) => {
    try {
      const data = await publicacionesService.getPublicaciones(page);
      const publicacionesConCalificacion = await Promise.all(
        data.content.map(async (publicacion: PublicacionConCalificacion) => {
          const calificacion =
            await calificacionesService.getCalificacionByPublicacionId(
              publicacion.publicacionId
            );
          return {
            ...publicacion,
            calificacion: calificacion || { calificacionGeneral: 0 },
          };
        })
      );
      return publicacionesConCalificacion as PublicacionConCalificacion[];
    } catch (error) {
      console.error("Error fetching publicaciones:", error);
    }
  };

  return {
    publicaciones,
    setPublicaciones,
    uniquePublicacion,
    loading,
    totalPages,
    setUniquePublicacion,
    getComentarios,
    getAllPublicaciones,
  };
};

export default usePublicaciones;
