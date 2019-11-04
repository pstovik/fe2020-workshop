import { GamePage } from "../cypress/pages/gamePage";

let gamePage = new GamePage(3, 3);

beforeEach(() => {
    cy.visit(Cypress.env("serverUrl"));
});

describe("Test base game funcionality", () => {
    it("Test game counters", () => {
        //when
        gamePage.gameBoard.rotateTile(1, 1);

        //then
        AssertNumberOfStepsAndConection();
    });

    it("Test rotation tile on game board", () => {
        //given
        AssertTileRotation(90);

        //when
        gamePage.gameBoard.rotateTile(1, 1);

        //then
        AssertTileRotation(180);
    });
});

function AssertNumberOfStepsAndConection(): void {
    gamePage.gameScorePanel.assertNumberOfSteps(1);
    gamePage.gameScorePanel.assertNumberOfConnection(0);
}

function AssertTileRotation(angle: number) {
    gamePage.gameBoard.assertActualRotation(1, 1, angle);
}
