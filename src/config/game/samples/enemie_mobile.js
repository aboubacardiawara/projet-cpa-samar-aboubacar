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
            y: 0
          },
          width: COTE * 5,
          height: COTE * 20,
        },
        {
          position: {
            x: 0,
            y: MAX_Y - 3 * COTE
          },
          width: COTE * 500,
          height: COTE * 3,
        },
      ],
      enemies: [
        {
          direction: "H",
          debut: 500,
          destination: 800,
          position: {
            x: 500,
            y: MAX_Y - TAILLE_ENEMIE - COTE * 3
          },
        }
      ],
      ressources: []
    }

  ]
}