import { Ball } from "./ball";
import { RADIUS } from "./conf";
import { Rect } from "./state";

export const collisionCircleBoxOriginal = (ball: Ball, rec: Rect): boolean => {

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


export const collisionCircleBox = (ball: Ball, rec: Rect): boolean => {
    return collisionCircleBoxOriginal(ball, rec);
}

