const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;
// structure: ____----____
export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall",
                    dimensions: [0, MAX_Y - 4 * COTE, COTE * 10, COTE * 4],
                },
                {
                    type: "wall",
                    dimensions: [COTE * 10, MAX_Y - 3 * COTE, COTE * 100, COTE * 3],
                }

            ],
            ressources: []
        }

    ]
}