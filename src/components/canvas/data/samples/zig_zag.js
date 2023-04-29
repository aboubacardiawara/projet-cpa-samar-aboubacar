const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall",
                    dimensions: [0, 0, COTE * 30, COTE * 3],
                },
                {
                    type: "wall",
                    dimensions: [0, COTE*6, COTE * 10, COTE * 14],
                },
                {
                    type: "wall",
                    dimensions: [COTE*12, COTE*7, COTE * 7, COTE * 5],
                },
                {
                    type: "wall",
                    dimensions: [COTE*12, COTE*15, COTE * 7, COTE * 5],
                },
                {
                    type: "wall",
                    dimensions: [COTE*22, COTE*6, COTE * 10, COTE * 14],
                },
                {
                    type: "wall",
                    dimensions: [COTE*20, COTE*14, COTE * 10, COTE * 14],
                },
                {
                    type: "wall",
                    dimensions: [COTE*21, COTE*10, COTE * 10, COTE * 14],
                },

            ],
            ressources: []
        }

    ]
}