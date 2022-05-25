export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}; // date를 yyyy-mm-dd 형식으로