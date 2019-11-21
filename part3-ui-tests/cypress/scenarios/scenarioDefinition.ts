import { serializeGame } from "../../src/dependencies";
import { IGameState } from "../../../part2-component-framework/src/iGameState";

export class ScenarioStep {
    public row: number;
    public col: number;

    constructor(tile: { col: number; row: number }) {
        this.col = tile.col;
        this.row = tile.row;
    }
}

export class ScenarioDefinition {
    private readonly colCount: number = 3;
    private gameSettings: IGameState;
    private startConnectionCount: number;
    private winSteps: ScenarioStep[];
    private lossSteps: ScenarioStep[];

    constructor(startConnectionCount: number, gameSettings: IGameState, winSteps: ScenarioStep[], lossSteps: ScenarioStep[]) {
        this.gameSettings = gameSettings;
        this.startConnectionCount = startConnectionCount;
        this.winSteps = winSteps;
        this.lossSteps = lossSteps;
    }

    public getGameUrl = (): string => "/#" + serializeGame(this.gameSettings);
    public getColCount = (): number => this.colCount;
    public getRowCount = (): number => Math.floor(this.gameSettings.tiles.length / this.colCount);
    public getWinConnectionCount = (): number => this.gameSettings.winConnectionCount;
    public getLossStepCount = (): number => this.gameSettings.lossStepCount;
    public getStartConnectionCount = (): number => this.startConnectionCount;
    public getWinStepSequence = (): ScenarioStep[] => this.winSteps;
    public getLossStepSequence = (): ScenarioStep[] => this.lossSteps;
}
