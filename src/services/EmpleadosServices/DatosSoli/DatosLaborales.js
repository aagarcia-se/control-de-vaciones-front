import api from "../../../config/api.js";
import endpoints from "../../../config/endpoints.js";

export const obtenerDatosLaborales = async (idInfoPersonal) => {
    try {
        const response = await api.get(`${endpoints.GET_DATOS_LABORALES}/${idInfoPersonal}`)
      return response.data.datosLaborales;
    } catch (error) {
      throw error;
    }
  };