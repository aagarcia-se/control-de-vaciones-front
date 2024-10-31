import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";
import { getSolicitudes } from "../../services/VacationApp/GetSolicitudes.service.js";


export function useSolicitudes() {
  const [solicitudesU, setSolicitudesU] = useState([]); // Corregido el nombre
  const [errorU, setErrorU] = useState(null);
  const [loadingU, setLoadingU] = useState(true);
  const [cantadSolicitudes, setCanidadSolicitudes] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const userData = getLocalStorageData();
        if (!userData || !userData.unidad) {
          throw new Error("Sin datos en localStorage.");
        }

        const { unidad } = userData;
        const data = await getSolicitudes(unidad);
        
        const cantidadEnviadas = data.filter(solicitud => solicitud.estadoSolicitud === 'enviada').length;
        setCanidadSolicitudes(cantidadEnviadas); // Establecer la cantidad de solicitudes enviadas

        setSolicitudesU(data);
      } catch (error) {
        if (error?.message && !error.response) {
            setErrorU("Servicio no disponible, intente más tarde");
        } else if (error?.response?.data?.responseData) {
            setErrorU(error.response.data.responseData);
        } else {
            setErrorU("Ocurrió un error!!");
        }
      } finally {
        setLoadingU(false);
      }
    };

    fetchSolicitudes();
  }, []); // Corregido: dependencias vacías para evitar llamadas innecesarias

  return { solicitudesU, cantadSolicitudes, errorU, loadingU };
}
