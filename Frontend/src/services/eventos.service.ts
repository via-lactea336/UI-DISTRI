import api from "./api";
import { ActividadesDTO, EventoConActividadesDTO, EventoCreate, EventoDTO, PaginatedResponse } from "../types";
import { actividadesService } from "./actividades.service";

export const eventosService = {
  async getEventos() {
    const response = await api.get<PaginatedResponse<EventoDTO>>("/eventos");
    return response.data;
  },
  async getEvento(id: number) {
    const response = await api.get<EventoDTO>(`/eventos/${id}`);
    return response.data;
  },
  async createEvento(data: EventoCreate) {
    const response = await api.post<EventoDTO>("/eventos", data);
    return response.data;
  },
  async updateEvento(id: number, data: Partial<EventoDTO>) {
    const response = await api.put<EventoDTO>(`/eventos/${id}`, data);
    return response.data;
  },

  async deleteEvento(id: number) {
    await api.delete(`/eventos/${id}`);
  },
};
