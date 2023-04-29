import * as conf from '../../../components/canvas/conf'

export const LEVEL_0 =
{
    walls: [
        {
            position: {
                x: 0,
                y: conf.MAX_Y - conf.COTE * 4
            },
            width: conf.COTE * 100,
            height: conf.COTE * 4,
        },
        {
            position: {
                x: 0,
                y: 0
            },
            width: conf.COTE * 4,
            height: conf.MAX_Y - conf.COTE * 4,
        }
        ,
        {
            position: {
                x: conf.COTE * 4,
                y: 0
            },
            width: conf.COTE * 8,
            height: conf.COTE * 3,
        },
        {
            position: {
                x: conf.COTE * 12,
                y: 0
            },
            width: conf.COTE * 8,
            height: conf.COTE * 8,
        },
        {
            position: {
                x: conf.COTE * 20,
                y: 0
            },
            width: conf.COTE * 12,
            height: conf.COTE * 3,
        },
    ],
    enemies: [
    ],
    sortie: {
        position: {
            x: 1100,
            y: conf.MAX_Y - conf.HEIGHT_SORTIE - conf.COTE
        },
    },
    entree: {
        position: {
            x: 600,
            y: 500
        }

    },
    ressources: [

    ],
    goal: 0
}
