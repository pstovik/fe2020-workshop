import GameBoard from "./components/game-board";
import Tile from "./components/tile";
import * as framework from "./framework";
import { GameStore } from "./gameStore";

export class Application {
    private _store: GameStore;

    constructor() {
        this._store = new GameStore();
        this._store.init();
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
                        this._store.rotateTile(index);
                        framework.update();
                    }
                })
            )
        });
    }
}
