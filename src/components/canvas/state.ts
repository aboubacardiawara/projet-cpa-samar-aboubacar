import { Ball, changeBallVelocity, moveBall } from './ball';
import * as conf from './conf'
import { Coord } from './coord';
import { Direction, isMovingRight } from './direction';
import { notJumping } from './keyboard';
export type Rect = { coord: Coord, height: number; width: number }
export type Size = { height: number; width: number }

export type Element = { type: string, dimension: number[] }

export type State = {
  ball: Ball
  size: Size
  center: Rect
  centerAcceleration: number
  endOfGame: boolean
  walls: Array<Rect>
  water: Array<Rect>
}

const enLair = (state: State): boolean => {
  return !auSol(state)
}

const jumping = (state: State): State => {
  return updateState(state, {
    ...state.ball,
    jumping: true
  })
}

export const step = (state: State) => {
  console.log(state.centerAcceleration);

  const newState: State = moveBall(state);
  //onsole.log(`velocity: (${newState.ball.coord.dx}, ${newState.ball.coord.dy})`);
  let resVert: State;
  resVert = auSol(state) ? arreteNewton(newState) : newton(newState)
  resVert = enLair(resVert) ? jumping(resVert) : resVert
  const resHor: State = state.ball.acceleration !== 0 ? resVert : ralentir(resVert);

  return state.centerAcceleration !== 0 ? moveScreen(resHor) : ralentirEcran(moveScreen(resHor))
}

const auSol = (state: State): boolean => {
  const y: number = state.ball.coord.y;
  const r: number = conf.RADIUS;
  const limitY: number = state.size.height;
  return (y + r) === limitY - blocDessous(state);
}

const blocDessousNaif = (state: State): number => {
  return 40 * 6
}

export const blocDessous = (state: State): number => {
  const walls: Array<Rect> = state.walls.filter(w => canSupportBall(w, state.ball))
  const candidatWall: Rect = maxWallInHeight(state, walls)
  const res: number = distanceToBottom(state, candidatWall)
  //console.log(res);
  return res
}

const distanceToBottom = (state: State, wall: Rect): number => {
  return state.size.height - wall.coord.y
}

const maxWallInHeight = (state: State, walls: Array<Rect>): Rect => {
  let res: Rect = walls[0];
  for (let index = 0; index < walls.length; index++) {
    const element = walls[index];
    if (distanceToBottom(state, element) > distanceToBottom(state, res)) {
      res = element
    }

  }

  return res;
}

/**
 * Ameliorer: details rayon balle
 * @param w 
 * @param ball 
 * @returns 
 */
const canSupportBall = (w: Rect, ball: Ball): boolean => {
  // w.x < ball < w.x+w.width
  return w.coord.x <= ball.coord.x && ball.coord.x <= w.coord.x + w.width
}

const arreteNewton = (state: State): State => {
  const ball: Ball = state.ball
  const newBall: Ball = changeBallVelocity(ball, { dx: ball.coord.dx, dy: ball.jumping ? ball.coord.dy : 0 })
  const newState: State = updateState(state, newBall);
  return notJumping(newState)
}

export const updateState = (state: State, newBall: Ball): State => {
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



const ralentir = (state: State): State => {
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

const isMovingRightEcran = (ecran: Rect): boolean => {
  return ecran.coord.dx > 0;
}

const isMovingLeftEcran = (ecran: Rect): boolean => {
  return ecran.coord.dx < 0;
}


const ralentirEcran = (state: State): State => {
  const currentDx = state.center.coord.dx;
  let newDx: number;
  if (isMovingRightEcran(state.center)) {
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

  state.center.coord.dx = newDx;
  return state;
}

const moveScreen = (state: State): State => {
  const newState = { ...state };
  const center: Rect = state.center;
  const currentDx = center.coord.dx;
  const newDx: number = Math.abs(currentDx) < conf.VITESSE_MAX ? currentDx + state.centerAcceleration : currentDx
  newState.walls.map((wal: Rect) => {
    const newRect: Rect = { ...wal };
    newRect.coord.x += newDx;
  })

  const newCenter: Rect = {
    ...center,
    coord: {
      ...center.coord,
      dx: newDx
    }
  }

  return { ...newState, center: newCenter };
}

export const endOfGame = (state: State): boolean => true
