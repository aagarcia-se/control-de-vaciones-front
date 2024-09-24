import { useEffect, useState } from "react";
import { obtenerInformacionDpi, obtenerInformacionPeresonal } from "../../services/EmpleadosServices/InformacionPersonal/obtenerInformacion";
import { getLocalStorageData } from "../../services/session/getLocalStorageData";

export function useInfoEmpleados() {
  const [informacionPersonal, setInformacionPersonal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInformacionPersonal = async () => {
      try {
        const userData = getLocalStorageData();
        if (!userData || !userData.idInfoPersonal) {
          throw new Error("ID de empleado no encontrado en el localStorage.");
        }
        const idInfoPersonal = userData.idInfoPersonal;
        const data = await obtenerInformacionPeresonal(idInfoPersonal);
        setInformacionPersonal(data);
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

    fetchInformacionPersonal();
  }, [error]);

  return { informacionPersonal, error, loading };
}


export function useInfoDpi() {
  const [infoDpi, setInfoDpi] = useState();
  const [errorDpi, setErrorDpi] = useState();
  const [loadingDpi, setLoadingDpi] = useState(true);

  useEffect(() => {
    const fetchInformacionDpi = async () => {
      try {
        const userData = getLocalStorageData();
        if (!userData || !userData.idDpi) {
          throw new Error("ID de empleado no encontrado en el localStorage.");
        }
        const  idDpi = userData.idDpi;
        const dataDpi = await obtenerInformacionDpi(idDpi);
        setInfoDpi(dataDpi);
      } catch (error) {
        // Verifica si error existe y tiene una propiedad message
        if (error && error.message && !error.response ){
          setErrorDpi("servicio no disponible, intente más tarde");
        }
        // Verifica si error.response existe y tiene data con responseData
        else if (
          error &&
          error.response 
        ) {
          setErrorDpi(error.response.data.responseData);
        }
        // Maneja otros casos generales de error
        else {
          setErrorDpi("Ocurrió un error!!");
        }
      } finally {
        setLoadingDpi(false);
      }
    };

    fetchInformacionDpi();
  }, [errorDpi]);

  return { infoDpi, errorDpi, loadingDpi };
}
