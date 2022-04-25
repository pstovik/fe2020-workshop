import { serializeGame, deserializeGame } from "../src/serialization";
import { TileType, TileRotation } from "../src/iGameState";
import { DefaultPlayerName } from "../src/defaultGame";

describe("serialization", () => {
    it("should serialize", () => {
        const tilesString = serializeGame({
            tiles: [{ type: TileType.Empty }, { type: TileType.StraightLR, rotation: TileRotation.CW90 }],
            winConnectionCount: 1,
            lossStepCount: 20,
            playerName: "Petr",
        });
        expect(tilesString).toBe("E-0_S-90_W-1_L-20");
    });
});

describe("deserialization", () => {
    it("should deserialize", () => {
        const tiles = deserializeGame("E-0_S-90_W-1_L-20");
        expect(tiles).toEqual({
            tiles: [
                { type: TileType.Empty, rotation: TileRotation.None },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
            ],
            winConnectionCount: 1,
            lossStepCount: 20,
            playerName: DefaultPlayerName,
        });
    });
});
