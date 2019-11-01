import { GameBoard } from "../cypress/components/gameBoard";

let gameArea;

beforeEach(() => {
  cy.visit("/");      
});

describe("Test score counter", () => {
  

  it("Increase score test", () => {  
    gameArea = new GameBoard(3,3); 

    //when  
    gameArea.rotateTile(0,1);

    //then    
    gameArea.assertNumberOfSteps(1)

    gameArea.rotateTile(1,1);

    gameArea.assertNumberOfConnection(1);


  });

});
