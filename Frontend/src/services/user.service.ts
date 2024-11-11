import api from "./api";
import { UserResponseDTO } from "../types";

export const userService = {
  async getUsuarios() {
    const response = await api.get("/usuarios"); // Asegúrate de que este endpoint devuelva la lista de usuarios
    return response.data;
  },

  async updateUser(id: number, data: Partial<UserResponseDTO>) {
    const response = await api.put<UserResponseDTO>(`/usuarios/${id}`, data);
    localStorage.setItem("userResponseDTO", JSON.stringify(response.data));
    return response.data;
  },
};
