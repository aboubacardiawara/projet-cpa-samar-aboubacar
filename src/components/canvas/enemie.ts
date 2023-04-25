import { ENEMIE_VITESSE } from "./conf";
import { Enemie, Position, State } from "./state";

const horizontalDestinationReached = (enemie: Enemie): boolean => {
    if (enemie.coord.dx > 0) {// sens: -->
        console.log("-->");
        return enemie.coord.x + enemie.coord.dx >= enemie.destination
    } else if (enemie.coord.dx < 0) { // sens: <--
        console.log("<--");
        return enemie.coord.x + enemie.coord.dx <= enemie.destination
    }
    return false;
}

const verticalDestinationReached = (enemie: Enemie): boolean => {
    if (enemie.coord.dy > 0) {// sens: -->
        return enemie.coord.y + enemie.coord.dy >= enemie.destination
    } else if (enemie.coord.dy < 0) { // sens: <--
        return enemie.coord.y + enemie.coord.dy <= enemie.destination
    }
    return false
}

export const moveEnemie = (enemie0: Enemie): Enemie => {
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