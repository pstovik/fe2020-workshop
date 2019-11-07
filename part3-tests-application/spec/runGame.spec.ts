import { GamePage } from "../cypress/pages/gamePage";
import { GameEnding } from "../cypress/components/gameResult";
import { ScenarioSelector } from "../cypress/scenarios/scenarioSelector";
import { ScenarioDefinition, ScenarioStep } from "../cypress/scenarios/scenarioDefinition";

describe("Victory Cases", () => {
    it("Game Scenario: Snake (3x3)", () => {
        runScenarioTest(ScenarioSelector.Snake, GameEnding.Victory);
    });
    it("game scenario: Logo (3x3)", () => {
        runScenarioTest(ScenarioSelector.Logo, GameEnding.Victory);
    });
});

describe("Failure Cases", () => {
    it("Game Scenario: Snake (3x3)", () => {
        runScenarioTest(ScenarioSelector.Snake, GameEnding.Victory);
    });
    it("Game Scenario: Logo (3x3)", () => {
        runScenarioTest(ScenarioSelector.Logo, GameEnding.Failure);
    });
});

function runScenarioTest(scenarioDefinition: ScenarioDefinition, scenarioEnding: GameEnding): void {
    const gamePage = playgroundInitialize(scenarioDefinition);

    let stepSequence;
    switch (scenarioEnding) {
        case GameEnding.Victory:
            stepSequence = scenarioDefinition.getWinStepSequence();
            break;
        case GameEnding.Failure:
            stepSequence = scenarioDefinition.getLossStepSequence();
            break;
        default:
            throw new Error("Not implemented enum value");
    }

    doScenarioSteps(gamePage, stepSequence);
    assertGameEnding(gamePage, scenarioEnding);
}

function playgroundInitialize(scenarioDefinition: ScenarioDefinition) {
    const gamePage = new GamePage(scenarioDefinition.getRowCount(), scenarioDefinition.getColCount());

    cy.visit(scenarioDefinition.getGameUrl());
    assertInitialState(scenarioDefinition, gamePage);

    return gamePage;
}

function assertInitialState(scenarioDefinition: ScenarioDefinition, gamePage: GamePage): void {
    cy.log("Testing initial state of game board");
    gamePage.gameScorePanel.assertCurrentConnectionsCount(scenarioDefinition.getStartConnectionCount());
    gamePage.gameScorePanel.assertCurrentStepsCount(0);
    gamePage.gameScorePanel.assertMaxStepsCount(scenarioDefinition.getLossStepCount());
    gamePage.gameScorePanel.assertMinConnectionsCount(scenarioDefinition.getWinConnectionCount());
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

function doScenarioSteps(gamePage: GamePage, scenarioSteps: ScenarioStep[]): void {
    cy.log("Performing steps sequence");
    scenarioSteps.forEach(step => {
        gamePage.gameBoard.rotateTile(step.row, step.col);
    });
}
