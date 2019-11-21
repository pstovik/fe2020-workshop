export enum GameEnding {
    Victory = "won",
    Failure = "lost"
}

export class GameResult {
    selector = "div.full-message";

    public assertGameEnding(gameEnding: GameEnding): void {
        cy.get(this.selector).should("contain.text", gameEnding);
    }
}
