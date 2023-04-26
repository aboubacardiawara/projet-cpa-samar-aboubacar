import { CONFIG } from '../../config/game/samples/enemie_mobile'
import * as conf from './conf'
import { EnemieData, WallData } from './interfaces'
import { Enemie, Wall } from './state'

export const getLevel = () => {
    let wallsData: WallData[] = []
    let enemiesData: EnemieData[] = []

    for (let screenNum = 0; screenNum < 3; screenNum++) {
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

export const initCanvas =
    (iterate: (ctx: CanvasRenderingContext2D) => void) =>
        (canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            requestAnimationFrame(() => iterate(ctx))
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
