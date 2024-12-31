import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageData } from "../../services/session/getLocalStorageData";

const ProtectedRoute = ({ allowedRoles }) => {
  const userData = getLocalStorageData();

  if (!userData) {
    // Si no hay sesión activa, redirigir al login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userData.idRol)) {
    // Si el usuario no tiene el rol permitido, redirigir a "acceso denegado"
    return <Navigate to="/access-denied" />;
  }

  // Renderizar los componentes hijos si pasa las validaciones
  return <Outlet />;
};

export default ProtectedRoute;