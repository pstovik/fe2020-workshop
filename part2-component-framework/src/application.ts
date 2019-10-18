import gameBoard from "./components/game-board";
import tile, { TileType, TileRotation } from "./components/tile";

export class Application {
    render(): string {
        return gameBoard({
            tiles: [
                tile({ type: TileType.Empty }),
                tile({ type: TileType.Straight }),
                tile({ type: TileType.Bend, rotation: TileRotation.R270 }),

                tile({ type: TileType.Empty }),
                tile({ type: TileType.Straight, rotation: TileRotation.R90 }),
                tile({ type: TileType.Straight, rotation: TileRotation.R90 }),

                tile({ type: TileType.Empty }),
                tile({ type: TileType.Straight, rotation: TileRotation.R90 }),
                tile({ type: TileType.Empty })
            ]
        });
    }
}
