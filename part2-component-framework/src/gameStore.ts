import { ITileState, TileType, TileRotation, IGameState, InfiniteGameNumber } from "./iGameState";

const TilesInOneRow = 3;

export class GameStore implements IGameState {
    tiles: ITileState[] = [];
    stepCount: number = 0;
    connectionCount: number = 0;
    winConnectionCount: number = InfiniteGameNumber;
    lossStepCount: number = InfiniteGameNumber;

    get isLostGame(): boolean {
        return this.stepCount >= this.lossStepCount;
    }

    get isWinGame(): boolean {
        return this.connectionCount >= this.winConnectionCount;
    }

    init(game: IGameState): void {
        this.tiles = game.tiles;
        this.winConnectionCount = game.winConnectionCount;
        this.lossStepCount = game.lossStepCount;

        this.calculateConnections();
    }

    tileClicked(tileIndex: number): void {
        const tile = this.tiles[tileIndex];
        if (tile.type === TileType.Empty) {
            return;
        }

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
        const result = array.slice(0); // clone
        for (let i = 0; i < rotationOffset; i++) {
            const value = result.pop() as boolean;
            result.unshift(value);
        }
        return result;
    }
}
