import { useEffect } from "react";
import { validarFechaFin } from "../../services/utils/dates/vacationUtils"; // Ajusta la ruta según tu proyecto

export const useFinalizarEstado = (solicitud) => {
  useEffect(() => {
    const actualizarEstadoSolicitud = async () => {
      try {

        console.log("la fecha es diferente a hoy o es igual")

      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Verificar si la solicitud es autorizada y si la fecha es válida
    if (solicitud && solicitud.estadoSolicitud.toLowerCase() === "autorizada") {
      const fechaFinVacaciones = solicitud.fechaFinVacaciones;

      if (validarFechaFin(fechaFinVacaciones)) {
        actualizarEstadoSolicitud();
      }
    }
  }, [solicitud]); // Dependencia: vuelve a ejecutar si cambia `solicitud`
};
