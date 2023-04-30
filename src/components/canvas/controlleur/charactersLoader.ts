import { CONFIG } from '../data/levelsConfig'
import * as conf from '../data/conf'
import { EnemieData, WallData, RessourceData } from './interfaces'
import { Ressource } from './ressource'
import { Enemie, Sortie, Wall } from './state'
import { Direction } from './direction'

/**
 * Charge depuis le fichier de description le nivau du jeu.
 * Le niveau est un objet dont les champs sont:
 * - walls: les murs
 * - enemies: les ennemis
 * - ressources: les ressources
 * - sortie: la sortie
 * 
 * NB: [Pendant la lecture faire abstraction de la boucle].
 * Elle est là pendant la phase de developpement de niveau
 * A defaut d'avoir suffisament d'elements pour que le niveau s'etende sur plusieurs ecrans.
 * on repete les même élements pour simuler un niveau plus grand.
 * Chacun represente la description d'un groupe de personnage.
 * @returns 
 */
export const getLevel = () => {
    let wallsData: WallData[] = []
    let enemiesData: EnemieData[] = []

    for (let screenNum = 0; screenNum < 1; screenNum++) {
        const screen = { ...CONFIG.levels[0] };
        wallsData = wallsData.concat(screen.walls.map(
            (wallData: WallData) => {
                const newWalldata: WallData = {
                    ...wallData,
                    position: {
                        ...wallData.position,
                        x: screenNum * conf.MAX_X + wallData.position.x
                    }
                }
                return newWalldata
            }
        ))

        enemiesData = enemiesData.concat(screen.enemies.map(
            (enemieData: EnemieData) => {
                const newEnemieData: EnemieData = {
                    ...enemieData,
                    position: {
                        ...enemieData.position,
                        x: screenNum * conf.MAX_X + enemieData.position.x
                    }
                }
                return newEnemieData;
            }
        ))
    }

    const newLevel = { ...CONFIG.levels[0] };
    newLevel.enemies = enemiesData;
    newLevel.walls = wallsData;

    return newLevel
}



/**
 * Prend un objet données d'un mur et construit un element mur.
 * @param data 
 * @returns 
 */
export const buildWall = (data: WallData): Wall => (
    data
)

const buildEnemiesMobile = (
    data: EnemieData) => (
    {
        direction: data.direction,
        debut: data.debut,
        destination: data.destination,
        coord: {
            x: data.position.x,
            y: data.position.y,
            dx: data.direction === "H" ? conf.ENEMIE_VITESSE : 0,
            dy: data.direction === "V" ? conf.ENEMIE_VITESSE : 0
        }
    }
)

const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buildRessource = (ressourceData: RessourceData): Ressource => {
    return {
        ...ressourceData,
        cpt: randomInteger(0, 25),
        imagesSrc: ['piece-1.png', 'piece-2.png'],
        imgIndex: randomInteger(0, 1)
    }
}

/**
 * Initilise les elements murs de ce niveau
 * @returns 
 */
export const initWalls = (): Wall[] => {
    return getLevel().walls.map(buildWall)
}

export const initEnemies = (): Enemie[] => {
    return CONFIG.levels[0].enemies.map(
        enemieData => buildEnemiesMobile(enemieData))
}

export const initSortie = (): Sortie => ({
    ...getLevel().sortie,
    unlocked: false
})


export const initRessources = (): Ressource[] => {
    return getLevel().ressources.map(
        (ressourceData: RessourceData) => buildRessource(ressourceData)
    )
}

export const initGoal = (): number => {
    return getLevel().goal
}

export function initBall() {
    const position = getLevel().entree.position
    const sens: Direction = "nothing"
    return {
        coord: {
            x: position.x,
            y: position.y,
            dx: 0,
            dy: 0,
        },
        jumping: false,
        acceleration: 0,
        direction: sens,
        imgIndex: 0,
        images: [
            "bounce-1.png",
            "bounce-2.png",
            "bounce-3.png",
            "bounce-4.png"],
    }
}