import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";

export const getDiasFestivos = async () => {
    try {
        const response = await api.get(`${endpoints.GET_DIAS_FESTIVOS_C}`)
      return response.data.diasFestivos;
    } catch (error) {
      throw error;
    }
  };