import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";

export const obtenerDatosSoli = async (idInfoPersonal) => {
    try {
        const response = await api.get(`${endpoints.GET_DATOS_SOLI}/${idInfoPersonal}`)
      return response.data.infoSoli;
    } catch (error) {
      throw error;
    }
  };