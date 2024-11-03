import api from "../../config/api.js";
import { endpointsPost } from "../../config/endpoints.js";


export const ingresarSolicitudService = async (dataSolicitud) => {
    try {
        const response = await api.post(`${endpointsPost.POST_INGRESA_SOLICITUD}`, dataSolicitud);
      return response.data;
    } catch (error) {
      throw error;
    }
  };