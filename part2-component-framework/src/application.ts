import GameBoard from "./components/game-board";
import Tile from "./components/tile";
import * as framework from "./framework";
import { GameStore } from "./gameStore";
import { deserializeTiles } from "./serialization";
import { defaultGame } from "./defaultGame";

export class Application {
    private _store: GameStore;

    constructor(locationHash?: string) {
        this._store = new GameStore();
        const tiles = locationHash ? deserializeTiles(locationHash.substr(1)) : defaultGame();
        this._store.init(tiles);
    }

    render(): string {
        return GameBoard({
            tiles: this._store.tiles.map<string>((t, index) =>
                Tile({
                    componentId: `tile_${index}`,
                    type: t.type,
                    rotation: t.rotation,
                    onClick: () => {
                        console.log("clicked", `tile_${index}`);
                        this._store.tileClicked(index);
                        framework.update();
                    }
                })
            ),
            stepCount: this._store.stepCount,
            connectionCount: this._store.connectionCount
        });
    }
}

framework.componentStyle(`
    body { max-width: 600px; }
    html { background: rgb(170, 125, 0); }
`);
