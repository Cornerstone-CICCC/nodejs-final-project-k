// TODO: timezone is something went wrong, need to fix it
export const isSameDate = (date1: Date, date2: Date) => {
  return toDate(date1) === toDate(date2);
};

const toDate = (date: Date) => {
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "America/Vancouver",
  });
  const index = formattedDate.indexOf(",");
  return formattedDate.substring(0, index);
};
