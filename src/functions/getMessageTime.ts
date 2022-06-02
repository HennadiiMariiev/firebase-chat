export const getMessageTime = (seconds: number) => {
  if (seconds) {
    const timeStr = new Date(seconds * 1000).toTimeString().slice(0, 8);
    const dateStr = new Date(seconds * 1000).toDateString().slice(3, 10);
    return `${timeStr}, ${dateStr}`;
  }
  return '';
};
