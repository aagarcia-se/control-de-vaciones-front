import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = ({ open, message, severity, autoHideDuration, onClose }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
    if (open) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); // Cierra la alerta después del tiempo especificado
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <>
      {isVisible && (
        <Alert severity={severity} onClose={onClose}>
          <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
          {message}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;
