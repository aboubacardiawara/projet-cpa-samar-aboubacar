import { Position } from "./state";

export type Ressource = {
    position: Position,
    cpt: number,
    imagesSrc: string[],
    imgIndex: number
}

/**
 * Bouge une ressource d'une etape
 * Une ressource etant immobile, elle ne bouge pas.
 * Juste son image change pour l'animation.
 * @param ressource0 
 * @returns 
 */
export const nextStepRessource = (ressource0: Ressource): Ressource => {
    const ressource: Ressource = ressource0
    if (ressource.cpt == 25) {
        ressource.cpt = 0
        if (ressource.imgIndex == ressource.imagesSrc.length - 1) {
            ressource.imgIndex = 0
        } else {
            ressource.imgIndex++
        }
    } else {
        ressource.cpt++
    }

    return ressource
}