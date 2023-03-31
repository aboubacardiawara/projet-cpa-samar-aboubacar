
const COTE = 40;
const MAX_X = 1800;
const MAX_Y = 920;
/**
 * - Il nous faut 30 briques pour remplir sur l'horizontal
 * - Il nous faut 20 briques sur la verticales
 */
export const description = {
    obstacles: {
        rectangles: [
            [0, 0, COTE, COTE*20],
            [80, 80, COTE*10, COTE],
            [120, 80, COTE*10, COTE]
        ],
        triangles: []
    }
}