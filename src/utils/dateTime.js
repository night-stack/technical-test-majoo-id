export const getWeeks = () => {
  const daysArr = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  const monthsArr = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  const now = new Date();
  let day = now.getDay() - 4;
  let date = now.getDate() - 3;
  let month = now.getMonth();
  let year = now.getFullYear();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  let daysList = [];

  for (let i = 0; i < 14; i++) {
    daysList.push({
      code: daysArr[day].substr(0, 3).toLocaleUpperCase(),
      date,
      day: daysArr[day],
      month: monthsArr[month],
      year,
    });

    day++;
    date++;
    if (day === 7) {
      day = 0;
    }
    if (date > daysInMonth) {
      date = 1;
      month++;
    }
    if (month === 12) {
      year++;
    }
  }

  return daysList;
};
