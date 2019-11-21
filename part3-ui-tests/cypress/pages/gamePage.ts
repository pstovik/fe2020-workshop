import { GameBoard } from "../components/gameBoard";
import { GameScorePanel } from "../components/gameScorePanel";
import { GameResult, GameEnding } from "../components/gameResult";

export class GamePage {
    gameScorePanel: GameScorePanel;
    gameBoard: GameBoard;
    gameResult: GameResult;

    constructor(width: number, height: number) {
        this.gameBoard = new GameBoard(width, height);
        this.gameScorePanel = new GameScorePanel();
        this.gameResult = new GameResult();
    }

    public assertAngleRotation(x: number, y: number, angle: number): void {
        this.gameBoard.assertActualRotation(x, y, angle);
    }

    public assertGameEnding(gameEnding: GameEnding): void {
        this.gameResult.assertGameEnding(gameEnding);
    }
}
