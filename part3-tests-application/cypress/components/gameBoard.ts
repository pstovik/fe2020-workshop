import { GameScorePanel } from "./gameScorePanel";

export class GameBoard {
    width: number = 0 ;
    height: number = 0; 
    gameScorePanel: GameScorePanel;
        
    constructor(width: number, height: number) {
        this.width = width
        this.height = height 
        this.gameScorePanel = new GameScorePanel();       
    }

    public rotateTile(x: number, y: number){
        this.getTile(x, y).click();
    }

    private getTile(x: number, y: number): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div[id=tile_'+ this.getIndex(x,y)+ ']') 
    }

    private getIndex(x: number, y: number): number{
        return (x*this.width + y)
    }

    public assertNumberOfSteps(expectedScore: number): void {
        this.gameScorePanel.stepsCounter.expectedScore(expectedScore);
    }

    public assertNumberOfConnection(expectedScore: number): void {
        this.gameScorePanel.connectionCounter.expectedScore(expectedScore);
    }

}