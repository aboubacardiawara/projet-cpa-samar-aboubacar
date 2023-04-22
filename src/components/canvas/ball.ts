import { Coord } from "./coord";
import { Direction, isMovingLeft, isMovingRight } from "./direction";
import { Rect, Size, State, blocDessous, updateState } from "./state";
import * as conf from './conf'
import { stat } from "fs";
import { collisionCircleBoxHorizontal } from "./collision";

export type Ball = { coord: Coord; life: number; jumping: boolean, acceleration: number, direction: Direction, imgid: number }


export const moveBall = (state: State): State => {

    const deplacementHorizontal: State = moveBallHoriz(state);
    const res: State = moveBallVerti(deplacementHorizontal);
    return res;
}

export const moveBallVerti = (state: State) => {
    //console.log(`center dx: ${state.center.coord.dx}`);
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

export const ballAtLeftBoundarie = (state: State): boolean => {
    return state.ball.coord.x <= state.center.coord.x
}

export const ballAtRightBoundarie = (state: State): boolean => {
    const x: number = state.center.coord.x;
    const w: number = state.center.width;
    return state.ball.coord.x >= x + w;
}

const moveScreenToTheRight = (state: State): State => {
    const newState: State = state;
    newState.centerAcceleration = conf.ACCELARATION_HORIZ;
    return newState;
}

const moveScreenToTheLeft = (state: State): State => {
    const newState: State = state;
    newState.centerAcceleration = -conf.ACCELARATION_HORIZ;
    return newState;
}

const stopMovingScreen = (state: State): State => {
    const newState: State = state;
    newState.center.coord.dx = 0;
    return newState;
}

export const arreteBall = (state: State): State => {
    const newBall: Ball = state.ball;
    newBall.coord.dx = 0;
    newBall.acceleration = 0;
    return { ...state, ball: newBall };
}

const isMovingRightBis = (ball: Ball): boolean => {
    return ball.coord.dx > 0;
}

const isMovingLeftBis = (ball: Ball): boolean => {
    return ball.coord.dx < 0;
}

export const moveBallHoriz = (state0: State) => {
    let state: State;
    if (isMovingRight(state0.ball.direction)) {
        if (ballAtRightBoundarie(state0)) {
            state = arreteBall(moveScreenToTheLeft(state0));
        } else {
            state = state0;
        }
    } else if (isMovingLeft(state0.ball.direction)) {
        if (ballAtLeftBoundarie(state0)) {
            state = arreteBall(moveScreenToTheRight(state0));
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
        },
        imgid: computeNewImgId(state) + ball.imgid
    }
    if (newBall.coord.dx === 0) {
        //all.direction = "nothing"
    }
    let newState: State = {
        ...state,
        ball: newBall
    }

    newState = gestionCollisionHorizontal(newState)

    return isBallInCanvasHorital(newState) ? newState : state
}

const arreteBallAndScreen = (state: State) : State => {
    return arreteBall(stopMovingScreen(state))
}

const gestionCollisionHorizontal = (state: State): State => {
    state.walls.forEach(wall => {
        if (collisionCircleBoxHorizontal(state.ball, wall)) {
            console.log("direction: " + state.ball.direction)
            return arreteBallAndScreen(replaceBall(state, wall));
        }
    })

    return state;
}

const replaceBall = (state: State, wall: Rect): State => {
    let newBall: Ball = state.ball
    if (state.ball.coord.x < wall.coord.x) {
        // la balle est à gauche
        newBall.coord.x = wall.coord.x - conf.RADIUS -1
    } else if ((state.ball.coord.x > wall.coord.x)) {
        // la balle est à droite
        newBall.coord.x = wall.coord.x + wall.width + conf.RADIUS + 1
    }
    return updateState(state, newBall)
}


const computeNewImgId = (state: State): number => {
    if (state.centerAcceleration === 0 && state.ball.coord.dx == 0) {
        return 0
    }
    return 1
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

