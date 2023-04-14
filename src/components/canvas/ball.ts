import { Coord } from "./coord";
import { Direction } from "./direction";
import { Size, State, blocDessous, updateState } from "./state";
import * as conf from './conf'

export type Ball = { coord: Coord; life: number; jumping: boolean, acceleration: number, direction: Direction }


export const moveBall = (state: State): State => {
    const deplacementHorizontal: State = moveBallHoriz(state);
    const res: State = moveBallVerti(deplacementHorizontal);
    return res;
}

export const moveBallVerti = (state: State) => {
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

export const moveBallHoriz = (state: State) => {
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