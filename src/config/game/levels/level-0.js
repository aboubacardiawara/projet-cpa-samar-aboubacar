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
                x: conf.COTE * 30,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 3,
            height: conf.COTE * 4,
        },
        {
            position: {
                x: conf.COTE * 42,
                y: 0
            },
            width: conf.COTE * 2,
            height: conf.COTE * 13,
        },
        {
            position: {
                x: conf.COTE * 60,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 2,
            height: conf.COTE * 4,
        },
        {
            position: {
                x: conf.COTE * 62,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 68,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 5,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 70,
                y: conf.MAX_Y - conf.COTE * 7
            },
            width: conf.COTE * 1,
            height: conf.COTE * 3,
        },
        {
            position: {
                x: conf.COTE * 77,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 80,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 2,
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
        /*
        {
            direction: "V",
            debut: conf.COTE * 36,
            destination: conf.COTE * 36,
            position: {
                x: conf.COTE * 36,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE
            }
        },
        {
            direction: "H",
            debut: conf.COTE * 42,
            destination: conf.COTE * 50,
            position: {
                x: conf.COTE * 42,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE
            }
        }*/
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
