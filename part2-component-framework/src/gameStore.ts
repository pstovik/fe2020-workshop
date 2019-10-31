import { ITileState, TileType, TileRotation } from "./iGameState";

const TilesInOneRow = 3;

export class GameStore {
    tiles: ITileState[] = [];
    stepCount: number = 0;
    connectionCount: number = 0;

    init(tiles?: ITileState[]): void {
        this.tiles = tiles || this.defaultGame();
        this.calculateConnections();
    }

    private defaultGame(): ITileState[] {
        return [
            { type: TileType.Empty },
            { type: TileType.StraightLR },
            { type: TileType.BendLT, rotation: TileRotation.CW270 },

            { type: TileType.Empty },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },

            { type: TileType.Empty },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },
            { type: TileType.Empty }
        ];
    }

    rotateTile(tileIndex: number): void {
        const tile = this.tiles[tileIndex];

        tile.rotation = this.getNextRotation(tile.rotation);
        this.stepCount++;
        this.calculateConnections();
    }

    // TODO - get and write score / connections

    private getNextRotation(currentRotation?: TileRotation): TileRotation {
        switch (currentRotation) {
            case undefined:
            case TileRotation.None:
                return TileRotation.CW90;
            case TileRotation.CW90:
                return TileRotation.CW180;
            case TileRotation.CW180:
                return TileRotation.CW270;
            case TileRotation.CW270:
                return TileRotation.None;
        }
        throw new Error("Uknown rotation " + currentRotation);
    }

    private calculateConnections() {
        this.connectionCount = 0;
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            const nextTileInRow = this.tiles[i + 1];
            const isRowBreak = (i + 1) % TilesInOneRow === 0;
            const tileInLowerRow = this.tiles[i + TilesInOneRow];

            if (!isRowBreak && this.isConnectedHorizontally(tile, nextTileInRow)) {
                this.connectionCount++;
            }
            if (this.isConnectedVertically(tile, tileInLowerRow)) {
                this.connectionCount++;
            }
        }
    }

    private isConnectedHorizontally(leftTile?: ITileState, rightTile?: ITileState): boolean {
        if (leftTile === undefined || rightTile === undefined) {
            return false;
        }
        const leftTileConnectors = this.getConnectors(leftTile);
        const rightTileConnectors = this.getConnectors(rightTile);
        return leftTileConnectors.right && rightTileConnectors.left;
    }

    private isConnectedVertically(topTile?: ITileState, bottomTile?: ITileState): boolean {
        if (topTile === undefined || bottomTile === undefined) {
            return false;
        }
        const topTileConnectors = this.getConnectors(topTile);
        const bottomTileConnectors = this.getConnectors(bottomTile);
        return topTileConnectors.bottom && bottomTileConnectors.top;
    }

    private getConnectors(tile: ITileState): { top: boolean; right: boolean; bottom: boolean; left: boolean } {
        const connectorsArray = this.getConnectorsArray(tile);
        const rotatedArray = this.rotateConnectorsArray(connectorsArray, tile.rotation === undefined ? 0 : tile.rotation / 90);

        return {
            top: rotatedArray[0],
            right: rotatedArray[1],
            bottom: rotatedArray[2],
            left: rotatedArray[3]
        };
    }

    // top, right, bottom, left
    private getConnectorsArray(tile: ITileState): boolean[] {
        switch (tile.type) {
            case TileType.Empty:
                return [false, false, false, false];
            case TileType.BendLT:
                return [true, false, false, true];
            case TileType.StraightLR:
                return [false, true, false, true];
        }
        throw new Error("Uknown tile type " + tile.type);
    }

    private rotateConnectorsArray(array: boolean[], rotationOffset: number): boolean[] {
        const arrayToCut = array.slice(0); // clone
        const newBeginning = arrayToCut.splice(rotationOffset);
        return newBeginning.concat(arrayToCut);
    }
}
