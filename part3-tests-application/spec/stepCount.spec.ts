import { GameBoard } from "../cypress/components/gameBoard";

let gameArea;

describe("My first test", () => {
    
    it("Check number of steps", () => {
    gameArea = new GameBoard(3,3);

        //given
        cy.visit("http://localhost:8080/")        
 
        //when
        gameArea.rotateTile(0,1)
        gameArea.rotateTile(0,2)
        gameArea.rotateTile(0,1)
        gameArea.rotateTile(0,2)
        gameArea.rotateTile(2,0)
    
        //then
        assertNumberOfSteps(5)   
    });
});