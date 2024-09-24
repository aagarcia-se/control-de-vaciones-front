import { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/session/getLocalStorageData";
import { obtenerNivelEductivo } from "../../services/EmpleadosServices/nivelEducativo/nivelEducativo.service";


export function useNivelEducativo() {
    const [nivelEducativo, setNivelEducativo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchNivelEducativo = async () => {
        try {
          const userData = getLocalStorageData();
          if (!userData || !userData.idInfoPersonal) {
            throw new Error("ID de empleado no encontrado en el localStorage.");
          }
          const idInfoPersonal = userData.idInfoPersonal;
          const data = await obtenerNivelEductivo(idInfoPersonal);
          setNivelEducativo(data);
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
  
      fetchNivelEducativo();
    }, [error]);
  
    return { nivelEducativo, error, loading };
  }