import { GamePage } from "../cypress/pages/gamePage";

let gamePage = new GamePage(3, 3);

describe("Test base game funcionality", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Test game counters", () => {
        //when
        gamePage.gameBoard.rotateTile({ row: 1, column: 1 });

        //then
        AssertNumberOfStepsAndConection({ stepCount: 1, connectionCount: 0 });
    });

    it("Test rotation tile on game board", () => {
        //given
        AssertTileRotation(90);

        //when
        gamePage.gameBoard.rotateTile({ row: 1, column: 1 });

        //then
        AssertTileRotation(180);
    });

    it("Test rotation empty tile on game board", () => {
        //given
        AssertNumberOfStepsAndConection({ stepCount: 0, connectionCount: 1 });

        //when
        gamePage.gameBoard.rotateTile({ row: 0, column: 0 });

        //then
        AssertNumberOfStepsAndConection({ stepCount: 0, connectionCount: 1 });
    });
});

function AssertNumberOfStepsAndConection(params: { stepCount: number; connectionCount: number }): void {
    gamePage.gameScorePanel.assertCurrentStepsCount(params.stepCount);
    gamePage.gameScorePanel.assertCurrentConnectionsCount(params.connectionCount);
}

function AssertTileRotation(angle: number) {
    gamePage.gameBoard.assertActualRotation(1, 1, angle);
}
