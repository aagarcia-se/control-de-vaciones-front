import { endpointsPost } from "../../../config/endpoints.js";
import api from "../../../config/api.js";


export const acreditarDiasService = async (dataAcreditarDias) => {
    try {
        const response = await api.post(`${endpointsPost.POST_ACREDITARDIAS}`, dataAcreditarDias);
      return response.data;
    } catch (error) {
      throw error;
    }
  };