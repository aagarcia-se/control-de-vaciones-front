import api from '../../../config/api.js'
import endpoints from '../../../config/endpoints.js'

export const obtenerInformacionPeresonal = async (idEmleado) => {
    try {
        const response = await api.get(`${endpoints.getInfoPeresonal}/${idEmleado}`)
      return response.data.infoPersonal;
    } catch (error) {
      throw error;
    }
  };
  

  export const obtenerInformacionDpi = async (idEmleado) => {
    try {
      const response = await api.get(`${endpoints.getInfoDpi}/${idEmleado}`)
      return response.data.dpiData;
    } catch (error) {
      throw error;
    }
  };
  