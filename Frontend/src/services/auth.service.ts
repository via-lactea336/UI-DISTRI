import { LoginCredentials, RegisterData, UserToken } from "../types";
import api from "./api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<UserToken> {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data as UserToken;
  },

  async register(data: RegisterData) {
    const response = await api.post("/auth/register", data);
    return response.status;
  },

  async validateToken(): Promise<boolean> {
    const response = await api.get("/auth/validate-token");
    return response.data.isValid;
  },

  logout() {
    localStorage.removeItem("token");
  },
};
