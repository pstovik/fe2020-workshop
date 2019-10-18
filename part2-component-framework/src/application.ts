import gameBoard from "./components/game-board";
import tile from "./components/tile";
import { TileType, TileRotation, IGameState } from "./iGameState";

export class Application {
    private _state: IGameState;

    constructor() {
        this._state = this.createInitialState();
    }

    private createInitialState(): IGameState {
        return {
            tiles: [
                { type: TileType.Empty },
                { type: TileType.Straight },
                { type: TileType.Bend, rotation: TileRotation.R270 },

                { type: TileType.Empty },
                { type: TileType.Straight, rotation: TileRotation.R90 },
                { type: TileType.Straight, rotation: TileRotation.R90 },

                { type: TileType.Empty },
                { type: TileType.Straight, rotation: TileRotation.R90 },
                { type: TileType.Empty }
            ]
        };
    }

    render(): string {
        return gameBoard({
            tiles: this._state.tiles.map<string>(t => tile(t))
        });
    }
}
