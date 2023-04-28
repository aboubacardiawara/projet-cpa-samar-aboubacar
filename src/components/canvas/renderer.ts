import { collisionCircleBox } from './collision'
import * as conf from './conf'
import { Coord } from './coord'
import { Enemie, Position, State, Wall, gameOver, playerHasWin } from './state'
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


const drawEnemie = (
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

const drawSortie = (
  ctx: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number },
  w: number,
  h: number
) => {
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.fillStyle = "green"
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
  position: Position,
  w: number
  , h: number,
) => {
  const x: number = position.x
  const y: number = position.y

  var img = new Image()
  img.src = 'brick2.png'
  // remplir le mur avec des briques

  // Calculate the number of images needed to fill the wall
  const numImagesAcross = Math.ceil(w / 40)
  const numImagesDown = Math.ceil(h / 40)

  // Loop through each position on the wall and draw the image
  for (let i = 0; i < w; i += 40) {
    for (let j = 0; j < h; j += 40) {
      ctx.drawImage(img, x + i, y + j, 42, 42)
    }
  }

}


const drawCirle = (

  context: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number },
  color: string, img: HTMLImageElement
) => {
  context.save()
  context.beginPath();
  context.arc(x, y, conf.RADIUS, 0, 2 * Math.PI, false);
  context.closePath();
  context.clip();
  context.drawImage(img, x - conf.RADIUS, y - conf.RADIUS, conf.RADIUS * 2, conf.RADIUS * 2);
  context.restore();
}

const drawEnemieAsImg = (
  context: CanvasRenderingContext2D,
  { x, y }: { x: number; y: number },
  w: number,
  h: number,
  img: HTMLImageElement
) => {
  context.drawImage(img, x, y, w, h)
}


const computeColor = (life: number, maxLife: number, baseColor: string) =>
  rgbaTorgb(baseColor, (maxLife - life) * (1 / maxLife))

const enemieImg = (): HTMLImageElement => {
  const img = new Image()
  img.src = 'ennemie_mobile.png'
  return img
}

export const render = (ctx: CanvasRenderingContext2D) => (state: State) => {
  clear(ctx)

  if (conf.DEBUG_ON) {
    const center = state.center;
    drawCenter(ctx, center.coord, center.width, center.height)
  }

  const c = state.ball;
  const img = new Image();
  img.src = state.ball.images[state.ball.imgIndex]

  drawCirle(ctx, c.coord, computeColor(c.life, conf.BALLLIFE, COLORS.BLUE), img);

  state.walls.forEach((w: Wall) => {
    if (inScreen(w.position, w.width, w.height)) {
      drawRect(ctx, w.position, w.width, w.height)
    }
  })

  state.enemies.forEach((e: Enemie) => {
    if (inScreen({ x: e.coord.x, y: e.coord.y }, conf.TAILLE_ENEMIE, conf.TAILLE_ENEMIE))
      drawEnemieAsImg(ctx, { x: e.coord.x, y: e.coord.y }, conf.TAILLE_ENEMIE, conf.TAILLE_ENEMIE, enemieImg())
  })

  drawSortie(ctx, { ...state.sortie.position }, conf.WIDTH_SORTIE, conf.HEIGHT_SORTIE)

  if (gameOver(state)) {
    let text = 'Game Over'
    if (playerHasWin(state)) {
      text = 'Congratulation'
    }
    ctx.font = '48px arial'
    ctx.strokeText(text, state.size.width / 2 - 100, state.size.height / 2)
  }
}

export const inScreen = (pos: Position, w: number, h: number): boolean => {
  return pos.x + w >= 0 && pos.x <= conf.MAX_X && pos.y + h >= 0 && pos.y <= conf.MAX_Y
}