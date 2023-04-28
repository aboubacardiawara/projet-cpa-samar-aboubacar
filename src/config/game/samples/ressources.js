import * as conf from '../../../components/canvas/conf'

const COTE = 40;
const MAX_X = 1200;
const MAX_Y = 800;

export const CONFIG = {
  levels: [
    {
      walls: [
        {
          position: {
            x: 0,
            y: MAX_Y - conf.COTE
          },
          width: conf.COTE * 100,
          height: conf.COTE,
        },
      ],
      enemies: [
        {
          direction: "H",
          debut: 300,
          destination: 800,
          position: {
            x: 600,
            y: conf.MAX_Y -conf.TAILLE_ENEMIE - conf.COTE
          },
        }
      ],
      sortie: {
          position: {
              x: 1100,
              y: MAX_Y - conf.HEIGHT_SORTIE - conf.COTE
            },
        },
        ressources: [
            {
                position: {
                    x: 600,
                    y: 500
                }
            },
            {
                position: {
                    x: 900,
                    y: 500
                }
            },
            {
                position: {
                    x: 1000,
                    y: 700
                }
            }
        ]
    }
  ]
}