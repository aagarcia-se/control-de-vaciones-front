import api from "../../config/api.js";
import endpoints from "../../config/endpoints.js";

export const getSolicitudById = async (idEmpleado, idInforPersonal) => {
    try {
        const response = await api.get(`${endpoints.GET_SOLICITUDBYID_VACACIONES}?idEmpleado=${idEmpleado}&idInfoPersonal=${idInforPersonal}`);
      return response.data.solicitud;
    } catch (error) {
      throw error;
    }
  };