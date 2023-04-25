import { ENEMIE_VITESSE } from "./conf";
import { Enemie, Position, State } from "./state";

export const moveEnemie = (enemie: Enemie): Enemie => {
    const newEnemie: Enemie = enemie
    const currentPos: Position = enemie.position
    let nextPos: Position = currentPos;
    let vitesse:number[] = [0, 0];
    
    if (horizontalMovement(enemie)) {
        nextPos = currentPos
        vitesse[0] = (enemie.debut < enemie.destination) ? ENEMIE_VITESSE:-ENEMIE_VITESSE
    } 
    if (verticalMovement(enemie)){
        vitesse[1] = (enemie.debut < enemie.destination) ? ENEMIE_VITESSE:-ENEMIE_VITESSE
        nextPos = currentPos
    }

    if (destinationReached(enemie, vitesse)) {
        console.log("swap");
        // swap des and orig
        newEnemie.debut = enemie.destination
        newEnemie.destination = enemie.debut
        vitesse[0] *= -1
        vitesse[1] *= -1 
    } 
    

    nextPos.x += vitesse[0]
    nextPos.y += vitesse[1]

    newEnemie.position = nextPos

    return newEnemie
}

const destinationReached = (enemie: Enemie, vitesse: number[]): boolean => {
    if (horizontalMovement(enemie)) {
        // sens du deplacement
        if (vitesse[0] > 0) { // vers la droite
            return enemie.position.x >= enemie.destination
        } else { // vers la gauche
            return enemie.position.x <= enemie.destination
        }
    } else {
        if (vitesse[1] > 0) { // vers la droite
            return enemie.position.y >= enemie.destination
        } else { // vers la gauche
            return enemie.position.y <= enemie.destination
        }
    }
}

const horizontalMovement = (enemie: Enemie): boolean => {
    return enemie.direction === "H"
}

const verticalMovement = (enemie: Enemie): boolean => {
    return enemie.direction === "V"
}