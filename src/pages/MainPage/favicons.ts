function drawCircle(percentage = 100) {
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

  return `
data:image/svg+xml;utf8,
<svg id="svg" transform="rotate(-90) translate(0, 1)" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle r="90" cx="100" cy="100" fill="transparent" stroke="lightgrey" stroke-width="${20}" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
  <circle id="bar" r="90" cx="100" cy="100" fill="transparent" transform="rotate(-10 50 100)" stroke="red" stroke-width="${20}" stroke-dasharray="565.48" stroke-dashoffset="${pct}"></circle>
</svg>
`
}

export default drawCircle
