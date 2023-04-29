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
                    dimensions: [80, MAX_Y-40, COTE*0, COTE],
                },
            ],
            ressources: []
        }

    ]
}