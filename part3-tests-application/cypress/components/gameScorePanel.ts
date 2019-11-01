import { GameCounter } from "./gameCounter";

export class GameScorePanel {

    public selector = "div.game-score";
    public stepsCounter: GameCounter;
    public connectionCounter: GameCounter;

    constructor(){
        this.stepsCounter = new GameCounter("Steps");
        this.connectionCounter = new GameCounter("Connections");
    } 
}