export default function gameBoard(): string {
    return `
<div class="game-board">

    <div class="tile"></div>
    <div class="tile tile--straight"></div>
    <div class="tile tile--bend tile--rotate-270"></div>

    <div class="tile"></div>
    <div class="tile tile--straight tile--rotate-90"></div>
    <div class="tile tile--straight tile--rotate-90"></div>

    <div class="tile"></div>
    <div class="tile tile--straight tile--rotate-90"></div>
    <div class="tile"></div>
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
  
  .tile {
    width: 32.5%;
    padding-bottom: 32.5%; /* Same as width, sets height */
    margin-bottom: 1.25%; /* (100-32.5*3)/2 */
    position: relative;
  
    background-color: rgb(58, 179, 64);
  }
  
  .tile::before, .tile::after {
    content: "";
    display: block;
    position: absolute;
  
    /* https://leaverou.github.io/css3patterns/#carbon-fibre */
    background:
      radial-gradient(black 15%, transparent 16%) 0 0,
      radial-gradient(black 15%, transparent 16%) 8px 8px,
      radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
      radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
    background-color:#282828;
    background-size:16px 16px;
  }
  
  .tile.tile--straight::before {
    width: 100%;
    height: 40%;
    top: 30%;
  }
  
  .tile.tile--bend::before {
    width: 70%;
    height: 40%;
    top: 30%;
  }
  
  .tile.tile--bend::after {
    width: 40%;
    height: 70%;
    left: 30%;
  }
  
  .tile.tile--rotate-90 {
    transform: rotate(90deg);
  }
  
  .tile.tile--rotate-180 {
    transform: rotate(180deg);
  }
  
  .tile.tile--rotate-270 {
    transform: rotate(270deg);
  }  
</style>
`;
}
