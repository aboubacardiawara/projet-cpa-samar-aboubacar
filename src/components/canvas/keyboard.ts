import { ACCELARATION_HORIZ } from "./conf";
import { State, Ball } from "./state";

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
    return state;
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