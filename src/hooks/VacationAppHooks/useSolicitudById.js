import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";
import { getSolicitudById } from "../../services/VacationApp/GetSolicidudById.js";
import { validarCantidadDiasIngreso } from "../../services/utils/dates/vacationUtils.js";


export function useSolicitudById() {
  const [solicitud, setSolicitud] = useState(null); // Corregido el nombre
  const [diasValidos, setDiasValidos] = useState(null);
  const [errorS, setErrorS] = useState(null);
  const [loadingS, setLoadingS] = useState(true);

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const userData = getLocalStorageData();
        if (!userData || !userData.idEmpleado || !userData.idInfoPersonal) {
          throw new Error("Sin datos en localStorage.");
        }

        //validar hace cuantos dias ingreso
         const isValidDay =  validarCantidadDiasIngreso(userData.fechaIngreso);
         setDiasValidos(isValidDay);

        const { idEmpleado, idInfoPersonal } = userData;
        const data = await getSolicitudById(idEmpleado, idInfoPersonal);
        setSolicitud(data);
      } catch (error) {
        if (error?.message && !error.response) {
          setErrorS("Servicio no disponible, intente más tarde");
        } else if (error?.response?.data?.responseData) {
          setErrorS(error.response.data.responseData);
        } else {
          setErrorS("Ocurrió un error!!");
        }
      } finally {
        setLoadingS(false);
      }
    };

    fetchSolicitud();
  }, []); // Corregido: dependencias vacías para evitar llamadas innecesarias

  return { solicitud, diasValidos,  errorS, loadingS };
}
