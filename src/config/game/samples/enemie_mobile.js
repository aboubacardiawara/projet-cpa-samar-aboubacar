const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;
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
                    dimensions: [0, MAX_Y - 3 * COTE, COTE * 300, COTE * 3],
                }

            ],
            enemies: [
                {
                    direction: "H",
                    debut: 500,
                    destination: 800,
                    position: [400, MAX_Y - TAILLE_ENEMIE - COTE * 3],
                }
            ],
            ressources: []
        }

    ]
}