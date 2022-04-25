import GameBoard from "./components/game-board";
import Tile from "./components/tile";
import FullMessage from "./components/fullMessage";
import * as framework from "./framework";
import { GameStore } from "./gameStore";
import { deserializeGame } from "./serialization";
import { defaultGame } from "./defaultGame";
import Counter from "./components/counter";

export class Application {
    private store: GameStore;

    constructor(locationHash?: string) {
        this.store = new GameStore();
        const game = locationHash ? deserializeGame(locationHash.substr(1)) : defaultGame();
        this.store.init(game);
    }

    render(): string {
        if (this.store.isWinGame) {
            return FullMessage({ message: `:-) You have won with ${this.store.connectionCount} connections!` });
        }
        if (this.store.isLostGame) {
            return FullMessage({ message: `Sorry, you have lost after ${this.store.stepCount} steps.` });
        }
        return GameBoard({
            playerName: this.store.playerName,
            tiles: this.store.tiles.map<string>((t, index) =>
                Tile({
                    componentId: `tile_${index}`,
                    type: t.type,
                    rotation: t.rotation,
                    onClick: () => {
                        console.log("clicked", `tile_${index}`);
                        this.store.tileClicked(index);
                        framework.update();
                    },
                })
            ),
            counters: [
                Counter({ label: "Connections", value: this.store.connectionCount }),
                Counter({ label: "Win connections", value: this.store.winConnectionCount }),
                Counter({ label: "Steps", value: this.store.stepCount }),
                Counter({ label: "Max steps", value: this.store.lossStepCount }),
            ],
        });
    }
}

framework.componentStyle(`
    body { max-width: 600px; }
    html { background: rgb(170, 125, 0); }
`);
