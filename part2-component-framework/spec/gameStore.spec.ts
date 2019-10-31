import { GameStore } from "../src/gameStore";
import { TileRotation, TileType } from "../src/iGameState";

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
        expect(store.tiles[0].rotation).toBe(TileRotation.CW90);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.CW180);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.CW270);

        store.rotateTile(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.None);
    });

    describe("connections counting", () => {
        describe("given empty tiles array", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init([]);

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are not connected", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init([{ type: TileType.StraightLR }, { type: TileType.Empty }, { type: TileType.BendLT }]);

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are connected in one row", () => {
            it("should be 2", () => {
                const store = new GameStore();
                store.init([{ type: TileType.StraightLR }, { type: TileType.StraightLR }, { type: TileType.StraightLR }]);

                expect(store.connectionCount).toBe(2);
            });
        });

        describe("given tiles are connected through the row break", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init([
                    { type: TileType.Empty },
                    { type: TileType.Empty },
                    { type: TileType.StraightLR },

                    { type: TileType.StraightLR }
                ]);

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are connected between rows", () => {
            it("should be 1", () => {
                const store = new GameStore();
                store.init([
                    { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                    { type: TileType.Empty },
                    { type: TileType.Empty },

                    { type: TileType.StraightLR, rotation: TileRotation.CW90 }
                ]);

                expect(store.connectionCount).toBe(1);
            });
        });

        describe("given tiles are connected in corner", () => {
            it("should be 2", () => {
                const store = new GameStore();
                store.init([
                    { type: TileType.Empty },
                    { type: TileType.StraightLR },
                    { type: TileType.BendLT, rotation: TileRotation.CW270 },

                    { type: TileType.Empty },
                    { type: TileType.Empty },
                    { type: TileType.StraightLR, rotation: TileRotation.CW90 }
                ]);

                expect(store.connectionCount).toBe(2);
            });
        });
    });
});
