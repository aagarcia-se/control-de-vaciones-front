import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";
import { obtenerDatosSoli } from "../../services/EmpleadosServices/PertenenciaSociolinguistica/ObtenerDatosSoli.js";


export function usePertenenciaSoli() {
    const [datosSoli, setDatosSoli] = useState(null);
    const [errorSL, setErrorSL] = useState(null);
    const [loadingSL, setLoadingSL] = useState(true);
  
    useEffect(() => {
      const fetchDatosSoli = async () => {
        try {
          const userData = getLocalStorageData();
          if (!userData || !userData.idInfoPersonal) {
            throw new Error("ID de empleado no encontrado en el localStorage.");
          }
          const idInfoPersonal = userData.idInfoPersonal;
          const data = await obtenerDatosSoli(idInfoPersonal);
          setDatosSoli(data);
        } catch (error) {
          // Verifica si error existe y tiene una propiedad message
          if (error && error.message && !error.response ){
            setErrorSL("Servicio no disponible, intente más tarde");
          }
          // Verifica si error.response existe y tiene data con responseData
          else if (
            error &&
            error.response 
          ) {
            setErrorSL(error.response.data.responseData);
          }
          // Maneja otros casos generales de error
          else {
            setErrorSL("Ocurrió un error!!");
          }
        } finally {
            setLoadingSL(false);
        }
      };
  
      fetchDatosSoli();
    }, [errorSL]);
  
    return { datosSoli, errorSL, loadingSL };
  }