export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  pageNumber: number;
  // Puedes agregar más campos si es necesario
}

import api from "./api";
import { Estado } from "../types";

export const estadosService = {
  async getEstados() {
    // Ahora la respuesta será de tipo PaginatedResponse<Estado>
    const response = await api.get<PaginatedResponse<Estado>>("/estados");
    return response.data; // Esto tiene la propiedad 'content' que contiene el array de estados
  },

  async getEstado(id: number) {
    const response = await api.get<Estado>(`/estados/${id}`);
    return response.data;
  },

  async createEstado(data: Omit<Estado, "estadoId">) {
    const response = await api.post<Estado>("/estados", data);
    return response.data;
  },

  async updateEstado(id: number, data: Partial<Estado>) {
    console.log("Datos enviados en updateEstado:", data);
    const response = await api.put<Estado>(`/estados/${id}`, data);
    return response.data;
  },
  async deleteEstado(id: number) {
    await api.delete(`/estados/${id}`);
  },
};
