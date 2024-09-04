// hooks/useErrorAlert.js
import { useState, useEffect, useContext } from "react";

export function useErrorAlert(error) {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }, [error]);

  return { alertVisible, error };
}



export function useErrorAlertTemp(error) {
  const [alertVisible, setAlertVisible] = useState(false);
  useEffect(() => {
    if (error) {
      setAlertVisible(true);
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return {alertVisible };
}
