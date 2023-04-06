import * as conf from './conf'
type Coord = { x: number; y: number; dx: number; dy: number }
export type Ball = { coord: Coord; life: number; jumping: boolean }
type Rect = { coord: Coord, height: number; width: number }
type Size = { height: number; width: number }

export type Element = { type: string, dimension: number[] }

export type State = {
  ball: Ball
  size: Size
  endOfGame: boolean
  walls: Array<Rect>
  water: Array<Rect>
}

const iterate = (state: State) => {
  const newState: State = moveBall(state)
  return newState
}

const moveBall = (state: State) => {
  const ball = state.ball
  const newBall: Ball = {
    ...ball,
    coord: {
      ...ball.coord,
      x: ball.coord.x + ball.coord.dx,
      y: ball.coord.y + ball.coord.dy
    }
  }
  const newState: State = {
    ...state,
    ball: newBall
  }

  return isBallInCanvas(state.size, newBall) ? newState : state
}

/**
 * 
 * @param size {}
 * @param newBall 
 * @returns 
 */
const isBallInCanvas = (size: Size, newBall: Ball) => {
  const r: number = conf.RADIUS;
  const limitX: number = size.width
  const limitY: number = size.height
  const x: number = newBall.coord.x
  const y: number = newBall.coord.y

  // x, y: le centre du cercle
  const condUp: boolean = (y - r) >= 0;
  const condDown: boolean = (y + r) <= limitY;
  const condLeft: boolean = (x - r) >= 0;
  const condRight: boolean = (x + r) <= limitX;

  return condDown && condLeft && condRight && condUp;
}

export const endOfGame = (state: State): boolean => true
export const step = iterate