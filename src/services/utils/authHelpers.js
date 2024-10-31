// src/utils/authHelpers.js

export const handleUserRedirect = (navigate, userData) => {
  const { idRol } = userData; // Suponiendo que el rol del usuario está en `idRol`

  // Redirige a diferentes rutas según el rol
  switch (idRol) {
    case 1:
      navigate("/panel"); // Super usuario (todos los privilegios)
      break;
    case 3:
      navigate("/panel"); // Recursos humanos
      break;
    case 4:
      navigate("/empleados/home"); // (Empleado)
    case 5:
      navigate("/empleados/home"); // Empleado (Coordinaor)
      break;
    default:
      navigate("/"); // Redirigir a un panel general o página predeterminada
      break;
  }
};
