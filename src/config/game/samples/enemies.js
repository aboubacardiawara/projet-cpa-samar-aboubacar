const COTE = 40;
const TAILLE_ENEMIE = 80
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
    levels: [
        {
            obstacles: [
                {
                    type: "wall", 
                    dimensions: [0, MAX_Y-COTE, COTE*30, COTE],
                },
                {
                    type: "wall", 
                    dimensions: [520, MAX_Y-4*COTE, COTE*(30-13), COTE*3],
                },
                {
                    type: "wall", 
                    dimensions: [680, MAX_Y-6*COTE, COTE*(30-17), COTE*3],
                },
                {
                    type: "enemie", 
                    dimensions: [320, MAX_Y-TAILLE_ENEMIE-COTE, TAILLE_ENEMIE, TAILLE_ENEMIE],
                },
                {
                    type: "enemie", 
                    dimensions: [320+14*COTE, MAX_Y-TAILLE_ENEMIE-6*COTE, TAILLE_ENEMIE, TAILLE_ENEMIE],
                }

            ],
            ressources: []
        }

    ]
}