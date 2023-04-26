import { Ball, changeBallVelocity, moveBall } from './ball';
import { collisionBallEnemie } from './collision';
import * as conf from './conf'
import { Coord } from './coord';
import { isMovingRight } from './direction';
import { moveEnemie } from './enemie';
import { notJumping } from './keyboard';
export type Position = { x: number, y: number }
export type Rect = { coord: Coord, height: number; width: number }
export type Size = { height: number; width: number }
export type Enemie = { direction: String, debut: number, destination: number, coord: Coord }
export type Wall = { position: Position, height: number; width: number }
export type Element = { type: string, dimension: number[] }

export type State = {
  ball: Ball
  size: Size
  center: Rect
  centerAcceleration: number
  ballShouldBeRecentered: boolean
  endOfGame: boolean
  walls: Array<Wall>
  enemies: Array<Enemie>
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
const ballOutSideCenter = (state: State): boolean => {
  const epsilon: number = 5
  return !state.ball.jumping && state.ball.coord.x - epsilon > state.center.coord.x + state.center.width
  /*|| state.ball.coord.x < state.center.coord.x;*/
}

/**
 * 
 * @param state verifie si la balle est au centre de l'ecran.
 * @returns 
 */
const ballShouldNotBeCentered = (state: State): boolean => {
  const epsilon: number = 100
  return state.ball.coord.x < state.center.coord.x + state.center.width - epsilon
}


const recenterBall = (state: State): State => {
  const newState = state
  const delta = -state.center.coord.dx
  // deplacer la balle
  newState.ball.coord.x -= delta

  // deplacer les murs
  newState.walls = newState.walls.map((w: Wall) => {
    w.position.x -= delta
    return w
  })


  // deplacer les enemis
  newState.enemies = newState.enemies.map(e => {
    e.coord.x -= delta
    return e
  })
  return newState
}

const recenterScreenChecker = (state: State): State => {
  const newState = state
  newState.ballShouldBeRecentered = ballOutSideCenter(state)
  return newState
}


const moveCharacters = (state: State): State => {
  state.enemies = state.enemies.map(
    (enemie: Enemie) => moveEnemie(enemie)
  )

  return state
}

export const step = (state: State) => {
  const moveOtherCharacters = moveCharacters(state)
  const newState: State = moveBall(moveOtherCharacters);
  let resVert: State;
  resVert = auSol(state) ? arreteNewton(newState) : newton(newState)
  resVert = enLair(resVert) ? jumping(resVert) : resVert
  const resHor: State = state.ball.acceleration !== 0 ?
    resVert : ralentir(resVert);

  let screenState: State = state.centerAcceleration !== 0 ?
    moveScreen(resHor) : ralentirEcran(moveScreen(resHor))
  screenState = recenterScreenChecker(screenState)
  return checkGameOver(screenState);
}

const checkGameOver = (state: State): State => {
  const newState: State = state
  newState.endOfGame = state.enemies.some(
    (enemie: Enemie) => collisionBallEnemie(state.ball, enemie))
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
  const walls: Array<Wall> = state.walls.filter(
    (w: Wall) => canSupportBall(w, state.ball)
  )
  const candidatWall: Wall = maxWallInHeight(state, walls)
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
const distanceToBottom = (state: State, wall: Wall): number => {

  const ballX: number = state.ball.coord.x
  const wallX: number = wall.position.x
  const distanceNaive: number = state.size.height - wall.position.y

  const correctionDistance: number = 5
  if (wallX > ballX) {
    return distanceNaive - correctionDistance
  } else if (wallX + wall.width < ballX) {
    return distanceNaive + correctionDistance
  }

  return distanceNaive
}

const maxWallInHeight = (state: State, walls: Array<Wall>): Wall => {
  let res: Wall = walls[0];
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
const canSupportBall = (w: Wall, ball: Ball): boolean => {
  return w.position.x <= ball.coord.x + conf.RADIUS && ball.coord.x - conf.RADIUS <= w.position.x + w.width
}

const arreteNewton = (state: State): State => {
  const ball: Ball = state.ball
  const elasticity: number = 0.5

  let newDy: number = Math.abs(ball.coord.dy) <= 2 ? 0 : - ball.coord.dy * elasticity
  if (ball.coord.dy > 0) {
    newDy = ball.coord.dy <= 2 ? 0 : ball.coord.dy * elasticity
  }

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
const screenCanMoveToLeft = (state: State): boolean => {
  return state.walls.some((wall: Wall) => wall.position.x >= state.size.width)
}

/**
 * Screen can move to right if there is at least one wall
 * outside the screen (at left side)
 * @param state 
 */
const screenCanMoveToRight = (state: State): boolean => {
  return state.walls.some(wall => wall.position.x < 0)
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

  newState.walls.map((wal: Wall) => {
    const newWall: Wall = { ...wal };
    newWall.position.x += newDx;
    return newWall
  })


  newState.enemies.map((enemie: Enemie) => {
    const newEnemie: Enemie = enemie
    newEnemie.coord.x += newDx
    newEnemie.debut += newDx
    newEnemie.destination += newDx
    return newEnemie
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
