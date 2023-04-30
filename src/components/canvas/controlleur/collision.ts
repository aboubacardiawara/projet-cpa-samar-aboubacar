import { Ball } from "./ball";
import { HEIGHT_SORTIE, RADIUS, SIZE_RESSOURCE, TAILLE_ENEMIE_IMMOBILE, TAILLE_ENEMIE_MOBILE, WIDTH_SORTIE } from "../data/conf";
import { isImobileEnemie } from "./enemie";
import { Ressource } from "./ressource";
import { Enemie, Sortie, Wall } from "./state";
type Box = { x: number, y: number, width: number, height: number }

/**
 * 
 * @author Prof
 * @param ball {Ball}
 * @param box {Box}
 * @returns {boolean} true si il y a collision
 */
const collisionBallBox = (ball: Ball, box: Box): boolean => {
  const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
  let distX = Math.abs(circle.x - box.x - box.width / 2)
  let distY = Math.abs(circle.y - box.y - box.height / 2)

  if (distX > (box.width / 2 + circle.radius)) {
    return false
  }
  if (distY > (box.height / 2 + circle.radius)) {
    return false
  }
  if (distX <= (box.width / 2) || distY <= (box.height / 2)) {
    return true
  }

  let dx = distX - box.width / 2
  let dy = distY - box.height / 2
  return (dx * dx + dy * dy <= (circle.radius * circle.radius))

}

/**
 * Convertie un enemie en box
 * @param enemie {Enemie}
 * @returns {Box} 
 */
const enemieAsBox = (enemie: Enemie): Box => {
  return {
    x: enemie.coord.x,
    y: enemie.coord.y,
    width: isImobileEnemie(enemie) ? TAILLE_ENEMIE_IMMOBILE.w : TAILLE_ENEMIE_MOBILE,
    height: isImobileEnemie(enemie) ? TAILLE_ENEMIE_IMMOBILE.h : TAILLE_ENEMIE_MOBILE
  }
}

/**
 * Convertie une sortie en box
 * @param sortie {Sortie} 
 * @returns {Box}
 */
const sortieAsBox = (sortie: Sortie): Box => {
  return {
    x: sortie.position.x,
    y: sortie.position.y,
    width: WIDTH_SORTIE,
    height: HEIGHT_SORTIE
  }
}

/**
 * Convertie une ressource en box
 * @param ressource {Ressource} 
 * @returns {Box}
 */
const ressourceAsBox = (ressource: Ressource): Box => {
  return {
    x: ressource.position.x,
    y: ressource.position.y,
    width: SIZE_RESSOURCE,
    height: SIZE_RESSOURCE
  }
}


/**
 * Verifie la collision entre la balle et un enemie
 * @param ball 
 * @param enemie 
 * @returns 
 */
export const collisionBallEnemie = (ball: Ball, enemie: Enemie): boolean => {
  return collisionBallBox(ball, enemieAsBox(enemie))
}

/**
 * On réutiliser la correction de la collision entre une balle et un mur
 * du TP1.
 * @param ball {Ball}
 * @param rec  {Wall}
 * @returns  {boolean} true si il y a collision
 */
export const collisionCircleBox = (ball: Ball, rec: Wall): boolean => {
  const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
  const box = { x: rec.position.x, y: rec.position.y, width: rec.width, height: rec.height }
  if (circle.x + circle.radius > box.x && circle.x < box.x) {
    if (circle.y < box.y) {
      return Math.pow(box.x - circle.x, 2) + Math.pow(box.y - circle.y, 2)
        < Math.pow(circle.radius, 2);
    }
    if (box.y < circle.y && circle.y < box.y + box.height) { return true; }
    return Math.pow(box.x - circle.x, 2) + Math.pow(box.y + box.height - circle.y, 2)
      < Math.pow(circle.radius, 2);
  }
  if (circle.x - circle.radius < box.x + box.width && circle.x > box.x + box.width) {
    if (circle.y < box.y) {
      return Math.pow(box.x + box.width - circle.x, 2) + Math.pow(box.y - circle.y, 2)
        < Math.pow(circle.radius, 2);
    }
    if (box.y < circle.y && circle.y < box.y + box.height) { return true; }
    return Math.pow(box.x + box.width - circle.x, 2) + Math.pow(box.y + box.height - circle.y, 2)
      < Math.pow(circle.radius, 2);
  }
  if (circle.x <= box.x && box.x + box.width <= circle.x) {
    return circle.y + circle.radius > box.y &&
      circle.y - circle.radius < box.y + box.height;
  }
  return false;
}

/**
 * Teste la collision entre la balle et la sortie
 * @param ball { Ball}
 * @param exit { Sortie}
 * @returns  { boolean} true si collision
 */
export const collisionCircleExit = (ball: Ball, exit: Sortie): boolean => {
  return collisionBallBox(ball, sortieAsBox(exit))
}

/**
 * Teste la collision entre la balle et une ressource
 * @param ball { Ball} 
 * @param ressource { Ressource}
 * @returns { boolean} true si collision
 */
export const collisionBallRessource = (ball: Ball, ressource: Ressource): boolean => {
  return collisionBallBox(ball, ressourceAsBox(ressource))
}