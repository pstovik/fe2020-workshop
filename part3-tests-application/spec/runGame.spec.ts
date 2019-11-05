import { GamePage } from "../cypress/pages/gamePage";
import { GameEnding } from "../cypress/components/gameResult";

describe("Victory Cases", () => {
    it("Game Scenario #1", () => {
        runScenarioTest("gameScenario_1", GameEnding.Victory);
    });
    it("Game Scenario #2", () => {
        runScenarioTest("gameScenario_2", GameEnding.Victory);
    });
});

describe("Failure Cases", () => {
    it("Game Scenario #1", () => {
        runScenarioTest("gameScenario_1", GameEnding.Failure);
    });
    it("Game Scenario #2", () => {
        runScenarioTest("gameScenario_2", GameEnding.Failure);
    });
});

function runScenarioTest(scenarioName: string, scenarioEnding: GameEnding): void {
    const test = testInit(scenarioName);

    let stepSequence;
    switch (scenarioEnding) {
        case GameEnding.Victory:
            stepSequence = test.gameScenario.victorySequence;
            break;
        case GameEnding.Failure:
            stepSequence = test.gameScenario.failureSequence;
            break;
        default:
            throw new Error("Not implemented enum value");
    }

    doScenarioSteps(test.gamePage, stepSequence);
    assertGameEnding(test.gamePage, scenarioEnding);
}

function testInit(scenarioName: string) {
    const gameScenario = Cypress.env(scenarioName);
    const gamePage = new GamePage(gameScenario.rows, gameScenario.cols);

    cy.visit(gameScenario.url);
    assertInitialState(gameScenario, gamePage);

    return { gameScenario: gameScenario, gamePage: gamePage };
}

function assertInitialState(gameScenario: any, gamePage: GamePage): void {
    cy.log("Testing initial state of game board");
    gamePage.gameScorePanel.assertCurrentConnectionsCount(gameScenario.startConnections);
    gamePage.gameScorePanel.assertCurrentStepsCount(0);
    gamePage.gameScorePanel.assertMaxStepsCount(gameScenario.maxSteps);
    gamePage.gameScorePanel.assertMinConnectionsCount(gameScenario.minConnections);
}

function assertGameEnding(gamePage: GamePage, expectedResult: GameEnding): void {
    switch (expectedResult) {
        case GameEnding.Victory:
            cy.log("Testing that victory has been achieved");
            break;
        case GameEnding.Failure:
            cy.log("Testing that game ended with failure");
            break;
        default:
            throw new Error("Not implemented enum value");
    }
    gamePage.assertGameEnding(expectedResult);
}

function doScenarioSteps(gamePage: GamePage, scenarioSteps: any[]): void {
    cy.log("Performing steps sequence");
    scenarioSteps.forEach(step => {
        gamePage.gameBoard.rotateTile(step.row, step.col);
    });
}
