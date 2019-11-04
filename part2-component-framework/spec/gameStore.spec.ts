import { GameStore } from "../src/gameStore";
import { TileRotation, TileType, ITileState, IGameState, InfiniteGameNumber } from "../src/iGameState";
import { defaultGame } from "../src/defaultGame";

describe("gameStore", () => {
    it("should init default game", () => {
        const store = new GameStore();
        store.init(defaultGame());
        expect(store.tiles.length).toBe(9);
    });

    it("should rotate tile by index", () => {
        const store = new GameStore();
        store.init(gameWithTiles([{ type: TileType.StraightLR }]));

        expect(store.tiles[0].rotation).toBeUndefined();

        store.tileClicked(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.CW90);

        store.tileClicked(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.CW180);

        store.tileClicked(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.CW270);

        store.tileClicked(0);
        expect(store.tiles[0].rotation).toBe(TileRotation.None);
    });

    it("should not rotate empty tile", () => {
        const store = new GameStore();
        store.init(gameWithTiles([{ type: TileType.Empty }]));
        expect(store.tiles[0].rotation).toBeUndefined();

        store.tileClicked(0);
        expect(store.tiles[0].rotation).toBeUndefined();
    });

    describe("game loss", () => {
        it("should end game after reaching given maximum of steps", () => {
            const store = new GameStore();
            store.init({
                lossStepCount: 3,
                tiles: [{ type: TileType.BendLT }],
                winConnectionCount: InfiniteGameNumber
            });

            expect(store.isLostGame).toBeFalsy();
            store.tileClicked(0);
            expect(store.isLostGame).toBeFalsy();
            store.tileClicked(0);
            expect(store.isLostGame).toBeFalsy();
            store.tileClicked(0);
            expect(store.isLostGame).toBeTruthy();
            expect(store.stepCount).toBe(3);
        });
    });

    describe("game win", () => {
        it("should win game after reaching goal number of connections", () => {
            const store = new GameStore();
            store.init({
                lossStepCount: InfiniteGameNumber,
                tiles: [{ type: TileType.StraightLR, rotation: TileRotation.CW90 }, { type: TileType.StraightLR }],
                winConnectionCount: 1
            });

            expect(store.isWinGame).toBeFalsy();

            store.tileClicked(0);
            expect(store.isWinGame).toBeTruthy();
            expect(store.connectionCount).toBe(1);
        });
    });

    describe("connections counting", () => {
        describe("given empty tiles array", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init(gameWithTiles([]));

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are not connected", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init(gameWithTiles([{ type: TileType.StraightLR }, { type: TileType.Empty }, { type: TileType.BendLT }]));

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are connected in one row", () => {
            it("should be 2", () => {
                const store = new GameStore();
                store.init(gameWithTiles([{ type: TileType.StraightLR }, { type: TileType.StraightLR }, { type: TileType.StraightLR }]));

                expect(store.connectionCount).toBe(2);
            });
        });

        describe("given tiles are connected through the row break", () => {
            it("should be 0", () => {
                const store = new GameStore();
                store.init(
                    gameWithTiles([
                        { type: TileType.Empty },
                        { type: TileType.Empty },
                        { type: TileType.StraightLR },

                        { type: TileType.StraightLR }
                    ])
                );

                expect(store.connectionCount).toBe(0);
            });
        });

        describe("given tiles are connected between rows", () => {
            it("should be 1", () => {
                const store = new GameStore();
                store.init(
                    gameWithTiles([
                        { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                        { type: TileType.Empty },
                        { type: TileType.Empty },

                        { type: TileType.StraightLR, rotation: TileRotation.CW90 }
                    ])
                );

                expect(store.connectionCount).toBe(1);
            });
        });

        describe("given tiles are connected in corner", () => {
            it("should be 2", () => {
                const store = new GameStore();
                store.init(
                    gameWithTiles([
                        { type: TileType.Empty },
                        { type: TileType.StraightLR },
                        { type: TileType.BendLT, rotation: TileRotation.CW270 },

                        { type: TileType.Empty },
                        { type: TileType.Empty },
                        { type: TileType.StraightLR, rotation: TileRotation.CW90 }
                    ])
                );

                expect(store.connectionCount).toBe(2);
            });
        });
    });

    function gameWithTiles(tiles: ITileState[]): IGameState {
        return {
            winConnectionCount: InfiniteGameNumber,
            lossStepCount: InfiniteGameNumber,
            tiles
        };
    }
});
