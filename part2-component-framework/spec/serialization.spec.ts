import { serializeTiles, deserializeTiles } from "../src/serialization";
import { TileType, TileRotation } from "../src/iGameState";

describe("serialization", () => {
    it("should serialize", () => {
        const tilesString = serializeTiles([{ type: TileType.Empty }, { type: TileType.StraightLR, rotation: TileRotation.CW90 }]);
        expect(tilesString).toBe("E-0_S-90");
    });
});

describe("deserialization", () => {
    it("should deserialize", () => {
        const tiles = deserializeTiles("E-0_S-90");
        expect(tiles).toEqual([
            { type: TileType.Empty, rotation: TileRotation.None },
            { type: TileType.StraightLR, rotation: TileRotation.CW90 }
        ]);
    });
});
