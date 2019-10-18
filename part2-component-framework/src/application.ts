import gameBoard from "./components/game-board";

export class Application {
    render(): string {
        return gameBoard();
    }
}
