import { Coord } from "./coord";
import { Direction, isMovingLeft, isMovingRight } from "./direction";
import { Size, State, Wall, blocDessous, updateState } from "./state";
import * as conf from '../data/conf'
import { collisionCircleBox } from "./collision";
import { inScreen } from "../view/renderer";

/**
 * @typedef {Object} Ball la balle
 * @property {Coord} coord les coordonnées de la balle
 * @property {boolean} jumping true si la balle est en train de sauter
 * @property {number} acceleration  l'acceleration de la balle
 * @property {Direction} direction la direction de la balle
 * @property {number} imgIndex l'index de l'image de la balle
 * @property {string[]} images l'enemble des images de la balle
 */
export type Ball = {
    coord: Coord,
    jumping: boolean,
    acceleration: number,
    direction: Direction,
    imgIndex: number,
    images: string[]
}


/**
 * Deplace la balle horizontalement puis verticalement
 * en fonction de sa vitessse et gère les eventuelles
 * corrections de replacement.
 * @param state {State} l'etat du jeu
 * @returns {State} le nouvel etat du jeu
 */
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

/**
 * Replace la balle sur la direction verticale
 * Dans le cas ou la balle est en dehors de l'ecran
 * il la replace sur le point le plus bas de l'ecran et valide.
 * Parfois en fonction de la vitesse de la balle, elle peut 
 * ne pas atterir exactement au sol. Dans ce cas on la replace.
 * @param state 
 * @returns 
 */
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

/**
 * /!\
 * Ce bloc n'est pas utile même si c'set référé.
 * Sa lecture n'est pas vraiement utile.
 * Pour les curieux, en effet il a été utilisé pour 
 * la première strategie de defilement de l'ecran.
 * (Lire le rapport pour plus de détails)
 * @deprecated 
 * @param state 
 * @returns 
 */
export const ballAtLeftBoundarie = (state: State): boolean => {
    return state.ball.coord.x <= state.center.coord.x
}

/**
 * /!\
 * Ce bloc n'est pas utile même si c'set référé.
 * Sa lecture n'est pas vraiement utile.
 * Pour les curieux, en effet il a été utilisé pour 
 * la première strategie de defilement de l'ecran.
 * (Lire le rapport pour plus de détails)
 * @deprecated 
 * @param state 
 * @returns 
 */
export const ballAtRightBoundarie = (state: State): boolean => {
    const x: number = state.center.coord.x;
    const w: number = state.center.width;
    return state.ball.coord.x >= x + w;
}

/**
 * Deplace l'ecran vers la droite.
 * Cela donne l'impression que la balle se deplace vers la gauche.
 * @param state 
 * @returns 
 */
const moveScreenToTheRight = (state: State): State => {
    const newState: State = state;
    newState.centerAcceleration = conf.ACCELARATION_HORIZ;
    return newState;
}

/**
 * Deplace l'ecran vers la gauche.
 * Cela donne l'impression que la balle se deplace vers la droite.
 * @param state 
 * @returns 
 */
const moveScreenToTheLeft = (state: State): State => {
    const newState: State = state;
    newState.centerAcceleration = -conf.ACCELARATION_HORIZ;
    return newState;
}

/**
 * Arrete le deplacement de l'ecran.
 * Cela donne l'impression que la balle est arretée.
 * @param state 
 * @returns 
 */
const stopMovingScreen = (state: State): State => {
    const newState: State = state;
    newState.center.coord.dx = 0;
    return newState;
}

/**
 * Annule la vitesse et l'acceleration de la balle.
 * @param state 
 * @returns 
 */
export const arreteBall = (state: State): State => {
    if (state.ball.jumping) {
        return state
    }
    const newBall: Ball = state.ball;
    newBall.coord.dx = 0;
    newBall.acceleration = 0;
    return { ...state, ball: newBall };
}

/**
 * Mouvement de la balle horizontalement.
 * Cela reviens à derminer dans quel sens la balle se deplace
 * et à deplacer l'ecran dans le sens inverse.
 * Sans bouger la balle.
 * @param state0 
 * @returns 
 */
export const moveBallHoriz = (state0: State) => {
    let state: State;
    if (state0.center.coord.dx < 0) { // moving right
        if (ballAtRightBoundarie(state0)) {
            state = moveScreenToTheLeft(state0);
        } else {
            state = state0;
        }
    } else if (state0.center.coord.dx > 0) { // moving left
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
    const newDx: number =
        Math.abs(currentDx) < conf.VITESSE_MAX ?
            currentDx + ball.acceleration
            : currentDx
    const newBall: Ball = {
        ...ball,
        coord: {
            ...ball.coord,
            x: ball.coord.x + newDx,
            dx: newDx
        }
    }
    if (newBall.coord.dx === 0) {
    }
    let newState: State = {
        ...state,
        ball: newBall
    }

    newState = gestionCollisionHorizontal(newState)

    return isBallInCanvasHorital(newState) ? newState : state
}

/**
 * 
 * @param state arrete la balle et le defilement de l'ecran.
 * Cela arrive quand la balle rencontre un obstacle sur l'horizontale.
 * @returns 
 */
const arreteBallAndScreen = (state: State): State => {
    return arreteBall(stopMovingScreen(state))
}

/**
 * QUand la balle rencontre un obstalce sur l'horizontale, elle bloque.
 * @param state 
 * @returns 
 */
const gestionCollisionHorizontal = (state: State): State => {
    state.walls
        .filter(w => inScreen(w.position, w.width, w.height))
        .forEach(wall => {
            if (collisionCircleBox(state.ball, wall)) {
                return stopMovingScreen(replaceBall(state, wall));
            }
        })

    return state;
}

const replaceBall = (state: State, wall: Wall): State => {
    let newBall: Ball = state.ball
    if (state.ball.coord.x < wall.position.x) {
        // la balle est à gauche
        newBall.coord.x = wall.position.x - conf.RADIUS - 1
    } else if ((state.ball.coord.x > wall.position.x)) {
        // la balle est à droite
        newBall.coord.x = wall.position.x + wall.width + conf.RADIUS + 1
    }
    return updateState(state, newBall)
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


export const computeNexId = (id: number, forward: boolean): number => {
    if (forward) {
        if (id == 3) {
            return 0
        } else {
            return id + 1
        }
    } else {
        if (id == 0) {
            return 3
        } else {
            return id - 1
        }
    }
}