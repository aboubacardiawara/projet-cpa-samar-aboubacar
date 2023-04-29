import { Ball } from "./ball";
import { HEIGHT_SORTIE, RADIUS, SIZE_RESSOURCE, TAILLE_ENEMIE_IMMOBILE, TAILLE_ENEMIE_MOBILE, WIDTH_SORTIE } from "../data/conf";
import { isImobileEnemie } from "./enemie";
import { Ressource } from "./ressource";
import { Enemie, Sortie, Wall } from "./state";

/**
 * 
 * @author Prof
 * @param ball 
 * @param rec 
 * @returns 
 */
const collisionCircleBoxProf = (ball: Ball, rec: Wall): boolean => {

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
 * Verifie la collision entre la balle et un enemie
 * @param ball 
 * @param enemie 
 * @returns 
 */
export const collisionBallEnemie = (ball: Ball, enemie: Enemie): boolean => {
  const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
  const box = {
    x: enemie.coord.x,
    y: enemie.coord.y,
    width: isImobileEnemie(enemie) ? TAILLE_ENEMIE_IMMOBILE.w : TAILLE_ENEMIE_MOBILE,
    height: isImobileEnemie(enemie) ? TAILLE_ENEMIE_IMMOBILE.h : TAILLE_ENEMIE_MOBILE
  }

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

export const collisionBallRect = (
  ball: Ball,
  { rectx, recty, rectw, recth }
    : { rectx: number, recty: number, rectw: number, recth: number }
): boolean => {
  const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
  const box = { x: rectx, y: recty, width: rectw, height: recth }

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


export const collisionCircleBox = (ball: Ball, rec: Wall): boolean => {
  return collisionCircleBoxProf(ball, rec)
}

export const collisionCircleExit = (ball: Ball, exit: Sortie): boolean => {
  const wall: Wall = {
    ...exit,
    width: WIDTH_SORTIE,
    height: HEIGHT_SORTIE,
  }

  return collisionCircleBoxProf(ball, wall)
}

export const collisionBallRessource = (ball: Ball, ressource: Ressource): boolean => {
  const ressourceAsBox = {
    rectx: ressource.position.x,
    recty: ressource.position.y,
    rectw: SIZE_RESSOURCE,
    recth: SIZE_RESSOURCE
  }

  return collisionBallRect(ball, ressourceAsBox);
}