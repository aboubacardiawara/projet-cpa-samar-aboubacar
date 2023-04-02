const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall",
                    dimensions: [0, MAX_Y - 5 * COTE, COTE * 10, COTE * 6],
                },
                {
                    type: "wall",
                    dimensions: [COTE * 20, MAX_Y - 5 * COTE, COTE * 13, COTE * 6],
                },
                {
                    type: "water", 
                    dimensions: [COTE*10, MAX_Y-4*COTE, COTE*10, COTE*4],
                },

            ],
            ressources: []
        }

    ]
}