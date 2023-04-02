const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "rectangle", 
                    dimensions: [0, MAX_Y-COTE, COTE*30, COTE],
                },
                {
                    type: "rectangle", 
                    dimensions: [520, MAX_Y-4*COTE, COTE*(30-13), COTE*3],
                },
                {
                    type: "rectangle", 
                    dimensions: [680, MAX_Y-6*COTE, COTE*(30-17), COTE*3],
                }
            ],
            ressources: []
        },
        {
            obstacles: [
                {
                    type: "rectangle", 
                    dimensions: [0, MAX_Y-COTE, COTE*30, COTE],
                },
                {
                    type: "rectangle", 
                    dimensions: [520, MAX_Y-4*COTE, COTE*(30-13), COTE*3],
                },
                {
                    type: "rectangle", 
                    dimensions: [680, MAX_Y-6*COTE, COTE*(30-17), COTE*3],
                }
            ],
            ressources: []
        },

    ]
}