import { ITileState, TileType, TileRotation } from "./iGameState";

export function serializeTiles(tiles: ITileState[]): string {
    return tiles.map(tileStateToString).join("_");
}

export function deserializeTiles(tilesString: string): ITileState[] {
    return tilesString.split("_").map(tileStringToState);
}

function tileStateToString(tile: ITileState): string {
    return tileTypeToString[tile.type] + "-" + tileRotationToString[tile.rotation || TileRotation.None];
}

function tileStringToState(tileString: string): ITileState {
    const [typeString, rotationString] = tileString.split("-");

    return {
        type: tileStringToType[typeString as "E" | "B" | "S"],
        rotation: rotationStringToRotation[rotationString as "0" | "90" | "180" | "270"]
    };
}

const tileTypeToString = {
    [TileType.Empty]: "E",
    [TileType.BendLT]: "B",
    [TileType.StraightLR]: "S"
} as const;

const tileStringToType = {
    E: TileType.Empty,
    B: TileType.BendLT,
    S: TileType.StraightLR
} as const;

const tileRotationToString = {
    [TileRotation.None]: "0",
    [TileRotation.CW90]: "90",
    [TileRotation.CW180]: "180",
    [TileRotation.CW270]: "270"
} as const;

const rotationStringToRotation = {
    "0": TileRotation.None,
    "90": TileRotation.CW90,
    "180": TileRotation.CW180,
    "270": TileRotation.CW270
};
