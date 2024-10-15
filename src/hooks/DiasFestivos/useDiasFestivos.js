import { useEffect, useState } from "react";
import { loadDiasFestivos } from "../../services/utils/dates/vacationUtils";
import { getDiasFestivos } from "../../services/EmpleadosServices/DiasFestivos/GetDiasFestivos";

const useDiasFestivos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorDF, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        await loadDiasFestivos(getDiasFestivos);
        setIsLoading(true);
      } catch (err) {
        setError("Error al cargar los días festivos.");
        setIsLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  return { isLoading, errorDF };
};

export default useDiasFestivos;
