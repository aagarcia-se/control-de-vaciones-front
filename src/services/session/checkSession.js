//Valida si la sesion esta iniciada
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckSession = () => {
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      if (storedUserData) {
        setIsSessionVerified(true); // La sesión está activa, se puede navegar
      } else {
        navigate("/");  // Redirige a la ruta principal si no hay sesión
      }
    };

    checkSession();
  }, [navigate]);

  return isSessionVerified;
};
