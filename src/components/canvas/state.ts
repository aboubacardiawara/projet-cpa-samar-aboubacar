import * as conf from './conf'
type Coord = { x: number; y: number; dx: number; dy: number }
type Ball = { coord: Coord; life: number; invincible?: number }
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

const dist2 = (o1: Coord, o2: Coord) =>
  Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2)

const iterate = (bound: Size) => (ball: Ball) => {
  const invincible = ball.invincible ? ball.invincible - 1 : ball.invincible
  const coord = ball.coord
  const dx =
    (coord.x + conf.RADIUS > bound.width || coord.x < conf.RADIUS
      ? -coord.dx
      : coord.dx) * conf.FRICTION
  const dy =
    (coord.y + conf.RADIUS > bound.height || coord.y < conf.RADIUS
      ? -coord.dy
      : coord.dy) * conf.FRICTION
  if (Math.abs(dx) + Math.abs(dy) < conf.MINMOVE)
    return { ...ball, invincible, coord: { ...coord, dx: 0, dy: 0 } }
  return {
    ...ball,
    invincible,
    coord: {
      x: coord.x + dx,
      y: coord.y + dy,
      dx,
      dy,
    },
  }
}


const collide = (o1: Coord, o2: Coord) =>
  dist2(o1, o2) < Math.pow(2 * conf.RADIUS, 2)

const collideBoing = (p1: Coord, p2: Coord) => {
  const nx = (p2.x - p1.x) / (2 * conf.RADIUS)
  const ny = (p2.y - p1.y) / (2 * conf.RADIUS)
  const gx = -ny
  const gy = nx

  const v1g = gx * p1.dx + gy * p1.dy
  const v2n = nx * p2.dx + ny * p2.dy
  const v2g = gx * p2.dx + gy * p2.dy
  const v1n = nx * p1.dx + ny * p1.dy
  p1.dx = nx * v2n + gx * v1g
  p1.dy = ny * v2n + gy * v1g
  p2.dx = nx * v1n + gx * v2g
  p2.dy = ny * v1n + gy * v2g
  p1.x += p1.dx
  p1.y += p1.dy
  p2.x += p2.dx
  p2.y += p2.dy
}

export const step = (state: State) => {

  return {
    ...state,
    pos: {
      ...state.ball,
      coord: {
        ...state.ball.coord,
        x: state.ball.coord.x + state.ball.coord.dx,
        y: state.ball.coord.y + state.ball.coord.dy
      }
    },
  }
}

export const click =
  (state: State) =>
    (event: PointerEvent): State => {
      return state
    }

export const keyDown =
  (state: State) =>
    (event: KeyboardEvent): State => {
      //event.preventDefault()
      let newState: State;
      const keyName: string = event.key;
      console.log(`keyDown: ${keyName}`);
      switch (keyName) {
        case "ArrowUp":
          newState = moveBallUp(state);
          break;
        case "ArrowDown":
          newState = moveBallDown(state);
          break;
        case "ArrowLeft":
          newState = moveBallLeft(state);
          break;
        case "ArrowRight":
          newState = moveBallRight(state);
          break;

        default:
          newState = state
          break;
      }
      return newState
    }

export const keyUp =
  (state: State) =>
    (event: KeyboardEvent): State => {
      console.log("Relaché !");
      return state
    }

export const mouseMove =
  (state: State) =>
    (event: PointerEvent): State => {
      return state
    }

export const endOfGame = (state: State): boolean => true


const moveBall = (state: State, dx: number, dy: number): State => {
  const currentPos: Coord = state.ball.coord

  const newBall: Ball = {
    ...state.ball,
    coord: {
      ...currentPos,
      x: state.ball.coord.x + dx,
      y: state.ball.coord.y + dy,
    }
  }

  return {
    ...state,
    ball: newBall
  }
}

const moveBallUp = (state: State): State => {
  return moveBall(state, 0, -state.ball.coord.dy)
}

const moveBallDown = (state: State): State => {
  return moveBall(state, 0, state.ball.coord.dy)
}

const moveBallLeft = (state: State): State => {
  console.log("dx: " + state.ball.coord.dx);
  
  return moveBall(state, -state.ball.coord.dx, 0)
}

const moveBallRight = (state: State): State => {
  console.log("dx: " + state.ball.coord.dx);
  return moveBall(state, state.ball.coord.dx, 0)
}