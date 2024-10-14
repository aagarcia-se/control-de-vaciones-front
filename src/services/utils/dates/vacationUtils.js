// vacationUtils.js

import dayjs from "dayjs";
import { diasFestivos } from "../GetDiasFestivos";

export const isHoliday = (date) => {
    
  const dayMonth = dayjs(date).format("MM-DD"); // Formato solo mes y día
  return diasFestivos.find((holiday) => holiday.date === dayMonth);
};

export const isHalfDayHoliday = (date) => {
  const holiday = isHoliday(date);
  return holiday && holiday.isHalfDay;
};

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
