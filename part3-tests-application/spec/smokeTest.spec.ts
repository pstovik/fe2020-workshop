import { GamePage } from "../cypress/pages/gamePage";

let gamePage = new GamePage(3, 3);

describe("Test base game funcionality", () => {
  beforeEach(() => {
      cy.visit(Cypress.env("serverUrl"));
  });

  it("Test game counters", () => {
    //when
    gamePage.gameBoard.rotateTile(1, 1);

    //then
    AssertNumberOfStepsAndConection(1, 0);
  });

  it("Test rotation tile on game board", () => {
    //given
    AssertTileRotation(90);

    //when
    gamePage.gameBoard.rotateTile(1, 1);

    //then
    AssertTileRotation(180);
  });

  it("Test rotation empty tile on game board", () => {
    //given
    AssertNumberOfStepsAndConection(0, 1);

    //when
    gamePage.gameBoard.rotateTile(0, 0);

    //then
    AssertNumberOfStepsAndConection(0, 1);
  });
});

function AssertNumberOfStepsAndConection(stepsCount: number, connectionCount: number): void {
  gamePage.gameScorePanel.assertCurrentStepsCount(stepsCount);
  gamePage.gameScorePanel.assertCurrentConnectionsCount(connectionCount);
}

function AssertTileRotation(angle: number) {
  gamePage.gameBoard.assertActualRotation(1, 1, angle);
}


