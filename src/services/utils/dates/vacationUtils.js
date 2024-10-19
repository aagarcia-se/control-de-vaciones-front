import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

let diasFestivos = []; // Variable para almacenar los días festivos obtenidos de la API (Variable global)
// Registrar el plugin
dayjs.extend(isSameOrAfter);

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


// Funcin para calcular la fecha fin, incluyendo el primer día seleccionado siempre y cuando este sea festivo
export const calcularFechaFin = (startDate, diasVacaciones) => {
  let fechaFin = dayjs(startDate);
  let diasContados = isHoliday(startDate) ? 0 : 1; // si es la fecha de inicio es dia festivo la fecha de inicio sera el dia siguiente al seleccionado de lo contrario se contara el primer día como parte de las vacaciones.

  while (diasContados < diasVacaciones) {
    fechaFin = fechaFin.add(1, "day");
    if (fechaFin.day() !== 0 && fechaFin.day() !== 6 && !isHoliday(fechaFin)) {
      diasContados++;
    }
  }
  return fechaFin;
};


// Función para calcular la próxima fecha laboral disponible.
export const calcularProximaFechaLaboral = (fecha) => {
  let proximaFecha = dayjs(fecha).add(1, "day");

  while (proximaFecha.day() === 0 || proximaFecha.day() === 6 || isHoliday(proximaFecha)) {
    proximaFecha = proximaFecha.add(1, "day");
  }

  return proximaFecha;
};


// Nueva función: Validar que no se seleccione sábado o domingo.
export const esDiaLaboral = (fecha) => {
  const dia = dayjs(fecha).day();
  return dia !== 0 && dia !== 6; // 0: Domingo, 6: Sábado
};

//Funcion para determinar si la fecha de hoy es mayor a la fecha de vencimiento de vacaciones
export const validarFechaFin = (fechaFin) => {
  const today = dayjs().startOf('day'); // Fecha de hoy sin hora
  const fechaFinWithFormat = dayjs(fechaFin).startOf('day'); // Fecha de BD sin hora

  // Verificar si hoy es mayor que la fecha de BD
  return today.isSameOrAfter(fechaFinWithFormat, 'day');
};

