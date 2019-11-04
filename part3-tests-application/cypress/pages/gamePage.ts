import { GameBoard } from "../components/gameBoard";
import { GameScorePanel } from "../components/gameScorePanel";
import { GameResult, GameEnding } from "../components/gameResult";

export class GamePage {
    gameScorePanel: GameScorePanel;
    gameBoard: GameBoard;

    constructor(width: number, height: number) {
        this.gameBoard = new GameBoard(width, height);
        this.gameScorePanel = new GameScorePanel();
    }

    public assertAngleRotation(x: number, y: number, angle: number): void {
        this.gameBoard.assertActualRotation(x, y, angle);
    }

    public assertGameEnding(gameEnding: GameEnding): void {
        new GameResult().assertGameEnding(gameEnding);
    }
}
