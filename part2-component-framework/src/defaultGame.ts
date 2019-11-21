import { ITileState, TileType, TileRotation, IGameState } from "./iGameState";

export function defaultGame(): IGameState {
    return {
        winConnectionCount: 3,
        lossStepCount: 5,
        tiles: [
            { type: TileType.Empty },
            { type: TileType.StraightLR },
            { type: TileType.BendLT, rotation: TileRotation.CW90 },

            { type: TileType.Empty },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },

            { type: TileType.Empty },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 },
            { type: TileType.Empty }
        ]
    };
}
