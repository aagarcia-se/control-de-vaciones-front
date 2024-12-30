// src/utils/authHelpers.js

const roleRoutes = {
  4: [
    "/empleados/home",
    "/empleados/infoPersonal",
    "/empleados/family",
    "/empleados/informacion-profesional",
    "/empleados/informacion-General",
    "/empleados/informacion-laboral",
    "/empleados/programar-vacaciones",
    "/empleados/programar-fecha",
  ],
  5: [
    "/empleados/home",
    "/empleados/infoPersonal",
    "/empleados/family",
    "/empleados/informacion-profesional",
    "/empleados/informacion-General",
    "/empleados/informacion-laboral",
    "/empleados/programar-vacaciones",
    "/empleados/programar-fecha",
    "/empleados/solicitudes",
  ],
};

export const handleUserRedirect = (navigate, userData) => {
  const { idRol } = userData; // Suponiendo que el rol del usuario está en `idRol`

  // Redirige a diferentes rutas según el rol
  switch (idRol) {
    case 1:
      navigate("/panel"); // Super usuario (todos los privilegios)
      break;
    case 3:
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
