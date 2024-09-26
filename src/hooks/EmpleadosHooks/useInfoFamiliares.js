import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData";
import { obtenerFamiliares } from "../../services/EmpleadosServices/InformcionFamiliares/Familares.services.js";


export function useInfoFamiliares() {
    const [familiares, setFamiliares] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchFamiliares = async () => {
        try {
          const userData = getLocalStorageData();
          if (!userData || !userData.idInfoPersonal) {
            throw new Error("ID de empleado no encontrado en el localStorage.");
          }
          const idEmpleado = userData.idInfoPersonal;
          const data = await obtenerFamiliares(idEmpleado);
          setFamiliares(data);
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
  
      fetchFamiliares();
    }, [error]);
  
    return { familiares, error, loading };
  }