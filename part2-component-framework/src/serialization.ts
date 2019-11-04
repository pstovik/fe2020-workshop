import { ITileState, TileType, TileRotation, IGameState, InfiniteGameNumber } from "./iGameState";

export function serializeGame(game: IGameState): string {
    const tiles = game.tiles.map(tileStateToString).join("_");
    return `${tiles}_W-${game.winConnectionCount}_L-${game.lossStepCount}`;
}

export function deserializeGame(gameString: string): IGameState {
    const gameBuilder = new GameBuilder();
    const tokens = gameString.split("_");
    for (const token of tokens) {
        const [param, value] = token.split("-");
        gameBuilder.processParam(param, value);
    }

    return gameBuilder.build();
}

class GameBuilder {
    private state: IGameState = {
        tiles: [],
        lossStepCount: InfiniteGameNumber,
        winConnectionCount: InfiniteGameNumber
    };

    processParam(param: string, value: string): void {
        switch (param) {
            case "E":
            case "B":
            case "S":
                this.state.tiles.push({
                    type: tileStringToType[param],
                    rotation: rotationStringToRotation[value as "0" | "90" | "180" | "270"]
                });
                break;
            case "W":
                this.state.winConnectionCount = parseInt(value);
                break;
            case "L":
                this.state.lossStepCount = parseInt(value);
                break;
            default:
                console.error(`Unknown parameter "${param}"`);
            // throw new Error(`Unknown parameter "${param}"`);
        }
    }

    build(): IGameState {
        return this.state;
    }
}

function tileStateToString(tile: ITileState): string {
    return tileTypeToString[tile.type] + "-" + tileRotationToString[tile.rotation || TileRotation.None];
}

const tileTypeToString = {
    [TileType.Empty]: "E",
    [TileType.BendLT]: "B",
    [TileType.StraightLR]: "S"
} as const;

const tileStringToType = {
    E: TileType.Empty,
    B: TileType.BendLT,
    S: TileType.StraightLR
};

const tileRotationToString = {
    [TileRotation.None]: "0",
    [TileRotation.CW90]: "90",
    [TileRotation.CW180]: "180",
    [TileRotation.CW270]: "270"
} as const;

const rotationStringToRotation = {
    "0": TileRotation.None,
    "90": TileRotation.CW90,
    "180": TileRotation.CW180,
    "270": TileRotation.CW270
};
