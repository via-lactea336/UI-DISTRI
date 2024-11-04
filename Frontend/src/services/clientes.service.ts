import { Cliente, UserResponseDTO } from "../types";
import api from "./api";

export const clientesService = {
  async getClientes() {
    const response = await api.get<Cliente[]>("/clientes");
    return response.data;
  },

  async getCliente(id: number) {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  async getUserByClienteId(userId: number) {
    const response = await api.get<UserResponseDTO>(`/clientes/user/${userId}`);
    return response.data;
  },

  async createCliente(data: Omit<Cliente, "clienteId">) {
    const response = await api.post<Cliente>("/clientes", data);
    return response.data;
  },

  async updateCliente(id: number, data: Partial<Cliente>) {
    const response = await api.put<Cliente>(`/clientes/${id}`, data);
    return response.data;
  },

  async deleteCliente(id: number) {
    await api.delete(`/clientes/${id}`);
  },
};
