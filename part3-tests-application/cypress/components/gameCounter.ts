export class GameCounter {
    selector = "div.game-counter"
    scoreName: string;    

    constructor(scoreName: string){
      this.scoreName = scoreName;
    }

    private getGameCounter(): Cypress.Chainable<JQuery<HTMLElement>>{       
        return cy.get(this.selector).contains(this.scoreName).invoke('text');
    }

    public expectedScore(expected: number): void {
        this.getGameCounter().should(currentValue => {
            expect(currentValue).contains(this.scoreName + ": " + expected.toString(), `${expected} was expected, but actual value is ${currentValue}`);
        });
    }
   
}