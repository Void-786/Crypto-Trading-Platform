export const formatDateTime = (timestamp) => {
  if (!timestamp) return { date: "-", time: "-" };

  const dateObj = new Date(timestamp);

  const date = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return { date, time };
};

export default formatDateTime;