import { ingresarSolicitudService } from "../../VacationApp/InresarSolicitud.service";

export const handleSubmitIngresarSolicitud = async (event, data) => {
    event.preventDefault(); // Prevenir la recarga de página
    try {
      const response = await ingresarSolicitudService(data);
      console.log("Solicitud enviada:", response);
      alert("¡Solicitud enviada exitosamente!");
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
      alert("Hubo un error al enviar la solicitud.");
    }
  };
  