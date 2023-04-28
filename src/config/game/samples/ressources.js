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
            y: MAX_Y - conf.COTE*4
          },
          width: conf.COTE * 100,
          height: conf.COTE*4,
        },
        {
          position: {
            x: 0,
            y: 0
          },
          width: conf.COTE * 4,
          height: MAX_Y - conf.COTE*4,
        }
        ,
        {
          position: {
            x: conf.COTE * 4,
            y: 0
          },
          width: conf.COTE * 8,
          height: conf.COTE*3,
        },
        {
          position: {
            x: conf.COTE * 12,
            y: 0
          },
          width: conf.COTE * 8,
          height: conf.COTE*10,
        },
        {
          position: {
            x: conf.COTE * 20,
            y: 0
          },
          width: conf.COTE * 12,
          height: conf.COTE*3,
        },
      ],
      enemies: [
        
        {
          direction: "V",
          debut: 500,
          destination: 700-conf.COTE,
          position: {
            x: 800,
            y: 600
          }
        }
      ],
      sortie: {
        position: {
          x: 1100,
          y: MAX_Y - conf.HEIGHT_SORTIE - conf.COTE
        },
      },
      entree :{
        position: {
          x: 600,
          y: 500
        }

      },
      ressources: [
        
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
      ],
      goal: 3
    }
  ]
}