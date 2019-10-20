import GameBoard from "./components/game-board";
import Tile from "./components/tile";
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
        return GameBoard({
            tiles: this._state.tiles.map<string>((t, index) =>
                Tile({
                    componentId: `tile_${index}`,
                    type: t.type,
                    rotation: t.rotation,
                    onClick() {
                        console.log("clicked", index);
                    }
                })
            )
        });
    }
}
