import * as conf from './conf'
type Coord = { x: number; y: number; dx: number; dy: number }
type Ball = { coord: Coord; life: number; jumping: boolean }
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

const iterate = (state: State) => {
  console.log("dy: " + state.ball.coord.dy);
  //return state
  return applyGravitation(state);
}

export const step = iterate

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
        case " ":
          console.log("La balle saute");
          newState = jumpBall(state);
          //newState = state;
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
  return ballCanMoveUp(state) ? moveBall(state, 0, -state.ball.coord.dy) : state
}

const moveBallDown = (state: State): State => {
  return ballCanMoveDown(state) ? moveBall(state, 0, state.ball.coord.dy) : state
}

function fallBall(state: State) {
  const newState = moveBall(state, 0, state.ball.coord.dy);
  const changeBallSpeed = {
    ...newState.ball,
    coord: {
      ...newState.ball.coord,
      dy: newState.ball.coord.dy + conf.ACCELERATION_CHUTE
    }
  }
  return { ...newState, ball: changeBallSpeed }
}

const stopFalling = (state: State) => {
  const changeBallSpeed = {
    ...state.ball,
    coord: {
      ...state.ball.coord,
      dy: 0,
      jumping: false
    }
  }
  return { ...state, ball: changeBallSpeed }
}

const moveBallLeft = (state: State): State => {
  return ballCanMoveLeft(state) ? moveBall(state, -state.ball.coord.dx, 0) : state
}

const moveBallRight = (state: State): State => {
  return ballCanMoveRight(state) ? moveBall(state, state.ball.coord.dx, 0) : state
}

const jumpBall = (state: State): State => {
  const jumpBallAux = (state: State) => {
    const changeBallSpeed = {
      ...state.ball,
      coord: {
        ...state.ball.coord,
        dy: state.ball.coord.dy - conf.ACCELERATION_CHUTE * 10
      },
      jumping: true
    }
    console.log("jumping: " + changeBallSpeed.coord.dy);

    return { ...state, ball: changeBallSpeed }
  }

  return ballCanJump(state) ? jumpBallAux(state) : state
}

const jumpBall2 = (state: State): State => {
  const newState: State = moveBallUp(state);
  return newState
}

function ballCanMoveLeft(state: State) {
  const ball: Ball = state.ball;
  const currentPos: Coord = ball.coord;
  return currentPos.x - conf.RADIUS - currentPos.dx >= 0
}

function ballCanMoveRight(state: State) {
  const ball: Ball = state.ball;
  const currentPos: Coord = ball.coord;
  const limitX: number = state.size.width
  return currentPos.x + conf.RADIUS + currentPos.dx <= limitX
}

function ballCanMoveUp(state: State) {
  const ball: Ball = state.ball;
  const currentPos: Coord = ball.coord;
  return currentPos.y - conf.RADIUS - currentPos.dy >= 0
}

function ballCanMoveDown(state: State) {
  const ball: Ball = state.ball;
  const currentPos: Coord = ball.coord;
  const limitY: number = state.size.height
  return currentPos.y + conf.RADIUS + currentPos.dy <= limitY
}
function ballCanJump(state: State) {
  return true
  return !state.ball.jumping
}

const applyGravitation = (state: State) => {
  if (ballCanMoveDown(state))
    return fallBall(state)
  else {
    return stopFalling(state)
  }
}


