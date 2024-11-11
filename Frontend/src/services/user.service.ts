import { UserResponseDTO } from "../types";
import api from "./api";

export const userService = {
  async getUsuarios() {
    const response = await api.get("/usuarios/paginado"); // Asegúrate de que este endpoint devuelva la lista de usuarios
    return response.data;
  },

  async updateUser(id: number, data: Partial<UserResponseDTO>) {
    const response = await api.put<UserResponseDTO>(`/usuarios/${id}`, data);
    localStorage.setItem("userResponseDTO", JSON.stringify(response.data));
    return response.data;
  },
};
