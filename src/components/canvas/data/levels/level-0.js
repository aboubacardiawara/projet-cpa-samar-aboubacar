import * as conf from '../conf'

export const LEVEL_0 =
{
    walls: [
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
        {
            position: {
                x: 0,
                y: conf.MAX_Y - conf.COTE * 4
            },
            width: conf.COTE * 200,
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
                x: conf.COTE * 85,
                y: 0
            },
            width: conf.COTE * 4,
            height: conf.COTE * 13,
        },
        {
            position: {
                x: conf.COTE * 130,
                y: conf.MAX_Y - conf.COTE * 6
            },
            width: conf.COTE * 2,
            height: conf.COTE * 2,
        },
        {
            position: {
                x: conf.COTE * 134,
                y: conf.MAX_Y - conf.COTE * 8
            },
            width: conf.COTE * 6,
            height: conf.COTE * 4,
        },
        {
            position: {
                x: conf.COTE * 142,
                y: conf.MAX_Y - conf.COTE * 6
            },
            width: conf.COTE * 2,
            height: conf.COTE * 2,
        },
        {
            position: {
                x: conf.COTE * 200,
                y: conf.MAX_Y - conf.COTE * 1
            },
            width: conf.COTE * conf.TAILLE_ENEMIE_MOBILE,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 200 + conf.TAILLE_ENEMIE_MOBILE,
                y: conf.MAX_Y - conf.COTE * 2
            },
            width: conf.COTE * conf.TAILLE_ENEMIE_MOBILE,
            height: conf.COTE * 4,
        },
        {
            position: {
                x: conf.COTE * 35,
                y: 300
            },
            width: conf.COTE * 7,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 208,
                y: 550
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 214,
                y: 550
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 220,
                y: 550
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },
        {
            position: {
                x: conf.COTE * 226,
                y: 550
            },
            width: conf.COTE * 3,
            height: conf.COTE * 1,
        },

    ],
    enemies: [
        {
            direction: "N",
            debut: conf.COTE * 36,
            destination: conf.COTE * 36,
            position: {
                x: conf.COTE * 36,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "H",
            debut: conf.COTE * 42,
            destination: conf.COTE * 50,
            position: {
                x: conf.COTE * 42,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE
            }
        },
        {
            direction: "H",
            debut: conf.COTE * 62,
            destination: conf.COTE * 70 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 62,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE
            }
        },
        {
            direction: "H",
            debut: conf.COTE * 71,
            destination: conf.COTE * 80 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 75,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE
            }
        },
        {
            direction: "N",
            debut: conf.COTE * 95,
            destination: conf.COTE * 95,
            position: {
                x: conf.COTE * 95,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: conf.COTE * 100 + conf.TAILLE_ENEMIE_MOBILE,
            destination: conf.COTE * 100 + conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 100 + conf.TAILLE_ENEMIE_MOBILE,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: conf.COTE * 105 + 2 * conf.TAILLE_ENEMIE_MOBILE,
            destination: conf.COTE * 105 + 2 * conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 105 + 2 * conf.TAILLE_ENEMIE_MOBILE,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: conf.COTE * 110 + 3 * conf.TAILLE_ENEMIE_MOBILE,
            destination: conf.COTE * 110 + 3 * conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 110 + 3 * conf.TAILLE_ENEMIE_MOBILE,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: conf.COTE * 110 + 3 * conf.TAILLE_ENEMIE_IMMOBILE,
            destination: conf.COTE * 110 + 3 * conf.TAILLE_ENEMIE_IMMOBILE,
            position: {
                x: conf.TAILLE_ENEMIE_MOBILE + conf.COTE * 126,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 132 + conf.TAILLE_ENEMIE_IMMOBILE.w / 2,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 140 + conf.TAILLE_ENEMIE_IMMOBILE.w / 2,
                y: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "V",
            debut: 300,
            destination: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 154,
                y: 300
            }
        },
        {
            direction: "V",
            debut: 300,
            destination: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 5 + conf.TAILLE_ENEMIE_MOBILE + conf.COTE * 154,
                y: 500
            }
        },
        {
            direction: "V",
            debut: 300,
            destination: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 10 + 2 * conf.TAILLE_ENEMIE_MOBILE + conf.COTE * 154,
                y: 400
            }
        },
        {
            direction: "V",
            debut: 300,
            destination: conf.MAX_Y - conf.COTE * 4 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 15 + 3 * conf.TAILLE_ENEMIE_MOBILE + conf.COTE * 154,
                y: 600
            }
        },
        {
            direction: "V",
            debut: 100,
            destination: conf.MAX_Y - conf.COTE - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 200,
                y: 600
            }
        },
        {
            direction: "V",
            debut: conf.COTE * 2,
            destination: 300 - conf.TAILLE_ENEMIE_MOBILE,
            position: {
                x: conf.COTE * 42 - conf.TAILLE_ENEMIE_MOBILE,
                y: 200
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 211,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 212,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 213,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        }
        ,
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 217,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 218,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 219,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        }
        ,
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 223,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 224,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        },
        {
            direction: "N",
            debut: -1,
            destination: -1,
            position: {
                x: conf.COTE * 225,
                y: conf.MAX_Y - conf.COTE * 2 - conf.TAILLE_ENEMIE_IMMOBILE.h
            }
        }

    ],
    sortie: {
        position: {
            x: conf.COTE * 42,
            y: 300 - conf.HEIGHT_SORTIE
        },
    },
    entree: {
        position: {
            x: 600,
            y: 500
        }

    },
    ressources: [
        {
            position: {
                x: conf.COTE * 34,
                y: conf.MAX_Y - conf.COTE * 5
            }
        },
        {
            position: {
                x: conf.COTE * 66,
                y: 300
            }
        },
        {
            position: {
                x: conf.COTE * 75,
                y: 300
            }
        },
        {
            position: {
                x: conf.COTE * 100,
                y: 350
            }
        },
        {
            position: {
                x: conf.COTE * 103 + conf.TAILLE_ENEMIE_MOBILE,
                y: 350
            }
        },
        {
            position: {
                x: conf.COTE * 108 + 2 * conf.TAILLE_ENEMIE_MOBILE,
                y: 350
            }
        },
        {
            position: {
                x: conf.COTE * 130 + conf.COTE/2,
                y: conf.MAX_Y - conf.COTE * 6 - conf.SIZE_RESSOURCE
            }
        },
        {
            position: {
                x: conf.COTE * 201,
                y: conf.MAX_Y - conf.COTE * 2
            }
        },
        {
            position: {
                x: conf.COTE * 58,
                y: conf.MAX_Y - conf.COTE * 5
            }
        },

        {
            position: {
                x: conf.COTE * 212,
                y: 350
            }
        },
        {
            position: {
                x: conf.COTE * 218,
                y: 350
            }
        },
        {
            position: {
                x: conf.COTE * 224,
                y: 350
            }
        }

    ],
    goal: 12
}
