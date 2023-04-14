
export type Direction = "left" | "right" | "nothing"

export const isMovingLeft = (direction: Direction): boolean => {
    return direction === "left"
}

export const isNotMoving = (direction: Direction): boolean => {
    return direction === "nothing"
}


export const isMovingRight = (direction: Direction): boolean => {
    return direction === "right"
}
