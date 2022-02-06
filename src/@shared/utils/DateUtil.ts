export function convertUnixTimeToYYYYMMDD(
  unixTime: number,
  token: string = "."
): string {
  const date = new Date(unixTime);

  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(String)
    .map((v) => (v.length === 1 ? v.padStart(2, "0") : v))
    .join(token);
}
