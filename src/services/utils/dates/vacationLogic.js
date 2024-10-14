// vacationLogic.js
import dayjs from "dayjs";
import { isHoliday, calculateBusinessDays } from "../../../services/utils/dates/vacationUtils.js"; // Ajusta la ruta según la ubicación del archivo

export const calculateNextWorkDate = (selectedEndDate) => {
  let nextDate = dayjs(selectedEndDate).add(1, "day");

  // Verificar si la fecha es un día festivo o fin de semana
  while (nextDate.day() === 6 || nextDate.day() === 0 || isHoliday(nextDate)) {
    nextDate = nextDate.add(1, "day");
  }

  return nextDate.format("YYYY-MM-DD");
};

export const getProgrammedDays = (startDate, endDate) => {
  return calculateBusinessDays(startDate, endDate);
};
