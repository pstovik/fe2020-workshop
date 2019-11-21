import { GameTile } from "./gameTile";

export class GameBoard {
    width: number = 0;
    height: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public rotateTile(row: number, column: number, log: boolean = false) {
        if (log) {
            cy.log("Rotating tile [row=" + row + "][column=" + column + "]");
        }
        new GameTile(this.getIndex(row, column)).rotateTile();
    }

    public assertActualRotation(row: number, column: number, angle: number) {
        new GameTile(this.getIndex(row, column)).assertActualRotation(angle);
    }

    private getIndex(x: number, column: number): number {
        return x * this.width + column;
    }
}
