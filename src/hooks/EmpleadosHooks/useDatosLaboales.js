import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";
import { obtenerDatosSoli } from "../../services/EmpleadosServices/PertenenciaSociolinguistica/ObtenerDatosSoli.js";
import { obtenerDatosLaborales } from "../../services/EmpleadosServices/DatosSoli/DatosLaborales.js";


export function useDatosLaborales() {
    const [datosLaborales, setDatosLaborales] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDatosLaborales = async () => {
        try {
          const userData = getLocalStorageData();
          if (!userData || !userData.idInfoPersonal) {
            throw new Error("ID de empleado no encontrado en el localStorage.");
          }
          const idInfoPersonal = userData.idInfoPersonal;
          const data = await obtenerDatosLaborales(idInfoPersonal);
          setDatosLaborales(data);
        } catch (error) {
          // Verifica si error existe y tiene una propiedad message
          if (error && error.message && !error.response ){
            setError("Servicio no disponible, intente más tarde");
          }
          // Verifica si error.response existe y tiene data con responseData
          else if (
            error &&
            error.response 
          ) {
            setError(error.response.data.responseData);
          }
          // Maneja otros casos generales de error
          else {
            setError("Ocurrió un error!!");
          }
        } finally {
            setLoading(false);
        }
      };
  
      fetchDatosLaborales();
    }, [error]);
  
    return { datosLaborales, error, loading };
  }