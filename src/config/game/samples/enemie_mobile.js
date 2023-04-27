import { HEIGHT_SORTIE, WIDTH_SORTIE } from "../../../components/canvas/conf";

const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;
const TAILLE_ENEMIE = 80

export const CONFIG = {
  levels: [
    {
      walls: [
        {
          position: {
            x: 0,
            y: MAX_Y - COTE
          },
          width: COTE * 100,
          height: COTE,
        },
      ],
      enemies: [
        {
          direction: "H",
          debut: 300,
          destination: 800,
          position: {
            x: 600,
            y: MAX_Y - TAILLE_ENEMIE - COTE
          },
        }
      ],
      ressources: [],
      sortie: {
        position: {
          x: 1100,
          y: MAX_Y - HEIGHT_SORTIE - COTE
        },
      }
    }
  ]
}