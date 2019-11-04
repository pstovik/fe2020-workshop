import { GamePage } from "../cypress/pages/gamePage";


let gamePage = new GamePage(3, 3);

beforeEach(() => {
    cy.visit(Cypress.env('serverUrlBeforeFinish'));
});

describe("Test winning condition", () => {
    it("Test game counters", () => {

        //when  
        gamePage.gameBoard.rotateTile(1, 1, true);

        //then    
        AssertWinCondition();
    });
});

function AssertWinCondition(): void {
    gamePage.gameScorePanel.assertNumberOfConnection(8);
}