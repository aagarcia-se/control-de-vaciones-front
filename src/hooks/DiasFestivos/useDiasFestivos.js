import { useEffect, useState } from "react";
import { getDiasFestivos } from "../../services/EmpleadosServices/DiasFestivos/GetDiasFestivos.js";

export function useDiasFestivos() {
    const [diasFestivos, setDiasFestivos] = useState(null);
    const [errorDF, setErrorDF] = useState(null);
    const [loadingDF, setLoadingDF] = useState(true);
  
    useEffect(() => {
      const fetchDiasFestivos = async () => {
        try {
          const data = await getDiasFestivos();
          setDiasFestivos(data);
        } catch (error) {
          // Verifica si error existe y tiene una propiedad message
          if (error && error.message && !error.response ){
            setErrorDF("Servicio no disponible, intente más tarde");
          }
          // Verifica si error.response existe y tiene data con responseData
          else if (
            error &&
            error.response 
          ) {
            setErrorDF(error.response.data.responseData);
          }
          // Maneja otros casos generales de error
          else {
            setErrorDF("Ocurrió un error!!");
          }
        } finally {
            setLoadingDF(false);
        }
      };
  
      fetchDiasFestivos();
    }, [errorDF]);
  
    return { diasFestivos, errorDF, loadingDF };
  }