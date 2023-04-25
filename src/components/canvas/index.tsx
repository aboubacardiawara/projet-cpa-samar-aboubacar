import * as conf from './conf'
import { useRef, useEffect, MutableRefObject } from 'react'
import { State, step, endOfGame, Element } from './state'

import { render } from './renderer'
import { CONFIG } from '../../config/game/samples/chemin_plat'
import { keyDown, keyUp } from './keyboard'
import { Direction } from './direction'

const superloadObstacles = function () {
  let rectangles: Element[] = []

  for (let i = 0; i < 4; i++) {
    CONFIG.levels[0].obstacles.forEach(obstacleData => {
      const dim: number[] = [...obstacleData.dimensions];
      dim[0] = dim[0] + i * conf.MAX_X;
      const element: Element = { type: obstacleData.type, dimension: dim }
      rectangles.push(element)
    })

  }

  return rectangles;
}

const loadObstaclesNormal = function () {
  let rectangles: Element[] = []

  CONFIG.levels[0].obstacles.forEach(obstacleData => {
    const element: Element = { type: obstacleData.type, dimension: obstacleData.dimensions }
    return rectangles.push(element)
  })

  return rectangles;
}

const loadObstacles = function () {
  return superloadObstacles();
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

const buildEnemies = (data: number[]) => (
  {
    coord: { x: data[0], y: data[1], dx: 0, dy: 0 },
    width: data[2],
    height: data[3]
  }
)


const isWall = (data: Element) => (data.type === 'wall')
const isWater = (data: Element) => (data.type === 'water')
const isEnemie = (data: Element) => (data.type === 'enemie')

function initWater(): { coord: { x: number; y: number; dx: number; dy: number }; height: number; width: number }[] {
  return loadObstacles().filter(isWater).map((data: Element) => buildWater(data.dimension))
}

function initWalls(): { coord: { x: number; y: number; dx: number; dy: number }; height: number; width: number }[] {
  return loadObstacles().filter(isWall).map((data: Element) => buildWalls(data.dimension))
}

function initEnemies(): { coord: { x: number; y: number; dx: number; dy: number }; height: number; width: number }[] {
  return loadObstacles().filter(isEnemie).map((data: Element) => buildEnemies(data.dimension))
}


const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    ball: initBall(),
    walls: initWalls(),
    center: { coord: { dx: 0, dy: 0, x: 480-40, y: 0 }, height: 800, width: 40 * 8 },
    centerAcceleration: 0,
    water: initWater(),
    enemies: initEnemies(),
    ballShouldBeRecentered: false,
    size: { height, width },
    endOfGame: true,
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)

  const iterate = (ctx: CanvasRenderingContext2D) => {
    state.current = step(state.current)
    render(ctx)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }

  const onKeyDown = (e: KeyboardEvent) => {
    state.current = keyDown(state.current)(e);
  }

  const onKeyUp = (e: KeyboardEvent) => {
    state.current = keyUp(state.current)(e);
  }


  useEffect(() => {
    if (ref.current) {
      initCanvas(iterate)(ref.current)
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
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
  const sens: Direction = "nothing"
  return {
    life: conf.BALLLIFE,
    coord: {
      x: 200,
      y: 300,
      dx: 0,
      dy: 0,
    },
    jumping: false,
    acceleration: 0,
    direction: sens,
    imgid: 0
  }
}