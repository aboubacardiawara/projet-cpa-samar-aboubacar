import * as conf from './conf'
import { useRef, useEffect } from 'react'
import { State, step, click, mouseMove, endOfGame } from './state'
import { render } from './renderer'
import { description } from '../../config/game/file'

const randomInt = (max: number) => Math.floor(Math.random() * max)
const randomSign = () => Math.sign(Math.random() - 0.5)



const loadObstacles = function () {
  let rectangles: number[][] = []

  description.levels[0].obstacles.forEach(
    obstacleData => rectangles.push(obstacleData.dimensions)
  )

  return rectangles;
}

const loadObstaclesBis = function () {
  const rectangles : number[][] = []
  const cote : number = 40
  rectangles.push([40, 40, cote*10, cote])
  rectangles.push([80, 80, cote, cote])
  rectangles.push([120, 80, cote, cote])
  //rectangles.push([0, 40, cote, cote])

  return rectangles
}


const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
  (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    requestAnimationFrame(() => iterate(ctx))
  }

const buildRectangle = (data: number[]) => (
  {
    coord: {x:data[0], y:data[1], dx:0, dy:0},
    width:data[2], 
    height:data[3] 
  }
)

const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    pos: new Array(2).fill(1).map((_) => ({
      life: conf.BALLLIFE,
      coord: {
        x: randomInt(width - 120) + 60,
        y: randomInt(height - 120) + 60,
        dx: 4 * randomSign(),
        dy: 4 * randomSign(),
      },
    })),
    obstacle: loadObstacles().map((data) => buildRectangle(data)),
    /*obstacle: new Array(2).fill(1).map((_) => ({
      coord: {x:40, y:80, dx:0, dy:0},
      width:400, 
      height:400 
    })),*/
    size: { height, width },
    endOfGame: true,
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)

  const iterate = (ctx: CanvasRenderingContext2D) => {
    state.current = step(state.current)
    state.current.endOfGame = !endOfGame(state.current)
    render(ctx)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }
  const onClick = (e: PointerEvent) => {
    state.current = click(state.current)(e)
  }

  const onMove = (e: PointerEvent) => {
    state.current = mouseMove(state.current)(e)
  }
  useEffect(() => {
    if (ref.current) {
      initCanvas(iterate)(ref.current)
      ref.current.addEventListener('click', onClick)
      ref.current.addEventListener('mousemove', onMove)
    }
    return () => {
      ref.current.removeEventListener('click', onMove)
      ref.current.removeEventListener('mousemove', onMove)
    }
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas
