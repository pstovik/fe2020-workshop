export class GameTile {
    selector: string;

    constructor(index: number) {
        this.selector = `div[id=tile_${index}]`
    }

    private getTile(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selector);
    }

    public rotateTile(): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getTile().click();
    }

    public assertActualRotation(expectRotationAngle: number) {
        this.getTile().invoke('attr', 'style')
            .should(currentValue => {
                expect(currentValue).contains("rotate(" + expectRotationAngle.toString() + "deg)", `was expected, but actual value is ${currentValue}`);
            });
    }
}