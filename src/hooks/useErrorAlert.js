// hooks/useErrorAlert.js
import { useState, useEffect, useContext } from "react";
import AuthContext from "../services/context/AuthContext";

export function useErrorAlert() {
  const [alertVisible, setAlertVisible] = useState(false);
  const { error } = useContext(AuthContext); 
  useEffect(() => {
    if (error) {
      setAlertVisible(true);
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return {alertVisible, error };
}
