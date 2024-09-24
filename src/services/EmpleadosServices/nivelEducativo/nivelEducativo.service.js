import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";


export const obtenerNivelEductivo = async (idInfoPersonal) => {
    try {
        const response = await api.get(`${endpoints.GET_NIVEL_ACADEMICO}/${idInfoPersonal}`)
      return response.data.nivelEducativoInf;
    } catch (error) {
      throw error;
    }
  };