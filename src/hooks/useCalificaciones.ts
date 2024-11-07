import { useState, useEffect } from "react";
import { calificacionesService } from "../services/calificaciones.service";
import type { Calificacion, CalificacionDetalle } from "../types";
import toast from "react-hot-toast";

export const useCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalificaciones = async () => {
    try {
      setLoading(true);
      const data = await calificacionesService.getCalificaciones();
      setCalificaciones(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las calificaciones");
      toast.error("Error al cargar las calificaciones");
    } finally {
      setLoading(false);
    }
  };

  const createCalificacion = async (
    data: Omit<Calificacion, "calificacionId">
  ) => {
    try {
      const newCalificacion = await calificacionesService.createCalificacion(
        data
      );
      setCalificaciones([...calificaciones, newCalificacion]);
      toast.success("Calificación creada exitosamente");
      return newCalificacion;
    } catch (err) {
      toast.error("Error al crear la calificación");
      throw err;
    }
  };

  const createCalificacionDetalle = async (
    data: Omit<CalificacionDetalle, "calificacionDetalleId">
  ) => {
    try {
      const response = await calificacionesService.createDetalle(data);
      toast.success("Calificación creada exitosamente");

      return response;
    } catch (err) {
      toast.error("Error al crear el detalle de la calificación");
      throw err;
    }
  };

  const getDetalles = async (calificacionId: number) => {
    try {
      return await calificacionesService.getDetalles(calificacionId);
    } catch (err) {
      toast.error("Error al obtener los detalles de la calificación");
      throw err;
    }
  };

  useEffect(() => {
    fetchCalificaciones();
  }, []);

  return {
    calificaciones,
    loading,
    error,
    fetchCalificaciones,
    createCalificacion,
    createCalificacionDetalle,
    getDetalles,
  };
};
