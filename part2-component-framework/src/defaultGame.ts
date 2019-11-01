import { ITileState, TileType, TileRotation } from "./iGameState";

export function defaultGame(): ITileState[] {
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
