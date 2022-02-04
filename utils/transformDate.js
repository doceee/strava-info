const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default formatDate;