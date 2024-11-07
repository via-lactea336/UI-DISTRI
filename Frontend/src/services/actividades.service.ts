import { ActividadCreate, ActividadesDTO, PaginatedResponse } from "../types";
import api from "./api";

export const actividadesService = {
  async getActividades() {
    const response = await api.get<ActividadesDTO[]>("/actividades");
    return response.data;
  },

  async getActividad(id: number) {
    const response = await api.get<ActividadesDTO>(`/actividades/${id}`);
    return response.data;
  },

  async createActividad(data: ActividadCreate) {
    const response = await api.post<ActividadesDTO>("/actividades", data);
    return response.data;
  },

  async updateActividad(id: number, data: Partial<ActividadesDTO>) {
    const response = await api.put<ActividadesDTO>(`/actividades/${id}`, data);
    return response.data;
  },

  async deleteActividad(id: number) {
    await api.delete(`/actividades/${id}`);
  },

  async getActividadesByEventoId(eventoId: number) {
    const response = await api.get<PaginatedResponse<ActividadesDTO>>(
      `/actividades/evento/${eventoId}`
    );
    return response.data;
  },
};
