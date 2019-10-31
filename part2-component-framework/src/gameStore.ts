import { ITileState, TileType, TileRotation } from "./iGameState";

export class GameStore {
    tiles: ITileState[] = [];

    init(): void {
        this.tiles = [
            { type: TileType.Empty },
            { type: TileType.Straight },
            { type: TileType.Bend, rotation: TileRotation.R270 },

            { type: TileType.Empty },
            { type: TileType.Straight, rotation: TileRotation.R90 },
            { type: TileType.Straight, rotation: TileRotation.R90 },

            { type: TileType.Empty },
            { type: TileType.Straight, rotation: TileRotation.R90 },
            { type: TileType.Empty }
        ];
    }

    rotateTile(tileIndex: number): void {
        const tile = this.tiles[tileIndex];

        tile.rotation = this.getNextRotation(tile.rotation);
    }

    // TODO - get and write score / connections

    private getNextRotation(currentRotation?: TileRotation): TileRotation {
        switch (currentRotation) {
            case undefined:
            case TileRotation.R0:
                return TileRotation.R90;
            case TileRotation.R90:
                return TileRotation.R180;
            case TileRotation.R180:
                return TileRotation.R270;
            case TileRotation.R270:
                return TileRotation.R0;
        }
        throw new Error("Uknown rotation " + currentRotation);
    }
}
