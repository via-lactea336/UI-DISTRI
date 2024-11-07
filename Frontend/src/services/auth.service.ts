import {
  LoginCredentials,
  TrabajadorRegisterData,
  User,
  UserResponseDTO,
} from "../types";
import api from "./api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<UserResponseDTO> {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userResponseDTO", JSON.stringify(response.data));
    }
    return response.data as UserResponseDTO;
  },

  async register(data: User | TrabajadorRegisterData) {
    const response = await api.post("/auth/register", data);
    return response.status;
  },

  async validateToken(): Promise<boolean> {
    const response = await api.get("/auth/validate-token");
    return response.data.isValid;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userResponseDTO");
  },
};
