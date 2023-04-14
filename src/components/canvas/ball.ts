import { Coord } from "./coord";
import { Direction, isMovingLeft, isMovingRight } from "./direction";
import { Rect, Size, State, blocDessous, updateState } from "./state";
import * as conf from './conf'
import { stat } from "fs";

export type Ball = { coord: Coord; life: number; jumping: boolean, acceleration: number, direction: Direction }


export const moveBall = (state: State): State => {

    const deplacementHorizontal: State = moveBallHoriz(state);
    const res: State = moveBallVerti(deplacementHorizontal);
    return res;
}

export const moveBallVerti = (state: State) => {
    console.log(`center dx: ${state.center.coord.dx}`);
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

    return isBallInCanvasVertical(newState) ? newState : replaceVert(state)
}

export const replaceVert = (state: State): State => {
    const ball: Ball = state.ball;
    const newBall: Ball = {
        ...ball,
        coord: {
            ...ball.coord,
            y: state.size.height - conf.RADIUS - blocDessous(state)
        }

    }
    return updateState(state, newBall)
}

const ballAtLeftBoundarie = (state: State): boolean => {
    return state.ball.coord.x <= state.center.coord.x
}

const ballAtRightBoundarie = (state: State): boolean => {
    const x: number = state.center.coord.x;
    const w: number = state.center.width;
    return state.ball.coord.x >= x + w;
}

const moveScreenToTheRight = (state: State): State => {
    const newState: State = state;
    newState.center.coord.dx = 10;
    return newState;
}

const moveScreenToTheLeft = (state: State): State => {
    const newState: State = state;
    newState.center.coord.dx = -10;
    return newState;
}

const stopMovingScreen = (state: State): State => {
    const newState: State = state;
    newState.center.coord.dx = 0;
    return newState;
}

export const moveBallHoriz = (state0: State) => {
    let state: State;
    if (isMovingRight(state0.ball.direction)) {
        if (ballAtRightBoundarie(state0)) {
            state = moveScreenToTheLeft(state0);
        } else {
            state = state0;
        }
    } else if (isMovingLeft(state0.ball.direction)) {
        if (ballAtLeftBoundarie(state0)) {
            state = moveScreenToTheRight(state0);
        } else {
            state = state0;
        }
    } else {
        state = stopMovingScreen(state0);
    }

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
    if (newBall.coord.dx === 0) {
        newBall.direction = "nothing"
    }
    const newState: State = {
        ...state,
        ball: newBall
    }

    return isBallInCanvasHorital(newState) ? newState : state
}

/**
 * 
 * @param size {}
 * @param newBall 
 * @returns 
 */
export const isBallInCanvasVertical = (state: State): boolean => {
    const size: Size = state.size
    const newBall: Ball = state.ball
    const r: number = conf.RADIUS;
    const limitY: number = size.height
    const y: number = newBall.coord.y

    // x, y: le centre du cercle
    const condUp: boolean = (y - r) >= 0;
    const condDown: boolean = (y + r) < limitY - blocDessous(state);

    return condDown && condUp;
}

export const isBallInCanvasHorital = (state: State): boolean => {
    const size: Size = state.size
    const newBall: Ball = state.ball
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