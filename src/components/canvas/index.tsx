import * as conf from './conf'
import { useRef, useEffect } from 'react'
import { State, gameOver, step } from './state'

import { render } from './renderer'
import { keyDown, keyUp } from './keyboard'
import { Direction } from './direction'
import { initCanvas, initEnemies, initRessources, initSortie, initWalls } from './charactersLoader'


export const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    ball: initBall(),
    walls: initWalls(),
    center: { coord: { dx: 0, dy: 0, x: 480 - 40, y: 0 }, height: 800, width: 40 * 8 },
    centerAcceleration: 0,
    enemies: initEnemies(),
    ballShouldBeRecentered: false,
    size: { height, width },
    endOfGame: { end: false, hasWinPlayer: false },
    sortie: initSortie(),
    ressources: initRessources()
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)

  const iterate = (ctx: CanvasRenderingContext2D) => {
    state.current = step(state.current)
    render(ctx)(state.current)
    if (!gameOver(state.current)) requestAnimationFrame(() => iterate(ctx))
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
    imgIndex: 0,
    images: [
      "bounce-1.png",
      "bounce-2.png",
      "bounce-3.png",
      "bounce-4.png"],
  }
}