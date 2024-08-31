// authService.js
import api from '../../config/api.js' // Importa la instancia de Axios
import endpoints from '../../config/endpoints.js' // Importa los endpoints

export const login = async (username, password) => {
  try {
    const response = await api.post(endpoints.login, {
        usuario: username,
        pass: password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
