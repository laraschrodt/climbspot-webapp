export function buildOpnvUrl(lat: string, long: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=transit`;
}
