import * as conf from './conf'
import { useRef, useEffect, MutableRefObject } from 'react'
import { State, step, endOfGame, Element, Ball } from './state'

import { render } from './renderer'
import { CONFIG } from '../../config/game/samples/empty'
import { keyDown } from './keyboard'

var accelerationIntervallId: string | number | NodeJS.Timer | undefined;

const loadObstacles = function () {
  let rectangles: Element[] = []

  CONFIG.levels[0].obstacles.forEach(obstacleData => {
    const element: Element = { type: obstacleData.type, dimension: obstacleData.dimensions }
    return rectangles.push(element)
  })

  return rectangles;
}

const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      requestAnimationFrame(() => iterate(ctx))
    }

const buildWalls = (data: number[]) => (
  {
    coord: { x: data[0], y: data[1], dx: 0, dy: 0 },
    width: data[2],
    height: data[3]
  }
)

const buildWater = (data: number[]) => (
  {
    coord: { x: data[0], y: data[1], dx: 0, dy: 0 },
    width: data[2],
    height: data[3]
  }
)

const isWall = (data: Element) => (data.type === 'wall')
const isWater = (data: Element) => (data.type === 'water')

function initWater(): { coord: { x: number; y: number; dx: number; dy: number }; height: number; width: number }[] {
  return loadObstacles().filter(isWater).map((data: Element) => buildWater(data.dimension))
}

function initWalls(): { coord: { x: number; y: number; dx: number; dy: number }; height: number; width: number }[] {
  return loadObstacles().filter(isWall).map((data: Element) => buildWalls(data.dimension))
}

const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    ball: initBall(),
    walls: initWalls(),
    water: initWater(),
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

  const onKeyDown2 = (e: KeyboardEvent) => {
    state.current = keyDown(state.current)(e);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    accelerationIntervallId = setInterval(() => {
      console.log("... appui en cours");
      
      state.current = acceleration(state);
    }, 50)
  }

  const acceleration = (state: MutableRefObject<State>): State => {
    const newBall: Ball = {
      ...state.current.ball,
      coord: {
        ...state.current.ball.coord,
        dx: state.current.ball.coord.dx + 1
      }
    }

    return {
      ...state.current,
      ball: newBall
    }
  }



  const onKeyUp = (e: KeyboardEvent) => {
    clearInterval(accelerationIntervallId);
    state.current = keyDown(state.current)(e) // to do
  }


  useEffect(() => {
    if (ref.current) {
      initCanvas(iterate)(ref.current)
      document.addEventListener('keyup', onKeyUp);
      document.addEventListener('keydown', onKeyDown);
      ref.current.addEventListener('click', onclick)
    }
    return () => {

      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      ref.current.removeEventListener('click', onclick)
    }
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas

function initBall() {
  return {
    life: conf.BALLLIFE,
    coord: {
      x: 100,
      y: 100,
      dx: 0,
      dy: 0,
    },
    jumping: true
  }
}