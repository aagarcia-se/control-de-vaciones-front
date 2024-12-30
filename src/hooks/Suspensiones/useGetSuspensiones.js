import { useEffect, useState } from "react";
import { GetSuspensiones } from "../../services/EmpleadosServices/Suspensiones/Suspensiones.service";

export function useGetSuspensiones() {
  const [suspensiones, setSuspensiones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuspensiones = async () => {
      try {
        const data = await GetSuspensiones();
        setSuspensiones(data);
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

    fetchSuspensiones();
  }, [error]);

  return { suspensiones, error, loading };
}

