// src/utils/authHelpers.js

export const handleUserRedirect = (navigate, userData) => {
    const { idRol } = userData; // Suponiendo que el rol del usuario está en `idRol`
  
    // Redirige a diferentes rutas según el rol
    switch (idRol) {
      case 1:
        navigate("/panel"); // Redirigir al panel de administrador
        break;
      case 4:
        navigate("/empleados/home"); // Redirigir al panel de usuario regular
        break;
      default:
        navigate("/panel"); // Redirigir a un panel general o página predeterminada
        break;
    }
  };
  