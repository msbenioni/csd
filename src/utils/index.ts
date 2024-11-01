export function getAvailableDates(daysAhead = 14) {
  const dates = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

  while (dates.length < daysAhead) {
    const date = new Date(currentDate);
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isValidPostcode(postcode: string) {
  return postcode.startsWith("2");
}
