import { Ball, changeBallVelocity, computeNexId, moveBall } from './ball';
import { collisionBallEnemie, collisionBallRessource, collisionCircleExit } from './collision';
import * as conf from '../data/conf'
import { Coord } from './coord';
import { isMovingRight } from './direction';
import { moveEnemie } from './enemie';
import { notJumping, stopScreen } from './keyboard';
import { inScreen } from '../view/renderer';
import { Ressource, nextStepRessource } from './ressource';

/*********************************************
              GAME ELEMENTS TYPE 
**********************************************/
export type Position = { x: number, y: number }
export type Mobile = { coord: Coord, height: number; width: number }
export type Size = { height: number; width: number }
export type Enemie = { direction: String, debut: number, destination: number, coord: Coord }
export type Wall = { position: Position, height: number; width: number }
export type Element = { type: string, dimension: number[] }
export type Sortie = { position: Position, unlocked: boolean }
export type EndOfGame = { end: boolean, hasWinPlayer: boolean }

/**
 * @field ball { Ball} la balle
 * @field size { Size} la taille de l'écran
 * @field center { Mobile} le centre de l'écran (voir le rapport pour plus de détails)
 * @field centerAcceleration { number} l'accélération du centre de l'écran
 * @field ballShouldBeRecentered { boolean} la balle doit être recentrée
 */
export type State = {
  ball: Ball
  size: Size
  center: Mobile
  centerAcceleration: number
  ballShouldBeRecentered: boolean
  endOfGame: EndOfGame
  walls: Array<Wall>
  enemies: Array<Enemie>
  ressources: Array<Ressource>
  sortie: Sortie
  collectedCoins: number
  goal: number
}

/**
 * Verifie si la balle est en l'air ou non
 * @param state 
 * @returns 
 */
const enLair = (state: State): boolean => {
  return !auSol(state)
}

/**
 *  Mets la balle dans un etat de saut
 * @param state.
 * @returns 
 */
const jumping = (state: State): State => {
  return updateState(state, {
    ...state.ball,
    jumping: true
  })
}

/**
 * Quand on bouge l'ecran, on a besoin de mettre à jours la position relative
 * des autres elements du jeu auquels. Pas besoin pour la balle car c'est 
 * à elle on veut donner l'mpression de mouvement en bougean l'ecran.
 * @param state 
 * @returns 
 */
const moveOtherCharacters = (state: State): State => {
  state.enemies = state.enemies.map(
    (enemie: Enemie) => moveEnemie(enemie)
  )

  return state
}

/**
 * Une etate du jeu pour les ressources
 * Cela reveint à faire un nextStepRessource sur chaque ressource
 * Ce dernier permet juste de gerer l'animation d'une ressource.
 * @param state 
 * @returns 
 */
const stepRessources = (state: State): State => {
  const newState: State = state
  const size0: number = state.ressources.length
  newState.ressources = newState.ressources
    .filter((ressource: Ressource) => {
      return !collisionBallRessource(state.ball, ressource)
    })
    .map(nextStepRessource)

  const size1: number = newState.ressources.length
  newState.collectedCoins += size0 - size1
  newState.sortie.unlocked = state.collectedCoins >= newState.goal
  return newState
}

/**
 * Gère est tour du jeu et tous les calculs qui en découlent.
 * Cela comprends:
 * - la gestion de la gravité
 * - la gestion des collisions
 * - la gestion des mouvements
 * - la gestion des sauts
 * - la gestion des ressources (disparaitre ceux qui sont ramassés)
 * @param state 
 * @returns 
 */
export const step = (state: State) => {
  const stateRessource: State = stepRessources(state);
  const moveCharacters = moveOtherCharacters(stateRessource)
  const newState: State = moveBall(moveCharacters);
  let resVert: State;
  resVert = auSol(state) ? arreteNewton(newState) : newton(newState)
  resVert = enLair(resVert) ? jumping(resVert) : resVert
  const resHor: State = state.ball.acceleration !== 0 ?
    resVert : ralentir(resVert);
  let screenState: State = state.centerAcceleration !== 0 ?
    moveScreen(resHor) : ralentirEcran(moveScreen(resHor))
  return checkGameOver(screenState);
}

/**
 * Verifie si la balle touche la sortie.
 * Suivant si la porte est deverouiile ou non, on renvoie true ou false.
 * Pas de collision pour une porte verouillée.
 * @param state 
 * @returns 
 */
const colisionBallEtExit = (state: State): boolean => {
  if (!state.sortie.unlocked) {
    return false;
  }
  return collisionCircleExit(state.ball, state.sortie)
}

/**
 * Gestionn de la collision entre la balle et les enements.
 * On a décidé de filtrer et ne tenir compte que des enemis qui sont dans l'écran.
 * /*\ A verfier si le cout du filtrage est plus grand que
 * le cout de la collision avec tous les enemis (même ceux qui ne sont dans l'ecran).
 * @param state 
 * @returns 
 */
const collisionBallEtEnemie = (state: State): boolean => {
  return state.enemies
    .filter(enemie => inScreen({ x: enemie.coord.x, y: enemie.coord.y }, conf.TAILLE_ENEMIE_MOBILE, conf.TAILLE_ENEMIE_MOBILE))
    .some(
      (enemie: Enemie) => collisionBallEnemie(state.ball, enemie));
}

/**
 * Verifie si le jeu est terminé ou non.
 * Un jeu est terminé dans l'un cas suivants:
 * - la balle touche un enemie (echec)
 * - la balle touche la sortie (reussite)
 * 
 * @param state 
 * @returns 
 */
const checkGameOver = (state: State): State => {
  const newState: State = state
  const collisionWithEnemie: boolean = collisionBallEtEnemie(state);
  const collisionWithExit: boolean = colisionBallEtExit(state)
  newState.endOfGame = {
    end: collisionWithEnemie || collisionWithExit,
    hasWinPlayer: collisionWithExit
  }
  return newState;
}

/**
 * Une balle est sol est une balle qui repose sur un bloc.
 * @param state 
 * @returns 
 */
const auSol = (state: State): boolean => {
  const y: number = state.ball.coord.y;
  const r: number = conf.RADIUS;
  const limitY: number = state.size.height;
  return (y + r) === limitY - blocDessous(state);
}

/**
 * Verifie si un mur donné est placé au dessus de la balle
 * dans le jeu. Cela permet de trouver le mur sur lequel doit reposer la balle.
 * @param w 
 * @param ball 
 * @returns 
 */
const wallOverBall = (w: Wall, ball: Ball): boolean => {
  return w.position.y + w.height <= ball.coord.y - conf.RADIUS
}

/**
 * Calcul le niveau sur lequel doit chuter la balle.
 * De tous les blocs en bas de la balle, celui qui est le plus elevé
 * en altiture est celui sur lequel doit reposer la balle.
 * @param state 
 * @returns 
 */
export const blocDessous = (state: State): number => {
  const walls: Array<Wall> =
    state.walls
      .filter((w: Wall) =>
        inScreen(w.position, w.width, w.height)
        && canSupportBall(w, state.ball)
        && !wallOverBall(w, state.ball)
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

/**
 * Trouve le mur le plus haut en altitude.
 * @param state 
 * @param walls 
 * @returns 
 */
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
 * Verifie si un mur peux supporter la balle.
 * C'est la cas si la balle est au dessus du mur.
 * @param w 
 * @param ball 
 * @returns 
 */
const canSupportBall = (w: Wall, ball: Ball): boolean => {
  return w.position.x <= ball.coord.x + conf.RADIUS && ball.coord.x - conf.RADIUS <= w.position.x + w.width
}

/**
 * Arrete d'appliquer la force de Newton sur la balle.
 * C'est cette forrce qui ramene la balle vers le bas quand elle est en l'air.
 * @param state 
 * @returns 
 */
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

/**
 * Utilitaire pour changer l'etat du jeu en donnant une nouvelle balle.
 * [C'etait pour eviter de muter les champ de l'etat]
 * @param state 
 * @param newBall 
 * @returns 
 */
export const updateState = (state: State, newBall: Ball): State => {
  return {
    ...state,
    ball: newBall
  }
}

/**
 * La fameuse newton qui attire la balle vers le bas.
 * C'est notre pseudo force de gravité.
 * @param state 
 * @returns 
 */
const newton = (state: State): State => {
  const ball: Ball = state.ball
  const newBall: Ball = changeBallVelocity(ball, { dx: ball.coord.dx, dy: ball.coord.dy + conf.ACCELERATION_CHUTE })
  return updateState(state, newBall)
}

/**
 * Ralentir la balle dans son mouvement horizontal.
 * @param state 
 * @returns 
 */
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

/**
 * Determine si l'ecran est entrain de se deplacer vers la droite.
 * @param ecran 
 * @returns 
 */
const isMovingRightEcran = (ecran: Mobile): boolean => {
  return ecran.coord.dx > 0;
}

/**
 * Ralenti l'ecran dans son mouvement horizontal.
 * @param state 
 * @returns 
 */
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
  return state.walls.some((wall: Wall) => wall.position.x + wall.width > state.size.width)
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
  const center: Mobile = state.center;
  const currentDx = center.coord.dx;
  const newDx: number = Math.abs(currentDx) < conf.VITESSE_MAX ? currentDx + state.centerAcceleration : currentDx

  if (newDx > 0) {
    if (!screenCanMoveToRight(state)) {
      state.centerAcceleration = 0
      state.center.coord.dx = 0
      return state
    }
  }

  if (newDx < 0) {
    if (!screenCanMoveToLeft(state)) {
      state.centerAcceleration = 0
      state.center.coord.dx = 0
      return state
    }
  }

  newState.walls.map((wal: Wall) => {
    const newWall: Wall = { ...wal };
    newWall.position.x += newDx;
    return newWall
  })

  newState.sortie.position.x += newDx

  newState.enemies.map((enemie: Enemie) => {
    const newEnemie: Enemie = enemie
    if (newEnemie.direction === "H") {
      newEnemie.debut += newDx
      newEnemie.destination += newDx
    }
    newEnemie.coord.x += newDx
    return newEnemie
  })


  newState.ressources = state.ressources.map((ressource: Ressource) => {
    const newRessource: Ressource = { ...ressource }
    newRessource.position.x += newDx
    return newRessource
  }
  )

  const newCenter: Mobile = {
    ...center,
    coord: {
      ...center.coord,
      dx: newDx
    }
  }

  return { ...newState, center: newCenter };
}


export const gameOver = (state: State): boolean => {
  return state.endOfGame.end
}

export const playerHasWin = (state: State): boolean => {
  return state.endOfGame.hasWinPlayer
}