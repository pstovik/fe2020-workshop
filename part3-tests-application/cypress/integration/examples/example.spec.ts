describe("My first test", () => {
    
    it("Check number of steps", () => {
        
        //given
        cy.visit("http://localhost:8080/")        
 
        //when
        clickTile(1)
        clickTile(2)
        clickTile(1)
        clickTile(2)
        clickTile(6)
    
        //then
        assertNumberOfSteps(5)   
    });
});

function clickTile(index: number): void{
    cy.get("div#tile_" + index).click()
}

function getNumberOfSteps() : Cypress.Chainable<JQuery<HTMLElement>> {

    return cy.get("div.game-counter").invoke("text")       
}

function assertNumberOfSteps(expected: number): void {
    getNumberOfSteps().should(currentValue => {
        expect(currentValue).equals("Steps: " + expected.toString(), `${expected} was expected, but actual value is ${currentValue}`)
    })
}