import { Ball } from "./ball";
import { RADIUS } from "./conf";
import { Rect } from "./state";

/**
 * 
 * @author Prof
 * @param ball 
 * @param rec 
 * @returns 
 */
const collisionCircleBoxProf = (ball: Ball, rec: Rect): boolean => {

    const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
    const box = { x: rec.coord.x, y: rec.coord.y, width: rec.width, height: rec.height }
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
 * Verifie la collision entre la balle et un obstacle à eviter.
 * @param ball 
 * @param rec 
 * @returns 
 */
export const collisionBallObstacles = (ball: Ball, rec: Rect): boolean => {
    const circle = { x: ball.coord.x, y: ball.coord.y, radius: RADIUS }
    const box = { x: rec.coord.x, y: rec.coord.y, width: rec.width, height: rec.height }
  
    // calcul de la distance horizontale entre le centre du cercle et le rectangle
    let distX = Math.abs(circle.x - box.x - box.width / 2)
    // calcul de la distance verticale entre le centre du cercle et le rectangle
    let distY = Math.abs(circle.y - box.y - box.height / 2)
  
    // si la distance horizontale est supérieure à la somme des rayons, il n'y a pas de collision
    if (distX > (box.width / 2 + circle.radius)) {
      return false
    }
    // si la distance verticale est supérieure à la somme des rayons, il n'y a pas de collision
    if (distY > (box.height / 2 + circle.radius)) {
      return false
    }
    // si la distance horizontale ou verticale est inférieure à la moitié 
    // de la largeur ou hauteur du rectangle, il y a une collision
    if (distX <= (box.width / 2) || distY <= (box.height / 2)) {
      return true
    }
  
    // calcul de la distance entre le centre du cercle et les coins du rectangle
    let dx = distX - box.width / 2
    let dy = distY - box.height / 2

    // si la distance entre le centre du cercle 
    // et les coins est inférieure au rayon, il y a une collision
    return (dx * dx + dy * dy <= (circle.radius * circle.radius))
    
  }
  


export const collisionCircleBox = (ball: Ball, rec: Rect): boolean => {
      return collisionCircleBoxProf(ball, rec)
}