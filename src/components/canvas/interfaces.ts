import { Position } from "./state";

export interface EnemieData {
    direction: string;
    debut: number;
    destination: number;
    position: Position;
}

export interface WallData {
    position: Position;
    width: number;
    height: number;
}