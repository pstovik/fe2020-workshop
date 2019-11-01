import { GameBoard } from "../components/gameBoard";
import { GameScorePanel } from "../components/gameScorePanel";

export class GamePage {
    gameScorePanel: GameScorePanel;
    gameBoard: GameBoard;

    constructor(width: number, height: number) {
        this.gameBoard = new GameBoard(width, height);
        this.gameScorePanel = new GameScorePanel();
    }

    public assertAngleRotation(x: number, y: number, angle: number): void {
        this.gameBoard.assertActualRotation(x, y, angle)
    }
}