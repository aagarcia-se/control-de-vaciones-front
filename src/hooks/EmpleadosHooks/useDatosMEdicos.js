import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";
import { obtenerDatosMedicos } from "../../services/EmpleadosServices/DatosMedicos/obtenerDatosMedicos.js";


export function useDatoMedicos() {
    const [datosMedicos, setDatosMedicos] = useState(null);
    const [errorDM, setErrorDM] = useState(null);
    const [loadingDM, setLoadingDM] = useState(true);
  
    useEffect(() => {
      const fetchDatosLaborales = async () => {
        try {
          const userData = getLocalStorageData();
          if (!userData || !userData.idInfoPersonal) {
            throw new Error("ID de empleado no encontrado en el localStorage.");
          }
          const idInfoPersonal = userData.idInfoPersonal;
          const data = await obtenerDatosMedicos(idInfoPersonal);
          setDatosMedicos(data);
        } catch (error) {
          // Verifica si error existe y tiene una propiedad message
          if (error && error.message && !error.response ){
            setErrorDM("Servicio no disponible, intente más tarde");
          }
          // Verifica si error.response existe y tiene data con responseData
          else if (
            error &&
            error.response 
          ) {
            setErrorDM(error.response.data.responseData);
          }
          // Maneja otros casos generales de error
          else {
            setErrorDM("Ocurrió un error!!");
          }
        } finally {
          setLoadingDM(false);
        }
      };
  
      fetchDatosLaborales();
    }, [errorDM]);
  
    return { datosMedicos, errorDM, loadingDM };
  }