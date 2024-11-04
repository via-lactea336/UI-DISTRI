import api from "./api";
import type { Categoria, PaginatedResponse } from "../types";

export const categoriasService = {
  async getCategorias() {
    const response = await api.get<PaginatedResponse<Categoria>>("/categorias");
    return response.data;
  },

  async getCategoria(id: number) {
    const response = await api.get<Categoria>(`/categorias/${id}`);
    return response.data;
  },

  async createCategoria(data: Omit<Categoria, "categoriaId">) {
    const response = await api.post<Categoria>("/categorias", data);
    return response.data;
  },

  async updateCategoria(id: number, data: Partial<Categoria>) {
    const response = await api.put<Categoria>(`/categorias/${id}`, data);
    return response.data;
  },

  async deleteCategoria(id: number) {
    await api.delete(`/categorias/${id}`);
  },
};
