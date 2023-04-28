import { Ball, ballAtLeftBoundarie, ballAtRightBoundarie, changeBallVelocity, computeNexId } from "./ball";
import { ACCELARATION_HORIZ, RADIUS, VITESSE_INIT_SAUT } from "./conf";
import { State, updateState } from "./state";

export const keyDown =
    (state: State) =>
        (event: KeyboardEvent): State => {
            //event.preventDefault()
            let newState: State;
            const keyName: string = event.key;
            switch (keyName) {
                case "ArrowLeft":
                    newState = handleLeftClick(state);
                    break;
                case "ArrowRight":
                    newState = handleRightClick(state);
                    break;
                case " ":
                    newState = handleSpaceClick(state)
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
            event.preventDefault()
            let newState: State;
            const keyName: string = event.key;
            switch (keyName) {
                case "ArrowLeft":
                    newState = stopScreen(state);
                    break;
                case "ArrowRight":
                    newState = stopScreen(state);
                    break;
                default:
                    newState = state
                    break;
            }
            return newState
        }

const handleLeftClick = (state: State): State => {
    const newState = state
    newState.centerAcceleration = +ACCELARATION_HORIZ
    // gestion img
    newState.ball.imgIndex = computeNexId(newState.ball.imgIndex, false)
    return newState
}

const handleRightClick = (state: State): State => {
    const newState = state
    newState.centerAcceleration = -ACCELARATION_HORIZ
    // gestion img
    newState.ball.imgIndex = computeNexId(newState.ball.imgIndex, true)
    return newState
}

const handleSpaceClick = (state: State): State => {
    const ball: Ball = state.ball
    const newBall: Ball = jump(ball)
    return {
        ...state,
        ball: newBall
    }
}

const jump = (ball: Ball): Ball => {
    const newBall: Ball = {
        ...changeBallVelocity(ball, { dx: ball.coord.dx, dy: VITESSE_INIT_SAUT * RADIUS }),
        jumping: true
    }
    return ball.jumping ? ball : newBall
}

export const notJumping = (state: State): State => {
    const ball: Ball = state.ball
    ball.jumping = false
    return updateState(state, ball)
}


export const stopBall = (state: State): State => {
    const newBall: Ball = {
        ...state.ball,
        coord: {
            ...state.ball.coord,
        },
        acceleration: 0
    }
    return {
        ...state,
        ball: newBall
    }
}

export const stopScreen = (state: State): State => {
    state.centerAcceleration = 0;

    return state.ballShouldBeRecentered ? state : replaceBall(state);
}

export const stopScreenVitesse = (state: State): State => {
    state.centerAcceleration = 0;
    state.center.coord.dx = 0;
    return state.ballShouldBeRecentered ? state : replaceBall(state);
}





const replaceBall = (state: State): State => {
    const newBall: Ball = state.ball;
    const delta: number = 3;
    if (ballAtLeftBoundarie(state)) {
        newBall.coord.x += delta
    } else if (ballAtRightBoundarie(state)) {
        newBall.coord.x -= delta
    } else {
        return state
    }
    state.ball = newBall;
    return state;
}