// we used it somewhere, but thats not actually how we handling date
export const isSameDay = (a: Date, b: Date) =>
  a.toDateString() === b.toDateString();

export const getDateLabel = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

