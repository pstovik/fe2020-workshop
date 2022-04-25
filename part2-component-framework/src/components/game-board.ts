import * as framework from "../framework";

export default function GameBoard(params: { tiles: string[]; counters: string[]; playerName: string }): string {
    return `
        <div class="game-counters">
            ${params.counters.join("")}
        </div>
        <div class="player">
            Player: ${params.playerName}
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
    
        overflow: hidden; /* rotated tiles showing scrollbar fix */
    }
    
    .game-counters {
        font-size: 20px;
        padding: 5px;
    }

    .player {
        font-size: 20px;
        padding: 5px;
        font-weight: bold;
    }
`);
