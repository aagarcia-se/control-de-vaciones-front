import { acreditarDiasService } from "./ControlDiasVacaciones.service";
import {formatDate} from "../../utils/dates/vacationUtils"


export const GuardarDiasAcreditados = async (data) => {
    try {
      if (!data || !data.idEmpleado || !data.idInfoPersonal || !data.fechaIngreso) {
        throw new Error("Datos insuficientes en localStorage.");
      }
  
      let payload = {
        idEmpleado: data.idEmpleado,
        idInfoPersonal: data.idInfoPersonal,
        fechaIngreso: formatDate(data.fechaIngreso),
      };
  
      // Llamada al servicio sin esperar ni actualizar el estado del frontend
      await acreditarDiasService(payload);
      return 1;
      
    } catch (error) {
      throw new Error("No fue posible acreditar días...");
    }
  };
  
  