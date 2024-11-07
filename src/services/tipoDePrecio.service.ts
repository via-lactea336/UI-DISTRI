import { PaginatedResponse, TipoDePrecio } from "../types";
import api from "./api";

export const tipoDePrecioService = {
  async getTipoDePrecios() {
    const response = await api.get<PaginatedResponse<TipoDePrecio>>(
      "/tipos-de-precio"
    );
    return response.data;
  },
};
