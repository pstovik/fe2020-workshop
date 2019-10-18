export interface IGameState {
    tiles: ITileState[];
}

export interface ITileState {
    type: TileType;
    rotation?: TileRotation;
}

export enum TileType {
    Empty,
    Straight,
    Bend
}

export enum TileRotation {
    R0 = 0,
    R90 = 90,
    R180 = 180,
    R270 = 270
}
