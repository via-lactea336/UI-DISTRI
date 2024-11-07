import { UserResponseDTO } from "../types";
import api from "./api";

export const trabajadorService = {
  async getUserByTrabajadorId(id: number) {
    const response = await api.get<UserResponseDTO>(`/trabajadores/user/${id}`);
    return response.data;
  },
};
