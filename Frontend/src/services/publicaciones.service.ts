import api from "./api";
import type {
  Publicacion,
  PublicacionConCalificacion,
  PublicacionResponse,
} from "../types";
import { calificacionesService } from "./calificaciones.service";

// Utility function to remove accents
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const publicacionesService = {
  async getPublicaciones(page: number = 0): Promise<PublicacionResponse> {
    const response = await api.get<PublicacionResponse>(
      `/publicaciones?page=${page}`
    );
    return response.data;
  },

  async getPublicacion(id: number): Promise<Publicacion> {
    const response = await api.get<Publicacion>(`/publicaciones/${id}`);
    return response.data;
  },

  async getPublicacionesByCategoriaId(
    categoriaId: number,
    page: number = 0
  ): Promise<PublicacionResponse> {
    const response = await api.get<PublicacionResponse>(
      `/publicaciones?categoriaId=${categoriaId}&page=${page}`
    );
    return response.data;
  },

  async getPublicacionesByCategoriaNombre(
    nombreCategoria: string,
    page: number = 0
  ): Promise<PublicacionResponse> {
    const response = await api.get<PublicacionResponse>(
      `/publicaciones?nombreCategoria=${nombreCategoria}&page=${page}`
    );
    return response.data;
  },

  async getPublicacionesByDescripcion(
    query: string,
    page: number = 0
  ): Promise<PublicacionResponse> {
    const normalizedDescripcion = removeAccents(query);
    const response = await api.get<PublicacionResponse>(
      `/publicaciones?query=${normalizedDescripcion}&page=${page}`
    );
    return response.data;
  },

  async getPublicacionesByTrabajadorId(
    trabajadorId: number,
    page: number = 0
  ): Promise<PublicacionResponse> {
    const response = await api.get<PublicacionResponse>(
      `/publicaciones?trabajadorId=${trabajadorId}&page=${page}`
    );
    return response.data;
  },

  async createPublicacion(
    data: Omit<Publicacion, "publicacionId">
  ): Promise<Publicacion> {
    const response = await api.post<Publicacion>("/publicaciones", data);
    return response.data;
  },

  async updatePublicacion(
    id: number,
    data: Partial<Publicacion>
  ): Promise<Publicacion> {
    const response = await api.put<Publicacion>(`/publicaciones/${id}`, data);
    return response.data;
  },

  async deletePublicacion(id: number): Promise<void> {
    await api.delete(`/publicaciones/${id}`);
  },

  async getPublicacionConCalificacion(
    id: number
  ): Promise<PublicacionConCalificacion> {
    const publicacion = await this.getPublicacion(id);
    const calificacion =
      await calificacionesService.getCalificacionByPublicacionId(id);
    return {
      ...publicacion,
      calificacion: calificacion || { calificacionGeneral: 0 },
    };
  },
};
