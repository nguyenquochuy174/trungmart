import { useMemo } from "react";

export const useCalendarData = (year, month, week) => {
  return useMemo(() => {
    const data = { days: [], weeks: [], values: [] };

    if (!year || year === "0") {
      return data; // chưa chọn năm
    }

    const isLeapYear =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    const daysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    // Chỉ có Năm
    if (!month || month === "0") {
      data.values = Array.from({ length: 12 }, (_, idx) => ({
        name: `Tháng ${idx + 1}`,
        uv: Math.floor(Math.random() * 100),
      }));
      return data;
    }

    // Có Năm + Tháng, không có Tuần
    if (!week || week === "0") {
      const totalDays = daysInMonth[month - 1];
      let currentDay = 1;
      let index = 1;
      while (currentDay <= totalDays) {
        data.weeks.push({
          name: `Tuần ${index}`,
          uv: Math.floor(Math.random() * 100),
        });
        currentDay += 7;
        index++;
      }
      return data;
    }

    // Có đủ Năm + Tháng + Tuần
    const totalDays = daysInMonth[month - 1];
    const startDate = (week - 1) * 7 + 1;
    const endDate = Math.min(week * 7, totalDays);
    for (let d = startDate; d <= endDate; d++) {
      data.days.push({
        name: String(d),
        uv: Math.floor(Math.random() * 100),
      });
    }
    return data;
  }, [year, month, week]);
};
