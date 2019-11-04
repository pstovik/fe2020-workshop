import * as framework from "../framework";

export default function FullMessage(params: { message: string }): string {
    return `
        <div class="full-message">${params.message}</div>
        <div>Press F5 to restart the game</div>
    `;
}

framework.componentStyle(`   
    .full-message {
        font-size: 40px;
        padding: 20px;
        text-align: center;
    }
`);
