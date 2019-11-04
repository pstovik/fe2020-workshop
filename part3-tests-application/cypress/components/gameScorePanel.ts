import { GameCounter } from "./gameCounter";

export class GameScorePanel {
    public selector = "div.game-score";
    public currentStepsCounter: GameCounter;
    public currectConnectionCounter: GameCounter;
    public maxStepsCount: GameCounter;
    public minConnectionsCount: GameCounter;

    constructor() {
        this.currentStepsCounter = new GameCounter("Steps");
        this.currectConnectionCounter = new GameCounter("Connections");
        this.maxStepsCount = new GameCounter("Max steps");
        this.minConnectionsCount = new GameCounter("Win connections");
    }

    public assertCurrentStepsCount(expectedScore: number): void {
        this.currentStepsCounter.shouldHaveScore(expectedScore);
    }

    public assertCurrentConnectionsCount(expectedScore: number): void {
        this.currectConnectionCounter.shouldHaveScore(expectedScore);
    }

    public assertMaxStepsCount(expectedScore: number): void {
        this.maxStepsCount.shouldHaveScore(expectedScore);
    }

    public assertMinConnectionsCount(expectedScore: number): void {
        this.minConnectionsCount.shouldHaveScore(expectedScore);
    }
}
