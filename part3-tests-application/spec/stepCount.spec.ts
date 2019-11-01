import { GameBoard } from "../cypress/components/gameBoard";
import { serializeTiles } from "../src/dependencies";
import { TileType, TileRotation } from "../../part2-component-framework/src/iGameState";

let gameArea;

beforeEach(() => {
    const tilesString = serializeTiles([
        { type: TileType.Empty },
        { type: TileType.StraightLR },
        { type: TileType.BendLT, rotation: TileRotation.CW270 },

        { type: TileType.Empty },
        { type: TileType.StraightLR, rotation: TileRotation.CW90 },
        { type: TileType.StraightLR, rotation: TileRotation.CW90 },

        { type: TileType.Empty },
        { type: TileType.StraightLR, rotation: TileRotation.CW90 },
        { type: TileType.Empty }
    ]);
    cy.visit(`/#${tilesString}`);
    cy.reload();
});

describe("Check number of steps", () => {
    it("Non empty tiles", () => {
        gameArea = new GameBoard(3, 3);

        //when
        gameArea.rotateTile(0, 1);
        gameArea.rotateTile(0, 2);
        gameArea.rotateTile(0, 1);
        gameArea.rotateTile(0, 2);

        //then
        gameArea.assertNumberOfSteps(4);
    });

    it("Empty tiles", () => {
        gameArea = new GameBoard(3, 3);

        //when
        gameArea.rotateTile(2, 0);
        gameArea.rotateTile(0, 0);

        //then
        gameArea.assertNumberOfSteps(0);
    });
});
