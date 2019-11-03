import { GameTile } from "./gameTile";

export class GameBoard {
    width: number = 0;
    height: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public rotateTile(x: number, y: number, log: boolean = false) {
        if (log) {
            cy.log("Rotating tile [x=" + x + "][y=" + y + "]");
        }
        new GameTile(this.getIndex(x, y)).rotateTile();
    }

    public assertActualRotation(x: number, y: number, angle: number) {
        new GameTile(this.getIndex(x, y)).assertActualRotation(angle);
    }

    private getIndex(x: number, y: number): number {
        return x * this.width + y;
    }
}
