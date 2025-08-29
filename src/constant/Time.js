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
      data.values = Array.from({ length: 12 }, (item, idx) => ({ // biến này không dùng quy ước bỏ qua (_)
        /**
         * Array.from(arrayLike, mapFn) 
         * arrayLike → đối tượng giống mảng, ví dụ { length: 12 }
            mapFn → hàm callback, nhận 2 tham số: (mapFn(value, index)) value → giá trị hiện tại 
            của phần tử (nếu mảng chưa có giá trị thì thường là undefined)
              index → chỉ số của phần tử (0, 1, 2, …)
         * 
            Array.from({ length: 12 })
            Array.from là một hàm tạo mảng mới.
            { length: 12 } → tạo một mảng có 12 phần tử.
            Lúc này mảng chưa có giá trị cụ thể, chỉ có 12 slot trống: [ , , , , , , , , , , , ]

            2️⃣ (_, idx) => ...
            Đây là hàm mapping cho mỗi phần tử của mảng.
            _ → giá trị của phần tử (ở đây không cần, nên dùng _ làm tên biến).
            idx → index của phần tử (từ 0 → 11).
         */
        name: `Tháng ${idx + 1}`,
        uv: Math.floor(Math.random() * 1000),
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
          uv: Math.floor(Math.random() * 1000),
        });
        currentDay += 7;
        index++;
      }
      return data;
    }

    // Có đủ Năm + Tháng + Tuần
    const totalDays = daysInMonth[month - 1];//Ví dụ: nếu month = 3 (tháng 3), thì daysInMonth[2] = 31 → totalDays = 31.
    const startDate = (week - 1) * 7 + 1;
    /**
     * tuần 1 → startDate = (1-1)*7 + 1 = 1
      tuần 2 → startDate = (2-1)*7 + 1 = 8
      tuần 3 → startDate = (3-1)*7 + 1 = 15
      tuần 4 → startDate = 22
      tuần 5 → startDate = 29
     */
    const endDate = Math.min(week * 7, totalDays); 
    /**
     * Tháng 2, 28 ngày, tuần 4 → week*7 = 28 → ok.
      Tháng 2, 28 ngày, tuần 5 → week*7 = 35 → endDate = min(35, 28) = 28.
     */
    for (let d = startDate; d <= endDate; d++) {
      data.days.push({
        name: String(d),
        uv: Math.floor(Math.random() * 1000),
      });
    }
    return data;
  }, [year, month, week]);
};
