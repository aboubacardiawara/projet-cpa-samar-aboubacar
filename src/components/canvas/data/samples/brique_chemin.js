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
                    dimensions: [0, MAX_Y - 3 * COTE, COTE * 13, COTE * 3],
                },
                {
                    type: "wall",
                    dimensions: [COTE * 17, MAX_Y - 3 * COTE, COTE * 13, COTE * 3],
                },
                {
                    type: "eau", 
                    dimensions: [COTE*12, MAX_Y-4*COTE, COTE*6, COTE],
                },

            ],
            ressources: []
        }

    ]
}