interface CircleOptions {
  backgroundLine?: boolean
  strokeWidth?: number
  color?: string
}

/**
 * Draws a circular SVG for use as favicon or progress indicator
 * @param percentage - The percentage of the circle to fill (0-100)
 * @param options - Optional configuration for the circle
 * @returns SVG as a data URL string
 */
export function drawCircle(
  percentage = 100,
  options: CircleOptions = {
    backgroundLine: false,
    strokeWidth: 6,
    color: '#F87070',
  },
): string {
  // Convert percentage to a number and clamp between 0-100
  let val = parseInt(percentage.toString())
  const r = 90
  const c = Math.PI * (r * 2)

  if (val < 0) {
    val = 0
  }
  if (val > 100) {
    val = 100
  }

  const pct = ((100 - val) / 100) * c
  const strokeColor = options.color || '#F87070'
  const backgroundLineColor = options.backgroundLine ? '#D7E0FF' : 'transparent'
  const strokeWidth = options.strokeWidth || 6

  // Create SVG as a data URL
  return `
data:image/svg+xml;utf8,
<svg id="svg" transform="rotate(-90) translate(0, 1)" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle r="90" cx="100" cy="100" fill="transparent" stroke="${backgroundLineColor.replace(
    '#',
    '%23',
  )}" stroke-width="${strokeWidth}" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
  <circle id="bar" r="90" cx="100" cy="100" fill="transparent" stroke="${strokeColor.replace(
    '#',
    '%23',
  )}" stroke-linecap="round" stroke-width="${strokeWidth}" stroke-dasharray="565.48" stroke-dashoffset="${pct}"></circle>
</svg>
`
    .trim()
    .replace(/\n/g, ' ')
}

/**
 * Updates the favicon with a circular progress indicator
 * @param percentage - The percentage to display (0-100)
 * @param color - The color of the progress circle
 */
export function updateFavicon(percentage: number, color?: string): void {
  const favicon = document.getElementById('favicon') as HTMLLinkElement
  if (favicon) {
    favicon.href = drawCircle(percentage, {
      backgroundLine: true,
      strokeWidth: 10,
      color,
    })
  }
}

export default drawCircle
