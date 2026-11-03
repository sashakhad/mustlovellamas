export function getCurrentDateInfo() {
  const currentDate = new Date();
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
    monthStr: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
    dayStr: currentDate.getDate().toString().padStart(2, '0'),
  };
}
