import api from "./api";
import type {
  Calificacion,
  CalificacionDetalle,
  CalificacionGeneralCreate,
} from "../types";

export const calificacionesService = {
  async getCalificaciones() {
    const response = await api.get<Calificacion[]>("/calificaciones");
    return response.data;
  },

  async getCalificacion(id: number) {
    const response = await api.get<Calificacion>(`/calificaciones/${id}`);
    return response.data;
  },

  async getCalificacionByPublicacionId(publicacionId: number, page = 0) {
    const response = await api.get<Calificacion>(
      `/calificaciones/publicacion/${publicacionId}?page=${page}&size=3`
    );
    return response.data;
  },

  async createCalificacion(data: CalificacionGeneralCreate) {
    const response = await api.post<Calificacion>("/calificaciones", data);
    return response.data;
  },

  async updateCalificacion(id: number, data: Partial<Calificacion>) {
    const response = await api.put<Calificacion>(`/calificaciones/${id}`, data);
    return response.data;
  },

  async deleteCalificacion(id: number) {
    await api.delete(`/calificaciones/${id}`);
  },

  // Calificación Detalle endpoints
  async getDetalles(calificacionId: number) {
    const response = await api.get<CalificacionDetalle[]>(
      `/calificaciones-detalle/${calificacionId}`
    );
    return response.data;
  },

  async createDetalle(
    data: Omit<CalificacionDetalle, "calificacionDetalleId">
  ) {
    const response = await api.post<CalificacionDetalle>(
      "/calificaciones-detalle",
      data
    );
    return response.data;
  },

  async updateDetalle(id: number, data: Partial<CalificacionDetalle>) {
    const response = await api.put<CalificacionDetalle>(
      `/calificaciones-detalle/${id}`,
      data
    );
    return response.data;
  },

  async deleteDetalle(id: number) {
    await api.delete(`/calificaciones-detalle/${id}`);
  },
};
