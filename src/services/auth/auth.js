// authService.js
import api from '../../config/api.js' // Importa la instancia de Axios
import { endpointsPost } from '../../config/endpoints.js';



export const login = async (username, password) => {
  try {
    const response = await api.post(endpointsPost.login, {
        usuario: username,
        pass: password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
