let cols
let rows
let vSegs = []
let hSegs = []
let densitySlider
let flowSlider
let cubeDepthSlider
let cubeMode = false
let currentStyle = "brutalist"
let canvas

function setup() {
  const container = document.getElementById("canvas-container")
  const sidebarWidth = window.innerWidth > 1024 ? 380 : 0
  const w = Math.min(window.innerWidth - sidebarWidth - 32, window.innerHeight - 64)
  const h = w * 0.62

  if (canvas) canvas.remove()
  canvas = createCanvas(w, h)
  canvas.parent(container)

  colorMode(HSB, 360, 100, 100)
  strokeWeight(1)
  noFill()

  densitySlider = select("#density")
  flowSlider = select("#flow")
  cubeDepthSlider = select("#cubeDepth")

  select("#cube-toggle").mousePressed(() => {
    cubeMode = !cubeMode
    const btn = select("#cube-toggle")
    btn.toggleClass("active", cubeMode)
    btn.html(`3D Mode · ${cubeMode ? "ON" : "OFF"}`)
    redraw()
  })

  document.querySelectorAll(".segmented button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".segmented button").forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
      currentStyle = btn.dataset.style
      redraw()
    })
  })

  select("#generate").mousePressed(resetGrid)

  select("#export").mousePressed(() => {
    const name = select("#fileName").value() || "poster"
    saveCanvas(name, "png")
  })

  initRangeBars()
  resetGrid()
  noLoop()
}

function resetGrid() {
  cols = int(densitySlider.value())
  rows = int(map(flowSlider.value(), 0, 100, 4, 12))

  vSegs = Array.from({ length: cols + 1 }, () => Array(rows).fill(true))
  hSegs = Array.from({ length: rows + 1 }, () => Array(cols).fill(true))

  redraw()
}

function draw() {
  background(0, 0, 100)

  const cw = width / cols
  const rh = height / rows
  const depth = map(cubeDepthSlider.value(), 0, 100, 0, min(cw, rh) * 0.8)

  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (!vSegs[c][r]) continue
      setStrokeColor(c, r)
      if (cubeMode) drawCube(c, r, cw, rh, depth)
      else if (currentStyle === "sinuous") drawSinuousV(c, r, cw, rh)
      else line(c * cw, r * rh, c * cw, (r + 1) * rh)
    }
  }

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!hSegs[r][c]) continue
      setStrokeColor(c, r)
      if (currentStyle === "sinuous") drawSinuousH(c, r, cw, rh)
      else line(c * cw, r * rh, (c + 1) * cw, r * rh)
    }
  }
}

function setStrokeColor(c, r) {
  if (currentStyle === "colorful") stroke((c * 40 + r * 30) % 360, 80, 90)
  else stroke(0, 0, 0)
}

function drawSinuousV(c, r, cw, rh) {
  line(c * cw + random(-5, 5), r * rh, c * cw + random(-5, 5), (r + 1) * rh)
}

function drawSinuousH(c, r, cw, rh) {
  line(c * cw, r * rh + random(-5, 5), (c + 1) * cw, r * rh + random(-5, 5))
}

function drawCube(c, r, cw, rh, d) {
  const x = c * cw
  const y = r * rh
  rect(x, y, cw, rh)
  line(x, y, x + d, y - d)
  line(x + cw, y, x + cw + d, y - d)
  line(x + d, y - d, x + cw + d, y - d)
}

function mouseDragged() {
  const cw = width / cols
  const rh = height / rows
  const c = int(mouseX / cw)
  const r = int(mouseY / rh)

  if (vSegs[c] && vSegs[c][r] !== undefined) vSegs[c][r] = false
  if (hSegs[r] && hSegs[r][c] !== undefined) hSegs[r][c] = false

  redraw()
}

function initRangeBars() {
  document.querySelectorAll(".range-wrapper").forEach(w => {
    const bar = w.querySelector(".range-bar")
    bar.innerHTML = ""
    for (let i = 0; i < 30; i++) bar.appendChild(document.createElement("span"))
    const input = w.querySelector("input")
    input.addEventListener("input", () => {
      updateRangeBar(input, bar)
      resetGrid()
    })
    updateRangeBar(input, bar)
  })
}

function updateRangeBar(input, bar) {
  const spans = bar.querySelectorAll("span")
  const active = Math.round((input.value / input.max) * spans.length)
  spans.forEach((s, i) => s.classList.toggle("active", i < active))
}

function windowResized() {
  setup()
}
