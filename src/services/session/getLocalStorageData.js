// getlocalStorageData.js - obtiene los datos de usuario seteados en el inicio de sesion

export const getLocalStorageData = () => {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      return JSON.parse(userData);
    }
    
    return null; // Retorna null si no hay datos en localStorage
  };
  