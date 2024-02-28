export function recipeDurationCount(recipeDuration) {
  const hours = Math.floor(recipeDuration / 60);
  const minutes = recipeDuration % 60;

  return `${hours > 0 ? ` ${hours}h` : ""}${minutes > 0 ? ` ${minutes}m` : ""}`;
}
