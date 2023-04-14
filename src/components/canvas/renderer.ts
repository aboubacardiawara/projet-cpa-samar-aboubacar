import * as conf from './conf'
import { Coord } from './coord'
import { State } from './state'
const COLORS = {
  RED: '#ff0000',
  GREEN: '#00ff00',
  BLUE: '#0000ff',
}

const toDoubleHexa = (n: number) =>
  n < 16 ? '0' + n.toString(16) : n.toString(16)

export const rgbaTorgb = (rgb: string, alpha = 0) => {
  let r = 0
  let g = 0
  let b = 0
  if (rgb.startsWith('#')) {
    const hexR = rgb.length === 7 ? rgb.slice(1, 3) : rgb[1]
    const hexG = rgb.length === 7 ? rgb.slice(3, 5) : rgb[2]
    const hexB = rgb.length === 7 ? rgb.slice(5, 7) : rgb[3]
    r = parseInt(hexR, 16)
    g = parseInt(hexG, 16)
    b = parseInt(hexB, 16)
  }
  if (rgb.startsWith('rgb')) {
    const val = rgb.replace(/(rgb)|\(|\)| /g, '')
    const splitted = val.split(',')
    r = parseInt(splitted[0])
    g = parseInt(splitted[1])
    b = parseInt(splitted[2])
  }

  r = Math.max(Math.min(Math.floor((1 - alpha) * r + alpha * 255), 255), 0)
  g = Math.max(Math.min(Math.floor((1 - alpha) * g + alpha * 255), 255), 0)
  b = Math.max(Math.min(Math.floor((1 - alpha) * b + alpha * 255), 255), 0)
  return `#${toDoubleHexa(r)}${toDoubleHexa(g)}${toDoubleHexa(b)}`
}

const clear = (ctx: CanvasRenderingContext2D) => {
  const { height, width } = ctx.canvas
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
}

const drawCirle = (
  ctx: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number },
  color: string
) => {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x, y, conf.RADIUS, 0, 2 * Math.PI)
  ctx.fill()
}

const drawWater = (
  ctx: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number },
  w: number,
  h: number
) => {
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.fillStyle = "red"
  ctx.fill()
}
const drawCenter = (
  ctx: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number; },
  w: number
  , h: number,
) => {
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.fillStyle = "grey"
  ctx.fill()
}

const drawRect = (
  ctx: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number; },
  w: number
  , h: number,
) => {
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  var img = new Image()
  img.src = 'brick.png'
  var tempCanvas = document.createElement("canvas")
  const tCtx = tempCanvas.getContext("2d");
  tempCanvas.width = 40;
  tempCanvas.height = 40;
  tCtx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, 40, 40)
  var brick = ctx.createPattern(tempCanvas, 'repeat')
  ctx.fillStyle = brick!
  ctx.fill()
}
const computeColor = (life: number, maxLife: number, baseColor: string) =>
  rgbaTorgb(baseColor, (maxLife - life) * (1 / maxLife))

export const render = (ctx: CanvasRenderingContext2D) => (state: State) => {
  clear(ctx)

  if (conf.DEBUG_ON) {
    const center = state.center;
    drawCenter(ctx, center.coord, center.width, center.height)
  }

  const c = state.ball;
  drawCirle(ctx, c.coord, computeColor(c.life, conf.BALLLIFE, COLORS.RED))


  state.walls.map((r) =>
    drawRect(ctx, r.coord, r.width, r.height),

    state.water.map((r) =>
      drawWater(ctx, r.coord, r.width, r.height))
  )

  


  if (state.endOfGame) {
    const text = 'END'
    ctx.font = '48px arial'
    ctx.strokeText(text, state.size.width / 2 - 200, state.size.height / 2)
  }
}
