import { TileType, TileRotation } from "../../../part2-component-framework/src/iGameState";
import { ScenarioDefinition, ScenarioStep } from "./scenarioDefinition";

export class ScenarioSelector {
    static Snake = new ScenarioDefinition(
        4,
        {
            winConnectionCount: 8,
            lossStepCount: 7,
            tiles: [
                { type: TileType.BendLT, rotation: TileRotation.CW180 },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.BendLT, rotation: TileRotation.CW270 },

                { type: TileType.BendLT, rotation: TileRotation.CW90 },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.BendLT, rotation: TileRotation.None },

                { type: TileType.BendLT, rotation: TileRotation.CW270 },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.BendLT, rotation: TileRotation.CW180 }
            ]
        },
        [
            new ScenarioStep({ row: 0, col: 1 }),
            new ScenarioStep({ row: 1, col: 0 }),
            new ScenarioStep({ row: 1, col: 1 }),
            new ScenarioStep({ row: 2, col: 0 }),
            new ScenarioStep({ row: 2, col: 0 }),
            new ScenarioStep({ row: 2, col: 1 }),
            new ScenarioStep({ row: 2, col: 2 })
        ],
        [
            new ScenarioStep({ row: 0, col: 0 }),
            new ScenarioStep({ row: 0, col: 1 }),
            new ScenarioStep({ row: 0, col: 2 }),
            new ScenarioStep({ row: 1, col: 0 }),
            new ScenarioStep({ row: 1, col: 1 }),
            new ScenarioStep({ row: 1, col: 2 }),
            new ScenarioStep({ row: 2, col: 0 })
        ]
    );

    static Logo = new ScenarioDefinition(
        1,
        {
            winConnectionCount: 3,
            lossStepCount: 6,
            tiles: [
                { type: TileType.Empty },
                { type: TileType.StraightLR, rotation: TileRotation.CW90 },
                { type: TileType.BendLT, rotation: TileRotation.CW90 },

                { type: TileType.Empty },
                { type: TileType.StraightLR, rotation: TileRotation.None },
                { type: TileType.StraightLR, rotation: TileRotation.None },

                { type: TileType.Empty },
                { type: TileType.StraightLR, rotation: TileRotation.None },
                { type: TileType.Empty }
            ]
        },
        [
            new ScenarioStep({ row: 0, col: 0 }),
            new ScenarioStep({ row: 0, col: 1 }),
            new ScenarioStep({ row: 0, col: 2 }),
            new ScenarioStep({ row: 0, col: 2 }),
            new ScenarioStep({ row: 1, col: 1 }),
            new ScenarioStep({ row: 1, col: 2 }),
            new ScenarioStep({ row: 2, col: 1 })
        ],
        [
            new ScenarioStep({ row: 0, col: 0 }),
            new ScenarioStep({ row: 0, col: 1 }),
            new ScenarioStep({ row: 0, col: 1 }),
            new ScenarioStep({ row: 0, col: 2 }),
            new ScenarioStep({ row: 1, col: 2 }),
            new ScenarioStep({ row: 1, col: 2 }),
            new ScenarioStep({ row: 2, col: 1 })
        ]
    );
}
