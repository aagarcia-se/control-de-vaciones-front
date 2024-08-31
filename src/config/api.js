import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base para todas las solicitudes
  headers: {
    'Content-Type': 'application/json', // Encabezado predeterminado
    // Puedes agregar otros encabezados aquí
  }
});

export default api;
