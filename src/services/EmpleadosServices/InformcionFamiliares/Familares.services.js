import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";

export const obtenerFamiliares = async (idEmleado) => {
    try {
        const response = await api.get(`${endpoints.GET_FAMILIARES}/${idEmleado}`)
      return response.data.familiares;
    } catch (error) {
      throw error;
    }
  };