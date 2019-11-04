export class GameCounter {
    selector = "div.counter";
    scoreName: string;

    constructor(scoreName: string) {
        this.scoreName = scoreName;
    }

    public shouldHaveScore(expected: number): void {
        var scoreText = this.scoreName + ": " + expected;
        cy.get(this.selector).should("contain.text", scoreText);
    }
}
