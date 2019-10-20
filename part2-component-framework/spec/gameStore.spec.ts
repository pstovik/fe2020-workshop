import { GameStore } from "../src/gameStore";
import { TileRotation } from "../src/iGameState";

describe("gameStore", () => {
    it("should init 9 tiles", () => {
        const store = new GameStore();
        store.init();
        expect(store.tiles.length).toBe(9);
    });

    it("should rotate tile by index", () => {
        const store = new GameStore();
        store.init();

        expect(store.tiles[0].rotation).toBeUndefined();

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.R90);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.R180);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.R270);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.R0);
    });
});
