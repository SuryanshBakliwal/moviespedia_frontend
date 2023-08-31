const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date) => {
  // console.log(date);
  if (date === null) return null;

  const parts = date.split("-");
  if (parts.length !== 3) {
    return "Invalid date format";
  }

  const year = parseInt(parts[0]);
  const monthIndex = parseInt(parts[1]) - 1; // Adjust for zero-based index
  const day = parseInt(parts[2]);

  if (isNaN(year) || isNaN(monthIndex) || isNaN(day)) {
    return "Invalid date components";
  }

  if (monthIndex < 0 || monthIndex >= months.length) {
    return "Invalid month";
  }

  return `${months[monthIndex]} ${day}, ${year}`;
};

export const getYear = (date) => {
  const year = new Date(date).getFullYear();
  return `${year}`;
};

// console.log(formatDate("2023-05-03"));

export function convertToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
}
