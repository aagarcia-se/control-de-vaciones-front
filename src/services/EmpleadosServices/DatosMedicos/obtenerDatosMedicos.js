import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";

export const obtenerDatosMedicos = async (idInfoPersonal) => {
    try {
        const response = await api.get(`${endpoints.GET_DATOS_MEDIOS}/${idInfoPersonal}`)
      return response.data.datosMedicos;
    } catch (error) {
      throw error;
    }
  };