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
        //given
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile({ row: 0, column: 1, log: true });
        gamePage.gameBoard.rotateTile({ row: 0, column: 2, log: true });
        gamePage.gameBoard.rotateTile({ row: 0, column: 1, log: true });
        gamePage.gameBoard.rotateTile({ row: 0, column: 2, log: true });

        //then
        gamePage.gameScorePanel.assertCurrentStepsCount(4);
    });

    it("Empty tiles", () => {
        //given
        gamePage = new GamePage(3, 3);

        //when
        gamePage.gameBoard.rotateTile({ row: 2, column: 0, log: true });
        gamePage.gameBoard.rotateTile({ row: 0, column: 0, log: true });

        //then
        gamePage.gameScorePanel.assertCurrentStepsCount(0);
    });
});
