import { TileType, TileRotation } from "../iGameState";
import * as framework from "../framework";

export interface IParams {
    componentId: string;
    type: TileType;
    rotation?: TileRotation;
    onClick: () => void;
}

export default function Tile(params: IParams): string {
    framework.onClick(params.componentId, params.onClick);
    const rotation = params.rotation === undefined ? TileRotation.R0 : params.rotation;
    return `
        <div id="${params.componentId}" class="tile ${getTileCssClass(params.type)}" style="transform: rotate(${rotation}deg)"></div>
        ${getCssStyles()}
    `;
}

function getTileCssClass(type: TileType): string {
    switch (type) {
        case TileType.Empty:
            return "";
        case TileType.Straight:
            return "tile--straight";
        case TileType.Bend:
            return "tile--bend";
    }
    throw new Error(`Unknown type "${type}"`);
}

function getCssStyles(): string {
    return `<style> 
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
    </style>`;
}
