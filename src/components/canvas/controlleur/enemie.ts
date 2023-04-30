import { Enemie } from "./state";

/**
 * Pour les enemis qui se deplacent horizontalement.
 * verifie si l'enemie a atteint sa destination.
 * pour ensuite mettre à jour la pochaine destination.
 * @param enemie 
 * @returns 
 */
const horizontalDestinationReached = (enemie: Enemie): boolean => {
    if (enemie.coord.dx > 0) {// sens: -->
        return enemie.coord.x + enemie.coord.dx >= enemie.destination
    } else if (enemie.coord.dx < 0) { // sens: <--
        return enemie.coord.x + enemie.coord.dx <= enemie.destination
    }
    return false;
}

/**
 * Pour les enemis qui se deplacent verticalement.
 * verifie si l'enemie a atteint sa destination.
 * pour ensuite mettre à jour la pochaine destination.
 * @param enemie 
 * @returns 
 */
const verticalDestinationReached = (enemie: Enemie): boolean => {
    if (enemie.coord.dy > 0) {// sens: -->
        return enemie.coord.y + enemie.coord.dy >= enemie.destination
    } else if (enemie.coord.dy < 0) { // sens: <--
        return enemie.coord.y + enemie.coord.dy <= enemie.destination
    }
    return false
}

/**
 * Permet de bouger l'enemie d'une ennemie.
 * @param enemie0 
 * @returns 
 */
export const moveEnemie = (enemie0: Enemie): Enemie => {
    if (enemie0.debut == enemie0.destination) {
        // dont move it
        return enemie0
    }
    const enemie = enemie0
    if (horizontalDestinationReached(enemie)) {
        // swap, debut, fin
        const temp = enemie.debut
        enemie.debut = enemie.destination
        enemie.destination = temp
        enemie.coord.dx *= -1
    }

    if (verticalDestinationReached(enemie)) {
        // swap debut, fin
        const temp = enemie.debut
        enemie.debut = enemie.destination
        enemie.destination = temp
        enemie.coord.dy *= -1
    }
    //console.log(enemie);
    enemie.coord.x += enemie.coord.dx
    enemie.coord.y += enemie.coord.dy
    return enemie
}

/**
 * Il existe deux types d'ennemies:
 * 1. Ceux qui se deplacent
 * 2. Ceux qui sont immobiles
 * Ils se distinguent par leur direction:
 * 1. N: Nothing (ne bouge pas)
 * 2. H: Horizontal (se deplace horizontalement) | V: Vertical (se deplace verticalement)
 * @param enemie 
 * @returns 
 */
export const isImobileEnemie = (enemie: Enemie): boolean => {
    return enemie.direction == "N"
}