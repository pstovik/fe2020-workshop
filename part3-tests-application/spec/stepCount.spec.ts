import { GamePage } from "../cypress/pages/gamePage";
import { serializeTiles } from "../src/dependencies";
import { TileType, TileRotation } from "../../part2-component-framework/src/iGameState";

let gamePage;

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
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile(0, 1);
        gamePage.gameBoard.rotateTile(0, 2);
        gamePage.gameBoard.rotateTile(0, 1);
        gamePage.gameBoard.rotateTile(0, 2);

        //then
        gamePage.gameScorePanel.assertNumberOfSteps(4);
    });

    it("Empty tiles", () => {
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile(2, 0);
        gamePage.gameBoard.rotateTile(0, 0);

        //then
        gamePage.gameScorePanel.assertNumberOfSteps(0);
    });
});
