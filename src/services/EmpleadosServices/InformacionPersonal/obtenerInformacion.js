import api from '../../../config/api.js'
import endpoints from '../../../config/endpoints.js'

export const obtenerInformacionPeresonal = async (idInfoPersonal) => {
    try {
        const response = await api.get(`${endpoints.getInfoPeresonal}/${idInfoPersonal}`)
      return response.data.infoPersonal;
    } catch (error) {
      throw error;
    }
  };
  

  export const obtenerInformacionDpi = async (idDpi) => {
    try {
      const response = await api.get(`${endpoints.getInfoDpi}/${idDpi}`)
      return response.data.dpiData;
    } catch (error) {
      throw error;
    }
  };
  