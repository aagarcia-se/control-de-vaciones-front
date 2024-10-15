import dayjs from "dayjs";

let diasFestivos = []; // Variable para almacenar los días festivos obtenidos de la API

// Llamada a la API para obtener los días festivos
export const loadDiasFestivos = async (getDiasFestivos) => {
  try {
    diasFestivos = await getDiasFestivos();
  } catch (error) {
    console.error("Error cargando días festivos:", error);
  }
};

// Verifica si una fecha es un día festivo
export const isHoliday = (date) => {
  const dayMonth = dayjs(date).format("MM-DD"); // Formato solo mes y día
  return diasFestivos.find((holiday) =>  holiday.fechaDiaFestivo === dayMonth);
};

// Verifica si un día festivo es de medio día
export const isHalfDayHoliday = (date) => {
  const holiday = isHoliday(date);
  return holiday && holiday.medioDia;
};

// Calcula los días hábiles entre dos fechas
export const calculateBusinessDays = (startDate, endDate) => {
  let start = dayjs(startDate);
  let end = dayjs(endDate);
  let businessDays = 0;
  let halfDays = 0;

  while (start.isBefore(end) || start.isSame(end, "day")) {
    const dayOfWeek = start.day();
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
    const holiday = isHoliday(start);

    if (!isWeekend && !holiday) {
      businessDays++;
    } else if (!isWeekend && isHalfDayHoliday(start)) {
      halfDays += 0.5;
    }

    start = start.add(1, "day");
  }

  businessDays += halfDays;

  return businessDays;
};
