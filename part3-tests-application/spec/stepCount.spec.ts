import { GameBoard } from "../cypress/components/gameBoard";

let gameArea;

beforeEach(() => {
    cy.visit("/");
    cy.reload()
  });

describe("Check number of steps", () => {

    it("Non empty tiles", () => {
    gameArea = new GameBoard(3,3);      

        //when
        gameArea.rotateTile(0,1)
        gameArea.rotateTile(0,2)
        gameArea.rotateTile(0,1)
        gameArea.rotateTile(0,2)
    
        //then
        gameArea.assertNumberOfSteps(4)   
    });

    it("Empty tiles", () => {
    gameArea = new GameBoard(3,3);    

        //when
        gameArea.rotateTile(2,0)
        gameArea.rotateTile(0,0)

        //then
        gameArea.assertNumberOfSteps(0)
    });
});