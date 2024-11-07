import { ContratoCreate, ContratoDTO, PaginatedResponse } from "../types";
import api from "./api";


export const contratoService = {
    async getContratos() {
        const response = await api.get<PaginatedResponse<ContratoDTO>>("/contratos");
        return response.data;
    },
    async createContrato(data: ContratoCreate) {
        const response = await api.post<ContratoCreate>("/contratos", data);
        return response.data;
    }
}