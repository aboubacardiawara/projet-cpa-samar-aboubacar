const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall",
                    dimensions: [0, 0, COTE * 30, COTE * 8],
                },
                {
                    type: "wall",
                    dimensions: [MAX_X-10*COTE, COTE*8, COTE * 10, COTE*3],
                },
                {
                    type: "wall",
                    dimensions: [0, MAX_Y - 7 * COTE, COTE * 10, COTE * 7],
                },
                {
                    type: "wall",
                    dimensions: [COTE * 20, MAX_Y - 5 * COTE, COTE * 13, COTE * 4],
                },
                {
                    type: "water",
                    dimensions: [COTE * 20, MAX_Y - COTE, COTE * 13, COTE * 4],
                },
                {
                    type: "wall",
                    dimensions: [COTE * 20, MAX_Y - COTE, COTE, COTE],
                },
                {
                    type: "wall",
                    dimensions: [MAX_X - COTE, MAX_Y - COTE, COTE, COTE],
                },

                {
                    type: "water",
                    dimensions: [COTE * 10, MAX_Y - 5 * COTE, COTE * 10, COTE * 5],
                },

            ],
            ressources: []
        }

    ]
}