import api from './api';
import type { Estado } from '../types';

export const estadosService = {
  async getEstados() {
    const response = await api.get<Estado[]>('/estados');
    return response.data;
  },

  async getEstado(id: number) {
    const response = await api.get<Estado>(`/estados/${id}`);
    return response.data;
  },

  async createEstado(data: Omit<Estado, 'estadoId'>) {
    const response = await api.post<Estado>('/estados', data);
    return response.data;
  },

  async updateEstado(id: number, data: Partial<Estado>) {
    const response = await api.put<Estado>(`/estados/${id}`, data);
    return response.data;
  },

  async deleteEstado(id: number) {
    await api.delete(`/estados/${id}`);
  }
};