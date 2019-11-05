import { GamePage } from "../cypress/pages/gamePage";
import { serializeGame } from "../src/dependencies";
import { TileType, TileRotation, InfiniteGameNumber } from "../../part2-component-framework/src/iGameState";

let gamePage;

describe("Check number of steps", () => {
    beforeEach(() => {
        const tilesString = serializeGame({
            winConnectionCount: InfiniteGameNumber,
            lossStepCount: InfiniteGameNumber,
            tiles: [
                { type: TileType.Empty },
                { type: TileType.StraightLR },
                { type: TileType.BendLT, rotation: TileRotation.CW270 },

                { type: TileType.Empty },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },

                { type: TileType.Empty },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.Empty }
            ]
        });
        cy.visit(`/#${tilesString}`);
    });

    it("Non empty tiles", () => {
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile(0, 1, true);
        gamePage.gameBoard.rotateTile(0, 2, true);
        gamePage.gameBoard.rotateTile(0, 1, true);
        gamePage.gameBoard.rotateTile(0, 2, true);

        //then
        gamePage.gameScorePanel.assertCurrentStepsCount(4);
    });

    it("Empty tiles", () => {
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile(2, 0, true);
        gamePage.gameBoard.rotateTile(0, 0, true);

        //then
        gamePage.gameScorePanel.assertCurrentStepsCount(0);
    });
});
