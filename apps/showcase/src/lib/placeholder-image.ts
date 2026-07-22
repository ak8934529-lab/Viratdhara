/** Self-contained SVG data-URI placeholder — avoids depending on external image hosts. */
export function placeholderImage(from: string, to: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='200' height='200' fill='url(%23g)'/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
