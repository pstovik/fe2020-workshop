import * as framework from "../framework";

export default function GameBoard(params: { tiles: string[]; stepCount: number }): string {
    return `
        <div class="game-score">
            <div class="game-counter">Steps: ${params.stepCount}</div>
        </div>
        <div class="game-board">
            ${params.tiles.join("")}
        </div>
    `;
}

framework.componentStyle(`
    .game-board {
        /* border: 1px solid black; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    
        background: rgb(170, 125, 0);
        overflow: hidden; /* rotated tiles showing scrollbar fix */
    }
    
    .game-score {
        background: rgb(170, 125, 0);
        font-size: 20px;
        padding: 5px;
    }
`);
