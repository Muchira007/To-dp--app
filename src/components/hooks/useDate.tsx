const useDate = (date?: string): string => {
  if (!date) {
    return "Invalid Date"; // Handle the case when date is undefined or null
  }

  const fullDate: Date = new Date(date.replaceAll("-", "/"));
  const year: number = fullDate.getFullYear();
  const month: number = fullDate.getMonth() + 1;
  const day: number = fullDate.getDate();

  const dateFormatted: string =
    month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    "/" +
    year;

  return dateFormatted;
};

export default useDate;
