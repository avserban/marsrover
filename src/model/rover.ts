import Grid from "./grid";
import logger from "../logger";

export enum RoverOrientation {
    N = "N",
    E = "E",
    S = "S",
    W = "W"
}

export class RoverPosition {
    x!: number;
    y!: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default class Rover {
    position: RoverPosition;
    orientation: RoverOrientation;
    grid: Grid;
    lost: boolean;

    constructor(position: RoverPosition, orientation: RoverOrientation, grid: Grid) {
        this.position = position;
        this.orientation = orientation;
        this.grid = grid;
        this.lost = this.isPositionOutsideOfGrid(position);
    }

    isPositionOutsideOfGrid(position: RoverPosition): boolean {
        return position.x > this.grid.sizeX || position.x < 0 || position.y > this.grid.sizeY || position.y < 0;
    }

    moveForward(): void {
        if (this.lost) {
            logger.error("Issued command to move forward could not be executed since rover fell off the grid :(");
            return;
        }

        const newPosition = new RoverPosition(this.position.x, this.position.y);
        switch(this.orientation) {
            case RoverOrientation.N: newPosition.y++; break;
            case RoverOrientation.E: newPosition.x++; break;
            case RoverOrientation.S: newPosition.y--; break;
            case RoverOrientation.W: newPosition.x--; break;
            default: logger.error(`Orientation ${this.orientation} falls out of case statement and cannot move forwards.`);
        }

        if (this.isPositionOutsideOfGrid(newPosition)) {
            this.deactivateRover();
            return;
        }

        this.position = newPosition;
    }

    turnLeft(): void {
        if (this.lost) {
            logger.error("Issued command to turn left could not be executed since rover fell off the grid :(");
            return;
        }

        switch(this.orientation) {
            case RoverOrientation.N: this.orientation = RoverOrientation.W; break;
            case RoverOrientation.E: this.orientation = RoverOrientation.N; break;
            case RoverOrientation.S: this.orientation = RoverOrientation.E; break;
            case RoverOrientation.W: this.orientation = RoverOrientation.S; break;
            default: this.orientation = RoverOrientation.N;
        }
    }

    turnRight(): void {
        if (this.lost) {
            logger.error("Issued command to turn right could not be executed since rover fell off the grid :(");
            return;
        }

        switch(this.orientation) {
            case RoverOrientation.N: this.orientation = RoverOrientation.E; break;
            case RoverOrientation.E: this.orientation = RoverOrientation.S; break;
            case RoverOrientation.S: this.orientation = RoverOrientation.W; break;
            case RoverOrientation.W: this.orientation = RoverOrientation.N; break;
            default: this.orientation = RoverOrientation.N;
        }
    }

    deactivateRover(): void {
        logger.error("OH NO! Connectivity to rover lost as it went out of the bounds of the grid :(");
        this.lost = true;
    }
}