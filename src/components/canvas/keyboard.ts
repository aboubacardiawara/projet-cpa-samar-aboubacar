import { State } from "./state";

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
            return state
        }

const handleLeftClick = (state: State): State => {
    return state;
}

const handleRightClick = (state: State): State => {
    return state;
}

const handleSpaceClick = (state: State): State => {
    return state;
}