import { GamePage } from "../cypress/pages/gamePage";

let gamePage = new GamePage(3, 3);

beforeEach(() => {
  cy.visit(Cypress.env('serverUrl'));
});

describe("Test base game funcionality", () => {
  it("Test game counters", () => {

    //when  
    gamePage.gameBoard.rotateTile(1, 1);

    //then    
    gamePage.gameScorePanel.assertNumberOfSteps(1)
    gamePage.gameScorePanel.assertNumberOfConnection(2)
  });

  it("Test rotation tile on game board", () => {

    //given
    gamePage.gameBoard.assertActualRotation(1, 1, 90);

    //when  
    gamePage.gameBoard.rotateTile(1, 1);

    //then
    gamePage.gameBoard.assertActualRotation(1, 1, 180);
  });

});
