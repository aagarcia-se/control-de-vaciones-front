// services/useLogout.js - Finalizar sesion
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const useLogout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem("userData");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };

  return { handleLogout };
};

export default useLogout;
