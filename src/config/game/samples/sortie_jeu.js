import { HEIGHT_SORTIE, WIDTH_SORTIE } from "../../../components/canvas/conf";

const COTE = 40;
const TAILLE_ENEMIE = 80

// structure: ____----____
export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall",
                    dimensions: [0, 0, COTE * 10, COTE * 20],
                },
                {
                    type: "wall",
                    dimensions: [0, MAX_Y - 3 * COTE, COTE * 100, COTE * 3],
                },
                {
                    type: "sortie", 
                    dimensions: [COTE * 30, MAX_Y - 3 * COTE - HEIGHT_SORTIE, WIDTH_SORTIE, HEIGHT_SORTIE],
                }

            ],
            ressources: []
        }

    ]
}