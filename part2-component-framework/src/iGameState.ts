export interface IGameState {
    tiles: ITileState[];
    winConnectionCount: number;
    lossStepCount: number;
    playerName: string;
}

export interface ITileState {
    type: TileType;
    rotation?: TileRotation;
}

export enum TileType {
    Empty,
    StraightLR,
    BendLT,
}

export enum TileRotation {
    None = 0,
    CW90 = 90,
    CW180 = 180,
    CW270 = 270,
}

export const InfiniteGameNumber = 999;
