export default function GameBoard(params: { tiles: string[] }): string {
    return `
<div class="game-board">
    ${params.tiles.join("")}
</div>

<style>
.game-board {
    /* border: 1px solid black; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  
    background: rgb(170, 125, 0);
    overflow: hidden; /* rotated tiles showing scrollbar fix */
  }  
</style>
`;
}
