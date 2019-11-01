import { GameBoard } from "../cypress/components/gameBoard";

let gameArea;

beforeEach(() => {
  cy.visit("/");

});

describe("Test base game funcionality", () => {
  it("Test game counters", () => {

    gameArea = new GameBoard(3,3); 

    //when  
    gameArea.rotateTile(1,1);

    //then    
    gameArea.assertNumberOfSteps(1)    
    gameArea.assertNumberOfConnection(2)
  });

  it("Test rotation tile on game board", () => { 

    gameArea = new GameBoard(3,3); 

    //when  
    gameArea.rotateTile(0,1);

    //then    
    gameArea.assertNumberOfSteps(1)
  });

});
