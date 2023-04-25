import { Ball, arreteBall, changeBallVelocity, moveBall } from './ball';
import { collisionBallObstacles, collisionCircleBox } from './collision';
import * as conf from './conf'
import { Coord } from './coord';
import { isMovingRight } from './direction';
import { notJumping, stopBall, stopScreen, stopScreenVitesse } from './keyboard';
export type Position = {x: number, y:number}
export type Rect = { coord: Coord, height: number; width: number }
export type Size = { height: number; width: number }
export type Enemie = {direction: String, debut: Position, destination: Position, position: Position}
export type Element = { type: string, dimension: number[] }

export type State = {
  ball: Ball
  size: Size
  center: Rect
  centerAcceleration: number
  ballShouldBeRecentered: boolean
  endOfGame: boolean
  walls: Array<Rect>
  water: Array<Rect>
  enemies: Array<Rect>
  enemiesMobiles: Array<Enemie>
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

/**
 * 
 * @param state verifie si la ball est en dehaord du centre.
 * En consequence, on doit adapter la camera.
 * @returns 
 */
const ballOutSideCenter = (state:State): boolean => {
  const epsilon:number = 5
  return !state.ball.jumping && state.ball.coord.x - epsilon  > state.center.coord.x + state.center.width 
  /*|| state.ball.coord.x < state.center.coord.x;*/
}

/**
 * 
 * @param state verifie si la balle est au centre de l'ecran.
 * @returns 
 */
const ballShouldNotBeCentered = (state:State): boolean => {
  const epsilon: number = 100
  return state.ball.coord.x < state.center.coord.x + state.center.width - epsilon
}


const recenterBall = (state:State): State => {
  const newState = state
  const delta = -state.center.coord.dx
  // deplacer la balle
  newState.ball.coord.x -= delta
  
  // deplacer les murs
  newState.walls = newState.walls.map(w => {
    w.coord.x -= delta
    return w
  })

  
  // deplacer les enemis
  newState.enemies = newState.enemies.map(e => {
    e.coord.x -= delta
    return e
  })
  return newState
}

const recenterScreenChecker = (state:State): State => {
  const newState = state
  newState.ballShouldBeRecentered = ballOutSideCenter(state)
  return newState
}

export const step = (state: State) => {
  const newState: State = moveBall(state);
  let resVert: State;
  resVert = auSol(state) ? arreteNewton(newState) : newton(newState)
  resVert = enLair(resVert) ? jumping(resVert) : resVert
  const resHor: State = state.ball.acceleration !== 0 ? resVert : ralentir(resVert);

  let screenState: State = state.centerAcceleration !== 0 ? moveScreen(resHor) : ralentirEcran(moveScreen(resHor))
  screenState = recenterScreenChecker(screenState)
  return checkGameOver(screenState);
}

const checkGameOver = (state: State):State => {
  const newState: State = state
  newState.endOfGame = state.enemies.some(enemie => collisionBallObstacles(state.ball, enemie))
  return newState;
}

const auSol = (state: State): boolean => {
  const y: number = state.ball.coord.y;
  const r: number = conf.RADIUS;
  const limitY: number = state.size.height;
  return (y + r) === limitY - blocDessous(state);
}

/**
 * Calcul le niveau sur lequel doit chuter la balle.
 * @param state 
 * @returns 
 */
export const blocDessous = (state: State): number => {
  const walls: Array<Rect> = state.walls.filter(w => canSupportBall(w, state.ball))
  const candidatWall: Rect = maxWallInHeight(state, walls)
  const res: number = distanceToBottom(state, candidatWall)
  return res
}

/**
 * alcul le niveau sur lequel doit chuter la balle.
 * En fonction de la position X du centre de la ball,
 * ameliorer le placement.
 * @param state 
 * @param wall 
 * @returns 
 */
const distanceToBottom = (state: State, wall: Rect): number => {

  const ballX: number = state.ball.coord.x
  const wallX: number = wall.coord.x
  const distanceNaive:number = state.size.height - wall.coord.y
  
  const correctionDistance: number = 5
  if (wallX > ballX) {
    return distanceNaive - correctionDistance
  } else if (wallX + wall.width < ballX) {
    return distanceNaive + correctionDistance
  }

  return distanceNaive
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
  // w.x < ball.x - r < w.x+w.width
  return w.coord.x <= ball.coord.x + conf.RADIUS && ball.coord.x - conf.RADIUS <= w.coord.x + w.width
}

const arreteNewton = (state: State): State => {
  const ball: Ball = state.ball
  const elasticity: number = 0.5
  
  let newDy:number = Math.abs(ball.coord.dy) <= 2 ? 0 : - ball.coord.dy * elasticity
  if (ball.coord.dy > 0) {
    newDy = ball.coord.dy <= 2 ? 0 : ball.coord.dy * elasticity
  }
  console.log(`${ball.coord.dy}, ${newDy} ${auSol(state)} ${enLair(state)}`);
  
  const newBall: Ball = changeBallVelocity(ball, { dx: ball.coord.dx, dy: ball.jumping ? ball.coord.dy : - newDy })
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
    newDx = currentDx - conf.ACCELARATION_HORIZ
    newDx = newDx < 0 ? 0 : newDx  
  } else {
    
    newDx = currentDx + conf.ACCELARATION_HORIZ
    newDx = newDx > 0 ? 0 : newDx
  }

  state.center.coord.dx = newDx;
  return state;
}

/**
 * Screen can move to left if there is at least one wall
 * outside the screen (at right side)
 * @param state 
 */
const screenCanMoveToLeft = (state: State) : boolean => {
  return state.walls.some(wall => wall.coord.x >= state.size.width)
}

/**
 * Screen can move to right if there is at least one wall
 * outside the screen (at left side)
 * @param state 
 */
const screenCanMoveToRight = (state: State) : boolean => {
  return state.walls.some(wall => wall.coord.x < 0)
}

const moveScreen = (state: State): State => {
  const newState = { ...state };
  const center: Rect = state.center;
  const currentDx = center.coord.dx;
  const newDx: number = Math.abs(currentDx) < conf.VITESSE_MAX ? currentDx + state.centerAcceleration : currentDx
  
  if (newDx > 0) {
    if (!screenCanMoveToRight(state)) {
      return state
    }
  } 

  if (newDx < 0) {
    if (!screenCanMoveToLeft(state)) {
      return state
    }
  } 
  
  newState.walls.map((wal: Rect) => {
    const newRect: Rect = { ...wal };
    newRect.coord.x += newDx;
  })

  newState.enemies.map((enemie: Rect) => {
    const newRect: Rect = { ...enemie };
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

export const endOfGame = (state: State): boolean => state.endOfGame
