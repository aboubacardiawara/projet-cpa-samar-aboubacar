import { ACCELARATION_HORIZ } from "./conf";
import { State, Ball, changeBallVelocity, updateState } from "./state";

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

const handleLeftClick = (state: State): State => {
    const newBall: Ball = {
        ...state.ball,
        acceleration: -ACCELARATION_HORIZ,
        direction: "left"
    }
    return {
        ...state,
        ball: newBall
    }
}

const handleRightClick = (state: State): State => {
    const newBall: Ball = {
        ...state.ball,
        acceleration: ACCELARATION_HORIZ,
        direction: "right"

    }
    return {
        ...state,
        ball: newBall
    }
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
        ...changeBallVelocity(ball, { dx: ball.coord.dx, dy: -15 }),
        jumping: true
    }
    return ball.jumping ? ball : newBall
}

export const notJumping = (state: State): State => {
    const ball: Ball = state.ball
    ball.jumping = false
    return updateState(state, ball)
}


export const keyUp =
    (state: State) =>
        (event: KeyboardEvent): State => {
            event.preventDefault()
            return stopBall(state)
        }

const stopBall = (state: State): State => {
    console.log("stop the ball");
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