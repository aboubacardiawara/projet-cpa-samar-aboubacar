import { stat } from 'fs';
import * as conf from './conf'
type Coord = { x: number; y: number; dx: number; dy: number }
export type Direction = "left" | "right" | "nothing"
export type Ball = { coord: Coord; life: number; jumping: boolean, acceleration: number, direction: Direction }
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

export const step = (state: State) => {
  const newState: State = moveBall(state)
  console.log(`velocity: (${newState.ball.coord.dx}, ${newState.ball.coord.dy})`);
  const resVert: State = auSol(state) ? arreteNewton(newState) : newton(newState)
  const resHor: State = state.ball.acceleration !== 0 ? resVert : ralentir(resVert);
  

  return resHor
}

const auSol = (state: State): boolean => {
  const y: number = state.ball.coord.y;
  const r: number = conf.RADIUS;
  const limitY: number = state.size.height;
  return (y + r) >= limitY - blocDessous(state);
}

const blocDessous = (state: State): number => {
  return 0
}

const arreteNewton = (state: State): State => {
  const ball: Ball = state.ball
  const newBall: Ball = changeBallVelocity(ball, { dx: ball.coord.dx, dy: 0 })
  return updateState(state, newBall);
}

const updateState = (state: State, newBall: Ball): State => {
  return {
    ...state,
    ball: newBall
  }
}

const newton = (state: State): State => {
  const ball: Ball = state.ball
  const newBall: Ball = changeBallVelocity(ball, { dx: ball.coord.dx, dy: ball.coord.dy + conf.ACCELERATION_CHUTE })
  return updateState(state, newBall)
}

export const isMovingLeft = (direction: Direction): boolean => {
  return direction === "left"
}

export const isNotMoving = (direction: Direction): boolean => {
  return direction === "nothing"
}


export const isMovingRight = (direction: Direction): boolean => {
  return direction === "right"
}

const ralentir = (state: State): State => {
  console.log("Ralentir");
  const direction = state.ball.direction
  const currentDx = state.ball.coord.dx
  let newDx: number;
  // currentDx <= 0 ? 0 : isMovingRight(direction) ? currentDx - conf.ACCELARATION_HORIZ : currentDx + conf.ACCELARATION_HORIZ

  if (isMovingRight(direction)) {
    if (currentDx <= 0) {
      newDx = 0
    } else {
      newDx = currentDx - conf.ACCELARATION_HORIZ
    }
  } else {
    if (currentDx >= 0) {
      newDx = 0
    } else {
      newDx = currentDx + conf.ACCELARATION_HORIZ
    }
  }
  const newBall: Ball = {
    ...state.ball,
    coord: {
      ...state.ball.coord,
      dx: newDx
    },
    acceleration: 0
  }
  return {
    ...state,
    ball: newBall
  }
}

const moveBall = (state: State): State => {
  const deplacementHorizontal: State = moveBallHoriz(state);
  return moveBallVerti(deplacementHorizontal);
}

const moveBallVerti = (state: State) => {
  const ball = state.ball
  const newBall: Ball = {
    ...ball,
    coord: {
      ...ball.coord,
      y: ball.coord.y + ball.coord.dy,
    }
  }
  const newState: State = {
    ...state,
    ball: newBall
  }

  return isBallInCanvasVertical(state.size, newBall) ? newState : state
}

const moveBallHoriz = (state: State) => {
  const ball = state.ball
  const currentDx = ball.coord.dx;
  const newDx: number = Math.abs(currentDx) < conf.VITESSE_MAX ? currentDx + ball.acceleration : currentDx
  const newBall: Ball = {
    ...ball,
    coord: {
      ...ball.coord,
      x: ball.coord.x + newDx,
      dx: newDx
    }
  }
  const newState: State = {
    ...state,
    ball: newBall
  }

  return isBallInCanvasHorital(state.size, newBall) ? newState : state
}

/**
 * 
 * @param size {}
 * @param newBall 
 * @returns 
 */
const isBallInCanvasVertical = (size: Size, newBall: Ball) => {
  const r: number = conf.RADIUS;
  const limitY: number = size.height
  const y: number = newBall.coord.y

  // x, y: le centre du cercle
  const condUp: boolean = (y - r) >= 0;
  const condDown: boolean = (y + r) <= limitY;

  return condDown && condUp;
}

const isBallInCanvasHorital = (size: Size, newBall: Ball) => {
  const r: number = conf.RADIUS;
  const limitX: number = size.width
  const x: number = newBall.coord.x

  const condLeft: boolean = (x - r) >= 0;
  const condRight: boolean = (x + r) <= limitX;

  return condLeft && condRight;
}

export const changeBallVelocity = (ball: Ball, newVelocity: any): Ball => {
  return {
    ...ball,
    coord: {
      ...ball.coord,
      dx: newVelocity.dx,
      dy: newVelocity.dy

    }
  }
}

export const endOfGame = (state: State): boolean => true
