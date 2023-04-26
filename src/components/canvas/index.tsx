import * as conf from './conf'
import { useRef, useEffect, MutableRefObject } from 'react'
import { State, step, endOfGame, Element, Enemie, Wall } from './state'

import { render } from './renderer'
import { CONFIG } from '../../config/game/samples/enemie_mobile'
import { keyDown, keyUp } from './keyboard'
import { Direction } from './direction'
import { EnemieData, WallData } from './interfaces'

const getLevel = () => {
  let wallsData: WallData[] = []
  let enemiesData: EnemieData[] = []

  for (let screenNum = 0; screenNum < 3; screenNum++) {
    const screen = { ...CONFIG.levels[0] };
    wallsData = wallsData.concat(screen.walls.map(
      (wallData: WallData) => {
        const newWalldata: WallData = {
          ...wallData,
          position: {
            ...wallData.position,
            x: screenNum * conf.MAX_X + wallData.position.x
          }
        }
        return newWalldata
      }
    ))

    enemiesData = enemiesData.concat(screen.enemies.map(
      (enemieData: EnemieData) => {
        const newEnemieData: EnemieData = {
          ...enemieData,
          position: {
            ...enemieData.position,
            x: screenNum * conf.MAX_X + enemieData.position.x
          }
        }
        return newEnemieData;
      }
    ))
  }

  const newLevel = { ...CONFIG.levels[0] };
  newLevel.enemies = enemiesData;
  newLevel.walls = wallsData;
  console.log(newLevel);

  return newLevel
}

const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      requestAnimationFrame(() => iterate(ctx))
    }

/**
 * Prend un objet données d'un mur et construit un element mur.
 * @param data 
 * @returns 
 */
const buildWall = (data: WallData): Wall => (
  data
)

const buildEnemiesMobile = (
  data: EnemieData) => (
  {
    direction: data.direction,
    debut: data.debut,
    destination: data.destination,
    coord: {
      x: data.position.x,
      y: data.position.y,
      dx: data.direction === "H" ? conf.ENEMIE_VITESSE : 0,
      dy: data.direction === "V" ? conf.ENEMIE_VITESSE : 0
    }
  }
)

/**
 * Initilise les elements murs de ce niveau
 * @returns 
 */
const initWalls = (): Wall[] => {
  return getLevel().walls.map(buildWall)
}

const initEnemiesMobiles = (): Enemie[] => {
  return CONFIG.levels[0].enemies.map(
    enemieData => buildEnemiesMobile(enemieData))
}


const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    ball: initBall(),
    walls: initWalls(),
    center: { coord: { dx: 0, dy: 0, x: 480 - 40, y: 0 }, height: 800, width: 40 * 8 },
    centerAcceleration: 0,
    enemies: initEnemiesMobiles(),
    ballShouldBeRecentered: false,
    size: { height, width },
    endOfGame: true,
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)

  const iterate = (ctx: CanvasRenderingContext2D) => {
    state.current = step(state.current)
    render(ctx)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }

  const onKeyDown = (e: KeyboardEvent) => {
    state.current = keyDown(state.current)(e);
  }

  const onKeyUp = (e: KeyboardEvent) => {
    state.current = keyUp(state.current)(e);
  }


  useEffect(() => {
    if (ref.current) {
      initCanvas(iterate)(ref.current)
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      ref.current.addEventListener('click', onclick)
    }
    return () => {

      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      ref.current.removeEventListener('click', onclick)
    }
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas

function initBall() {
  const sens: Direction = "nothing"
  return {
    life: conf.BALLLIFE,
    coord: {
      x: conf.MAX_X / 2,
      y: 300,
      dx: 0,
      dy: 0,
    },
    jumping: false,
    acceleration: 0,
    direction: sens,
    imgid: 0
  }
}