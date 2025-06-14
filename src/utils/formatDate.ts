function formatDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("cl-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default formatDate;
