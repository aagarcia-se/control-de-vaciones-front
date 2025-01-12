import axios from 'axios';
import { API_URL } from './enviroment';

const api = axios.create({
  baseURL: `${API_URL}`, // URL base para todas las solicitudes
  headers: {
    'Content-Type': 'application/json', // Encabezado predeterminado
    // Puedes agregar otros encabezados aquí
  }
});

export default api;
